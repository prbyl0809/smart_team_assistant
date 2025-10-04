import { Paper, Typography, Box } from "@mui/material";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "../../../types/task";
import SortableTask from "./SortableTask";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  status: Task["status"];
  label: string;
  tasks: Task[];
};

export default function TaskColumn({ status, label, tasks }: Props) {
  const { setNodeRef } = useDroppable({
    id: status,
    data: {
      status,
    },
  });

  return (
    <Paper
      ref={setNodeRef}
      sx={{ p: 2, backgroundColor: "#1D1F2B", height: "100%" }}
    >
      <Typography variant="h6" sx={{ color: "white", mb: 2 }}>
        {label}
      </Typography>

      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <Box display="flex" flexDirection="column" gap={1}>
          {tasks.map((task) => (
            <SortableTask key={task.id} task={task} status={status} />
          ))}
        </Box>
      </SortableContext>
    </Paper>
  );
}
