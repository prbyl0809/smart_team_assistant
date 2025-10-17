import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { alpha } from "@mui/material/styles";
import ProjectForm from "../features/projects/components/ProjectForm";
import ProjectCard, {
  ProjectCardSkeleton,
} from "../features/projects/components/ProjectCard";
import { useProjects } from "../features/projects/hooks/useProjects";
import { Project } from "../types/project";
import HeroBanner from "../shared/components/HeroBanner";
import { pageShellSx } from "../shared/styles/layout";
import { colors } from "../shared/styles/colors";
type StatPalette = "primary" | "success" | "warning" | "info";
type StatDescriptor = {
  label: string;
  value: number;
  caption: string;
  icon: React.ReactElement;
  palette: StatPalette;
};
const DAY_IN_MS = 24 * 60 * 60 * 1000;
const computeStats = (projects: Project[]) => {
  const now = new Date();
  const total = projects.length;
  let active = 0;
  let completed = 0;
  let dueSoon = 0;
  projects.forEach((project) => {
    if (project.status === "active") {
      active += 1;
    }
    if (project.status === "completed") {
      completed += 1;
    }
    if (project.due_date) {
      const dueDate = new Date(project.due_date);
      if (!Number.isNaN(dueDate.getTime())) {
        const diffDays = Math.ceil(
          (dueDate.getTime() - now.getTime()) / DAY_IN_MS
        );
        if (diffDays >= 0 && diffDays <= 7) {
          dueSoon += 1;
        }
      }
    }
  });
  return { total, active, completed, dueSoon };
};
const statsIcons: Record<StatPalette, React.ReactElement> = {
  primary: <FolderOpenIcon fontSize="small" />,
  success: <TrendingUpIcon fontSize="small" />,
  warning: <EventBusyIcon fontSize="small" />,
  info: <CheckCircleOutlineIcon fontSize="small" />,
};
export default function ProjectsPage() {
  const { data: projects, isLoading, isError, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const projectsList = useMemo(() => projects ?? [], [projects]);
  const stats = useMemo(() => computeStats(projectsList), [projectsList]);
  const statsCards = useMemo<StatDescriptor[]>(
    () => [
      {
        label: "Total projects",
        value: stats.total,
        caption: "Across every stage",
        icon: statsIcons.primary,
        palette: "primary",
      },
      {
        label: "Active now",
        value: stats.active,
        caption: "Moving work forward",
        icon: statsIcons.success,
        palette: "success",
      },
      {
        label: "Due within 7 days",
        value: stats.dueSoon,
        caption: "Deadlines approaching",
        icon: statsIcons.warning,
        palette: "warning",
      },
      {
        label: "Completed",
        value: stats.completed,
        caption: "Wrapped and delivered",
        icon: statsIcons.info,
        palette: "info",
      },
    ],
    [stats]
  );
  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) {
      return projectsList;
    }
    const query = searchTerm.trim().toLowerCase();
    return projectsList.filter((project) => {
      const nameMatch = project.name.toLowerCase().includes(query);
      const descriptionMatch = project.description
        .toLowerCase()
        .includes(query);
      return nameMatch || descriptionMatch;
    });
  }, [projectsList, searchTerm]);
  const isInitialLoading = isLoading && !projects;
  const showEmptyState = !isInitialLoading && filteredProjects.length === 0;
  const errorMessage =
    error instanceof Error ? error.message : "Failed to load projects.";
  return (
    <Box sx={pageShellSx}>
      <HeroBanner containerProps={{ maxWidth: "xl" }}>
        <Stack
          spacing={4}
          sx={{ position: "relative", zIndex: 1, maxWidth: 920 }}
        >
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 700 }} gutterBottom>
              Projects Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: colors.text.tertiary, maxWidth: 540 }}
            >
              Assess delivery health, rally teammates, and keep momentum with a
              unified view of every project across the workspace.
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {statsCards.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 3.5,
                    borderRadius: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.75,
                    bgcolor: alpha(colors.navy.surfaceAlt, 0.7),
                    borderColor: alpha(colors.accent.cyan, 0.35),
                    boxShadow:
                      "0 14px 32px rgba(9, 16, 38, 0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: (theme) =>
                        alpha(theme.palette[stat.palette].main, 0.2),
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: (theme) => theme.palette[stat.palette].main,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="inherit">
                      {stat.label}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    fontSize={"0.875rem"}
                    sx={{ color: colors.text.tertiary }}
                  >
                    {stat.caption}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </HeroBanner>
      <Container
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 5 },
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: 2,
            borderColor: "rgba(157, 108, 255, 0.22)",
            backgroundColor: "rgba(17, 17, 35, 0.92)",
            boxShadow: "0 18px 36px rgba(8, 9, 30, 0.45)",
          }}
        >
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2.5}
            alignItems={{ xs: "flex-start", md: "center" }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Projects List
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Showing {filteredProjects.length} of {projectsList.length}{" "}
                projects
              </Typography>
            </Box>
            <TextField
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search projects..."
              size="small"
              sx={{
                width: { xs: "100%", md: 320 },
              }}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Stack>
        </Paper>
        {isError && (
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        )}
        {isInitialLoading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Grid key={index}>
                <ProjectCardSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : showEmptyState ? (
          <Paper
            variant="outlined"
            sx={{
              p: { xs: 4, md: 5 },
              borderRadius: 2,
              textAlign: "center",
              borderColor: "rgba(157, 108, 255, 0.22)",
              backgroundColor: "rgba(17, 17, 35, 0.92)",
              boxShadow: "0 18px 36px rgba(8, 9, 30, 0.45)",
            }}
          >
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              No projects yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Use the form below to create your first project and kickstart the
              workflow.
            </Typography>
            <ProjectForm />
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid key={project.id} size={6}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
            <Paper
              variant="outlined"
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                borderColor: "rgba(157, 108, 255, 0.22)",
                backgroundColor: "rgba(17, 17, 35, 0.92)",
                boxShadow: "0 18px 36px rgba(8, 9, 30, 0.45)",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                Create a new project
              </Typography>
              <ProjectForm />
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
}
