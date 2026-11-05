// Panel：JetBrains 式提交区。目录来自 ctx.directory，git 操作经 serviceRequest 走原生 git。
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
#root{padding:10px;display:flex;flex-direction:column;gap:10px}
.row{display:flex;gap:6px;align-items:center;flex-wrap:wrap}
select,input[type=text],textarea{width:100%;padding:6px 8px;border:1px solid var(--border,#3333);border-radius:8px;background:var(--card,#0000);color:inherit}
textarea{min-height:76px;resize:vertical}
button{padding:6px 10px;border:1px solid var(--border,#3333);border-radius:8px;background:var(--card,#0001);color:inherit;cursor:pointer}
button.primary{background:var(--primary,#3574f0);border-color:transparent;color:#fff}
button:disabled{opacity:.5;cursor:default}
.file{display:flex;gap:6px;align-items:center;padding:4px 6px;border-radius:6px}
.file:hover{background:#8881}
.file .p{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:monospace;font-size:12px}
.badge{font-size:11px;opacity:.75}
pre.diff{max-height:220px;overflow:auto;font-size:11px;background:#8881;padding:8px;border-radius:8px;white-space:pre-wrap}
.err{color:var(--error,#d33);font-size:12px;white-space:pre-wrap}
.muted{opacity:.65;font-size:12px}
h3{margin:4px 0;font-size:12px;opacity:.7}
</style>
<div class="row">
  <select id="branch" title="当前分支"></select>
  <button id="btn-refresh" title="刷新">↻</button>
</div>
<div class="row">
  <button id="btn-pull">⬇ Pull</button>
  <button id="btn-push">⬆ Push</button>
  <button id="btn-sw">⇄ 切分支</button>
  <button id="btn-diff">Diff</button>
</div>
<div id="meta" class="muted">等待项目…</div>
<h3>变更</h3>
<div id="files"><span class="muted">加载中…</span></div>
<pre id="diff" class="diff" hidden></pre>
<h3>提交信息</h3>
<textarea id="msg" placeholder="feat: 一句话说清变更"></textarea>
<div class="row">
  <label><input type="checkbox" id="amend" /> amend</label>
  <label><input type="checkbox" id="pushAfter" checked /> 提交后 push</label>
</div>
<div class="row">
  <button id="btn-ai">✨ AI 信息</button>
  <button id="btn-stage-all">全暂存</button>
  <button id="btn-commit" class="primary">✓ 提交</button>
</div>
<div id="out" class="muted"></div>
<div class="row">
  <button id="btn-new-branch">＋ 新分支</button>
  <button id="btn-open-git">内置 Git 面板</button>
</div>
`;

const $ = <T extends HTMLElement>(id: string): T => document.querySelector(`#${id}`) as T;
const branchSel = $<HTMLSelectElement>('branch');
const meta = $('meta');
const filesEl = $('files');
const diffEl = $('diff') as unknown as HTMLPreElement;
const msgEl = $('msg') as unknown as HTMLTextAreaElement;
const outEl = $('out');
const amendEl = $('amend') as unknown as HTMLInputElement;
const pushAfterEl = $('pushAfter') as unknown as HTMLInputElement;

let dir: string | null = null;
let selected = new Set<string>();

const say = (t: string) => { outEl.textContent = t; };

// 面板经 host 代理调本地 service。
const call = async (method: 'GET' | 'POST', p: string, body?: unknown): Promise<{ status: number; body: string }> => {
  return host.serviceRequest({ method, path: p, body: body === undefined ? undefined : JSON.stringify(body) });
};

const needDir = (): string | null => {
  if (!dir) say('先在 OpenChamber 打开一个项目（git 仓库）。');
  return dir;
};

const refresh = async (): Promise<void> => {
  const d = needDir();
  if (!d) return;
  say('刷新…');
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(d)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) { say(st.error ?? '不是 git 仓库'); return; }
    meta.textContent = `${st.branch ?? '?'}${st.upstream ? ` → ${st.upstream}` : ''} · ↑${st.ahead ?? 0} ↓${st.behind ?? 0} · ${st.files?.length ?? 0} 个变更`;
    // 分支下拉
    try {
      const br = await call('GET', `/branches?dir=${encodeURIComponent(d)}`);
      const bj = JSON.parse(br.body) as { ok: boolean; branches?: BranchEntry[] };
      if (bj.ok && bj.branches) {
        branchSel.innerHTML = '';
        for (const b of bj.branches) {
          const o = document.createElement('option');
          o.value = b.name;
          o.textContent = `${b.current ? '● ' : ''}${b.name}`;
          if (b.current) o.selected = true;
          branchSel.appendChild(o);
        }
      }
    } catch { /* 分支列表失败不挡主流程 */ }
    // 文件列表
    filesEl.innerHTML = '';
    selected = new Set((st.files ?? []).filter((f) => f.staged.trim() !== '' && f.staged !== '?' && f.staged !== ' ').map((f) => f.path));
    if (!st.files || st.files.length === 0) {
      filesEl.innerHTML = '<span class="muted">干净，无变更</span>';
    }
    for (const f of st.files ?? []) {
      const row = document.createElement('div');
      row.className = 'file';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = selected.has(f.path);
      cb.onchange = async () => {
        const dd = needDir();
        if (!dd) { cb.checked = !cb.checked; return; }
        const p = cb.checked ? '/stage' : '/unstage';
        await call('POST', p, { dir: dd, paths: [f.path] });
        void refresh();
      };
      const sp = document.createElement('span');
      sp.className = 'p';
      sp.textContent = f.path;
      sp.title = f.path;
      const bd = document.createElement('span');
      bd.className = 'badge';
      bd.textContent = `${f.staged.trim() || '·'}${f.unstaged.trim() || '·'}`;
      row.append(cb, sp, bd);
      filesEl.appendChild(row);
    }
    // 待办徽标：脏文件数
    void host.setBadge(st.files && st.files.length > 0 ? st.files.length : null).catch(() => undefined);
    // 最近提交提示
    const rec = (st.recent ?? []).map((c) => `${c.sha} ${c.subject}`).join('\n');
    say(rec ? `最近：\n${rec}` : '就绪');
  } catch (e) {
    say(e instanceof HostRequestError ? `${e.code}: ${e.message}` : String(e));
  }
};

$('btn-refresh').onclick = () => void refresh();
$('btn-pull').onclick = async () => {
  const d = needDir(); if (!d) return;
  say('pull…');
  try {
    const r = await call('POST', '/pull', { dir: d });
    say(JSON.parse(r.body).output ?? JSON.parse(r.body).error ?? '完成');
    void refresh();
  } catch (e) { say(String(e)); }
};
$('btn-push').onclick = async () => {
  const d = needDir(); if (!d) return;
  say('push…');
  try {
    const r = await call('POST', '/push', { dir: d });
    const j = JSON.parse(r.body);
    say(j.ok ? (j.output || '已推送') : (j.output || j.error || '推送失败'));
    void refresh();
  } catch (e) { say(String(e)); }
};
$('btn-sw').onclick = async () => {
  const d = needDir(); if (!d) return;
  const target = branchSel.value || prompt('切换到分支：') || '';
  if (!target) return;
  say(`切换到 ${target}…`);
  const r = await call('POST', '/checkout', { dir: d, branch: target });
  const j = JSON.parse(r.body);
  say(j.ok ? `已切换到 ${target}` : (j.output || j.error || '切换失败'));
  void refresh();
};
$('btn-new-branch').onclick = async () => {
  const d = needDir(); if (!d) return;
  const nb = prompt('新分支名：') || '';
  if (!nb) return;
  const r = await call('POST', '/checkout', { dir: d, branch: nb, create: true });
  const j = JSON.parse(r.body);
  say(j.ok ? `已创建并切换到 ${nb}` : (j.output || j.error || '创建失败'));
  void refresh();
};
$('btn-diff').onclick = async () => {
  const d = needDir(); if (!d) return;
  const first = filesEl.querySelector('.file .p')?.textContent;
  if (!first) { say('无可 diff 文件'); return; }
  const r = await call('GET', `/diff?dir=${encodeURIComponent(d)}&file=${encodeURIComponent(first)}`);
  const j = JSON.parse(r.body) as { ok: boolean; diff?: string };
  diffEl.hidden = false;
  diffEl.textContent = (j.diff || '').slice(0, 8000) || '(空)';
};
$('btn-stage-all').onclick = async () => {
  const d = needDir(); if (!d) return;
  const paths = [...filesEl.querySelectorAll('.file .p')].map((e) => e.textContent ?? '').filter(Boolean);
  if (paths.length === 0) return;
  await call('POST', '/stage', { dir: d, paths });
  void refresh();
};
$('btn-commit').onclick = async () => {
  const d = needDir(); if (!d) return;
  const message = msgEl.value.trim();
  if (!message) { say('先写提交信息'); return; }
  say('提交…');
  const r = await call('POST', '/commit', { dir: d, message, amend: amendEl.checked, push: pushAfterEl.checked });
  const j = JSON.parse(r.body);
  say(j.ok ? '已提交' + (pushAfterEl.checked ? '并推送' : '') : (j.error || '提交失败'));
  if (j.ok) msgEl.value = '';
  void refresh();
};
$('btn-ai').onclick = async () => {
  const d = needDir(); if (!d) return;
  say('AI 生成中…');
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(d)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    const files = (st.files ?? []).map((f) => `${f.staged}${f.unstaged} ${f.path}`).join('\n').slice(0, 4000);
    const { text } = await host.generate({
      system: '你是提交信息助手。只输出一行 Conventional Commits 中文/英文短句，如 feat: xxx。无多余解释。',
      prompt: `分支 ${st.branch}\n变更：\n${files}`,
      maxOutputTokens: 200,
    });
    msgEl.value = text.trim();
    say('已填入，可改后提交');
  } catch (e) {
    say(e instanceof HostRequestError ? `${e.code}: 无小模型或未授权 model 能力` : String(e));
  }
};
$('btn-open-git').onclick = () => {
  void host.openSurface('git').catch(() => say('内置 Git 面板打不开'));
};

// slash 命令 /commit：把参数直接填入提交框。
host.onResolve(async ({ args }) => {
  if (args.trim()) msgEl.value = args.trim();
  say('已从 /commit 填入信息');
  return null;
});

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  const next = ctx.directory ?? null;
  if (next !== dir) {
    dir = next;
    diffEl.hidden = true;
    void refresh();
  }
});
