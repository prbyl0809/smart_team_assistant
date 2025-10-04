import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { useProjectDetails } from "../features/projects/hooks/useProjectDetails";
import { useUpdateProject } from "../features/projects/hooks/useUpdateProject";
import ProjectDetailsHeader from "../features/projects/components/ProjectDetailsHeader";
import ProjectOverviewCard from "../features/projects/components/ProjectOverviewCard";
import ProjectTasksCard from "../features/projects/components/ProjectTasksCard";
import ProjectInfoCard from "../features/projects/components/ProjectInfoCard";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const projectId = Number(id);

  const isProjectIdValid = Number.isInteger(projectId) && projectId > 0;
  const safeProjectId = isProjectIdValid ? projectId : 0;

  const { data, isLoading, isError, error } = useProjectDetails(safeProjectId);

  const { mutateAsync: updateProject } = useUpdateProject(safeProjectId);

  const taskStats = useMemo(() => {
    const total = data?.tasks.length ?? 0;
    const completed =
      data?.tasks.filter((task) => task.status === "done").length ?? 0;
    const inProgress =
      data?.tasks.filter((task) => task.status === "in_progress").length ?? 0;
    return { total, completed, inProgress };
  }, [data?.tasks]);

  if (!isProjectIdValid) {
    return (
      <Container maxWidth="md">
        <Box mt={6} textAlign="center">
          <Typography variant="h5">Invalid project identifier</Typography>
        </Box>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container maxWidth="md">
        <Box mt={6} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <Container maxWidth="md">
        <Box mt={6} textAlign="center">
          <Typography variant="h5" gutterBottom>
            Error loading project details
          </Typography>
          <Typography color="text.secondary">
            {error instanceof Error ? error.message : "Please try again later."}
          </Typography>
        </Box>
      </Container>
    );
  }

  const { project, tasks } = data;

  return (
    <Container maxWidth="xl">
      <Stack spacing={4} mt={4}>
        <ProjectDetailsHeader
          project={project}
          onUpdate={async (payload) => {
            await updateProject(payload);
          }}
        />

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "minmax(0,2fr) minmax(0,1fr)",
            },
            alignItems: "start",
          }}
        >
          <Stack spacing={3}>
            <ProjectOverviewCard
              description={project.description}
              onUpdate={async (payload) => {
                await updateProject(payload);
              }}
            />

            <ProjectTasksCard
              projectId={safeProjectId}
              tasks={tasks}
              stats={taskStats}
            />
          </Stack>

          <Stack spacing={3}>
            <ProjectInfoCard project={project} />
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
