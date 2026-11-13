# openchamber-git-commit

JetBrains 式 Git 状态条，给 OpenChamber 用的扩展。全走 git 原生命令，中文界面。

Git status strip for OpenChamber: one-tap sync, pull-all across sibling repos, branch/ahead/behind at a glance. Chinese interface, all operations run native `git` commands.

<img width="951" height="756" alt="image" src="https://github.com/user-attachments/assets/d5431cc3-6d62-421e-82ee-7d89f59d2639" />

## 功能

状态分区：标题栏放数字与刷新，内容区放项目信息与全部拉取。

- 标题栏 `+改动数 ↑超前 ↓落后`（只读）与 `↻`（刷新同步）；老宿主不支持标题栏控件时退回区内「刷新同步」按钮
- 内容区第一行 `项目：brain-ops，分支：develop`，点击打开 OpenChamber 自带的 git 面板
- 内容区第二行「全部本地项目拉取」按钮 + 未推送条数角标；下一行 `上次刷新 HH:MM:SS`（与禅道分区同样式）
- 「全部本地项目拉取」：后台逐个 `git pull` 上层目录下的 git 项目，**远端指向 github.com（含 SSH 地址）的仓自动跳过**，2 秒轮询进度，结果行汇总成功 / 跳过 GitHub / 冲突 / 失败
- `↻` 刷新同步：一键 `fetch → 拉取 → 推送`，结果行提示拉取/推送条数；落后或分叉时拦下并给中文提示
- 1 分钟自动刷新，切回页面时立即刷新

`↑N` = 本地领先远程 N 个提交（待推），`↓N` = 远程比本地多 N 个提交（待拉）。

## 安装

OpenChamber → 设置 → 扩展 → 粘贴 Git 地址添加：

```text
https://github.com/xcvsfsd/openchamber-git-commit
```

批准 `service(git)` + `model` 能力，状态区即出现 Git 行。

本地开发可用文件夹路径安装（改完 `bun run build` 即生效）。

## 说明

- `openchamber.contributes.panel` 必须保留 `id`/`name`/`icon`，即使扩展只有状态区、没有面板页（`panel.entry` 可省略）。整块删掉会让宿主解析 manifest 失败（`missing-panel`），重启后扩展直接从列表消失——而内存里旧版本还活着，所以改完不重启看不出来。
- 只在打开项目（git 仓库）时工作，非 git 项目显示一句提示。
- service 跑用户全权限，只执行 `git`，参数全校验（dir/branch/path/remote），不用 shell。
- 手机 App / VS Code 不加载扩展（Web 和桌面版可用）。
- 发版：改完 `bun run build`，升 `package.json` version，提交 built 文件（`status/main.js`、`service/main.js` 必须提交）。

## License

MIT
