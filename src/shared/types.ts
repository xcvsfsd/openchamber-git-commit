// 共享类型：status / service 共用，保持轻量可 JSON 序列化。
// 瘦身说明：纯状态区只用 branch/ahead/behind/files 长度；面板时代的
// recent/incoming/outgoing/remoteLog、BranchEntry 已删除，不再查询。
export type FileEntry = {
  path: string;
  staged: string;
  unstaged: string;
};

export type StatusAnswer = {
  ok: boolean;
  dir?: string;
  branch?: string;
  upstream?: string | null;
  ahead?: number;
  behind?: number;
  files?: FileEntry[];
  error?: string;
};
