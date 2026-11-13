// Work Status 区：分支 + 脏数 + 上下游；非 git 项目显示中文；点击打开本扩展面板。
// 右侧一个「刷新同步」按钮：先拉取远程，再推送本地未推送，按钮后方显示未推送条数。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { StatusAnswer } from '../shared/types.ts';

type SyncAnswer = { ok: boolean; pulled?: number; pushed?: number; ahead?: number; behind?: number; branch?: string; error?: string; conflict?: boolean };

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

// 两行：第一行仓库/分支/改动数，第二行上下游数字 + 同步按钮 + 未推送条数
root.innerHTML = `<style>
body{margin:0;font:12px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:1px}
.row{display:flex;gap:4px;align-items:center}
.m{opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;cursor:pointer}
.d{font-size:11.5px;opacity:.8;white-space:nowrap;flex:1;overflow:hidden;text-overflow:ellipsis;cursor:pointer}
button{font-size:12px;padding:1px 8px;border:1px solid var(--oc-border,#8888);border-radius:6px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap;flex:none}
button:disabled{opacity:.5}
.badge{font-size:11px;font-weight:700;line-height:16px;padding:0 5px;border-radius:999px;background:#f59e0b;color:#1c1c1e;flex:none}
.badge[hidden]{display:none}
.res{font-size:11px;opacity:.75;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.res.bad{color:#ef4444;opacity:1}
.res[hidden]{display:none}
</style>
<div class="row"><div class="m" id="m">Git: …</div></div>
<div class="row"><span class="d" id="d"></span><button id="b-sync" title="先拉取远程，再推送本地未推送">刷新同步</button><span class="badge" id="badge" hidden>0</span></div>
<div class="res" id="res" hidden></div>`;

const m = document.querySelector('#m') as HTMLElement;
const dEl = document.querySelector('#d') as HTMLElement;
const bSync = document.querySelector('#b-sync') as HTMLButtonElement;
const badge = document.querySelector('#badge') as HTMLElement;
const resEl = document.querySelector('#res') as HTMLElement;

// 点文字打开 OpenChamber 自带的 git 面板；点按钮只执行不跳转
m.onclick = () => {
  void host.openSurface('git').catch(() => undefined);
};

// 第二行信息点一下只重查状态，不做拉取推送
dEl.title = '点一下立即刷新';
dEl.onclick = () => void poll();

// 英文 git 报错转中文，非仓库一律显示非 git 项目
const errText = (e: string): string => {
  if (/not a git repository|not-a-repo|bad-dir/i.test(e)) return 'Git: 非git项目';
  if (/no-upstream/i.test(e)) return 'Git: 当前分支没有上游，无法同步';
  return `Git: ${e.slice(0, 40)}`;
};

const say = (text: string, bad = false): void => {
  resEl.textContent = text;
  resEl.classList.toggle('bad', bad);
  resEl.hidden = !text;
  void fitHeight();
};

const fitHeight = async (): Promise<void> => {
  const h = Math.ceil(root.getBoundingClientRect().height);
  void host.setHeight(h).catch(() => undefined);
};

let dir: string | null = null;

const call = (method: 'GET' | 'POST', p: string, body?: unknown) =>
  host.serviceRequest({ method, path: p, body: body === undefined ? undefined : JSON.stringify(body) });

// 未推送条数常驻按钮后方；0 时隐藏
const setAhead = (n: number): void => {
  badge.hidden = n <= 0;
  badge.textContent = String(n);
  badge.title = n > 0 ? `本地有 ${n} 条未推送` : '';
};

bSync.onclick = async (): Promise<void> => {
  if (!dir || bSync.disabled) return;
  const old = bSync.textContent ?? '刷新同步';
  bSync.disabled = true;
  bSync.textContent = '同步中';
  say('');
  try {
    const r = await call('POST', '/sync', { dir });
    const j = JSON.parse(r.body) as SyncAnswer;
    if (!j.ok) {
      if (j.error === 'diverged') {
        say(`本地 ${j.ahead ?? 0} 条未推送、远程 ${j.behind ?? 0} 条新提交，先手动合并`, true);
      } else if (j.conflict) {
        say(`冲突未解决：${(j.error ?? '').slice(0, 60)}`, true);
      } else {
        say(errText(j.error ?? '同步失败').replace(/^Git: /, ''), true);
      }
    } else {
      const pulled = j.pulled ?? 0;
      const pushed = j.pushed ?? 0;
      say(pulled === 0 && pushed === 0
        ? '已是最新：拉取 0 条，推送 0 条'
        : `已同步：拉取 ${pulled} 条，推送 ${pushed} 条`);
    }
  } catch (e) {
    say(`同步失败：${(e as Error).message?.slice(0, 40) ?? '未知错误'}`, true);
  } finally {
    bSync.disabled = false;
    bSync.textContent = old;
    await poll();
  }
};

const poll = async (): Promise<void> => {
  if (!dir || document.hidden) return;
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) { m.textContent = errText(st.error ?? '不可用'); setAhead(0); return; }
    const proj = (dir?.split('/').pop() ?? '').trim();
    m.textContent = `Git: ${proj ? `${proj} ` : ''}${st.branch ?? '?'}`;
    dEl.textContent = `+${st.files?.length ?? 0}  ↑${st.ahead ?? 0} ↓${st.behind ?? 0}`;
    setAhead(st.ahead ?? 0);
    await fitHeight();
  } catch {
    m.textContent = 'Git: 未启用本地服务';
    setAhead(0);
  }
};

// 自动刷新：未推送数量随本地提交随时变化，8 秒一轮
setInterval(() => void poll(), 8000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) void poll();
});

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  dir = ctx.directory ?? null;
  if (!dir) { m.textContent = 'Git: 无项目'; return; }
  void poll();
});
