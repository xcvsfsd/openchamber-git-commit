# openchamber-git-commit

JetBrains 式 Git 提交面板，给 OpenChamber 用的扩展。全走 git 原生命令，中文界面。

Git commit panel for OpenChamber in the style of JetBrains: branches, pull/push, staging, AI commit messages via Small Model. Chinese interface, all operations run native `git` commands.

<img width="951" height="756" alt="image" src="https://github.com/user-attachments/assets/d5431cc3-6d62-421e-82ee-7d89f59d2639" />


## 功能

- 项目切换：默认当前项目，可切上层目录下其他 git 仓，`●` = 操作仓，`（会话）` = 聊天所在仓
- 分支下拉本地/远程分组，当前分支标 `●`、未拉取 `↓N`、未提交 `↑N`；选远程自动建跟踪分支
- 下载（`git pull`）、一键拉取全部项目、进入自动 `fetch` 对比远程
- 远程固定展示前 5 条（时间/作者/内容），未下载高亮
- 本地未提交独立表：全选、行数 `+a -d`、中文状态、勾选暂存、还原（新增文件双重确认）、冲突全屏提示不自动合并
- 提交前自动查远程（有更新就拦下），提交后 fetch 核验一致才算成功
- AI 提交信息：只按勾选文件（含 diff），风格跟随本分支近期提交；空信息点提交自动生成后直接提交
- Work Status 区显示 `项目名 分支 改动数`，点击打开面板；`/commit` 命令可用

## 安装

OpenChamber → 设置 → 扩展 → 粘贴 Git 地址添加：

```text
https://github.com/xcvsfsd/openchamber-git-commit
```

批准 `service(git)` + `model` 能力，点 rail 上 Git 提交图标。

本地开发可用文件夹路径安装（改完 `bun run build` 即生效）。

## 说明

- 面板只在打开项目（git 仓库）时工作，非 git 项目只显示一句提示。
- service 跑用户全权限，只执行 `git`，参数全校验（dir/branch/path/remote），不用 shell。
- 手机 App / VS Code 不加载扩展（Web 和桌面版可用）。
- 发版：改完 `bun run build`，升 `package.json` version，提交 built 文件（`panel/main.js`、`status/main.js`、`service/main.js` 必须提交）。

## License

MIT
