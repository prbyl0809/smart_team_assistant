import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import TaskList from "../../tasks/components/TaskList";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import { Task } from "../../../types/task";

type TaskStats = {
  total: number;
  inProgress: number;
  completed: number;
};

type ProjectTasksCardProps = {
  projectId: number;
  tasks: Task[];
  stats: TaskStats;
};

export default function ProjectTasksCard({
  projectId,
  tasks,
  stats,
}: ProjectTasksCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: 1,
        borderColor: (theme) => theme.palette.divider,
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">Tasks</Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={`All ${stats.total}`} size="small" color="default" />
          <Chip
            label={`In progress ${stats.inProgress}`}
            size="small"
            color="warning"
          />
          <Chip
            label={`Done ${stats.completed}`}
            size="small"
            color="success"
          />
        </Stack>
      </Stack>
      <TaskList tasks={tasks} projectId={projectId} />
      <Divider sx={{ my: 3 }} />
      <CreateTaskForm projectId={projectId} />
    </Paper>
  );
}
