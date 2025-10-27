import { MouseEvent, ReactNode, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import ProjectDetailsHeader from "../features/projects/components/ProjectDetailsHeader";
import ProjectOverviewCard from "../features/projects/components/ProjectOverviewCard";
import ProjectTasksCard from "../features/projects/components/ProjectTasksCard";
import ProjectInfoCard from "../features/projects/components/ProjectInfoCard";
import ProjectCommentsCard from "../features/projects/components/ProjectCommentsCard";
import TaskDetailsDialog from "../features/tasks/components/TaskDetailsDialog";
import { ProjectPageHeader } from "../features/projects/components/ProjectPageHeader";
import { ProjectMetricsStrip } from "../features/projects/components/ProjectMetricsStrip";

import { useProjectDetails } from "../features/projects/hooks/useProjectDetails";
import { useUpdateProject } from "../features/projects/hooks/useUpdateProject";
import { useUsers } from "../features/users/hooks/useUsers";
import { useProjectTaskStats } from "../features/projects/hooks/useProjectTaskStats";
import { Task } from "../types/task";
import { colors } from "../shared/styles/colors";
import { formatDate } from "../shared/utils/date";
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
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [actionsAnchorEl, setActionsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const actionsMenuOpen = Boolean(actionsAnchorEl);

  const stats = useProjectTaskStats(data?.tasks ?? []);

  if (!isProjectIdValid) {
    return (
      <FullHeightCenter>
        <Typography variant="h5" gutterBottom>
          Invalid project identifier
        </Typography>
        <Typography color="text.secondary">
          Please return to the projects list and try again.
        </Typography>
      </FullHeightCenter>
    );
  }

  if (isLoading) {
    return (
      <FullHeightCenter>
        <CircularProgress />
      </FullHeightCenter>
    );
  }

  if (isError || !data) {
    return (
      <FullHeightCenter>
        <Typography variant="h5" gutterBottom>
          Error loading project details
        </Typography>
        <Typography color="text.secondary">
          {error instanceof Error ? error.message : "Please try again later."}
        </Typography>
      </FullHeightCenter>
    );
  }

  const { project, tasks } = data;

  const owner = users.find((user) => user.id === project.owner_id);
  const ownerName = owner?.username ?? `Owner #${project.owner_id}`;
  const dueDateLabel = project.due_date
    ? formatDate(project.due_date)
    : "No due date";
  const createdDateLabel = formatDate(project.created_at);

  const handleOpenActions = (event: MouseEvent<HTMLElement>) =>
    setActionsAnchorEl(event.currentTarget);
  const handleCloseActions = () => setActionsAnchorEl(null);

  const handleOpenCreateTask = () => {
    setCreateTaskOpen(true);
    handleCloseActions();
  };

  const handleCloseCreateTask = () => setCreateTaskOpen(false);

  const summaryCardId = "project-summary-card";

  return (
    <Box sx={pageShellSx}>
      <ProjectPageHeader
        projectName={project.name}
        projectId={project.id}
        status={project.status}
        ownerName={ownerName}
        dueDateLabel={dueDateLabel}
        createdDateLabel={createdDateLabel}
        onEditProject={() => {
          const target = document.getElementById(summaryCardId);
          if (target) {
            const top =
              target.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }}
        onAddTask={handleOpenCreateTask}
        onOpenActions={handleOpenActions}
        onCloseActions={handleCloseActions}
        actionsAnchorEl={actionsAnchorEl}
        actionsMenuOpen={actionsMenuOpen}
      />

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        <ProjectMetricsStrip stats={stats} />

        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: {
              xs: "1fr",
              lg: "minmax(0, 8fr) minmax(0, 4fr)",
            },
            alignItems: "start",
          }}
        >
          <Stack spacing={{ xs: 3, md: 4 }}>
            <Box id={summaryCardId}>
              <ProjectDetailsHeader
                project={project}
                users={users}
                isUsersLoading={usersLoading}
                onUpdate={async (payload) => {
                  await updateProject(payload);
                }}
              />
            </Box>

            <ProjectOverviewCard
              description={project.description}
              onUpdate={async (payload) => {
                await updateProject(payload);
              }}
            />

            <ProjectTasksCard
              projectId={safeProjectId}
              tasks={tasks}
              onTaskClick={(task) => setSelectedTask(task)}
              users={users}
              openCreateDialog={createTaskOpen}
              onCloseCreateDialog={handleCloseCreateTask}
              onOpenCreateDialog={handleOpenCreateTask}
            />
          </Stack>

          <Stack spacing={{ xs: 3, md: 4 }}>
            <ProjectInfoCard project={project} ownerName={ownerName} />
            <ProjectCommentsCard projectId={safeProjectId} />
          </Stack>
        </Box>
      </Container>

      <TaskDetailsDialog
        open={!!selectedTask}
        task={selectedTask}
        onClose={() => setSelectedTask(null)}
        projectId={safeProjectId}
        users={users}
      />
    </Box>
  );
}

function FullHeightCenter({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        bgcolor: colors.base.background,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 3,
      }}
    >
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
}
