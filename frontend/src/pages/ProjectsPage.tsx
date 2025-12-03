import { useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { alpha } from "@mui/material/styles";
import ProjectsFiltersBar from "../features/projects/components/ProjectsFiltersBar";
import ProjectsStatsGrid from "../features/projects/components/ProjectsStatsGrid";
import ProjectsGrid from "../features/projects/components/ProjectsGrid";
import ProjectsEmptyState from "../features/projects/components/ProjectsEmptyState";
import CreateProjectDialog from "../features/projects/components/CreateProjectDialog";
import { useProjects } from "../features/projects/hooks/useProjects";
import { useProjectStats } from "../features/projects/hooks/useProjectStats";
import { Project } from "../types/project";
import HeroBanner from "../shared/components/HeroBanner";
import { pageShellSx } from "../shared/styles/layout";
import { glassPanel } from "../shared/styles/glassPanel";

const safeDateValue = (value: string | null) => {
  if (!value) return null;
  const ts = new Date(value).getTime();
  return Number.isNaN(ts) ? null : ts;
};

export default function ProjectsPage() {
  const { data: projects, isLoading, isError, error } = useProjects();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<Project["status"] | "all">(
    "all"
  );
  const [priorityFilter, setPriorityFilter] = useState<
    Project["priority"] | "all"
  >("all");
  const [sortBy, setSortBy] = useState<"recent" | "dueSoon" | "name">("recent");
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const projectsList = useMemo(() => projects ?? [], [projects]);
  const statsCards = useProjectStats(projectsList);

  const filteredProjects = useMemo(() => {
    let results = projectsList;

    if (searchTerm.trim()) {
      const query = searchTerm.trim().toLowerCase();
      results = results.filter((project) => {
        const nameMatch = project.name.toLowerCase().includes(query);
        const descriptionMatch = project.description
          .toLowerCase()
          .includes(query);
        return nameMatch || descriptionMatch;
      });
    }

    if (statusFilter !== "all") {
      results = results.filter((project) => project.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      results = results.filter(
        (project) => project.priority === priorityFilter
      );
    }

    const sorted = [...results].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      }
      if (sortBy === "dueSoon") {
        const aDue = safeDateValue(a.due_date);
        const bDue = safeDateValue(b.due_date);
        if (aDue === null && bDue === null) return 0;
        if (aDue === null) return 1;
        if (bDue === null) return -1;
        return aDue - bDue;
      }

      const aUpdated = safeDateValue(a.updated_at) ?? 0;
      const bUpdated = safeDateValue(b.updated_at) ?? 0;
      return bUpdated - aUpdated;
    });

    return sorted;
  }, [projectsList, searchTerm, statusFilter, priorityFilter, sortBy]);

  const totalFiltered = filteredProjects.length;
  const isInitialLoading = isLoading && !projects;
  const showEmptyState = !isInitialLoading && totalFiltered === 0;
  const errorMessage =
    error instanceof Error ? error.message : "Failed to load projects.";

  const handleOpenCreate = () => setCreateDialogOpen(true);
  const handleCloseCreate = () => setCreateDialogOpen(false);

  return (
    <Box sx={pageShellSx}>
      <HeroBanner containerProps={{ maxWidth: "xl" }}>
        <Stack spacing={4} sx={{ position: "relative", zIndex: 1 }}>
          <Stack spacing={1}>
            <Typography variant="h3" sx={{ fontWeight: 700 }}>
              Projects Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                maxWidth: 640,
              }}
            >
              Assess delivery health, rally teammates, and keep momentum with a
              unified view of every project across the workspace.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.25}
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenCreate}
              sx={{
                minHeight: 48,
                px: 2.5,
                borderRadius: 999,
              }}
            >
              Start a project
            </Button>
          </Stack>

          <ProjectsStatsGrid stats={statsCards} />
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
          elevation={0}
          sx={{
            ...glassPanel(),
            p: { xs: 2.5, md: 3 },
            borderColor: (theme) => alpha(theme.palette.primary.main, 0.16),
          }}
        >
          <Stack spacing={2.5}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ xs: "flex-start", md: "center" }}
              spacing={1.5}
            >
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Projects List
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Showing {totalFiltered} of {projectsList.length} projects
                </Typography>
              </Box>
            </Stack>

            <ProjectsFiltersBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              statusFilter={statusFilter}
              onStatusChange={(value) => setStatusFilter(value)}
              priorityFilter={priorityFilter}
              onPriorityChange={(value) => setPriorityFilter(value)}
              sortBy={sortBy}
              onSortChange={(value) => setSortBy(value)}
            />
          </Stack>
        </Paper>

        {isError && (
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        )}

        {isInitialLoading ? (
          <ProjectsGrid projects={undefined} isLoading isEmpty={false} />
        ) : showEmptyState ? (
          <ProjectsEmptyState onCreate={handleOpenCreate} />
        ) : (
          <ProjectsGrid
            projects={filteredProjects}
            isLoading={false}
            isEmpty={false}
          />
        )}

        <CreateProjectDialog
          open={createDialogOpen}
          onClose={handleCloseCreate}
        />
      </Container>
    </Box>
  );
}
