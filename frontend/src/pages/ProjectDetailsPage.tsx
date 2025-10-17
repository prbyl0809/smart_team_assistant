import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import ProjectDetailsHeader from "../features/projects/components/ProjectDetailsHeader";
import ProjectInfoCard from "../features/projects/components/ProjectInfoCard";
import ProjectOverviewCard from "../features/projects/components/ProjectOverviewCard";
import ProjectTasksCard from "../features/projects/components/ProjectTasksCard";
import TaskDetailsDialog from "../features/tasks/components/TaskDetailsDialog";
import { useProjectDetails } from "../features/projects/hooks/useProjectDetails";
import { useUpdateProject } from "../features/projects/hooks/useUpdateProject";
import { useUsers } from "../features/users/hooks/useUsers";
import { Task } from "../types/task";
import { projectStatusOptions } from "../features/projects/components/constants";
import HeroBanner from "../shared/components/HeroBanner";
import { colors } from "../shared/styles/colors";
import { pageShellSx } from "../shared/styles/layout";

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const projectId = Number(id);

  const isProjectIdValid = Number.isInteger(projectId) && projectId > 0;
  const safeProjectId = isProjectIdValid ? projectId : 0;

  const { data, isLoading, isError, error } = useProjectDetails(safeProjectId);
  const { mutateAsync: updateProject } = useUpdateProject(safeProjectId);
  const { data: users = [], isLoading: usersLoading } = useUsers();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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

  const statusLabel =
    projectStatusOptions.find((option) => option.value === project.status)
      ?.label ?? project.status;

  const summaryStats: Array<{
    label: string;
    value: number | string;
    palette: "primary" | "warning" | "success" | "secondary";
  }> = [
    { label: "Total tasks", value: taskStats.total, palette: "primary" },
    { label: "In progress", value: taskStats.inProgress, palette: "warning" },
    { label: "Completed", value: taskStats.completed, palette: "success" },
    { label: "Status", value: statusLabel, palette: "secondary" },
  ];

  return (
    <>
      <Box sx={pageShellSx}>
        <HeroBanner containerProps={{ maxWidth: "xl" }}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="overline" sx={{ letterSpacing: "0.12em" }}>
                Project
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {project.name}
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {summaryStats.map((stat) => (
                <Grid
                  key={stat.label}
                  size={{ xs: 6, sm: 3 }}
                  sx={{ display: "flex" }}
                >
                  <Box
                    sx={(theme) => ({
                      flex: 1,
                      p: 3,
                      borderRadius: 2,
                      backgroundColor: alpha(colors.navy.surface, 0.62),
                      border: `1px solid ${alpha(
                        theme.palette.secondary.main,
                        0.28
                      )}`,
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.75,
                      boxShadow:
                        "0 14px 32px rgba(8, 10, 30, 0.48), inset 0 1px 0 rgba(255,255,255,0.06)",
                    })}
                  >
                    <Typography
                      variant="h4"
                      sx={(theme) => ({
                        fontWeight: 700,
                        color: theme.palette[stat.palette].main,
                      })}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: colors.text.tertiary }}
                    >
                      {stat.label}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </HeroBanner>

        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 4, md: 5 },
          }}
        >
          <ProjectDetailsHeader
            project={project}
            users={users}
            isUsersLoading={usersLoading}
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
                lg: "minmax(0,2fr) minmax(0,1fr)",
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
                onTaskClick={(task) => setSelectedTask(task)}
              />
            </Stack>

            <Stack spacing={3}>
              <ProjectInfoCard project={project} />
            </Stack>
          </Box>
        </Container>
      </Box>
      <TaskDetailsDialog
        open={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        projectId={safeProjectId}
        users={users}
      />
    </>
  );
}
