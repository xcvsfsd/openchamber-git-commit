// Panel v2：对齐 OpenChamber 自带 Git 页极简布局。
// 头部：分支下拉 + 同步按钮；进入自动 fetch 对远程，无需手动刷新。
// 干净显示大空态，脏时只列文件 + 底部提交框。
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
.empty{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:40px 0;opacity:.8}
.empty .ic{font-size:28px;opacity:.4}
.file{display:flex;gap:8px;align-items:center;padding:6px 4px;border-bottom:1px solid #8882;font-family:monospace;font-size:12px}
.file .p{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
textarea{width:100%;min-height:64px;padding:8px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:8px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);resize:vertical}
.row{display:flex;gap:8px;align-items:center}
.mut{font-size:12px;opacity:.65}
.err{font-size:12px;color:var(--error,#d33);white-space:pre-wrap}
</style>
<div class="top">
  <select id="branch" title="分支，选中直接切换"></select>
  <button id="btn-sync" title="拉取远程代码">下载</button>
</div>
<div id="sync" class="sync">等待项目…</div>
<div id="body" style="flex:1;display:flex;flex-direction:column;gap:8px"></div>
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
const bodyEl = $('body');
const msgEl = $('msg') as unknown as HTMLTextAreaElement;
const outEl = $('out');

let dir: string | null = null;
let syncing = false;

const call = (method: 'GET' | 'POST', p: string, body?: unknown) =>
  host.serviceRequest({ method, path: p, body: body === undefined ? undefined : JSON.stringify(body) });

// 进入自动：fetch + status，一次看完本地与远程
const sync = async (): Promise<void> => {
  if (!dir || syncing) return;
  syncing = true;
  const d = dir;
  syncEl.textContent = '同步中…';
  try {
    await call('POST', '/fetch', { dir: d }).catch(() => undefined);
    const r = await call('GET', `/status?dir=${encodeURIComponent(d)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) { syncEl.textContent = st.error ?? '不是 git 仓库'; renderEmpty('不是 git 仓库'); return; }
    // 分支下拉
    try {
      const br = await call('GET', `/branches?dir=${encodeURIComponent(d)}`);
      const bj = JSON.parse(br.body) as { ok: boolean; branches?: BranchEntry[] };
      if (bj.ok && bj.branches) {
        branchSel.innerHTML = '';
        for (const b of bj.branches) {
          const o = document.createElement('option');
          o.value = b.name;
          o.textContent = b.name;
          if (b.current) o.selected = true;
          branchSel.appendChild(o);
        }
      }
    } catch { /* 不挡主流程 */ }
    // 远程对比文案
    const ahead = st.ahead ?? 0;
    const behind = st.behind ?? 0;
    if (behind > 0 && ahead > 0) syncEl.textContent = `远程有 ${behind} 个新提交，本地超前 ${ahead}`;
    else if (behind > 0) syncEl.textContent = `远程有 ${behind} 个新提交，可 Pull`;
    else if (ahead > 0) syncEl.textContent = `本地超前 ${ahead}，可 Push`;
    else syncEl.textContent = '已是最新';
    renderFiles(st);
    void host.setBadge(st.files?.length ? st.files.length : null).catch(() => undefined);
  } catch (e) {
    syncEl.textContent = e instanceof HostRequestError ? `${e.code}` : '同步失败';
  } finally {
    syncing = false;
  }
};

// 干净大空态，对齐自带页
const renderEmpty = (tip: string): void => {
  bodyEl.innerHTML = '';
  const w = document.createElement('div');
  w.className = 'empty';
  w.innerHTML = `<div class="ic">—○—</div><div>工作区干净</div><div class="mut">${tip}</div>`;
  bodyEl.appendChild(w);
};

const renderFiles = (st: StatusAnswer): void => {
  bodyEl.innerHTML = '';
  // 远程新提交：一行一个，先展示
  const incoming = st.incoming ?? [];
  if (incoming.length > 0) {
    const h = document.createElement('div');
    h.className = 'mut';
    h.textContent = `远程 ${incoming.length} 个新提交：`;
    bodyEl.appendChild(h);
    for (const c of incoming) {
      const row = document.createElement('div');
      row.className = 'file';
      const sp = document.createElement('span');
      sp.className = 'p';
      sp.textContent = `${c.sha} ${c.subject}`;
      sp.title = `${c.sha} ${c.subject} · ${c.author} ${c.date}`;
      bodyEl.appendChild(row);
      row.appendChild(sp);
    }
  }
  const files = st.files ?? [];
  if (files.length === 0 && incoming.length === 0) {
    renderEmpty('来吧，写点代码，改动自然就来了。');
    return;
  }
  if (files.length === 0) {
    const w = document.createElement('div');
    w.className = 'empty';
    w.innerHTML = `<div class="ic">—○—</div><div>工作区干净</div>`;
    bodyEl.appendChild(w);
    return;
  }
  for (const f of files) {
    const row = document.createElement('div');
    row.className = 'file';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = (f.staged.trim() !== '' && f.staged !== '?' && f.staged !== ' ');
    cb.title = cb.checked ? '已暂存，点取消' : '未暂存，点暂存';
    cb.onchange = async () => {
      if (!dir) return;
      await call('POST', cb.checked ? '/stage' : '/unstage', { dir, paths: [f.path] });
      void sync();
    };
    const sp = document.createElement('span');
    sp.className = 'p';
    sp.textContent = f.path;
    sp.title = f.path;
    const tag = document.createElement('span');
    tag.className = 'mut';
    tag.textContent = `${f.staged.trim() || '·'}${f.unstaged.trim() || '·'}`;
    row.append(cb, sp, tag);
    bodyEl.appendChild(row);
  }
};

// 下载 = 拉取远程代码，原生 git pull，完事自动对比
$('btn-sync').onclick = async () => {
  if (!dir) return;
  syncEl.textContent = '下载中…';
  try {
    await call('POST', '/pull', { dir });
  } catch { /* pull 结果在 sync 里体现 */ }
  void sync();
};

// 切分支 = 下拉切换，直接 checkout
branchSel.onchange = async () => {
  if (!dir || !branchSel.value) return;
  syncEl.textContent = `切换到 ${branchSel.value}…`;
  const r = await call('POST', '/checkout', { dir, branch: branchSel.value });
  const j = JSON.parse(r.body);
  if (!j.ok) syncEl.textContent = j.output || j.error || '切换失败';
  void sync();
};

$('btn-commit').onclick = async () => {
  if (!dir) return;
  const message = msgEl.value.trim();
  if (!message) { outEl.textContent = '先写提交信息'; return; }
  outEl.textContent = '提交…';
  const r = await call('POST', '/commit', { dir, message, push: true });
  const j = JSON.parse(r.body);
  outEl.textContent = j.ok ? '已提交并推送' : (j.error || '提交失败');
  if (j.ok) msgEl.value = '';
  void sync();
};

$('btn-ai').onclick = async () => {
  if (!dir) return;
  outEl.textContent = 'AI 生成中…';
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    const files = (st.files ?? []).map((f) => `${f.staged}${f.unstaged} ${f.path}`).join('\n').slice(0, 3000);
    const { text } = await host.generate({
      system: '只输出一行 Conventional Commits 短句，无解释。',
      prompt: `分支 ${st.branch}\n${files}`,
      maxOutputTokens: 100,
    });
    msgEl.value = text.trim();
    outEl.textContent = '';
  } catch {
    outEl.textContent = '无小模型或未授权 model';
  }
};

host.onResolve(async ({ args }) => {
  if (args.trim()) msgEl.value = args.trim();
  return null;
});

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  const next = ctx.directory ?? null;
  if (next !== dir) {
    dir = next;
    if (!dir) { syncEl.textContent = '无项目'; renderEmpty('先打开一个项目'); return; }
    void sync();
  }
});
