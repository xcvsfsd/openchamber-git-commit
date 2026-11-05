// Git service：跑在 OpenChamber 起的子进程里，经 host 代理访问。
// 安全注意：只用 execFile(git, args数组)，不用 shell；dir/branch/path 全校验。
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

// ---- 防护：参数校验（命令加防护） ----
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

// git 分支名防护：拒绝 shell 元字符与危险序列，长度兜底。
const isValidBranch = (name: unknown): name is string => {
  if (typeof name !== 'string' || name.length === 0 || name.length > 200) return false;
  if (name.startsWith('-') || name.startsWith('.') || name.startsWith('/')) return false;
  if (name.includes('..') || name.includes('@{') || name.includes('\0')) return false;
  if (/[~^:?*\[\\\s]/.test(name)) return false;
  if (!/^[A-Za-z0-9._\/-]+$/.test(name)) return false;
  return true;
};

const isValidRemote = (name: unknown): name is string => {
  if (typeof name !== 'string' || name.length === 0 || name.length > 100) return false;
  if (!/^[A-Za-z0-9._-]+$/.test(name)) return false;
  return true;
};

// git 路径防护：只允许相对路径，拒绝绝对路径与 .. 跳出。
const sanitizePaths = (paths: unknown): string[] | null => {
  if (!Array.isArray(paths) || paths.length === 0 || paths.length > 200) return null;
  const out: string[] = [];
  for (const p of paths) {
    if (typeof p !== 'string' || p.length === 0 || p.length > 1024) return null;
    if (p.includes('\0') || path.isAbsolute(p)) return null;
    const norm = path.posix.normalize(p.replace(/\\/g, '/'));
    if (norm === '.' || norm.startsWith('../') || norm.includes('/../')) return null;
    out.push(p);
  }
  return out;
};

const runGit = (dir: string, args: string[], input?: string): Promise<{ code: number; stdout: string; stderr: string }> =>
  new Promise((resolve) => {
    const child = execFile('git', args, { cwd: dir, timeout: 60_000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout, stderr) => {
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
      const lg = await runGit(dir, ['log', '--oneline', '-8', '--pretty=format:%H%x1f%s%x1f%an%x1f%ad', '--date=short']);
      const recent = lg.code === 0
        ? lg.stdout.split('\n').filter(Boolean).map((l) => {
          const [sha = '', subject = '', author = '', date = ''] = l.split('\x1f');
          return { sha: sha.slice(0, 12), subject, author, date };
        })
        : [];
      // 远程新提交：fetch 后对比上游，一行一个
      let incoming: { sha: string; subject: string; author: string; date: string }[] = [];
      if (parsed.upstream) {
        const ic = await runGit(dir, ['log', 'HEAD..@{u}', '--pretty=format:%H%x1f%s%x1f%an%x1f%ad', '--date=short', '-20']);
        if (ic.code === 0) {
          incoming = ic.stdout.split('\n').filter(Boolean).map((l) => {
            const parts = l.split('\x1f');
            return { sha: (parts[0] ?? '').slice(0, 12), subject: parts[1] ?? '', author: parts[2] ?? '', date: parts[3] ?? '' };
          });
        }
      }
      // 行数：未暂存 + 已暂存 numstat 相加，未跟踪/二进制特殊标
      const numMap = new Map<string, { add: number; del: number; binary: boolean }>();
      const numstat = async (args: string[]): Promise<void> => {
        const n = await runGit(dir, args);
        if (n.code !== 0) return;
        for (const line of n.stdout.split('\n')) {
          const m = line.match(/^(\d+|-)\t(\d+|-)\t(.+)$/);
          if (!m) continue;
          const key = (m[3] ?? '').trim();
          const cur = numMap.get(key) ?? { add: 0, del: 0, binary: false };
          if (m[1] === '-' || m[2] === '-') {
            cur.binary = true;
          } else {
            cur.add += Number(m[1]);
            cur.del += Number(m[2]);
          }
          numMap.set(key, cur);
        }
      };
      await numstat(['diff', '--numstat', '--']);
      await numstat(['diff', '--cached', '--numstat', '--']);
      for (const f of parsed.files) {
        const v = numMap.get(f.path);
        if (v) {
          (f as { add?: number; del?: number; binary?: boolean }).add = v.add;
          (f as { add?: number; del?: number; binary?: boolean }).del = v.del;
          (f as { add?: number; del?: number; binary?: boolean }).binary = v.binary;
        }
      }
      json(res, 200, { ok: true, dir, ...parsed, recent, incoming });
    })().catch(() => json(res, 500, { ok: false, error: 'status-failed' }));
    return;
  }

  // ---- 读：分支 ----
  if (req.method === 'GET' && url.pathname === '/branches') {
    const dir = url.searchParams.get('dir') ?? '';
    if (!isValidDir(dir)) return json(res, 400, { ok: false, error: 'bad-dir' });
    (async () => {
      const out = await runGit(dir, ['branch', '-vv', '--no-color']);
      if (out.code !== 0) return json(res, 200, { ok: false, error: out.stderr.slice(0, 500) });
      // 远程分支：分组展示用，过滤 origin/HEAD 这类符号引用
      let remotes: { name: string }[] = [];
      try {
        const ro = await runGit(dir, ['branch', '-r', '--no-color']);
        if (ro.code === 0) {
          remotes = ro.stdout.split('\n')
            .map((l) => l.trim())
            .filter((l) => l && !l.includes('->'))
            .map((name) => ({ name }));
        }
      } catch { /* 本地照常返回 */ }
      const branches = out.stdout.split('\n').filter(Boolean).map((l) => {
        const current = l.startsWith('*');
        const rest = l.slice(2).trim();
        const name = rest.split(/\s+/)[0] ?? '';
        const up = rest.match(/\[([^\]]+)\]/)?.[1] ?? null;
        let ahead = 0;
        let behind = 0;
        const a = up?.match(/ahead (\d+)/);
        const b = up?.match(/behind (\d+)/);
        if (a) ahead = Number(a[1]);
        if (b) behind = Number(b[1]);
        return { name, current, upstream: up ? up.split(':')[0] ?? null : null, ahead, behind };
      }).filter((b) => b.name && !b.name.startsWith('('));
      json(res, 200, { ok: true, branches, remotes });
    })().catch(() => json(res, 500, { ok: false, error: 'branches-failed' }));
    return;
  }

  // ---- 读：diff（限 200KB，防大文件刷爆） ----
  if (req.method === 'GET' && url.pathname === '/diff') {
    const dir = url.searchParams.get('dir') ?? '';
    const file = url.searchParams.get('file') ?? '';
    const staged = url.searchParams.get('staged') === '1';
    if (!isValidDir(dir)) return json(res, 400, { ok: false, error: 'bad-dir' });
    const paths = sanitizePaths([file]);
    if (!paths) return json(res, 400, { ok: false, error: 'bad-file' });
    (async () => {
      const args = staged ? ['diff', '--cached', '--no-color', '--', paths[0] as string] : ['diff', '--no-color', '--', paths[0] as string];
      const d = await runGit(dir, args);
      let text = (d.stdout || d.stderr).slice(0, 200 * 1024);
      json(res, 200, { ok: d.code === 0, diff: text });
    })().catch(() => json(res, 500, { ok: false, error: 'diff-failed' }));
    return;
  }

  // ---- 写操作：全部 POST + 参数校验 ----
  if (req.method === 'POST') {
    readBody(req).then(async (raw) => {
      if (!raw || typeof raw !== 'object') return json(res, 400, { ok: false, error: 'bad-request' });
      const body = raw as Record<string, unknown>;
      const dir = body.dir;
      if (!isValidDir(dir)) return json(res, 400, { ok: false, error: 'bad-dir' });

      // 暂存 / 取消暂存
      if (url.pathname === '/stage' || url.pathname === '/unstage') {
        const paths = sanitizePaths(body.paths);
        if (!paths) return json(res, 400, { ok: false, error: 'bad-paths' });
        const args = url.pathname === '/stage' ? ['add', '--', ...paths] : ['reset', 'HEAD', '--', ...paths];
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, error: r.code === 0 ? undefined : r.stderr.slice(0, 1000) });
      }

      // 提交
      if (url.pathname === '/commit') {
        const message = typeof body.message === 'string' ? body.message.trim() : '';
        const amend = body.amend === true;
        const pushAfter = body.push === true;
        if (message.length < 1 || message.length > 2000) return json(res, 400, { ok: false, error: 'bad-message' });
        const args = amend ? ['commit', '--amend', '-m', message] : ['commit', '-m', message];
        const r = await runGit(dir, args);
        if (r.code !== 0) return json(res, 200, { ok: false, error: r.stderr.slice(0, 1500) || r.stdout.slice(0, 1500) });
        if (pushAfter) {
          const p = await runGit(dir, ['push']);
          return json(res, 200, { ok: p.code === 0, pushed: p.code === 0, error: p.code === 0 ? undefined : p.stderr.slice(0, 1500) });
        }
        return json(res, 200, { ok: true });
      }

      // 同步：原生 git fetch，面板进入自动调，对比远程是否有新提交
      if (url.pathname === '/fetch') {
        const remote = body.remote;
        let args = ['fetch', '--prune'];
        if (remote !== undefined && remote !== null && remote !== '') {
          if (!isValidRemote(remote)) return json(res, 400, { ok: false, error: 'bad-remote' });
          args.push(remote as string);
        }
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 2000) });
      }

      // 拉取：原生 git pull
      if (url.pathname === '/pull') {
        const r = await runGit(dir, ['pull']);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 3000) });
      }

      // 推送：原生 git push，可选 --set-upstream
      if (url.pathname === '/push') {
        const remote = body.remote;
        const branch = body.branch;
        const setUp = body.setUpstream === true;
        let args = ['push'];
        if (remote !== undefined) {
          if (!isValidRemote(remote)) return json(res, 400, { ok: false, error: 'bad-remote' });
          args.push(remote as string);
          if (branch !== undefined) {
            if (!isValidBranch(branch)) return json(res, 400, { ok: false, error: 'bad-branch' });
            if (setUp) args.push('--set-upstream');
            args.push(branch as string);
          }
        }
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 3000) });
      }

      // 还原：丢弃工作区改动。已跟踪走原生 git checkout HEAD --；未跟踪需 confirmed 二次确认后删除
      if (url.pathname === '/restore') {
        const paths = sanitizePaths(body.paths);
        if (!paths) return json(res, 400, { ok: false, error: 'bad-paths' });
        const confirmed = body.confirmed === true;
        // 未跟踪（含新增）文件：git checkout 动不了，先分出来
        const ls = await runGit(dir, ['ls-files', '--', ...paths]);
        const tracked = new Set(ls.stdout.split('\n').map((x) => x.trim()).filter(Boolean));
        const untracked = paths.filter((x) => !tracked.has(x));
        if (untracked.length > 0) {
          if (!confirmed) return json(res, 200, { ok: false, error: 'need-confirm', untracked });
          // 防护：真路径必须落在仓库内，防穿越
          const realDir = fs.realpathSync(dir);
          for (const u of untracked) {
            const abs = path.resolve(dir, u);
            let real: string;
            try {
              real = fs.realpathSync(abs);
            } catch {
              continue; // 已不存在算还原成功
            }
            if (real !== realDir && !real.startsWith(realDir + path.sep)) {
              return json(res, 400, { ok: false, error: 'bad-paths' });
            }
            fs.rmSync(real, { recursive: true, force: true });
          }
          // 顺带清掉可能已暂存的新文件索引
          await runGit(dir, ['rm', '--cached', '--quiet', '--', ...untracked]);
        }
        const trackedPaths = paths.filter((x) => tracked.has(x));
        if (trackedPaths.length > 0) {
          // 原生 git restore：已暂存/未暂存一起回 HEAD，新增进索引的文件同时清掉
          let r = await runGit(dir, ['restore', '--source=HEAD', '--staged', '--worktree', '--', ...trackedPaths]);
          if (r.code !== 0) {
            r = await runGit(dir, ['checkout', 'HEAD', '--', ...trackedPaths]);
          }
          if (r.code !== 0) return json(res, 200, { ok: false, error: r.stderr.slice(0, 1000) });
        }
        return json(res, 200, { ok: true });
      }

      // 切换分支：原生 git switch / checkout
      if (url.pathname === '/checkout') {
        const branch = body.branch;
        const create = body.create === true;
        const base = body.base;
        if (!isValidBranch(branch)) return json(res, 400, { ok: false, error: 'bad-branch' });
        let args: string[];
        if (create) {
          if (base !== undefined && base !== null && base !== '') {
            if (!isValidBranch(base)) return json(res, 400, { ok: false, error: 'bad-base' });
            args = ['checkout', '-b', branch as string, base as string];
          } else {
            args = ['checkout', '-b', branch as string];
          }
        } else {
          args = ['checkout', branch as string];
        }
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 2000) });
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
