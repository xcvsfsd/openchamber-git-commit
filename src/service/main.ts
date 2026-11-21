// Git service：跑在 OpenChamber 起的子进程里，经 host 代理访问。
// 安全注意：只用 execFile(git, args数组)，不用 shell；dir 全校验。
// 瘦身说明：纯状态区只保留 /status /sync /pull-all /pull-all-status；
// 面板时代的 stage/commit/push/restore/checkout/branches/diff/projects 已删除。
import http from 'node:http';
import { execFile } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
const token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? '';
if (!port || !token) {
  console.error('OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required');
  process.exit(1);
}

// ---- 防护：参数校验（命令加防护），只留状态区用到的 dir 校验 ----
const isValidDir = (dir: unknown): dir is string => {
  if (typeof dir !== 'string' || dir.length === 0 || dir.length > 1024) return false;
  if (dir.includes('\0')) return false;
  if (!path.isAbsolute(dir)) return false;
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
};

const runGit = (dir: string, args: string[], input?: string): Promise<{ code: number; stdout: string; stderr: string }> =>
  new Promise((resolve) => {
    // 中文文件名不转义：quotepath 会把中文变成八进制导致后续按名操作失效
    const child = execFile('git', ['-c', 'core.quotepath=false', ...args], { cwd: dir, timeout: 60_000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout, stderr) => {
      resolve({
        code: typeof err?.code === 'number' ? err.code : err ? 1 : 0,
        stdout: String(stdout ?? ''),
        stderr: String(stderr ?? ''),
      });
    });
    if (input && child.stdin) {
      child.stdin.write(input);
      child.stdin.end();
    }
  });

const json = (res: http.ServerResponse, status: number, body: unknown): void => {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(body));
};

const readBody = (req: http.IncomingMessage): Promise<unknown> =>
  new Promise((resolve) => {
    let text = '';
    req.on('data', (chunk: Buffer) => {
      text += chunk.toString('utf8');
      if (text.length > 64 * 1024) req.destroy();
    });
    req.on('end', () => {
      if (!text) return resolve({});
      try {
        resolve(JSON.parse(text));
      } catch {
        resolve(null);
      }
    });
  });

// git status --porcelain=v1 -b 解析
const parsePorcelain = (out: string): { branch: string; upstream: string | null; ahead: number; behind: number; files: { path: string; staged: string; unstaged: string }[] } => {
  let branch = '';
  let upstream: string | null = null;
  let ahead = 0;
  let behind = 0;
  const files: { path: string; staged: string; unstaged: string }[] = [];
  for (const line of out.split('\n')) {
    if (line.startsWith('## ')) {
      // 例：## develop_3c...origin/develop_3c [ahead 1, behind 2]
      // 例：## main / ## HEAD (no branch) / ## No commits yet on main
      const head = line.slice(3);
      const noBranch = head.startsWith('No commits yet on ');
      const headCore = noBranch ? head.slice('No commits yet on '.length) : head;
      const dotIdx = headCore.indexOf('...');
      const left = dotIdx >= 0 ? headCore.slice(0, dotIdx) : headCore.split(' ')[0] ?? '';
      branch = left === 'HEAD' || left === 'No' ? '' : left;
      const right = dotIdx >= 0 ? headCore.slice(dotIdx + 3) : '';
      const upToken = right.split(' ')[0] ?? '';
      upstream = upToken ? upToken : null;
      const ab = head.match(/ahead (\d+)/);
      const bb = head.match(/behind (\d+)/);
      ahead = ab ? Number(ab[1]) : 0;
      behind = bb ? Number(bb[1]) : 0;
      continue;
    }
    if (line.length >= 4 && line[2] === ' ') {
      const x = line[0] ?? ' ';
      const y = line[1] ?? ' ';
      const fp = line.slice(3).split(' -> ').pop() ?? '';
      if (fp) files.push({ path: fp, staged: x, unstaged: y });
    }
  }
  return { branch, upstream, ahead, behind, files };
};

// 同级 git 仓库路径（含自身）
const siblingRepos = (base: string): { name: string; path: string }[] => {
  const repos = [{ name: path.basename(base), path: base }];
  const parent = path.dirname(base);
  let entries: string[] = [];
  try {
    entries = fs.readdirSync(parent).slice(0, 200);
  } catch {
    return repos;
  }
  for (const name of entries) {
    if (name.startsWith('.')) continue;
    const full = path.join(parent, name);
    if (full === base) continue;
    try {
      if (!fs.statSync(full).isDirectory()) continue;
      fs.statSync(path.join(full, '.git'));
      repos.push({ name, path: full });
    } catch { /* 非 git 跳过 */ }
  }
  return repos.slice(0, 100);
};

type PullResult = { name: string; path: string; ok: boolean; conflict: boolean; skipped?: boolean; output: string };
type PullJob = { total: number; finished: number; done: boolean; startedAt: number; results: PullResult[] };
const pullJobs = new Map<string, PullJob>();

// 「全部本地项目拉取」跳过 GitHub 托管的仓：只看远端地址主机名，不联网
const isGitHubRepo = (dir: string): Promise<boolean> =>
  new Promise((resolve) => {
    execFile('git', ['-c', 'core.quotepath=false', 'config', '--get-regexp', '^remote\\..*\\.url$'], { cwd: dir, timeout: 10_000, maxBuffer: 1024 * 1024 }, (err, stdout) => {
      if (err) { resolve(false); return; }
      resolve(/github\.com/i.test(String(stdout ?? '')));
    });
  });

const server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    json(res, 401, { ok: false, error: 'unauthorized' });
    return;
  }
  const url = new URL(req.url ?? '/', 'http://127.0.0.1');
  if (url.pathname === '/health') {
    json(res, 200, { ok: true });
    return;
  }

  // ---- 读：状态 ----
  if (req.method === 'GET' && url.pathname === '/status') {
    const dir = url.searchParams.get('dir') ?? '';
    if (!isValidDir(dir)) return json(res, 400, { ok: false, error: 'bad-dir' });
    (async () => {
      const st = await runGit(dir, ['status', '--porcelain=v1', '-b']);
      if (st.code !== 0) return json(res, 200, { ok: false, error: st.stderr.slice(0, 500) || 'not-a-repo' });
      const parsed = parsePorcelain(st.stdout);
      if (!parsed.branch) {
        const br = await runGit(dir, ['branch', '--show-current']);
        parsed.branch = br.stdout.trim();
      }
      // 状态区只用 branch/ahead/behind/files 长度，不查 log/numstat/远端明细
      json(res, 200, { ok: true, dir, ...parsed });
    })().catch(() => json(res, 500, { ok: false, error: 'status-failed' }));
    return;
  }

  // ---- 读：全部拉取进度 ----
  if (req.method === 'GET' && url.pathname === '/pull-all-status') {
    const job = pullJobs.get(url.searchParams.get('jobId') ?? '');
    if (!job) return json(res, 404, { ok: false, error: 'no-job' });
    // 顺手清掉 10 分钟前的旧任务
    const now = Date.now();
    for (const [id, j] of pullJobs) {
      if (j.done && now - j.startedAt > 10 * 60 * 1000) pullJobs.delete(id);
    }
    return json(res, 200, { ok: true, total: job.total, finished: job.finished, done: job.done, results: job.results });
  }

  // ---- 写操作：POST，只留状态区用的 /pull-all /sync ----
  if (req.method === 'POST') {
    readBody(req).then(async (raw) => {
      if (!raw || typeof raw !== 'object') return json(res, 400, { ok: false, error: 'bad-request' });
      const body = raw as Record<string, unknown>;
      const dir = body.dir;
      if (!isValidDir(dir)) return json(res, 400, { ok: false, error: 'bad-dir' });

      // 全部本地项目拉取：后台逐个原生 git pull（跳过 GitHub 仓），立即返回 jobId 状态区轮询进度
      if (url.pathname === '/pull-all') {
        const cur = await runGit(dir, ['rev-parse', '--show-toplevel']);
        const base = cur.code === 0 && cur.stdout.trim() ? cur.stdout.trim() : dir;
        const repos = siblingRepos(base);
        const jobId = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;
        const job: PullJob = { total: repos.length, finished: 0, done: false, startedAt: Date.now(), results: [] };
        pullJobs.set(jobId, job);
        if (pullJobs.size > 10) {
          const first = pullJobs.keys().next().value;
          if (first) pullJobs.delete(first);
        }
        (async () => {
          for (const repo of repos) {
            if (await isGitHubRepo(repo.path)) {
              job.results.push({
                name: repo.name,
                path: repo.path,
                ok: true,
                conflict: false,
                skipped: true,
                output: '跳过 GitHub 项目',
              });
              job.finished += 1;
              continue;
            }
            const r = await runGit(repo.path, ['pull']);
            const output = (r.stdout + r.stderr).slice(0, 800);
            job.results.push({
              name: repo.name,
              path: repo.path,
              ok: r.code === 0,
              conflict: /CONFLICT|fix conflicts|Merge conflict/i.test(output),
              output,
            });
            job.finished += 1;
          }
          job.done = true;
        })().catch(() => {
          job.done = true;
        });
        return json(res, 200, { ok: true, jobId, total: repos.length });
      }

      // 刷新同步：fetch → 拉取远程 → 有本地未推送就推送，回计数供状态行提示
      if (url.pathname === '/sync') {
        const count = async (range: string): Promise<number> => {
          const r = await runGit(dir, ['rev-list', '--count', range]);
          return r.code === 0 ? Number(r.stdout.trim() || 0) : 0;
        };
        const fail = (error: string, extra: Record<string, unknown> = {}) =>
          json(res, 200, { ok: false, error: error.slice(0, 600), pulled: 0, pushed: 0, ...extra });

        const up = await runGit(dir, ['rev-parse', '--abbrev-ref', '--symbolic-full-name', '@{u}']);
        if (up.code !== 0) return fail('no-upstream');

        const f = await runGit(dir, ['fetch', '--prune']);
        if (f.code !== 0) return fail(`fetch: ${(f.stderr || f.stdout).trim()}`);

        const behind = await count('HEAD..@{u}');
        const aheadLocal = await count('@{u}..HEAD');
        // 分叉时不动工作区：合并会产生冲突文件，交给用户决定
        if (behind > 0 && aheadLocal > 0) {
          return fail('diverged', { ahead: aheadLocal, behind });
        }
        let pulled = 0;
        if (behind > 0) {
          const p = await runGit(dir, ['pull', '--ff-only']);
          if (p.code !== 0) {
            const out = (p.stdout + p.stderr).trim();
            return fail(out || 'pull-failed', { conflict: /CONFLICT|fix conflicts|Merge conflict/i.test(out) });
          }
          pulled = behind;
        }

        // 快进后本地提交不变，aheadLocal 仍准确
        const ahead = aheadLocal;
        let pushed = 0;
        if (ahead > 0) {
          const ps = await runGit(dir, ['push']);
          if (ps.code !== 0) return fail(`push: ${(ps.stderr || ps.stdout).trim()}`, { pulled });
          pushed = ahead;
        }
        const br = await runGit(dir, ['branch', '--show-current']);
        return json(res, 200, { ok: true, pulled, pushed, branch: br.stdout.trim() });
      }

      return json(res, 404, { ok: false, error: 'not-found' });
    }).catch(() => json(res, 500, { ok: false, error: 'request-failed' }));
    return;
  }

  json(res, 404, { ok: false, error: 'not-found' });
});

const shutdown = (): void => {
  server.close();
  process.exit(0);
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

server.listen(port, '127.0.0.1');
