import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useCreateTask } from "../hooks/useCreateTask";
import { TaskPriority } from "../../../types/task";

type TaskFormData = {
  title: string;
  description: string;
  priority: TaskPriority;
};

export default function CreateTaskForm({ projectId }: { projectId: number }) {
  const { register, handleSubmit, reset } = useForm<TaskFormData>();
  const { mutateAsync, isPending } = useCreateTask(projectId);

  const onSubmit = async (data: TaskFormData) => {
    await mutateAsync(data);
    reset();
  };

  return (
    <Box mt={4}>
      <Typography variant="h6">Add New Task</Typography>
      <FormControl onSubmit={handleSubmit(onSubmit)} component="form" fullWidth>
        <Stack spacing={2} mt={2}>
          <TextField
            label="Title"
            fullWidth
            {...register("title", { required: true })}
          />
          <TextField
            label="Description"
            fullWidth
            {...register("description")}
          />
          <Select defaultValue="medium" fullWidth {...register("priority")}>
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create Task"}
          </Button>
        </Stack>
      </FormControl>
    </Box>
  );
}
