import { InlineEditableSelectOption } from "../../../shared/components/inline/InlineEditableSelect";
import { colors } from "../../../shared/styles/colors";
import { ProjectPriority, ProjectStatus } from "../../../types/project";

export const projectStatusOptions: InlineEditableSelectOption<ProjectStatus>[] =
  [
    { value: "backlog", label: "Backlog", color: colors.status.backlog },
    { value: "active", label: "Active", color: colors.status.active },
    { value: "blocked", label: "Blocked", color: colors.status.blocked },
    { value: "completed", label: "Completed", color: colors.status.completed },
  ];

export const projectPriorityOptions: InlineEditableSelectOption<ProjectPriority>[] =
  [
    { value: "low", label: "Low", color: colors.priority.low },
    { value: "medium", label: "Medium", color: colors.priority.medium },
    { value: "high", label: "High", color: colors.priority.high },
  ];

// dummy
