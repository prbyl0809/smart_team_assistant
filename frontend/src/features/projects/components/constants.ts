import { InlineEditableSelectOption } from "../../../shared/components/inline/InlineEditableSelect";
import { ProjectPriority, ProjectStatus } from "../../../types/project";

export const projectStatusOptions: InlineEditableSelectOption<ProjectStatus>[] =
  [
    { value: "backlog", label: "Backlog", color: "#9CA3AF" },
    { value: "active", label: "Active", color: "#0284C7" },
    { value: "blocked", label: "Blocked", color: "#DC2626" },
    { value: "completed", label: "Completed", color: "#16A34A" },
  ];

export const projectPriorityOptions: InlineEditableSelectOption<ProjectPriority>[] =
  [
    { value: "low", label: "Low", color: "#10B981" },
    { value: "medium", label: "Medium", color: "#F59E0B" },
    { value: "high", label: "High", color: "#EF4444" },
  ];
