export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskPriority = "low" | "medium" | "high";

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string | null;
  order: number | null;
  assignee_id: number | null;
  project_id: number;
  created_at: string;
  updated_at: string;
};
