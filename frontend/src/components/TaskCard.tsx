import { Paper, Typography } from "@mui/material";
import { Task } from "../types/task";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        backgroundColor: "#2a2d3e",
        color: "#fff",
        borderRadius: 2,
        borderLeft: `6px solid ${
          task.priority === "high"
            ? "#ef5350"
            : task.priority === "medium"
            ? "#ffa726"
            : "#66bb6a"
        }`,
      }}
    >
      <Typography variant="subtitle1" fontWeight="bold">
        {task.title}
      </Typography>
      <Typography variant="body2">{task.description}</Typography>
    </Paper>
  );
}
