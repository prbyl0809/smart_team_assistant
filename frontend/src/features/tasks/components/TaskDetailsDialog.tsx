import { useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Task, TaskPriority, TaskStatus } from "../../../types/task";
import { User } from "../../../types/user";
import { useUpdateTask } from "../hooks/useUpdateTask";

type TaskDetailsDialogProps = {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  projectId: number;
  users: User[];
};

type FormValues = {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  due_date: string;
  assignee_id: string;
};

const toDateTimeLocal = (value: string | null) => {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 16);
};

const formatDisplayDateTime = (value: string) => {
  const formatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return formatter.format(new Date(value));
};

export default function TaskDetailsDialog({
  open,
  task,
  onClose,
  projectId,
  users,
}: TaskDetailsDialogProps) {
  const { mutateAsync, isPending } = useUpdateTask(projectId);
  const { register, handleSubmit, reset, formState } = useForm<FormValues>({
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "todo",
      priority: task?.priority ?? "medium",
      due_date: toDateTimeLocal(task?.due_date ?? null),
      assignee_id: task?.assignee_id ? String(task.assignee_id) : "",
    },
  });

  useEffect(() => {
    if (!task) {
      reset();
      return;
    }

    reset({
      title: task.title,
      description: task.description ?? "",
      status: task.status,
      priority: task.priority,
      due_date: toDateTimeLocal(task.due_date),
      assignee_id: task.assignee_id ? String(task.assignee_id) : "",
    });
  }, [task, reset]);

  const onSubmit = async (values: FormValues) => {
    if (!task) return;

    const payload = {
      title: values.title,
      description: values.description,
      status: values.status,
      priority: values.priority,
      due_date: values.due_date
        ? new Date(values.due_date).toISOString()
        : null,
      assignee_id: values.assignee_id ? Number(values.assignee_id) : null,
    };

    await mutateAsync({ taskId: task.id, updates: payload });
    onClose();
  };

  const handleClose = () => {
    if (isPending) return;
    onClose();
  };

  if (!task) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle
        sx={(theme) => ({
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: theme.palette.primary.main,
          px: { xs: 3, sm: 4 },
          pt: 3,
        })}
      >
        Edit Task
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 3, sm: 4 }, pb: 3 }}>
        <Stack
          key={task.id}
          component="form"
          spacing={2}
          mt={1}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Title"
            fullWidth
            required
            defaultValue={task.title}
            {...register("title", { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            minRows={3}
            defaultValue={task.description ?? ""}
            {...register("description")}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              select
              label="Status"
              fullWidth
              defaultValue={task.status}
              {...register("status", { required: true })}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in_progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
            <TextField
              select
              label="Priority"
              fullWidth
              defaultValue={task.priority}
              {...register("priority", { required: true })}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Stack>
          <TextField
            label="Due date"
            type="date"
            fullWidth
            {...register("due_date")}
            focused
          />
          <TextField
            select
            label="Assignee"
            fullWidth
            defaultValue={task.assignee_id ? String(task.assignee_id) : ""}
            {...register("assignee_id")}
          >
            <MenuItem value="">Unassigned</MenuItem>
            {users.map((user) => (
              <MenuItem key={user.id} value={String(user.id)}>
                {user.username}
              </MenuItem>
            ))}
          </TextField>

          <Box mt={2}>
            <Typography variant="body2" color="text.secondary">
              Created: {formatDisplayDateTime(task.created_at)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Updated: {formatDisplayDateTime(task.updated_at)}
            </Typography>
          </Box>

          <DialogActions
            sx={{
              px: 0,
              pt: 2,
              justifyContent: "space-between",
            }}
          >
            <Button onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isPending || !formState.isDirty}
            >
              {isPending ? "Saving..." : "Save changes"}
            </Button>
          </DialogActions>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
