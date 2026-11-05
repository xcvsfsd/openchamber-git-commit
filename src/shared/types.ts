// 共享类型：panel / status / service 三端共用，保持轻量可 JSON 序列化。
export type FileEntry = {
  path: string;
  staged: string;
  unstaged: string;
};

export type RecentCommit = {
  sha: string;
  subject: string;
  author: string;
  date: string;
};

export type StatusAnswer = {
  ok: boolean;
  dir?: string;
  branch?: string;
  upstream?: string | null;
  ahead?: number;
  behind?: number;
  files?: FileEntry[];
  recent?: RecentCommit[];
  incoming?: RecentCommit[];
  error?: string;
};

export type BranchEntry = {
  name: string;
  current: boolean;
  upstream?: string | null;
  ahead?: number;
  behind?: number;
};
