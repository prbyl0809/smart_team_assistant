import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Container,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import ReportIcon from "@mui/icons-material/Report";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import { alpha } from "@mui/material/styles";
import ProjectAccordion from "../features/projects/components/ProjectAccordion";
import { useProjects } from "../features/projects/hooks/useProjects";
import HeroBanner from "../shared/components/HeroBanner";
import { pageShellSx } from "../shared/styles/layout";
import { colors } from "../shared/styles/colors";
import { type Project } from "../types/project";
import DashboardStat from "./components/DashboardStat";
import {
  DAY_IN_MS,
  ProjectSortOption,
  statusFilters,
} from "../shared/constants/dashboard";
import { filterProjects } from "./utils/filterProjects";

type ProjectStats = {
  total: number;
  active: number;
  blocked: number;
  dueSoon: number;
  overdue: number;
};

const computeProjectStats = (projects: Project[]): ProjectStats => {
  const now = new Date();
  return projects.reduce(
    (acc, project) => {
      acc.total += 1;
      if (project.status === "active") acc.active += 1;
      if (project.status === "blocked") acc.blocked += 1;
      if (project.due_date) {
        const due = new Date(project.due_date);
        const diffDays = Math.ceil((due.getTime() - now.getTime()) / DAY_IN_MS);
        if (!Number.isNaN(diffDays)) {
          if (diffDays >= 0 && diffDays <= 7) acc.dueSoon += 1;
          if (diffDays < 0) acc.overdue += 1;
        }
      }
      return acc;
    },
    { total: 0, active: 0, blocked: 0, dueSoon: 0, overdue: 0 }
  );
};

export default function DashboardPage() {
  const { data: projects, isLoading, isError, error } = useProjects();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | Project["status"]>(
    "all"
  );
  const [sortOption, setSortOption] = useState<ProjectSortOption>("recent");
  const [forcedExpanded, setForcedExpanded] = useState<boolean | undefined>(
    true
  );

  const projectsList = useMemo(() => projects ?? [], [projects]);
  const stats = useMemo(
    () => computeProjectStats(projectsList),
    [projectsList]
  );

  const filteredProjects = useMemo(
    () =>
      filterProjects(projectsList, {
        search,
        status: statusFilter,
        sort: sortOption,
      }),
    [projectsList, search, sortOption, statusFilter]
  );

  const handleToggleExpandAll = () => {
    setForcedExpanded((prev) => (prev === true ? false : true));
  };

  if (isLoading) return <CircularProgress />;
  if (isError || !projects)
    return <Typography>Error: {error?.message}</Typography>;

  return (
    <Box sx={pageShellSx}>
      <HeroBanner
        containerProps={{ maxWidth: "xl" }}
        sx={{ backgroundImage: "none" }}
      >
        <Stack spacing={2.5} sx={{ position: "relative", zIndex: 1 }}>
          <Chip
            icon={<AutoAwesomeIcon fontSize="small" />}
            label="Realtime drag & drop board"
            sx={{
              alignSelf: "flex-start",
              bgcolor: alpha(colors.text.secondary, 0.1),
              color: colors.text.secondary,
              border: `1px solid ${alpha(colors.border.default, 0.8)}`,
              borderRadius: 99,
              px: 1,
            }}
          />
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 800 }} gutterBottom>
              Stay on top of every project
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.text.tertiary,
                maxWidth: 720,
                fontSize: "1rem",
              }}
            >
              Manage all your projects in one place with our intuitive
              dashboard. Quickly filter, search, and sort to find what you need
              and keep your team aligned.
            </Typography>
          </Box>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems={{ xs: "stretch", md: "center" }}
          >
            <DashboardStat
              icon={<PendingActionsIcon />}
              label="Active"
              value={stats.active}
              tone="neutral"
            />
            <DashboardStat
              icon={<ReportIcon />}
              label="Blocked items"
              value={stats.blocked}
              tone="neutral"
            />
            <DashboardStat
              icon={<AccessTimeIcon />}
              label="Due within 7 days"
              value={stats.dueSoon}
              tone="neutral"
            />
            <DashboardStat
              icon={<EventBusyIcon />}
              label="Overdue"
              value={stats.overdue}
              tone="danger"
            />
          </Stack>
        </Stack>
      </HeroBanner>

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            borderRadius: 3,
            px: { xs: 2.5, md: 3 },
            py: { xs: 2, md: 2.5 },
            border: `1px solid ${colors.border.default}`,
            background: colors.base.surfaceAlt,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            alignItems: { xs: "stretch", md: "center" },
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={0.5}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Projects
            </Typography>
            <Typography variant="body2" sx={{ color: colors.text.tertiary }}>
              All projects in your workspace: {projectsList.length}
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            alignItems={{ xs: "stretch", md: "center" }}
            justifyContent="flex-end"
          >
            <TextField
              size="small"
              placeholder="Search projects..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              sx={{ minWidth: { xs: "100%", md: 240 } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              select
              size="small"
              label="Sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value as typeof sortOption)
              }
              sx={{ minWidth: 160 }}
            >
              <MenuItem value="recent">Recently updated</MenuItem>
              <MenuItem value="name">Name A–Z</MenuItem>
            </TextField>

            <ToggleButtonGroup
              exclusive
              value={statusFilter}
              onChange={(_, value) => value && setStatusFilter(value)}
              size="small"
              color="primary"
              sx={{
                borderRadius: 1,
                overflow: "hidden",
                border: `1px solid ${colors.border.default}`,
                "& .MuiToggleButton-root": {
                  borderRadius: 0,
                  borderColor: "transparent",
                  color: colors.text.primary,
                  px: 1.75,
                  py: 0.75,
                  textTransform: "none",
                },
                "& .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
                  borderRight: `1px solid ${colors.border.default}`,
                },
                "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
                  marginLeft: 0,
                },
                "& .Mui-selected": {
                  backgroundColor: alpha(colors.accent.primary.main, 0.12),
                  color: colors.text.primary,
                },
                "& .MuiToggleButton-root:hover": {
                  backgroundColor: alpha(colors.accent.primary.main, 0.08),
                },
              }}
            >
              {statusFilters.map((item) => (
                <ToggleButton key={item.value} value={item.value}>
                  {item.label}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
            <Button
              variant="text"
              onClick={handleToggleExpandAll}
              sx={{ whiteSpace: "nowrap", color: colors.text.secondary }}
            >
              {forcedExpanded === true ? "Collapse all" : "Expand all"}
            </Button>
          </Stack>
        </Paper>

        {filteredProjects.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              borderRadius: 3,
              p: 3,
              border: `1px dashed ${colors.border.default}`,
              background: alpha(colors.text.secondary, 0.06),
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              No projects match your filters
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Clear the search or pick another status to see your drag & drop
              board.
            </Typography>
          </Paper>
        ) : (
          <Box display="flex" flexDirection="column" gap={2.5}>
            {filteredProjects.map((project) => (
              <ProjectAccordion
                key={project.id}
                project={project}
                forcedExpanded={forcedExpanded}
                onUserToggle={() => setForcedExpanded(undefined)}
              />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}
