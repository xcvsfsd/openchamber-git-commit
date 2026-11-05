// Work Status 区：只显示分支 + 脏数 + 上下游超前落后，保持轻量。
import { connectHost } from '@openchamber/sdk';
import { applyHostReady } from '@openchamber/sdk/ui';
import type { StatusAnswer } from '../shared/types.ts';

const host = connectHost();
const root = document.querySelector<HTMLElement>('#root');
if (!root) throw new Error('Missing #root');
root.innerHTML = `<style>
body{margin:0;font:12px/1.5 system-ui,sans-serif}
#root{padding:2px 4px}
.m{opacity:.85;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
</style><div class="m" id="m">Git: …</div>`;
const m = document.querySelector('#m') as HTMLElement;

let dir: string | null = null;

const poll = async (): Promise<void> => {
  if (!dir || document.hidden) return;
  try {
    const r = await host.serviceRequest({ method: 'GET', path: `/status?dir=${encodeURIComponent(dir)}` });
    const st = JSON.parse(r.body) as StatusAnswer;
    if (!st.ok) { m.textContent = `Git: ${st.error ?? '不可用'}`; return; }
    m.textContent = `Git: ${st.branch ?? '?'} · ${st.files?.length ?? 0}改 · ↑${st.ahead ?? 0} ↓${st.behind ?? 0}`;
    const h = Math.ceil(root.getBoundingClientRect().height);
    void host.setHeight(h).catch(() => undefined);
  } catch {
    m.textContent = 'Git: 未授权 service';
  }
};

setInterval(() => void poll(), 8000);

host.onReady((ctx) => {
  applyHostReady(ctx, document.documentElement);
  dir = ctx.directory ?? null;
  if (!dir) m.textContent = 'Git: 无项目';
  else void poll();
});
