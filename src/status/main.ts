// Work Status 区：分支 + 脏数 + 上下游；非 git 项目显示中文；点击打开本扩展面板。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { StatusAnswer } from '../shared/types.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
root.innerHTML = `<style>
body{margin:0;font:12px/1.5 system-ui,sans-serif}
#root{padding:2px 4px;cursor:pointer}
.m{opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
</style><div class="m" id="m">Git: …</div>`;
const m = document.querySelector('#m') as HTMLElement;

// 点击打开本扩展 Git 提交面板
root.onclick = () => {
  void host.openSurface('plugin:git-commit').catch(() => undefined);
};

// 英文 git 报错转中文，非仓库一律显示非 git 项目
const errText = (e: string): string => {
  if (/not a git repository|not-a-repo|bad-dir/i.test(e)) return 'Git: 非git项目';
  return `Git: ${e.slice(0, 40)}`;
};

let dir: string | null = null;

const poll = async (): Promise<void> => {
  if (!dir || document.hidden) return;
  try {
    const r = await host.serviceRequest({ method: 'GET', path: `/status?dir=${encodeURIComponent(dir)}` });
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) { m.textContent = errText(st.error ?? '不可用'); return; }
    const proj = (dir?.split('/').pop() ?? '').trim();
    m.textContent = `Git: ${proj ? `${proj} ` : ''}${st.branch ?? '?'} · ${st.files?.length ?? 0}改 · ↑${st.ahead ?? 0} ↓${st.behind ?? 0}`;
    const h = Math.ceil(root.getBoundingClientRect().height);
    void host.setHeight(h).catch(() => undefined);
  } catch {
    m.textContent = 'Git: 未启用本地服务';
  }
};

setInterval(() => void poll(), 8000);

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  dir = ctx.directory ?? null;
  if (!dir) m.textContent = 'Git: 无项目';
  else void poll();
});
