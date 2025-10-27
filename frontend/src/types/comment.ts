export type ProjectCommentAuthor = {
  id: number;
  username: string;
};

export type ProjectComment = {
  id: number;
  project_id: number;
  body: string;
  edited: boolean;
  created_at: string;
  updated_at: string;
  author: ProjectCommentAuthor;
};
