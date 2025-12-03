import { useMemo, useState } from "react";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import ProjectAccordion from "../features/projects/components/ProjectAccordion";
import { useProjects } from "../features/projects/hooks/useProjects";
import { pageShellSx } from "../shared/styles/layout";
import { type Project } from "../types/project";
import { ProjectSortOption } from "../shared/constants/dashboard";
import { filterProjects } from "./utils/filterProjects";
import { computeProjectStats } from "./utils/projectStats";
import { DashboardHero } from "./components/DashboardHero";
import { DashboardControls } from "./components/DashboardControls";
import { DashboardEmptyState } from "./components/DashboardEmptyState";

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
      <DashboardHero stats={stats} />

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <DashboardControls
          search={search}
          onSearchChange={setSearch}
          sortOption={sortOption}
          onSortChange={setSortOption}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          onToggleExpandAll={handleToggleExpandAll}
          forcedExpanded={forcedExpanded}
          projectCount={projectsList.length}
        />

        {filteredProjects.length === 0 ? (
          <DashboardEmptyState />
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
