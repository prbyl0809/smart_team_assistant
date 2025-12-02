import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Chip,
  Box,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useEffect, useState } from "react";
import { alpha } from "@mui/material/styles";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { Project, ProjectStatus } from "../../../types/project";
import { useProjectDetails } from "../hooks/useProjectDetails";
import TaskBoard from "../../tasks/components/TaskBoard";
import { Link } from "react-router-dom";
import { colors } from "../../../shared/styles/colors";
import { formatDate } from "../../../shared/utils/date";
import { useUsers } from "../../users/hooks/useUsers";
import { User } from "../../../types/user";

type Props = {
  project: Project;
  forcedExpanded?: boolean;
  onUserToggle?: () => void;
};

const STATUS_TONE: Record<ProjectStatus, string> = {
  active: colors.accent.primary.light,
  blocked: "#F97316",
  completed: "#22C55E",
  backlog: colors.text.tertiary,
};

const statusLabel = (status: ProjectStatus) => {
  switch (status) {
    case "active":
      return "Active";
    case "blocked":
      return "Blocked";
    case "completed":
      return "Completed";
    case "backlog":
      return "Backlog";
    default:
      return status;
  }
};

export default function ProjectAccordion({
  project,
  forcedExpanded,
  onUserToggle,
}: Props) {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (typeof forcedExpanded === "boolean") {
      setExpanded(forcedExpanded);
    }
  }, [forcedExpanded]);

  const { data, isLoading, isError } = useProjectDetails(project.id);
  const { data: users = [] } = useUsers();
  const dueDateLabel = project.due_date
    ? formatDate(project.due_date)
    : "No due date";
  const updatedAt = formatDate(project.updated_at);

  const totalTasks = data?.tasks?.length ?? 0;
  const doneTasks = data?.tasks?.filter(
    (task) => task.status === "done"
  ).length;
  const ownerName =
    users.find((user: User) => user.id === project.owner_id)?.username ??
    `Owner #${project.owner_id}`;

  return (
    <Accordion
      expanded={expanded}
      onChange={() => {
        setExpanded((prev) => !prev);
        onUserToggle?.();
      }}
      disableGutters
      square={false}
      sx={{
        borderRadius: 0,
        border: `1px solid ${colors.border.default}`,
        background: colors.base.surface,
        overflow: "hidden",
        "&::before": { display: "none" },
        boxShadow: `0 12px 28px ${alpha(colors.border.default, 0.35)}`,
        "& + &": {
          mt: 2,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: colors.text.secondary }} />}
        sx={{
          px: { xs: 2, md: 2.75 },
          py: { xs: 1.75, md: 2.25 },
          background: colors.base.surfaceAlt,
          "& .MuiChip-root": {
            "& .MuiChip-label": {
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.4,
            },
          },
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 1.5, md: 2.5 }}
          alignItems={{ xs: "flex-start", md: "center" }}
          sx={{ width: "100%" }}
        >
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              sx={{ minWidth: 0 }}
            >
              <Typography
                component={Link}
                to={`/projects/${project.id}`}
                onClick={(e) => e.stopPropagation()}
                color="textPrimary"
                sx={{
                  fontWeight: 700,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": {
                    color: colors.text.primary,
                  },
                }}
                noWrap
              >
                {project.name}
              </Typography>
              <Chip
                icon={<PersonOutlineIcon fontSize="small" />}
                label={ownerName}
                size="small"
                sx={{
                  borderRadius: 1.5,
                  bgcolor: colors.base.surfaceAlt,
                  border: `1px solid ${colors.border.default}`,
                  color: colors.text.primary,
                  maxWidth: "50%",
                  "& .MuiChip-label": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  },
                }}
              />
            </Stack>
          </Box>

          <Stack
            direction={{ xs: "row", md: "row" }}
            spacing={1}
            flexWrap="wrap"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
          >
            <Chip
              label={statusLabel(project.status)}
              size="small"
              sx={{
                borderRadius: 1.5,
                bgcolor: colors.base.surface,
                border: `1px solid ${alpha(STATUS_TONE[project.status], 0.4)}`,
                color: STATUS_TONE[project.status],
                fontWeight: 600,
              }}
            />
            <Chip
              icon={<CalendarMonthIcon />}
              label={dueDateLabel}
              size="small"
              sx={{
                borderRadius: 1.5,
                bgcolor: colors.base.surfaceAlt,
                border: `1px solid ${colors.border.default}`,
                color: colors.text.primary,
              }}
            />
            <Chip
              icon={<TaskAltIcon />}
              label={`${doneTasks ?? "—"}/${totalTasks} done`}
              size="small"
              sx={{
                borderRadius: 1.5,
                bgcolor: colors.base.surfaceAlt,
                border: `1px dashed ${colors.border.default}`,
                color: colors.text.primary,
              }}
            />
            <Chip
              label={`Updated ${updatedAt}`}
              size="small"
              sx={{
                borderRadius: 1.5,
                bgcolor: colors.base.surfaceAlt,
                border: `1px solid ${colors.border.subtle}`,
                color: colors.text.secondary,
              }}
            />
          </Stack>
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          px: { xs: 2, md: 2.75 },
          pb: { xs: 2.25, md: 2.75 },
          background: colors.base.surface,
          borderTop: `1px solid ${colors.border.default}`,
        }}
      >
        {isLoading && <CircularProgress />}
        {isError && (
          <Typography color="error">Failed to load tasks.</Typography>
        )}
        {data && <TaskBoard tasks={data.tasks} projectId={project.id} />}
      </AccordionDetails>
    </Accordion>
  );
}
