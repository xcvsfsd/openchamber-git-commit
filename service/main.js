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
var isValidBranch = (name) => {
  if (typeof name !== "string" || name.length === 0 || name.length > 200)
    return false;
  if (name.startsWith("-") || name.startsWith(".") || name.startsWith("/"))
    return false;
  if (name.includes("..") || name.includes("@{") || name.includes("\x00"))
    return false;
  if (/[~^:?*\[\\\s]/.test(name))
    return false;
  if (!/^[A-Za-z0-9._\/-]+$/.test(name))
    return false;
  return true;
};
var isValidRemote = (name) => {
  if (typeof name !== "string" || name.length === 0 || name.length > 100)
    return false;
  if (!/^[A-Za-z0-9._-]+$/.test(name))
    return false;
  return true;
};
var sanitizePaths = (paths) => {
  if (!Array.isArray(paths) || paths.length === 0 || paths.length > 200)
    return null;
  const out = [];
  for (const p of paths) {
    if (typeof p !== "string" || p.length === 0 || p.length > 1024)
      return null;
    if (p.includes("\x00") || path.isAbsolute(p))
      return null;
    const norm = path.posix.normalize(p.replace(/\\/g, "/"));
    if (norm === "." || norm.startsWith("../") || norm.includes("/../"))
      return null;
    out.push(p);
  }
  return out;
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
      const lg = await runGit(dir, ["log", "--oneline", "-8", "--pretty=format:%H%x1f%s%x1f%an%x1f%ad", "--date=short"]);
      const recent = lg.code === 0 ? lg.stdout.split(`
`).filter(Boolean).map((l) => {
        const [sha = "", subject = "", author = "", date = ""] = l.split("\x1F");
        return { sha: sha.slice(0, 12), subject, author, date };
      }) : [];
      let incoming = [];
      if (parsed.upstream) {
        const ic = await runGit(dir, ["log", "HEAD..@{u}", "--pretty=format:%H%x1f%s%x1f%an%x1f%ad", "--date=short", "-20"]);
        if (ic.code === 0) {
          incoming = ic.stdout.split(`
`).filter(Boolean).map((l) => {
            const parts = l.split("\x1F");
            return { sha: (parts[0] ?? "").slice(0, 12), subject: parts[1] ?? "", author: parts[2] ?? "", date: parts[3] ?? "" };
          });
        }
      }
      const numMap = new Map;
      const numstat = async (args) => {
        const n = await runGit(dir, args);
        if (n.code !== 0)
          return;
        for (const line of n.stdout.split(`
`)) {
          const m = line.match(/^(\d+|-)\t(\d+|-)\t(.+)$/);
          if (!m)
            continue;
          const key = (m[3] ?? "").trim();
          const cur = numMap.get(key) ?? { add: 0, del: 0, binary: false };
          if (m[1] === "-" || m[2] === "-") {
            cur.binary = true;
          } else {
            cur.add += Number(m[1]);
            cur.del += Number(m[2]);
          }
          numMap.set(key, cur);
        }
      };
      await numstat(["diff", "--numstat", "--"]);
      await numstat(["diff", "--cached", "--numstat", "--"]);
      for (const f of parsed.files) {
        const v = numMap.get(f.path);
        if (v) {
          f.add = v.add;
          f.del = v.del;
          f.binary = v.binary;
        }
      }
      let remoteLog = [];
      if (parsed.upstream) {
        const rl = await runGit(dir, ["log", parsed.upstream, "--pretty=format:%H%x1f%s%x1f%an%x1f%ad", "--date=short", "-5"]);
        if (rl.code === 0) {
          for (const line of rl.stdout.split(`
`).filter(Boolean)) {
            const parts = line.split("\x1F");
            const full = (parts[0] ?? "").trim();
            if (!full)
              continue;
            const anc = await runGit(dir, ["merge-base", "--is-ancestor", full, "HEAD"]);
            remoteLog.push({
              sha: full.slice(0, 12),
              subject: parts[1] ?? "",
              author: parts[2] ?? "",
              date: parts[3] ?? "",
              downloaded: anc.code === 0
            });
          }
        }
      }
      json(res, 200, { ok: true, dir, ...parsed, recent, incoming, remoteLog });
    })().catch(() => json(res, 500, { ok: false, error: "status-failed" }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/projects") {
    const dir = url.searchParams.get("dir") ?? "";
    if (!isValidDir(dir))
      return json(res, 400, { ok: false, error: "bad-dir" });
    (async () => {
      const out = [];
      const cur = await runGit(dir, ["rev-parse", "--show-toplevel"]);
      const top = cur.code === 0 ? cur.stdout.trim() : "";
      const base = top || dir;
      out.push({ name: path.basename(base), path: base, current: true });
      const parent = path.dirname(base);
      let entries = [];
      try {
        entries = fs.readdirSync(parent).slice(0, 200);
      } catch {
        return json(res, 200, { ok: true, projects: out });
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
          out.push({ name, path: full, current: false });
        } catch {}
      }
      const withStat = [];
      for (const pr of out.slice(0, 100)) {
        let branch = "";
        let ahead = 0;
        let behind = 0;
        let dirty = 0;
        try {
          const st = await runGit(pr.path, ["status", "--porcelain=v1", "-b"]);
          if (st.code === 0) {
            const pp = parsePorcelain(st.stdout);
            branch = pp.branch;
            ahead = pp.ahead;
            behind = pp.behind;
            dirty = pp.files.length;
            if (!branch) {
              const br = await runGit(pr.path, ["branch", "--show-current"]);
              branch = br.stdout.trim();
            }
          }
        } catch {}
        withStat.push({ ...pr, branch, ahead, behind, dirty });
      }
      withStat.sort((a, b) => a.current ? -1 : b.current ? 1 : a.name.localeCompare(b.name));
      json(res, 200, { ok: true, projects: withStat });
    })().catch(() => json(res, 500, { ok: false, error: "projects-failed" }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/branches") {
    const dir = url.searchParams.get("dir") ?? "";
    if (!isValidDir(dir))
      return json(res, 400, { ok: false, error: "bad-dir" });
    (async () => {
      const out = await runGit(dir, ["branch", "-vv", "--no-color"]);
      if (out.code !== 0)
        return json(res, 200, { ok: false, error: out.stderr.slice(0, 500) });
      let remotes = [];
      try {
        const ro = await runGit(dir, ["branch", "-r", "--no-color"]);
        if (ro.code === 0) {
          remotes = ro.stdout.split(`
`).map((l) => l.trim()).filter((l) => l && !l.includes("->")).map((name) => ({ name }));
        }
      } catch {}
      const branches = out.stdout.split(`
`).filter(Boolean).map((l) => {
        const current = l.startsWith("*");
        const rest = l.slice(2).trim();
        const name = rest.split(/\s+/)[0] ?? "";
        const up = rest.match(/\[([^\]]+)\]/)?.[1] ?? null;
        let ahead = 0;
        let behind = 0;
        const a = up?.match(/ahead (\d+)/);
        const b = up?.match(/behind (\d+)/);
        if (a)
          ahead = Number(a[1]);
        if (b)
          behind = Number(b[1]);
        return { name, current, upstream: up ? up.split(":")[0] ?? null : null, ahead, behind };
      }).filter((b) => b.name && !b.name.startsWith("("));
      json(res, 200, { ok: true, branches, remotes });
    })().catch(() => json(res, 500, { ok: false, error: "branches-failed" }));
    return;
  }
  if (req.method === "GET" && url.pathname === "/diff") {
    const dir = url.searchParams.get("dir") ?? "";
    const file = url.searchParams.get("file") ?? "";
    const staged = url.searchParams.get("staged") === "1";
    if (!isValidDir(dir))
      return json(res, 400, { ok: false, error: "bad-dir" });
    const paths = sanitizePaths([file]);
    if (!paths)
      return json(res, 400, { ok: false, error: "bad-file" });
    (async () => {
      const args = staged ? ["diff", "--cached", "--no-color", "--", paths[0]] : ["diff", "--no-color", "--", paths[0]];
      const d = await runGit(dir, args);
      let text = (d.stdout || d.stderr).slice(0, 200 * 1024);
      json(res, 200, { ok: d.code === 0, diff: text });
    })().catch(() => json(res, 500, { ok: false, error: "diff-failed" }));
    return;
  }
  if (req.method === "POST") {
    readBody(req).then(async (raw) => {
      if (!raw || typeof raw !== "object")
        return json(res, 400, { ok: false, error: "bad-request" });
      const body = raw;
      const dir = body.dir;
      if (!isValidDir(dir))
        return json(res, 400, { ok: false, error: "bad-dir" });
      if (url.pathname === "/stage" || url.pathname === "/unstage") {
        const paths = sanitizePaths(body.paths);
        if (!paths)
          return json(res, 400, { ok: false, error: "bad-paths" });
        const args = url.pathname === "/stage" ? ["add", "--", ...paths] : ["reset", "HEAD", "--", ...paths];
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, error: r.code === 0 ? undefined : r.stderr.slice(0, 1000) });
      }
      if (url.pathname === "/commit") {
        const message = typeof body.message === "string" ? body.message.trim() : "";
        const amend = body.amend === true;
        const pushAfter = body.push === true;
        if (message.length < 1 || message.length > 2000)
          return json(res, 400, { ok: false, error: "bad-message" });
        const args = amend ? ["commit", "--amend", "-m", message] : ["commit", "-m", message];
        const r = await runGit(dir, args);
        if (r.code !== 0)
          return json(res, 200, { ok: false, error: r.stderr.slice(0, 1500) || r.stdout.slice(0, 1500) });
        if (pushAfter) {
          const p = await runGit(dir, ["push"]);
          return json(res, 200, { ok: p.code === 0, pushed: p.code === 0, error: p.code === 0 ? undefined : p.stderr.slice(0, 1500) });
        }
        return json(res, 200, { ok: true });
      }
      if (url.pathname === "/fetch") {
        const remote = body.remote;
        let args = ["fetch", "--prune"];
        if (remote !== undefined && remote !== null && remote !== "") {
          if (!isValidRemote(remote))
            return json(res, 400, { ok: false, error: "bad-remote" });
          args.push(remote);
        }
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 2000) });
      }
      if (url.pathname === "/pull") {
        const r = await runGit(dir, ["pull"]);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 3000) });
      }
      if (url.pathname === "/push") {
        const remote = body.remote;
        const branch = body.branch;
        const setUp = body.setUpstream === true;
        let args = ["push"];
        if (remote !== undefined) {
          if (!isValidRemote(remote))
            return json(res, 400, { ok: false, error: "bad-remote" });
          args.push(remote);
          if (branch !== undefined) {
            if (!isValidBranch(branch))
              return json(res, 400, { ok: false, error: "bad-branch" });
            if (setUp)
              args.push("--set-upstream");
            args.push(branch);
          }
        }
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 3000) });
      }
      if (url.pathname === "/restore") {
        const paths = sanitizePaths(body.paths);
        if (!paths)
          return json(res, 400, { ok: false, error: "bad-paths" });
        const confirmed = body.confirmed === true;
        const ls = await runGit(dir, ["ls-files", "--", ...paths]);
        const tracked = new Set(ls.stdout.split(`
`).map((x) => x.trim()).filter(Boolean));
        const untracked = paths.filter((x) => !tracked.has(x));
        if (untracked.length > 0) {
          if (!confirmed)
            return json(res, 200, { ok: false, error: "need-confirm", untracked });
          const realDir = fs.realpathSync(dir);
          for (const u of untracked) {
            const abs = path.resolve(dir, u);
            let real;
            try {
              real = fs.realpathSync(abs);
            } catch {
              continue;
            }
            if (real !== realDir && !real.startsWith(realDir + path.sep)) {
              return json(res, 400, { ok: false, error: "bad-paths" });
            }
            fs.rmSync(real, { recursive: true, force: true });
          }
          await runGit(dir, ["rm", "--cached", "--quiet", "--", ...untracked]);
        }
        const trackedPaths = paths.filter((x) => tracked.has(x));
        if (trackedPaths.length > 0) {
          let r = await runGit(dir, ["restore", "--source=HEAD", "--staged", "--worktree", "--", ...trackedPaths]);
          if (r.code !== 0) {
            r = await runGit(dir, ["checkout", "HEAD", "--", ...trackedPaths]);
          }
          if (r.code !== 0)
            return json(res, 200, { ok: false, error: r.stderr.slice(0, 1000) });
        }
        return json(res, 200, { ok: true });
      }
      if (url.pathname === "/checkout") {
        const branch = body.branch;
        const create = body.create === true;
        const base = body.base;
        if (!isValidBranch(branch))
          return json(res, 400, { ok: false, error: "bad-branch" });
        let args;
        if (create) {
          if (base !== undefined && base !== null && base !== "") {
            if (!isValidBranch(base))
              return json(res, 400, { ok: false, error: "bad-base" });
            args = ["checkout", "-b", branch, base];
          } else {
            args = ["checkout", "-b", branch];
          }
        } else {
          args = ["checkout", branch];
        }
        const r = await runGit(dir, args);
        return json(res, 200, { ok: r.code === 0, output: (r.stdout + r.stderr).slice(0, 2000) });
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
