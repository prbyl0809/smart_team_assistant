import { ReactElement } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Typography,
  type ChipProps,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import { alpha } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { Project } from "../../../types/project";

const DAY_IN_MS = 24 * 60 * 60 * 1000;

const statusStyles: Record<
  Project["status"],
  { label: string; color: ChipProps["color"] }
> = {
  active: { label: "Active", color: "success" },
  completed: { label: "Completed", color: "info" },
  blocked: { label: "Blocked", color: "warning" },
  backlog: { label: "Backlog", color: "default" },
};

const priorityStyles: Record<
  Project["priority"],
  { label: string; valueColor: string }
> = {
  high: { label: "High", valueColor: "error.main" },
  medium: { label: "Medium", valueColor: "warning.main" },
  low: { label: "Low", valueColor: "success.main" },
};

type DueSummary = {
  headline: string;
  detail: string;
  tone: string;
};

const getDueSummary = (dueDateString: string | null): DueSummary => {
  if (!dueDateString) {
    return {
      headline: "No due date",
      detail: "Schedule when ready",
      tone: "text.secondary",
    };
  }

  const dueDate = new Date(dueDateString);
  if (Number.isNaN(dueDate.getTime())) {
    return {
      headline: "Date unavailable",
      detail: "Update to keep timing clear",
      tone: "text.secondary",
    };
  }

  const now = new Date();
  const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / DAY_IN_MS);
  const formatted = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
  }).format(dueDate);

  if (diffDays > 0) {
    return {
      headline: `Due in ${diffDays} day${diffDays === 1 ? "" : "s"}`,
      detail: formatted,
      tone: "text.primary",
    };
  }

  if (diffDays === 0) {
    return {
      headline: "Due today",
      detail: formatted,
      tone: "warning.main",
    };
  }

  const overdueBy = Math.abs(diffDays);
  return {
    headline: `Overdue by ${overdueBy} day${overdueBy === 1 ? "" : "s"}`,
    detail: formatted,
    tone: "error.main",
  };
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
    date
  );
};

type DetailItemProps = {
  icon: ReactElement;
  label: string;
  value: string;
  valueColor?: string;
};

function DetailItem({ icon, label, value, valueColor }: DetailItemProps) {
  return (
    <Stack direction="row" spacing={1.5} alignItems="center">
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: (theme) => theme.palette.primary.main,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ textTransform: "uppercase", letterSpacing: 0.6 }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontWeight: 600, color: valueColor ?? "text.primary" }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const initials = project.name.trim().charAt(0).toUpperCase() || "P";
  const statusStyle = statusStyles[project.status];
  const priorityStyle = priorityStyles[project.priority];
  const dueSummary = getDueSummary(project.due_date);
  const updatedAt = formatDate(project.updated_at);

  const deadlineValue = `${dueSummary.headline} | ${dueSummary.detail}`;

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        boxShadow: "none",
        "&:hover": {
          transform: "translateY(-4px)",
          borderColor: (theme) => theme.palette.primary.main,
          boxShadow: (theme) =>
            `0 16px 32px ${alpha(theme.palette.primary.main, 0.14)}`,
        },
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", gap: 2.5, flexGrow: 1 }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.12),
              color: "primary.main",
              fontWeight: 600,
            }}
          >
            {initials}
          </Avatar>
          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography variant="h6" noWrap>
              {project.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updated {updatedAt}
            </Typography>
          </Box>
          <Chip
            label={statusStyle.label}
            color={statusStyle.color}
            size="small"
            sx={{ textTransform: "capitalize" }}
          />
        </Stack>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {project.description || "No description added yet."}
        </Typography>

        <Divider />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
        >
          <DetailItem
            icon={<CalendarMonthIcon fontSize="small" />}
            label="Deadline"
            value={deadlineValue}
            valueColor={dueSummary.tone}
          />
          <DetailItem
            icon={<FlagRoundedIcon fontSize="small" />}
            label="Priority"
            value={priorityStyle.label}
            valueColor={priorityStyle.valueColor}
          />
        </Stack>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            component={Link}
            to={`/projects/${project.id}`}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            View details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export function ProjectCardSkeleton() {
  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={44} height={44} />
          <Box sx={{ flexGrow: 1 }}>
            <Skeleton width="60%" height={24} />
            <Skeleton width="35%" />
          </Box>
          <Skeleton variant="rounded" width={82} height={28} />
        </Stack>
        <Skeleton variant="rounded" height={72} />
        <Divider />
        <Stack direction="row" spacing={2}>
          <Skeleton variant="rounded" width="50%" height={56} />
          <Skeleton variant="rounded" width="50%" height={56} />
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Skeleton variant="rounded" width={140} height={40} />
        </Box>
      </CardContent>
    </Card>
  );
}
