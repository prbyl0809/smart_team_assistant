import {
  Alert,
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { ProjectPriority, ProjectStatus } from "../../../types/project";
import { useCreateProject } from "../hooks/useCreateProject";

type FormData = {
  name: string;
  description: string;
  due_date: string;
  status: ProjectStatus;
  priority: ProjectPriority;
  is_archived: boolean;
};

const statusOptions: { value: ProjectStatus; label: string }[] = [
  { value: "backlog", label: "Backlog" },
  { value: "active", label: "Active" },
  { value: "blocked", label: "Blocked" },
  { value: "completed", label: "Completed" },
];

const priorityOptions: { value: ProjectPriority; label: string }[] = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

export default function ProjectForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      due_date: "",
      status: "backlog",
      priority: "medium",
      is_archived: false,
    },
  });

  const mutation = useCreateProject();

  const onSubmit = (data: FormData) => {
    const payload = {
      name: data.name,
      description: data.description,
      due_date: data.due_date ? new Date(data.due_date).toISOString() : null,
      status: data.status,
      priority: data.priority,
      is_archived: data.is_archived,
    };

    mutation.mutate(payload, {
      onSuccess: () => reset(),
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          label="Project name"
          placeholder="e.g., Website redesign launch"
          fullWidth
          required
          {...register("name", { required: "Project name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Summary"
          placeholder="Give teammates context, goals, and scope."
          fullWidth
          multiline
          minRows={3}
          {...register("description")}
        />

        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}> */}
          <Grid size={2}>
            <TextField type="date" fullWidth {...register("due_date")} />
          </Grid>
          <Grid size={2}>
            <TextField
              select
              label="Status"
              fullWidth
              defaultValue={"backlog"}
              {...register("status")}
            >
              {statusOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={2}>
            <TextField
              select
              label="Priority"
              fullWidth
              defaultValue={"medium"}
              {...register("priority")}
            >
              {priorityOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid size={6}>
            <Stack spacing={1}>
              <Controller
                name="is_archived"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Switch
                        color="primary"
                        checked={field.value}
                        onChange={(event) =>
                          field.onChange(event.target.checked)
                        }
                      />
                    }
                    label="Archive immediately"
                  />
                )}
              />
              <Typography variant="caption" color="text.secondary">
                Keep this off the active list until you need it.
              </Typography>
            </Stack>
          </Grid>
        </Grid>

        {mutation.isError && (
          <Alert severity="error" variant="outlined">
            Failed to create project. Please try again.
          </Alert>
        )}

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="flex-end"
          alignItems={{ xs: "stretch", sm: "center" }}
        >
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
            size="large"
          >
            {mutation.isPending ? "Creating..." : "Create project"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
