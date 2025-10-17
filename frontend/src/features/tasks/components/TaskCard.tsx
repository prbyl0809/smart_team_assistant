import { Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { colors } from "../../../shared/styles/colors";
import { Task } from "../../../types/task";

type Props = {
  task: Task;
};

const priorityAccent = {
  high: colors.priority.high,
  medium: colors.priority.medium,
  low: colors.priority.lowAlt,
};

export default function TaskCard({ task }: Props) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        backgroundColor: colors.kanban.cardBg,
        color: colors.text.primary,
        borderRadius: 2,
        border: `1px solid ${alpha(colors.accent.purple.main, 0.14)}`,
        borderLeft: `6px solid ${priorityAccent[task.priority]}`,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {task.title}
      </Typography>
    </Paper>
  );
}
