import {
  Box,
  FormControl,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { Task, TaskStatus } from "../../../types/task";
import { useUpdateTaskStatus } from "../hooks/useUpdateTaskStatus";

type TaskListProps = {
  tasks: Task[];
  projectId: number;
  onTaskClick?: (task: Task) => void;
};

const statusLabel = (status: TaskStatus) => {
  switch (status) {
    case "todo":
      return "TO DO";
    case "in_progress":
      return "IN PROGRESS";
    case "done":
      return "DONE";
    default:
      return status;
  }
};

const statusColor = (status: TaskStatus) => {
  switch (status) {
    case "todo":
      return "info";
    case "in_progress":
      return "warning";
    case "done":
      return "success";
    default:
      return "default";
  }
};

const TaskListItem = ({
  task,
  onChangeStatus,
  onClick,
}: {
  task: Task;
  onChangeStatus: (taskId: number, status: TaskStatus) => void;
  onClick?: (task: Task) => void;
}) => (
  <ListItem
    disablePadding
    sx={{ mb: 0.5 }}
    onClick={() => onClick?.(task)}
  >
    <Paper
      variant="outlined"
      sx={{
        px: 2,
        py: 1,
        width: "100%",
        bgcolor: "background.paper",
        cursor: onClick ? "pointer" : "default",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle1" fontWeight={500}>
            {task.title}
          </Typography>
        </Box>

        <FormControl>
          <Select
            id={`${task.id}`}
            value={task.status}
            renderValue={(value) => statusLabel(value)}
            onChange={(e) => {
              e.stopPropagation();
              onChangeStatus(task.id, e.target.value);
            }}
            onClick={(e) => e.stopPropagation()}
            sx={(theme) => {
              const key = statusColor(task.status);
              const palette: any = theme.palette;
              const tone = palette[key] ?? palette.primary;
              return {
                bgcolor: tone.main,
                color: tone.contrastText,
                borderRadius: 1,

                padding: 0,
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  p: 0.5,
                  height: "0.8rem",
                  fontWeight: "bold",
                  fontSize: "0.65rem",
                },
                "& .MuiSvgIcon-root": {
                  color: tone.contrastText,
                },
                "& fieldset": {
                  borderColor: tone.dark,
                },
                "&:hover fieldset": {
                  borderColor: tone.light,
                },
                "&.Mui-focused fieldset": {
                  borderColor: tone.light,
                },
              };
            }}
          >
            {(["todo", "in_progress", "done"] as TaskStatus[]).map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={(theme) => {
                  const key = statusColor(status);
                  const palette: any = theme.palette;
                  const tone = palette[key] ?? palette.primary;
                  return {
                    bgcolor: tone.main,
                    color: tone.contrastText,
                    fontSize: "0.6rem",
                    "&:hover": {
                      bgcolor: tone.dark,
                    },
                    "&.Mui-selected": {
                      bgcolor: tone.dark,
                      "&:hover": {
                        bgcolor: tone.dark,
                      },
                    },
                  };
                }}
              >
                {statusLabel(status)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
    </Paper>
  </ListItem>
);

export default function TaskList({
  tasks,
  projectId,
  onTaskClick,
}: TaskListProps) {
  const { mutate: updateStatus } = useUpdateTaskStatus(projectId);
  if (!tasks || tasks.length === 0) {
    return (
      <Paper
        variant="outlined"
        sx={{ p: 3, borderRadius: 2, bgcolor: "background.paper" }}
      >
        <Typography color="text.secondary">No tasks available.</Typography>
      </Paper>
    );
  }

  return (
    <List>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onChangeStatus={(taskId, status) => updateStatus({ taskId, status })}
          onClick={onTaskClick}
        />
      ))}
    </List>
  );
}
