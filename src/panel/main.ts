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
body{margin:0;font:13px/1.5 system-ui,sans-serif}
#root{padding:12px;display:flex;flex-direction:column;gap:10px;min-height:100%}
.top{display:flex;gap:8px;align-items:center}
select{flex:1;padding:6px 8px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,#fff);color:var(--oc-fg,inherit);color-scheme:light dark}
select option{background:var(--oc-elevated,#fff);color:var(--oc-fg,#111)}
button{padding:6px 12px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5}
.sync{font-size:12px;opacity:.75}
h3{margin:6px 0 0;font-size:12px;opacity:.65;font-weight:600}
table{width:100%;border-collapse:collapse;font-size:12px}
td{padding:5px 4px;border-bottom:1px solid #8882;vertical-align:middle}
.mono{font-family:monospace}
.ellipsis{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:0;width:100%}
.empty{display:flex;flex-direction:column;align-items:center;gap:6px;padding:28px 0;opacity:.75}
.empty .ic{font-size:26px;opacity:.4}
#done[hidden],#nongit[hidden],#conflict[hidden]{display:none!important}
#conflict{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,#7f1d1d 92%,transparent);z-index:20;text-align:center;padding:16px}
#conflict .big{font-size:44px}
#conflict table{max-width:100%}
#conflict td{border-bottom:1px solid #fff3}
textarea{width:100%;min-height:64px;padding:8px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:12px;opacity:.65}
.spin{display:inline-block;animation:rot 1s linear infinite}
@keyframes rot{to{transform:rotate(360deg)}}
#done{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;background:color-mix(in srgb,var(--oc-elevated,#000) 88%,transparent);z-index:10;text-align:center}
#done .big{font-size:52px;animation:pop .45s ease-out}
@keyframes pop{0%{transform:scale(.3);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1)}}
.confetti{position:absolute;top:-8px;width:8px;height:12px;opacity:.9;animation:fall 1.6s ease-in forwards}
@keyframes fall{to{transform:translateY(220px) rotate(540deg);opacity:0}}
</style>
<div class="top" id="topbar">
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
    <button id="btn-ai" title="AI 生成提交信息">✨</button>
    <span style="flex:1"></span>
    <button id="btn-commit" class="primary">提交并推送</button>
  </div>
  <div id="out" class="mut"></div>
</div>
`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const branchSel = $<HTMLSelectElement>('branch');
const syncEl = $('sync');
const remoteEl = $('remote');
const localEl = $('local');
const msgEl = $('msg') as unknown as HTMLTextAreaElement;
const outEl = $('out');
const topbarEl = $('topbar');
const hRemoteEl = $('h-remote');
const hLocalEl = $('h-local');
const nongitEl = $('nongit');
const commitBoxEl = $('commitBox');
const doneEl = $('done');
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

const call = (method: 'GET' | 'POST', p: string, body?: unknown) =>
  host.serviceRequest({ method, path: p, body: body === undefined ? undefined : JSON.stringify(body) });

// 分支下拉只在进入/切换后重建，避免打断选择
// 英文 git 报错转中文，非仓库一律显示非git项目
const friendlyErr = (e: string): string => {
  if (/not a git repository|not-a-repo|bad-dir/i.test(e)) return '非git项目';
  return e.slice(0, 60);
};

const renderBranches = async (d: string, current: string): Promise<void> => {
  try {
    const br = await call('GET', `/branches?dir=${encodeURIComponent(d)}`);
    const bj = JSON.parse(br.body) as { ok: boolean; branches?: BranchEntry[] };
    if (!bj.ok || !bj.branches) return;
    if (branchSel.value && branchSel.value === current && branchSel.options.length > 0) return;
    branchSel.innerHTML = '';
    for (const b of bj.branches) {
      const o = document.createElement('option');
      o.value = b.name;
      o.textContent = b.name;
      if (b.current) o.selected = true;
      branchSel.appendChild(o);
    }
  } catch { /* 不挡主流程 */ }
};

// 远程表：一行一个提交
const renderRemote = (st: StatusAnswer): void => {
  remoteEl.innerHTML = '';
  const incoming = st.incoming ?? [];
  if (incoming.length === 0) {
    remoteEl.innerHTML = '<div class="mut">无，远程与本地一致</div>';
    return;
  }
  const t = document.createElement('table');
  for (const c of incoming) {
    const tr = document.createElement('tr');
    const td = document.createElement('td');
    td.className = 'mono ellipsis';
    td.textContent = `${c.sha} ${c.subject}`;
    td.title = `${c.sha} ${c.subject} · ${c.author} ${c.date}`;
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
  head.className = 'row';
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
    tdP.title = f.path;
    const tdS = document.createElement('td');
    tdS.style.width = '92px';
    tdS.style.minWidth = '92px';
    tdS.style.textAlign = 'right';
    tdS.style.whiteSpace = 'nowrap';
    tdS.style.fontSize = '11px';
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
      rb.textContent = '↩';
      rb.title = '还原：丢弃该文件本地改动';
      rb.style.padding = '2px 7px';
      rb.onclick = async () => {
        if (!dir) return;
        // 新增/未跟踪还原会删文件，先确认
        const destructive = f.staged === '?' || f.staged === 'A';
        if (destructive && !confirm(`确定丢弃 ${f.path} 的本地内容吗？`)) return;
        rb.disabled = true;
        const r = await call('POST', '/restore', { dir, paths: [f.path], confirmed: true });
        const j = JSON.parse(r.body) as { ok: boolean; error?: string };
        if (!j.ok && j.error === 'need-confirm') {
          if (confirm(`确定删除未跟踪的 ${f.path} 吗？`)) {
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
  syncEl.textContent = `切换到 ${branchSel.value}…`;
  const r = await call('POST', '/checkout', { dir, branch: branchSel.value });
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

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  const next = ctx.directory ?? null;
  if (next !== dir) {
    dir = next;
    if (!dir) {
      showNongit(true);
      return;
    }
    void syncAll();
  }
});
