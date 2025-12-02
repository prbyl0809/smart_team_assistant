import { ProjectStatus } from "../../types/project";
import { Task } from "../../types/task";

export const DAY_IN_MS = 24 * 60 * 60 * 1000;

export type ProjectSortOption = "recent" | "name";

export const statusFilters: { label: string; value: "all" | ProjectStatus }[] =
  [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Blocked", value: "blocked" },
    { label: "Completed", value: "completed" },
    { label: "Backlog", value: "backlog" },
  ];

export const boardColumns: { status: Task["status"]; label: string }[] = [
  { status: "todo", label: "To Do" },
  { status: "in_progress", label: "In Progress" },
  { status: "done", label: "Done" },
];
