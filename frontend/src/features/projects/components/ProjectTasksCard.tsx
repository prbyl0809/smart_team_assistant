import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import TaskList from "../../tasks/components/TaskList";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import { glassPanel } from "../../../shared/styles/glassPanel";
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
  onTaskClick?: (task: Task) => void;
};

export default function ProjectTasksCard({
  projectId,
  tasks,
  stats,
  onTaskClick,
}: ProjectTasksCardProps) {
  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        ...glassPanel(theme),
      })}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h6">Tasks</Typography>
        <Stack direction="row" spacing={1}>
          <Chip
            label={`All ${stats.total}`}
            size="small"
            sx={{
              bgcolor: "rgba(157, 108, 255, 0.12)",
              color: "primary.light",
            }}
          />
          <Chip
            label={`In progress ${stats.inProgress}`}
            size="small"
            sx={{
              bgcolor: "rgba(255, 193, 79, 0.15)",
              color: "warning.light",
            }}
          />
          <Chip
            label={`Done ${stats.completed}`}
            size="small"
            sx={{
              bgcolor: "rgba(112, 234, 165, 0.18)",
              color: "success.light",
            }}
          />
        </Stack>
      </Stack>
      <TaskList tasks={tasks} projectId={projectId} onTaskClick={onTaskClick} />
      <Divider sx={{ my: 3 }} />
      <CreateTaskForm projectId={projectId} />
    </Paper>
  );
}
