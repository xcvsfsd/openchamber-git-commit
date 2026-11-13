// Work Status 区：一行显示仓库/分支，一行显示改动数与上下游；点第一行打开 OpenChamber 自带 git 面板。
// 「全部本地项目拉取」做成宿主渲染的标题栏控件（与自带的用量等分区一致），不支持时退回区内按钮。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { StatusAnswer } from '../shared/types.ts';

type SyncAnswer = { ok: boolean; pulled?: number; pushed?: number; ahead?: number; behind?: number; branch?: string; error?: string; conflict?: boolean };

const host = connectHost();

// 标题栏控件回调必须同步注册（宿主要求），处理函数用声明式定义在后面
// 数字点开 OpenChamber 自带的 git 面板，↻ 走刷新同步
host.onStatusControl((e) => {
  if (e.id === 'refresh') void runSync();
  else if (e.id === 'stat') void host.openSurface('git').catch(() => undefined);
});
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');

// 标题栏放数字摘要与 ↻，内容区放项目/分支与「全部本地项目拉取」
root.innerHTML = `<style>
body{margin:0;font:12px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;display:flex;flex-direction:column;gap:2px}
.row{display:flex;gap:4px;align-items:center}
.m{opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;cursor:pointer}
.t{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;opacity:.75;font-variant-numeric:tabular-nums}
button{flex:1;padding:1px 4px;font-size:11.5px;border:1px solid var(--oc-border,var(--border,#8888));border-radius:6px;background:var(--oc-elevated,inherit);color:var(--oc-fg,inherit);cursor:pointer;white-space:nowrap}
button:disabled{opacity:.5}
button[hidden]{display:none}
.badge{font-size:11px;font-weight:700;line-height:16px;padding:0 5px;border-radius:999px;background:#f59e0b;color:#1c1c1e;flex:none}
.badge[hidden]{display:none}
.res{white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:11px;opacity:.75}
.res.bad{color:#f87171;opacity:1}
.res[hidden]{display:none}
</style>
<div class="row"><div class="m" id="m">项目：…</div></div>
<div class="row"><button id="b-all" title="逐个拉取上层目录下全部本地 git 项目（跳过 GitHub）">全部本地项目拉取</button><button id="b-sync" title="先拉取远程，再推送本地未推送" hidden>刷新同步</button><span class="badge" id="badge" hidden>0</span></div>
<div class="t" id="t"></div>
<div class="res" id="res" hidden></div>`;

const m = document.querySelector('#m') as HTMLElement;
const bSync = document.querySelector('#b-sync') as HTMLButtonElement;
const bAll = document.querySelector('#b-all') as HTMLButtonElement;
const badge = document.querySelector('#badge') as HTMLElement;
const resEl = document.querySelector('#res') as HTMLElement;
const tEl = document.querySelector('#t') as HTMLElement;

// 点文字打开 OpenChamber 自带的 git 面板；点按钮只执行不跳转
m.onclick = () => {
  void host.openSurface('git').catch(() => undefined);
};

// 英文 git 报错转中文，非仓库一律显示非 git 项目
const errText = (e: string): string => {
  if (/not a git repository|not-a-repo|bad-dir/i.test(e)) return '非git项目';
  if (/no-upstream/i.test(e)) return '当前分支没有上游，无法同步';
  return e.slice(0, 40);
};

const say = (text: string, bad = false): void => {
  resEl.textContent = text;
  resEl.classList.toggle('bad', bad);
  resEl.hidden = !text;
  void fitHeight();
};

// HH:MM 时间戳
const now = (): string => new Date().toTimeString().slice(0, 8);


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

// 上一次查到的状态，给状态行和回执共用（用对象原地改，避免类型窄化）
const last = { files: 0, ahead: 0, behind: 0, valid: false };

// 把一次 /status 结果刷到状态行上；数字走标题栏控件
const applyStatus = async (st: StatusAnswer): Promise<void> => {
  const proj = (dir?.split('/').pop() ?? '').trim();
  m.textContent = `项目：${proj || '?'}，分支：${st.branch || '?'}`;
  last.files = st.files?.length ?? 0;
  last.ahead = st.ahead ?? 0;
  last.behind = st.behind ?? 0;
  last.valid = true;
  setAhead(last.ahead);
  tEl.textContent = `上次刷新 ${now()}`;
  await publishControls();
  await fitHeight();
};

// 标题栏：数字摘要（只读）+ 刷新图标；老宿主不支持时退回区内「刷新同步」按钮
let headerControls = false;
let pulling = false;
let syncing = false;

const publishControls = async (): Promise<void> => {
  const controls: { kind: 'button'; id: string; label: string; disabled?: boolean }[] = [];
  if (last.valid) {
    controls.push({ kind: 'button', id: 'stat', label: `+${last.files} ↑${last.ahead} ↓${last.behind}` });
  }
  controls.push({ kind: 'button', id: 'refresh', label: syncing ? '↻…' : '↻', disabled: syncing });
  try {
    await host.setStatusControls(controls);
    headerControls = true;
    bSync.hidden = true;
  } catch {
    headerControls = false;
    bSync.hidden = false;
    bSync.disabled = syncing;
    bSync.textContent = syncing ? '同步中' : '刷新同步';
  }
};
// 全部本地项目拉取：后台逐个 pull，2 秒轮询进度，结果写结果行；标题栏控件与退回按钮共用
async function runPullAll(): Promise<void> {
  if (!dir || pulling) return;
  pulling = true;
  say('');
  await publishControls();
  try {
    const start = await call('POST', '/pull-all', { dir });
    const sj = JSON.parse(start.body) as { ok: boolean; jobId?: string; total?: number };
    if (!sj.ok || !sj.jobId) { say('全部本地项目拉取启动失败', true); return; }
    for (;;) {
      await new Promise((r) => setTimeout(r, 2000));
      if (!dir) return;
      const pr = await call('GET', `/pull-all-status?jobId=${encodeURIComponent(sj.jobId)}`);
      const pj = JSON.parse(pr.body) as { ok: boolean; total: number; finished: number; done: boolean; results: { name: string; ok: boolean; conflict: boolean; skipped?: boolean }[] };
      if (!pj.ok) { say('全部本地项目拉取查询失败', true); return; }
      say(`本地项目拉取 ${pj.finished}/${pj.total}…`);
      if (!pj.done) continue;
      const skipped = pj.results.filter((x) => x.skipped).length;
      const conflicts = pj.results.filter((x) => x.conflict).map((x) => x.name);
      const failed = pj.results.filter((x) => !x.ok && !x.conflict).map((x) => x.name);
      const okCount = pj.results.filter((x) => x.ok && !x.skipped).length;
      say(`本地项目拉取完成：成功 ${okCount}/${pj.total - skipped}${skipped > 0 ? `，跳过 GitHub ${skipped}` : ''}${conflicts.length > 0 ? `，冲突 ${conflicts.join('、')}` : ''}${failed.length > 0 ? `，失败 ${failed.join('、')}` : ''}`, failed.length > 0 || conflicts.length > 0);
      break;
    }
  } catch (e) {
    say(`全部本地项目拉取失败：${(e as Error).message?.slice(0, 40) ?? '未知错误'}`, true);
  } finally {
    pulling = false;
    await publishControls();
    await poll();
  }
}

bAll.onclick = () => void runPullAll();

// 刷新同步：标题栏 ↻ 与老宿主退回按钮共用
async function runSync(): Promise<void> {
  if (!dir || syncing) return;
  syncing = true;
  say('');
  await publishControls();
  try {
    const r = await call('POST', '/sync', { dir });
    const j = JSON.parse(r.body) as SyncAnswer;
    if (!j.ok) {
      if (j.error === 'diverged') {
        say(`本地 ${j.ahead ?? 0} 条未推送、远程 ${j.behind ?? 0} 条新提交，先手动合并`, true);
      } else if (j.conflict) {
        say(`冲突未解决：${(j.error ?? '').slice(0, 60)}`, true);
      } else {
        say(errText(j.error ?? '同步失败'), true);
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
    syncing = false;
    await publishControls();
    await poll();
  }
}

bSync.onclick = () => void runSync();

// 自动轮询：只刷状态行与时间，不写结果行，避免刷屏
const poll = async (): Promise<void> => {
  if (!dir || document.hidden) return;
  try {
    const r = await call('GET', `/status?dir=${encodeURIComponent(dir)}`);
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) { m.textContent = errText(st.error ?? '不可用'); setAhead(0); return; }
    await applyStatus(st);
  } catch {
    m.textContent = 'Git 服务未启用';
    last.valid = false;
    setAhead(0);
  }
};

// 自动刷新：1 分钟一轮，第二行右侧只留 HH:MM
setInterval(() => void poll(), 60_000);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) void poll();
});

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  dir = ctx.directory ?? null;
  // 数字与 ↻ 放标题栏；老宿主不支持时退回区内「刷新同步」按钮
  if (ctx.features?.statusControls === true) void publishControls();
  else bSync.hidden = false;
  if (!dir) { m.textContent = '项目：无'; return; }
  void poll();
});

// 切项目后宿主会清空标题栏控件，重新发布一次
host.onDirectory((next) => {
  dir = next;
  if (headerControls) void publishControls();
});
