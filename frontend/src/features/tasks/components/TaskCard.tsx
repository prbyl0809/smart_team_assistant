import { type ReactElement } from "react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { alpha } from "@mui/material/styles";
import { colors } from "../../../shared/styles/colors";
import { Task } from "../../../types/task";
import { formatDate } from "../../../shared/utils/date";
import { User } from "../../../types/user";

type Props = {
  task: Task;
  users?: User[];
};

const priorityAccent: Record<
  Task["priority"],
  { label: string; color: string }
> = {
  high: { label: "High priority", color: colors.priority.high },
  medium: { label: "Medium priority", color: colors.priority.medium },
  low: { label: "Low priority", color: colors.priority.lowAlt },
};

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const getDueSummary = (dueDateString: string | null) => {
  if (!dueDateString) {
    return { label: "No due date", color: colors.text.tertiary };
  }
  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) {
    return { label: "Date unknown", color: colors.text.tertiary };
  }
  const now = new Date();
  const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / DAY_IN_MS);

  if (diffDays === 0) {
    return { label: "Due today", color: colors.text.secondary };
  }

  if (diffDays < 0) {
    return {
      label: `Overdue by ${Math.abs(diffDays)}d`,
      color: colors.priority.high,
    };
  }

  return { label: `Due in ${diffDays}d`, color: colors.text.secondary };
};

export default function TaskCard({ task, users = [] }: Props) {
  const dueSummary = getDueSummary(task.due_date);
  const hasValidDueDate =
    !!task.due_date && !Number.isNaN(new Date(task.due_date).getTime());
  const dueDetail = hasValidDueDate ? formatDate(task.due_date as string) : "";
  const assigneeName =
    users.find((user) => user.id === task.assignee_id)?.username ??
    "Unassigned";

  return (
    <Paper
      elevation={1}
      sx={{
        p: { xs: 1.5, md: 1.75 },
        background: colors.kanban.cardBg,
        color: colors.text.primary,
        borderRadius: 2,
        border: `1px solid ${colors.border.default}`,
        boxShadow: `0 10px 20px ${alpha(colors.border.default, 0.25)}`,
        overflow: "hidden",
        borderLeft: `4px solid ${alpha(
          priorityAccent[task.priority].color,
          0.6
        )}`,
      }}
    >
      <Stack spacing={1.25}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1.25}
        >
          <Typography
            variant="subtitle1"
            fontWeight={700}
            sx={{ wordBreak: "break-word" }}
          >
            {task.title}
          </Typography>
          <AccentPill
            icon={<FlagRoundedIcon fontSize="inherit" />}
            label={priorityAccent[task.priority].label}
            color={priorityAccent[task.priority].color}
          />
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <AccentPill
            icon={<PersonOutlineIcon fontSize="inherit" />}
            label={assigneeName}
            color={colors.text.secondary}
          />
          <AccentPill
            icon={<CalendarMonthIcon fontSize="inherit" />}
            label={
              dueDetail
                ? `${dueSummary.label} · ${dueDetail}`
                : dueSummary.label
            }
            color={dueSummary.color}
          />
        </Stack>
      </Stack>
    </Paper>
  );
}

function AccentPill({
  icon,
  label,
  color,
}: {
  icon: ReactElement;
  label: string;
  color: string;
}) {
  const baseBg = color;
  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.75,
        borderRadius: 999,
        px: 1.25,
        py: 0.35,
        fontSize: "0.75rem",
        fontWeight: 700,
        backgroundColor: alpha(baseBg, 0.08),
        color,
        border: `1px solid ${colors.border.default}`,
        lineHeight: 1.4,
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </Box>
  );
}
