export type ProjectStatus = "active" | "completed" | "blocked" | "backlog";

export type ProjectPriority = "low" | "medium" | "high";

export type Project = {
  id: number;
  name: string;
  description: string;
  due_date: string | null;
  status: ProjectStatus;
  priority: ProjectPriority;
  is_archived: boolean;
  owner_id: number;
  created_at: string;
  updated_at: string;
};
