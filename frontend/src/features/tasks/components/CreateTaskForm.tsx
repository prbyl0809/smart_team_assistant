import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { useCreateTask } from "../hooks/useCreateTask";
import { TaskPriority, TaskStatus } from "../../../types/task";
import { User } from "../../../types/user";

type TaskFormData = {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  due_date: string;
  assignee_id: string;
};

type CreateTaskFormProps = {
  projectId: number;
  users: User[];
  onSubmitted?: () => void;
  onCancel: () => void;
  hideHeading?: boolean;
};

export default function CreateTaskForm({
  projectId,
  users,
  onSubmitted,
  onCancel,
  hideHeading = false,
}: CreateTaskFormProps) {
  const { register, handleSubmit, reset } = useForm<TaskFormData>({
    defaultValues: {
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      due_date: "",
      assignee_id: "",
    },
  });
  const { mutateAsync, isPending } = useCreateTask(projectId);

  const onSubmit = async (data: TaskFormData) => {
    await mutateAsync({
      title: data.title,
      description: data.description || "",
      priority: data.priority,
      status: data.status,
      due_date: data.due_date ? new Date(data.due_date).toISOString() : null,
      assignee_id: data.assignee_id ? Number(data.assignee_id) : null,
    });
    reset();
    onSubmitted?.();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      {!hideHeading && <Typography variant="h6">Add new task</Typography>}

      <TextField
        label="Title"
        fullWidth
        {...register("title", { required: true })}
        required
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        minRows={3}
        {...register("description")}
      />

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          label="Status"
          select
          fullWidth
          {...register("status", { required: true })}
        >
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in_progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        <TextField label="Priority" select fullWidth {...register("priority")}>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Stack>

      <TextField
        label="Due date"
        type="date"
        fullWidth
        InputLabelProps={{ shrink: true }}
        {...register("due_date")}
      />

      <TextField label="Assignee" select fullWidth {...register("assignee_id")}>
        <MenuItem value="">Unassigned</MenuItem>
        {users.map((user) => (
          <MenuItem key={user.id} value={String(user.id)}>
            {user.username}
          </MenuItem>
        ))}
      </TextField>

      <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
        <Button
          type="button"
          variant="text"
          onClick={() => {
            reset();
            onCancel();
          }}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" disabled={isPending}>
          {isPending ? "Creating..." : "Create task"}
        </Button>
      </Stack>
    </Box>
  );
}
