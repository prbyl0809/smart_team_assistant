import { useMemo, useState } from "react";
import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import TaskList from "../../tasks/components/TaskList";
import CreateTaskForm from "../../tasks/components/CreateTaskForm";
import { glassPanel } from "../../../shared/styles/glassPanel";
import { colors } from "../../../shared/styles/colors";
import { Task } from "../../../types/task";

type TaskStats = {
  total: number;
  todo: number;
  inProgress: number;
  completed: number;
};

type ProjectTasksCardProps = {
  projectId: number;
  tasks: Task[];
  stats: TaskStats;
  onTaskClick?: (task: Task) => void;
};

type TaskFilter = "all" | "todo" | "in_progress" | "done";

const statusTokens: Record<
  Exclude<TaskFilter, "all">,
  { background: string; text: string; border: string }
> = {
  todo: colors.statusUi.todo,
  in_progress: colors.statusUi.inProgress,
  done: colors.statusUi.done,
};

export default function ProjectTasksCard({
  projectId,
  tasks,
  stats,
  onTaskClick,
}: ProjectTasksCardProps) {
  const [activeFilter, setActiveFilter] = useState<TaskFilter>("all");

  const filteredTasks = useMemo(() => {
    if (activeFilter === "all") return tasks;
    return tasks.filter((task) => task.status === activeFilter);
  }, [activeFilter, tasks]);

  const chipConfigs = [
    {
      key: "all" as TaskFilter,
      label: "All",
      count: stats.total,
      styles: {
        background: alpha(colors.accent.purple.main, 0.15),
        text: colors.accent.purple.light,
        border: alpha(colors.accent.purple.main, 0.4),
      },
    },
    {
      key: "todo" as TaskFilter,
      label: "To do",
      count: stats.todo,
      styles: statusTokens.todo,
    },
    {
      key: "in_progress" as TaskFilter,
      label: "In progress",
      count: stats.inProgress,
      styles: statusTokens.in_progress,
    },
    {
      key: "done" as TaskFilter,
      label: "Done",
      count: stats.completed,
      styles: statusTokens.done,
    },
  ];

  return (
    <Paper
      elevation={0}
      sx={(theme) => ({
        ...glassPanel(theme),
      })}
    >
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        gap={1.5}
        mb={2}
      >
        <Typography variant="h6">Tasks</Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {chipConfigs.map(({ key, label, count, styles }) => {
            const selected = activeFilter === key;
            const background = selected ? styles.background : "transparent";
            const textColor = selected ? styles.text : styles.text;
            const borderColor = styles.border;

            return (
              <Chip
                key={key}
                label={`${label}: ${count}`}
                size="small"
                onClick={() => setActiveFilter(key)}
                sx={{
                  bgcolor: background,
                  color: textColor,
                  borderRadius: 999,
                  border: `1px solid ${borderColor}`,
                  minWidth: 112,
                  "&:hover": {
                    bgcolor: selected
                      ? background
                      : alpha(styles.background, 0.35),
                  },
                }}
              />
            );
          })}
        </Stack>
      </Stack>
      <TaskList
        tasks={filteredTasks}
        projectId={projectId}
        onTaskClick={onTaskClick}
      />
      <Divider sx={{ my: 3 }} />
      <CreateTaskForm projectId={projectId} />
    </Paper>
  );
}
