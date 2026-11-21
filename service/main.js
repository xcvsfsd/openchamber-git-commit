// src/service/main.ts
import http from "node:http";
import { execFile } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
var port = Number(process.env.OPENCHAMBER_SERVICE_PORT);
var token = process.env.OPENCHAMBER_SERVICE_TOKEN ?? "";
if (!port || !token) {
  console.error("OPENCHAMBER_SERVICE_PORT and OPENCHAMBER_SERVICE_TOKEN are required");
  process.exit(1);
}
var isValidDir = (dir) => {
  if (typeof dir !== "string" || dir.length === 0 || dir.length > 1024)
    return false;
  if (dir.includes("\x00"))
    return false;
  if (!path.isAbsolute(dir))
    return false;
  try {
    return fs.statSync(dir).isDirectory();
  } catch {
    return false;
  }
};
var runGit = (dir, args, input) => new Promise((resolve) => {
  const child = execFile("git", ["-c", "core.quotepath=false", ...args], { cwd: dir, timeout: 60000, maxBuffer: 8 * 1024 * 1024 }, (err, stdout, stderr) => {
    resolve({
      code: typeof err?.code === "number" ? err.code : err ? 1 : 0,
      stdout: String(stdout ?? ""),
      stderr: String(stderr ?? "")
    });
  });
  if (input && child.stdin) {
    child.stdin.write(input);
    child.stdin.end();
  }
});
var json = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json", "Cache-Control": "no-store" });
  res.end(JSON.stringify(body));
};
var readBody = (req) => new Promise((resolve) => {
  let text = "";
  req.on("data", (chunk) => {
    text += chunk.toString("utf8");
    if (text.length > 64 * 1024)
      req.destroy();
  });
  req.on("end", () => {
    if (!text)
      return resolve({});
    try {
      resolve(JSON.parse(text));
    } catch {
      resolve(null);
    }
  });
});
var parsePorcelain = (out) => {
  let branch = "";
  let upstream = null;
  let ahead = 0;
  let behind = 0;
  const files = [];
  for (const line of out.split(`
`)) {
    if (line.startsWith("## ")) {
      const head = line.slice(3);
      const noBranch = head.startsWith("No commits yet on ");
      const headCore = noBranch ? head.slice("No commits yet on ".length) : head;
      const dotIdx = headCore.indexOf("...");
      const left = dotIdx >= 0 ? headCore.slice(0, dotIdx) : headCore.split(" ")[0] ?? "";
      branch = left === "HEAD" || left === "No" ? "" : left;
      const right = dotIdx >= 0 ? headCore.slice(dotIdx + 3) : "";
      const upToken = right.split(" ")[0] ?? "";
      upstream = upToken ? upToken : null;
      const ab = head.match(/ahead (\d+)/);
      const bb = head.match(/behind (\d+)/);
      ahead = ab ? Number(ab[1]) : 0;
      behind = bb ? Number(bb[1]) : 0;
      continue;
    }
    if (line.length >= 4 && line[2] === " ") {
      const x = line[0] ?? " ";
      const y = line[1] ?? " ";
      const fp = line.slice(3).split(" -> ").pop() ?? "";
      if (fp)
        files.push({ path: fp, staged: x, unstaged: y });
    }
  }
  return { branch, upstream, ahead, behind, files };
};
var siblingRepos = (base) => {
  const repos = [{ name: path.basename(base), path: base }];
  const parent = path.dirname(base);
  let entries = [];
  try {
    entries = fs.readdirSync(parent).slice(0, 200);
  } catch {
    return repos;
  }
  for (const name of entries) {
    if (name.startsWith("."))
      continue;
    const full = path.join(parent, name);
    if (full === base)
      continue;
    try {
      if (!fs.statSync(full).isDirectory())
        continue;
      fs.statSync(path.join(full, ".git"));
      repos.push({ name, path: full });
    } catch {}
  }
  return repos.slice(0, 100);
};
var pullJobs = new Map;
var isGitHubRepo = (dir) => new Promise((resolve) => {
  execFile("git", ["-c", "core.quotepath=false", "config", "--get-regexp", "^remote\\..*\\.url$"], { cwd: dir, timeout: 1e4, maxBuffer: 1024 * 1024 }, (err, stdout) => {
    if (err) {
      resolve(false);
      return;
    }
    resolve(/github\.com/i.test(String(stdout ?? "")));
  });
});
var server = http.createServer((req, res) => {
  if (req.headers.authorization !== `Bearer ${token}`) {
    json(res, 401, { ok: false, error: "unauthorized" });
    return;
  }
  const url = new URL(req.url ?? "/", "http://127.0.0.1");
  if (url.pathname === "/health") {
    json(res, 200, { ok: true });
    return;
  }
  if (req.method === "GET" && url.pathname === "/status") {
    const dir = url.searchParams.get("dir") ?? "";
    if (!isValidDir(dir))
      return json(res, 400, { ok: false, error: "bad-dir" });
    (async () => {
      const st = await runGit(dir, ["status", "--porcelain=v1", "-b"]);
      if (st.code !== 0)
        return json(res, 200, { ok: false, error: st.stderr.slice(0, 500) || "not-a-repo" });
      const parsed = parsePorcelain(st.stdout);
      if (!parsed.branch) {
        const br = await runGit(dir, ["branch", "--show-current"]);
        parsed.branch = br.stdout.trim();
      }
      json(res, 200, { ok: true, dir, ...parsed });
    })().catch(() => json(res, 500, { ok: false, error: "status-failed" }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/pull-all-status") {
    const job = pullJobs.get(url.searchParams.get("jobId") ?? "");
    if (!job)
      return json(res, 404, { ok: false, error: "no-job" });
    const now = Date.now();
    for (const [id, j] of pullJobs) {
      if (j.done && now - j.startedAt > 10 * 60 * 1000)
        pullJobs.delete(id);
    }
    return json(res, 200, { ok: true, total: job.total, finished: job.finished, done: job.done, results: job.results });
  }
  if (req.method === "POST") {
    readBody(req).then(async (raw) => {
      if (!raw || typeof raw !== "object")
        return json(res, 400, { ok: false, error: "bad-request" });
      const body = raw;
      const dir = body.dir;
      if (!isValidDir(dir))
        return json(res, 400, { ok: false, error: "bad-dir" });
      if (url.pathname === "/pull-all") {
        const cur = await runGit(dir, ["rev-parse", "--show-toplevel"]);
        const base = cur.code === 0 && cur.stdout.trim() ? cur.stdout.trim() : dir;
        const repos = siblingRepos(base);
        const jobId = `${Date.now().toString(36)}${Math.floor(Math.random() * 1e6).toString(36)}`;
        const job = { total: repos.length, finished: 0, done: false, startedAt: Date.now(), results: [] };
        pullJobs.set(jobId, job);
        if (pullJobs.size > 10) {
          const first = pullJobs.keys().next().value;
          if (first)
            pullJobs.delete(first);
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
                output: "跳过 GitHub 项目"
              });
              job.finished += 1;
              continue;
            }
            const r = await runGit(repo.path, ["pull"]);
            const output = (r.stdout + r.stderr).slice(0, 800);
            job.results.push({
              name: repo.name,
              path: repo.path,
              ok: r.code === 0,
              conflict: /CONFLICT|fix conflicts|Merge conflict/i.test(output),
              output
            });
            job.finished += 1;
          }
          job.done = true;
        })().catch(() => {
          job.done = true;
        });
        return json(res, 200, { ok: true, jobId, total: repos.length });
      }
      if (url.pathname === "/sync") {
        const count = async (range) => {
          const r = await runGit(dir, ["rev-list", "--count", range]);
          return r.code === 0 ? Number(r.stdout.trim() || 0) : 0;
        };
        const fail = (error, extra = {}) => json(res, 200, { ok: false, error: error.slice(0, 600), pulled: 0, pushed: 0, ...extra });
        const up = await runGit(dir, ["rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"]);
        if (up.code !== 0)
          return fail("no-upstream");
        const f = await runGit(dir, ["fetch", "--prune"]);
        if (f.code !== 0)
          return fail(`fetch: ${(f.stderr || f.stdout).trim()}`);
        const behind = await count("HEAD..@{u}");
        const aheadLocal = await count("@{u}..HEAD");
        if (behind > 0 && aheadLocal > 0) {
          return fail("diverged", { ahead: aheadLocal, behind });
        }
        let pulled = 0;
        if (behind > 0) {
          const p = await runGit(dir, ["pull", "--ff-only"]);
          if (p.code !== 0) {
            const out = (p.stdout + p.stderr).trim();
            return fail(out || "pull-failed", { conflict: /CONFLICT|fix conflicts|Merge conflict/i.test(out) });
          }
          pulled = behind;
        }
        const ahead = aheadLocal;
        let pushed = 0;
        if (ahead > 0) {
          const ps = await runGit(dir, ["push"]);
          if (ps.code !== 0)
            return fail(`push: ${(ps.stderr || ps.stdout).trim()}`, { pulled });
          pushed = ahead;
        }
        const br = await runGit(dir, ["branch", "--show-current"]);
        return json(res, 200, { ok: true, pulled, pushed, branch: br.stdout.trim() });
      }
      return json(res, 404, { ok: false, error: "not-found" });
    }).catch(() => json(res, 500, { ok: false, error: "request-failed" }));
    return;
  }
  json(res, 404, { ok: false, error: "not-found" });
});
var shutdown = () => {
  server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
server.listen(port, "127.0.0.1");
