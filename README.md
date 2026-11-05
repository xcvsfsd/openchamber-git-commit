# openchamber-git-commit

JetBrains 式 Git 提交增强，给 OpenChamber 用的扩展。全走 git 原生命令。

## 功能

- 分支下拉 + 切换 / 新建分支（`git checkout`）
- `git pull` / `git push`（支持 `--set-upstream`）
- 变更列表 + 暂存/取消暂存（`git add` / `git reset`）
- 提交（`git commit`，可选 amend、提交后 push）
- AI 提交信息（走 Small Model，需批 `model` 能力）
- Work Status 区显示分支/脏数/上下游
- `/commit` 命令填信息；内置 Git 面板联动

## 安装（本地文件夹）

1. OpenChamber → 设置 → 扩展 → 添加绝对路径：

```text
/home/liaoz/code/openchamber-git-commit
```

2. 批准 `service(git)` + `model` 能力。
3. 点 rail 上 Git 提交图标。

## 说明

- 面板只在打开项目（git 仓库）时工作。
- service 跑用户全权限，只执行 `git`，参数全校验（dir/branch/path），不用 shell。
- 手机 App / VS Code 不加载扩展。
- 发版：改完 `bun run build`，升 `package.json` version，提交 built 文件。
