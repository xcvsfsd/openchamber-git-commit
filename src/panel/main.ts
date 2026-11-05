// Panel v3：远程下载与本地未提交分两个表；本地表 5 秒自动刷 + 手动刷新。
// 进入自动 fetch 对远程；下载按钮走原生 git pull。
import { connectHost, HostRequestError } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { StatusAnswer, BranchEntry } from '../shared/types.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

root.innerHTML = `
<style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;font:15px/1.6 system-ui,sans-serif}
#root{padding:12px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.top{display:flex;gap:8px;align-items:center}
select#project{border:2px solid var(--primary,#3574f0);background:color-mix(in srgb,var(--primary,#3574f0) 12%,var(--oc-elevated,#fff));font-weight:700}
select{flex:1;padding:8px 10px;font-size:15px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,#fff);color:var(--oc-fg,inherit);color-scheme:light dark}
select option{background:var(--oc-elevated,#fff);color:var(--oc-fg,#111)}
button{padding:8px 14px;font-size:14px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5}
.sync{font-size:13.5px;opacity:.8}
h3{margin:6px 0 0;font-size:14px;opacity:.65;font-weight:600}
table{width:100%;border-collapse:collapse;font-size:14.5px}
td{padding:8px 6px;border-bottom:1px solid #8882;vertical-align:middle}
input[type=checkbox]{width:19px;height:19px;accent-color:var(--primary,#3574f0);cursor:pointer;flex:none;margin:0}
.selbar{display:flex;gap:10px;align-items:center;background:#8881;border-radius:8px;padding:7px 10px;cursor:pointer;user-select:none}
.selbar:hover{background:#8882}
.selbar span{font-size:14px}
.file .p{cursor:pointer}
.file .p:hover{text-decoration:underline}
button.ai{font-size:14px;background:linear-gradient(135deg,#8b5cf6,#3b82f6);border:none;color:#fff;font-weight:700;padding:6px 14px}
button.ai:hover{filter:brightness(1.12)}
button.icon{padding:4px 10px;font-size:13px}
.mono{font-family:monospace}
.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:0;width:100%}
.empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:28px 0;opacity:.75}
.empty .ic{font-size:26px;opacity:.4}
#done[hidden],#nongit[hidden],#conflict[hidden],#confirm[hidden]{display:none!important}
#confirm{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);z-index:30;padding:20px}
#confirm .box{background:var(--oc-elevated,#1c1c1e);border:1px solid var(--oc-border,#8888);border-radius:12px;padding:16px;max-width:100%;display:flex;flex-direction:column;gap:12px}
#confirm .msg{font-size:14px;word-break:break-all}
#conflict{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,#7f1d1d 92%,transparent);z-index:20;text-align:center;padding:16px}
#conflict .big{font-size:44px}
#conflict table{max-width:100%}
#conflict td{border-bottom:1px solid #fff3}
textarea{width:100%;min-height:76px;padding:10px;font-size:14.5px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:13.5px;opacity:.7}
.spin{display:inline-block;animation:rot 1s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
#done{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,var(--oc-elevated,#000) 88%,transparent);z-index:10;text-align:center}
#done .big{font-size:52px;animation:pop .45s ease-out}
@keyframes pop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1)}}
.confetti{position:absolute;top:-8px;width:8px;height:12px;opacity:.9;animation:fall 1.6s ease-in forwards}
@keyframes fall{to{transform:translateY(220px) rotate(540deg);opacity:0}}
</style>
<div class="top">
  <select id="project" title="项目目录，默认当前项目"></select>
  <button id="btn-pull-all" title="逐个拉取上层目录下全部 git 项目">全部拉取</button>
</div>
<div class="top" id="topbar">
  <span id="proj-name" class="mut" title="当前项目"></span>
  <select id="branch" title="分支，选中直接切换"></select>
  <button id="btn-pull" title="拉取远程代码 git pull">下载</button>
  <button id="btn-refresh" title="重新对比远程与本地">↻</button>
</div>
<div id="sync" class="sync">等待项目…</div>
<div id="nongit" class="empty" hidden>
  <div class="ic">—○—</div><div>非git项目</div><div class="mut">先打开一个 git 仓库项目</div>
</div>
<h3 id="h-remote">远程新提交</h3>
<div id="remote"><div class="mut">—</div></div>
<h3 id="h-local">本地未提交</h3>
<div id="local"><div class="mut">—</div></div>
<div id="confirm" hidden>
  <div class="box">
    <div class="msg" id="confirm-msg"></div>
    <div class="row" style="justify-content:flex-end">
      <button id="confirm-cancel">取消</button>
      <button id="confirm-ok" class="primary">确定删除</button>
    </div>
  </div>
</div>
<div id="conflict" hidden>
  <div class="big">⛔</div>
  <div style="font-size:15px;font-weight:700">出现合并冲突请自行处理</div>
  <div class="mut" style="color:#fecaca">插件不会自动合并以下文件在外部处理完再回来</div>
  <table id="conflict-list"></table>
  <button id="btn-conflict-ok">我知道了</button>
</div>
<div id="done" hidden>
  <div class="big">🎉</div>
  <div style="font-size:15px">提交成功</div>
  <button id="btn-again">继续</button>
</div>
<div id="commitBox">
  <textarea id="msg" placeholder="提交信息，如 feat: xxx"></textarea>
  <div class="row" style="margin-top:8px">
    <button id="btn-ai" class="ai" title="按勾选文件 AI 生成提交信息">✨ AI 生成</button>
    <span style="flex:1"></span>
    <button id="btn-commit" class="primary">提交并推送</button>
  </div>
  <div id="out" class="mut"></div>
</div>
`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const projectSel = $<HTMLSelectElement>('project');
const branchSel = $<HTMLSelectElement>('branch');
const syncEl = $('sync');
const remoteEl = $('remote');
const localEl = $('local');
const msgEl = $('msg') as unknown as HTMLTextAreaElement;
const outEl = $('out');
const topbarEl = $('topbar');
const btnPullAllEl = $('btn-pull-all') as unknown as HTMLButtonElement;
const projNameEl = $('proj-name');
// 分支前显示项目名
const paintProjName = (): void => {
  const p = (dir ?? '').split('/').filter(Boolean).pop() ?? '';
  projNameEl.textContent = `● ${p}`;
  projNameEl.style.color = C.green;
  projNameEl.style.fontWeight = '700';
  projNameEl.style.maxWidth = '120px';
  projNameEl.style.overflow = 'hidden';
  projNameEl.style.textOverflow = 'ellipsis';
  projNameEl.style.whiteSpace = 'nowrap';
  projNameEl.style.flex = 'none';
};
const hRemoteEl = $('h-remote');
const hLocalEl = $('h-local');
const nongitEl = $('nongit');
const commitBoxEl = $('commitBox');
const doneEl = $('done');
// 远程全名集合：选中远程=本地新建同名跟踪分支
const remoteNames = new Set<string>();
const confirmEl = $('confirm');
const confirmMsgEl = $('confirm-msg');
let confirmResolve: ((v: boolean) => void) | null = null;
// 沙盒 iframe 原生 confirm 会被拦：面板内自绘确认框
const askConfirm = (msg: string): Promise<boolean> => {
  confirmMsgEl.textContent = msg;
  confirmEl.hidden = false;
  return new Promise<boolean>((resolve) => { confirmResolve = resolve; });
};
$('confirm-ok').onclick = () => { confirmEl.hidden = true; confirmResolve?.(true); confirmResolve = null; };
$('confirm-cancel').onclick = () => { confirmEl.hidden = true; confirmResolve?.(false); confirmResolve = null; };
const conflictEl = $('conflict');
const conflictListEl = $('conflict-list');

// 冲突文件：U 或双边 AA/DD
const conflictFiles = (st: StatusAnswer): string[] =>
  (st.files ?? [])
    .filter((f) => f.staged === 'U' || f.unstaged === 'U' || (f.staged === 'A' && f.unstaged === 'A') || (f.staged === 'D' && f.unstaged === 'D'))
    .map((f) => f.path);
let conflictShownKey = '';

// 全屏提示一次：同批冲突只弹一次，点掉后不再打扰
const maybeConflict = (st: StatusAnswer): void => {
  const list = conflictFiles(st);
  if (list.length === 0) { conflictShownKey = ''; return; }
  const key = list.join('\n');
  if (key === conflictShownKey) return;
  conflictShownKey = key;
  conflictListEl.innerHTML = '';
  for (const p of list.slice(0, 20)) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'mono ellipsis';
    td.textContent = p;
    tr.appendChild(td);
    conflictListEl.appendChild(tr);
  }
  conflictEl.hidden = false;
};



// 非git时整页只留一句提示其余全藏
const showNongit = (on: boolean): void => {
  nongitEl.hidden = !on;
  topbarEl.style.display = on ? 'none' : '';
  syncEl.style.display = on ? 'none' : '';
  hRemoteEl.style.display = on ? 'none' : '';
  remoteEl.style.display = on ? 'none' : '';
  hLocalEl.style.display = on ? 'none' : '';
  localEl.style.display = on ? 'none' : '';
  commitBoxEl.style.display = on ? 'none' : '';
};

let dir: string | null = null;
let busy = false;
// 会话项目（左侧聊天所在仓）与面板当前操作仓是两个概念，分开标
let sessionPath: string | null = null;
const projMeta = new Map<string, { name: string; branch?: string; ahead?: number; behind?: number }>();

const call = (method: 'GET' | 'POST', p: string, body?: unknown) =>
  host.serviceRequest({ method, path: p, body: body === undefined ? undefined : JSON.stringify(body) });

// 分支下拉只在进入/切换后重建，避免打断选择
// 英文 git 报错转中文，非仓库一律显示非git项目
const friendlyErr = (e: string): string => {
  if (/not a git repository|not-a-repo|bad-dir/i.test(e)) return '非git项目';
  return e.slice(0, 60);
};

// 项目目录：默认当前项目，可切上层目录下其他 git 项目
// ● = 面板当前操作仓，（会话）= 左侧聊天所在仓
const loadProjects = async (ctxDir: string): Promise<void> => {
  try {
    const r = await call('GET', `/projects?dir=${encodeURIComponent(ctxDir)}`);
    const j = JSON.parse(r.body) as { ok: boolean; projects?: { name: string; path: string; current: boolean; branch?: string; ahead?: number; behind?: number; dirty?: number }[] };
    if (!j.ok || !j.projects) return;
    projMeta.clear();
    projectSel.innerHTML = '';
    for (const pr of j.projects) {
      projMeta.set(pr.path, { name: pr.name, branch: pr.branch, ahead: pr.ahead, behind: pr.behind });
      const o = document.createElement('option');
      o.value = pr.path;
      o.textContent = projectLabel(pr.name, pr.path, pr.branch, pr.ahead, pr.behind);
      if (pr.path === dir) o.selected = true;
      projectSel.appendChild(o);
    }
  } catch { /* 不挡主流程 */ }
};

let lastBranchSig = '';
// 项目选项：● = 面板操作仓，（会话）= 聊天所在仓，↓未拉取 ↑超前
const projectLabel = (name: string, path: string, branch?: string, ahead?: number, behind?: number): string => {
  const b = behind ?? 0;
  const a = ahead ?? 0;
  const operated = dir !== null && path === dir;
  const isSession = sessionPath !== null && path === sessionPath;
  return `${operated ? '\u25cf ' : ''}${name}${branch ? ` ${branch}` : ''}${b > 0 ? ` \u2193${b}` : ''}${a > 0 ? ` \u2191${a}` : ''}${isSession ? '（会话）' : ''}`;
};

const renderBranches = async (d: string, current: string): Promise<void> => {
  try {
    const br = await call('GET', `/branches?dir=${encodeURIComponent(d)}`);
    const bj = JSON.parse(br.body) as { ok: boolean; branches?: BranchEntry[]; remotes?: { name: string }[] };
    if (!bj.ok || !bj.branches) return;
    const sig = JSON.stringify([current, bj.branches, bj.remotes]);
    if (sig === lastBranchSig) return;
    lastBranchSig = sig;
    remoteNames.clear();
    for (const r of bj.remotes ?? []) remoteNames.add(r.name);
    branchSel.innerHTML = '';
    const gLocal = document.createElement('optgroup');
    gLocal.label = '本地分支';
    for (const b of bj.branches) {
      const o = document.createElement('option');
      o.value = b.name;
      // 当前 ● 标记；未拉取 ↓N、超前 ↑N
      o.textContent = `${b.current ? '\u25cf ' : ''}${b.name}${(b.behind ?? 0) > 0 ? ` \u2193${b.behind}` : ''}${!(b.current) && (b.ahead ?? 0) > 0 ? ` \u2191${b.ahead}` : ''}`;
      if (b.current) o.selected = true;
      gLocal.appendChild(o);
    }
    branchSel.appendChild(gLocal);
    if (bj.remotes && bj.remotes.length > 0) {
      const gRemote = document.createElement('optgroup');
      gRemote.label = '远程分支';
      for (const r of bj.remotes) {
        const o = document.createElement('option');
        o.value = r.name;
        o.textContent = r.name;
        gRemote.appendChild(o);
      }
      branchSel.appendChild(gRemote);
    }
  } catch { /* 不挡主流程 */ }
};

// 远程固定展示前 5 条：含时间/作者/内容；未下载 amber，已下载弱化
const renderRemote = (st: StatusAnswer): void => {
  remoteEl.innerHTML = '';
  const list = st.remoteLog ?? [];
  const top = list.slice(0, 5);
  if (top.length === 0) {
    remoteEl.innerHTML = '<div class="mut">无远程分支记录</div>';
    return;
  }
  const t = document.createElement('table');
  t.style.tableLayout = 'fixed';
  for (const c of top) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'mono ellipsis';
    td.style.fontSize = '12px';
    const dl = c.downloaded !== false;
    const dot = document.createElement('span');
    dot.textContent = dl ? '\u25cf ' : '\u25cb ';
    dot.style.color = dl ? C.green : C.amber;
    const meta = document.createElement('span');
    meta.className = 'mut';
    meta.textContent = `${c.date} ${c.author} `;
    const body = document.createElement('span');
    body.textContent = c.subject;
    body.style.color = dl ? C.gray : 'inherit';
    if (!dl) body.style.fontWeight = '700';
    td.title = `${c.subject} · ${c.author} ${c.date}（${dl ? '已下载' : '未下载'}）`;
    td.append(dot, meta, body);
    tr.appendChild(td);
    t.appendChild(tr);
  }
  remoteEl.appendChild(t);
};

// XY 状态码转中文：M修改 A新增 D删除 R重命名 C复制 T类型变更 U冲突 ?未跟踪
// 语义色：深浅主题都可读
const C = {
  green: '#4ade80',
  red: '#f87171',
  amber: '#fbbf24',
  blue: '#60a5fa',
  purple: '#c084fc',
  gray: '#9ca3af',
} as const;
const flagColor = (x: string, y: string): string => {
  const c = `${x}${y}`;
  if (c === '??') return C.purple;
  if (x === 'U' || y === 'U') return C.red;
  if (x === 'D' || y === 'D') return C.red;
  if (x === 'A' || y === 'A') return C.green;
  if (x === 'R' || y === 'R' || x === 'C' || y === 'C') return C.blue;
  if (x === 'M' || y === 'M') return C.amber;
  return C.gray;
};
const flagText = (x: string, y: string): string => {
  const c = `${x}${y}`;
  if (c === '??') return '未跟踪';
  if (x === 'U' || y === 'U') return '冲突';
  let base = '改动';
  if (x === 'A' || y === 'A') base = '新增';
  else if (x === 'D' || y === 'D') base = '删除';
  else if (x === 'R' || y === 'R') base = '重命名';
  else if (x === 'C' || y === 'C') base = '复制';
  else if (x === 'T' || y === 'T') base = '类型变更';
  else if (x === 'M' || y === 'M') base = '修改';
  const staged = x !== ' ' && x !== '?' && x !== '!';
  return staged ? `${base}·已暂存` : base;
};

// 本地表：未提交文件独立表格勾选暂存
const renderLocal = (st: StatusAnswer): void => {
  localEl.innerHTML = '';
  const files = st.files ?? [];
  if (files.length === 0) {
    const w = document.createElement('div');
    w.className = 'empty';
    w.innerHTML = `<div class="ic">—○—</div><div>工作区干净</div>`;
    localEl.appendChild(w);
    return;
  }
  const isStaged = (x: string): boolean => x.trim() !== '' && x !== '?' && x !== ' ';
  const allStaged = files.every((f) => isStaged(f.staged));
  const head = document.createElement('div');
  head.className = 'selbar';
  head.onclick = (e) => { if ((e.target as HTMLElement).tagName !== 'INPUT') allCb.click(); };
  const allCb = document.createElement('input');
  allCb.type = 'checkbox';
  allCb.checked = allStaged;
  allCb.title = allStaged ? '全不选：取消全部暂存' : '全选：暂存全部';
  allCb.onchange = async () => {
    if (!dir) { allCb.checked = !allCb.checked; return; }
    if (allCb.checked) {
      const paths = files.filter((f) => !isStaged(f.staged)).map((f) => f.path);
      if (paths.length > 0) await call('POST', '/stage', { dir, paths });
    } else {
      const paths = files.filter((f) => isStaged(f.staged)).map((f) => f.path);
      if (paths.length > 0) await call('POST', '/unstage', { dir, paths });
    }
    void refreshLocal();
  };
  const allLb = document.createElement('span');
  allLb.className = 'mut';
  const stagedCount = files.filter((f) => isStaged(f.staged)).length;
  allLb.textContent = `全选 ${stagedCount}/${files.length}`;
  head.append(allCb, allLb);
  localEl.appendChild(head);
  const t = document.createElement('table');
  for (const f of files) {
    const tr = document.createElement('tr');
    const tdC = document.createElement('td');
    tdC.style.width = '28px';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = (f.staged.trim() !== '' && f.staged !== '?' && f.staged !== ' ');
    cb.title = cb.checked ? '已暂存点取消' : '未暂存点暂存';
    cb.onchange = async () => {
      if (!dir) return;
      await call('POST', cb.checked ? '/stage' : '/unstage', { dir, paths: [f.path] });
      void refreshLocal();
    };
    tdC.appendChild(cb);
    const tdP = document.createElement('td');
    tdP.className = 'mono ellipsis';
    tdP.textContent = f.path;
    tdP.title = `${f.path}（点切换勾选）`;
    tdP.onclick = () => cb.click();
    const tdS = document.createElement('td');
    tdS.style.width = '92px';
    tdS.style.minWidth = '92px';
    tdS.style.textAlign = 'right';
    tdS.style.whiteSpace = 'nowrap';
    tdS.style.fontSize = '13px';
    tdS.className = 'mut';
    const nums = f.binary
      ? `<span style="color:${C.gray}">二进制</span>`
      : (f.add !== undefined
        ? `<span style="color:${C.green}">+${f.add}</span> <span style="color:${C.red}">-${f.del ?? 0}</span> `
        : '');
    const ft = flagText(f.staged, f.unstaged);
    tdS.innerHTML = `${nums}<span style="color:${flagColor(f.staged, f.unstaged)}">${ft}</span>`;
    tdS.title = tdS.textContent ?? '';
    const tdR = document.createElement('td');
    tdR.style.width = '30px';
    tdR.style.textAlign = 'right';
    // 冲突文件不给还原：需手动处理
    const conflicted = f.staged === 'U' || f.unstaged === 'U';
    if (!conflicted) {
      const rb = document.createElement('button');
      rb.textContent = '↩ 还原';
      rb.title = '还原：丢弃该文件本地改动';
      rb.className = 'icon';
      rb.onclick = async () => {
        if (!dir) return;
        // 新增/未跟踪还原=删除文件：自绘双重确认防手滑
        const destructive = f.staged === '?' || f.staged === 'A';
        if (destructive) {
          if (!(await askConfirm(`确定丢弃 ${f.path} 的本地内容吗？删除后不可恢复`))) return;
          if (!(await askConfirm(`再次确认：真的删除 ${f.path} 吗？`))) return;
        }
        rb.disabled = true;
        const r = await call('POST', '/restore', { dir, paths: [f.path], confirmed: true });
        const j = JSON.parse(r.body) as { ok: boolean; error?: string };
        if (!j.ok && j.error === 'need-confirm') {
          if (await askConfirm(`确定删除未跟踪的 ${f.path} 吗？`)) {
            await call('POST', '/restore', { dir, paths: [f.path], confirmed: true });
          }
        } else if (!j.ok) {
          outEl.textContent = j.error || '还原失败';
        }
        rb.disabled = false;
        void refreshLocal();
      };
      tdR.appendChild(rb);
    }
    tr.append(tdC, tdP, tdS, tdR);
    t.appendChild(tr);
  }
  localEl.appendChild(t);
};

const paintBranches = (st: StatusAnswer, d: string): void => {
  void renderBranches(d, st.branch ?? '');
};

// 当前操作仓用 fetch 后的新鲜数刷新；会话标记保留
const refreshCurrentProjectLabel = (st: StatusAnswer): void => {
  for (const x of [...projectSel.options]) {
    const meta = projMeta.get(x.value);
    if (!meta) continue;
    if (x.value === dir) {
      meta.branch = st.branch ?? meta.branch;
      meta.ahead = st.ahead;
      meta.behind = st.behind;
    }
    x.textContent = projectLabel(meta.name, x.value, meta.branch, meta.ahead, meta.behind);
  }
};

const paintText = (st: StatusAnswer): void => {
  const ahead = st.ahead ?? 0;
  const behind = st.behind ?? 0;
  if (behind > 0 && ahead > 0) { syncEl.textContent = `远程 ${behind} 个新，本地超前 ${ahead}`; syncEl.style.color = C.amber; }
  else if (behind > 0) { syncEl.textContent = `远程有 ${behind} 个新提交，可下载`; syncEl.style.color = C.amber; }
  else if (ahead > 0) { syncEl.textContent = `本地超前 ${ahead}可推送`; syncEl.style.color = C.blue; }
  else { syncEl.textContent = '已是最新'; syncEl.style.color = C.green; }
  void host.setBadge(st.files?.length ? st.files.length : null).catch(() => undefined);
};

// 全量：fetch + status，远程对比用
const syncAll = async (): Promise<void> => {
  if (!dir || busy) return;
  busy = true;
  const d = dir;
  syncEl.textContent = '同步中…';
  try {
    await call('POST', '/fetch', { dir: d }).catch(() => undefined);
    const r = await call('GET', `/status?dir=${encodeURIComponent(d)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok || st.branch === undefined) {
      showNongit(true);
      return;
    }
    showNongit(false);
    paintText(st);
    refreshCurrentProjectLabel(st);
    paintBranches(st, d);
    renderRemote(st);
    renderLocal(st);
    // 冲突只提示不自动合并
    maybeConflict(st);
  } catch (e) {
    syncEl.textContent = e instanceof HostRequestError ? `${e.code}` : '同步失败';
  } finally {
    busy = false;
  }
};

// 轻量：只 status 不 fetch，本地改代码自动刷出来
const refreshLocal = async (): Promise<void> => {
  if (!dir || busy || document.hidden) return;
  busy = true;
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) return;
    renderLocal(st);
    maybeConflict(st);
    void host.setBadge(st.files?.length ? st.files.length : null).catch(() => undefined);
  } catch { /* 静默下次再试 */ } finally {
    busy = false;
  }
};

$('btn-refresh').onclick = () => void syncAll();

// 全部拉取：后台逐个 pull，2 秒轮询进度
$('btn-pull-all').onclick = async () => {
  if (!dir || btnPullAllEl.disabled) return;
  btnPullAllEl.disabled = true;
  try {
    const start = await call('POST', '/pull-all', { dir });
    const sj = JSON.parse(start.body) as { ok: boolean; jobId?: string; total?: number };
    if (!sj.ok || !sj.jobId) { syncEl.textContent = '全部拉取启动失败'; return; }
    for (;;) {
      await new Promise((r) => setTimeout(r, 2000));
      if (!dir) return;
      const pr = await call('GET', `/pull-all-status?jobId=${encodeURIComponent(sj.jobId)}`);
      const pj = JSON.parse(pr.body) as { ok: boolean; total: number; finished: number; done: boolean; results: { name: string; ok: boolean; conflict: boolean }[] };
      if (!pj.ok) { syncEl.textContent = '全部拉取查询失败'; return; }
      syncEl.textContent = `全部拉取 ${pj.finished}/${pj.total}…`;
      syncEl.style.color = C.amber;
      if (!pj.done) continue;
      const okCount = pj.results.filter((x) => x.ok).length;
      const conflicts = pj.results.filter((x) => x.conflict).map((x) => x.name);
      const failed = pj.results.filter((x) => !x.ok && !x.conflict).map((x) => x.name);
      syncEl.textContent = `全部拉取完成：成功 ${okCount}/${pj.total}${conflicts.length > 0 ? `，冲突 ${conflicts.join('、')} 请自行处理` : ''}${failed.length > 0 ? `，失败 ${failed.join('、')}` : ''}`;
      syncEl.style.color = failed.length > 0 || conflicts.length > 0 ? C.amber : C.green;
      break;
    }
  } catch {
    syncEl.textContent = '全部拉取失败';
  } finally {
    btnPullAllEl.disabled = false;
    if (dir) void loadProjects(dir);
    void syncAll();
  }
};

// 下载 = 原生 git pull，完事全量对比
$('btn-pull').onclick = async () => {
  if (!dir) return;
  syncEl.textContent = '下载中…';
  try {
    await call('POST', '/pull', { dir });
  } catch { /* 结果在 syncAll 里体现 */ }
  void syncAll();
};

// 切分支 = 下拉选中直接 checkout
branchSel.onchange = async () => {
  if (!dir || !branchSel.value) return;
  const target = branchSel.value;
  const isRemote = remoteNames.has(target);
  const short = isRemote ? target.slice(target.indexOf('/') + 1) : target;
  syncEl.textContent = isRemote ? `新建跟踪分支 ${short}…` : `切换到 ${target}…`;
  const r = await call('POST', '/checkout', isRemote ? { dir, branch: short, create: true, base: target } : { dir, branch: target });
  const j = JSON.parse(r.body);
  if (!j.ok) syncEl.textContent = j.output || j.error || '切换失败';
  void syncAll();
};

// 提交前先 fetch 查远程：有更新就拦下人工下载后再点；按钮禁用转圈；成功撒花
const btnCommit = $('btn-commit') as unknown as HTMLButtonElement;
btnCommit.onclick = async () => {
  if (!dir || btnCommit.disabled) return;
  const message = msgEl.value.trim();
  if (!message) { outEl.textContent = '先写提交信息'; return; }
  btnCommit.disabled = true;
  const oldLabel = btnCommit.textContent;
  btnCommit.innerHTML = '<span class="spin">↻</span> 提交中…';
  try {
    // 先更新再提交
    await call('POST', '/fetch', { dir }).catch(() => undefined);
    const chk = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const st = JSON.parse(chk.body) as StatusAnswer;
    const behind = st.behind ?? 0;
    if (behind > 0) {
      outEl.textContent = `远程有 ${behind} 个新提交，先点下载合并后再提交`;
      syncEl.textContent = `远程有 ${behind} 个新提交可下载`;
      renderRemote(st);
      return;
    }
    outEl.textContent = '提交…';
    const r = await call('POST', '/commit', { dir, message, push: true });
    const j = JSON.parse(r.body);
    if (!j.ok) { outEl.textContent = j.error || '提交失败'; return; }
    // 提交完跟远程再核一次：fetch 后超前为 0 才算真正上去
    outEl.textContent = '跟远程核验中…';
    await call('POST', '/fetch', { dir }).catch(() => undefined);
    const vr = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const vs = JSON.parse(vr.body) as StatusAnswer;
    const ahead = vs.ahead ?? 0;
    if (ahead > 0) {
      outEl.textContent = `已提交但远程核验本地仍超前 ${ahead}推送可能没完全成功请检查`;
      renderRemote(vs);
      return;
    }
    msgEl.value = '';
    outEl.textContent = '已提交并推送远程核验一致';
    celebrate();
  } catch (e) {
    outEl.textContent = e instanceof HostRequestError ? `${e.code}` : '提交失败';
  } finally {
    btnCommit.disabled = false;
    btnCommit.textContent = oldLabel;
    void syncAll();
  }
};

$('btn-ai').onclick = async () => {
  if (!dir) return;
  outEl.textContent = 'AI 生成中…';
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    // 只看已勾选 = 已暂存；新增未跟踪文件勾选后即暂存，同样在内
    const isStaged = (x: string): boolean => x.trim() !== '' && x !== '?' && x !== ' ';
    const sel = (st.files ?? []).filter((f) => isStaged(f.staged));
    if (sel.length === 0) { outEl.textContent = '先勾选要提交的文件'; return; }
    // 附上已暂存 diff，信息更准；最多 3 个文件，共 6000 字
    let diffs = '';
    for (const f of sel.slice(0, 3)) {
      try {
        const dr = await call('GET', `/diff?dir=${encodeURIComponent(dir)}&file=${encodeURIComponent(f.path)}&staged=1`);
        const dj = JSON.parse(dr.body) as { ok: boolean; diff?: string };
        if (dj.ok && dj.diff) diffs += `\n--- ${f.path} ---\n${dj.diff.slice(0, 2000)}`;
      } catch { /* 单个失败跳过 */ }
      if (diffs.length > 6000) break;
    }
    const files = sel.map((f) => `${f.staged}${f.unstaged} ${f.path}`).join('\n').slice(0, 1000);
    const { text } = await host.generate({
      system: '只输出一行 Conventional Commits 短句，无解释。',
      prompt: `分支 ${st.branch}\n已选文件：\n${files}${diffs.slice(0, 6000)}`,
      maxOutputTokens: 100,
    });
    msgEl.value = text.trim();
    outEl.textContent = `已按 ${sel.length} 个勾选文件生成`;
  } catch {
    outEl.textContent = '无小模型或未授权 model';
  }
};

let doneTimer: ReturnType<typeof setTimeout> | null = null;
$('btn-again').onclick = () => {
  if (doneTimer) { clearTimeout(doneTimer); doneTimer = null; }
  doneEl.hidden = true;
};

const celebrate = (): void => {
  if (doneTimer) clearTimeout(doneTimer);
  doneEl.hidden = false;
  doneTimer = setTimeout(() => { doneEl.hidden = true; doneTimer = null; }, 2200);
  // 撒花：随机色纸片
  doneEl.querySelectorAll('.confetti').forEach((e) => e.remove());
  const colors = ['#f43f5e', '#f59e0b', '#10b981', '#3b82f6', '#a855f7'];
  for (let i = 0; i < 24; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = `${4 + Math.random() * 92}%`;
    c.style.background = colors[i % colors.length] as string;
    c.style.animationDelay = `${Math.random() * 0.5}s`;
    doneEl.appendChild(c);
  }
};

$('btn-conflict-ok').onclick = () => { conflictEl.hidden = true; };

host.onResolve(async ({ args }) => {
  if (args.trim()) msgEl.value = args.trim();
  return null;
});

// 本地 5 秒一刷：改代码自动出来；切回可见立刻刷
setInterval(() => void refreshLocal(), 5000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) void refreshLocal();
});

// 项目切换：直接换目标仓库操作
projectSel.onchange = () => {
  if (!projectSel.value) return;
  dir = projectSel.value;
  paintProjName();
  void syncAll();
};

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  const next = ctx.directory ?? null;
  if (next !== dir) {
    sessionPath = next;
    dir = next;
    if (!dir) {
      showNongit(true);
      return;
    }
    void loadProjects(dir);
    paintProjName();
    void syncAll();
  }
});
