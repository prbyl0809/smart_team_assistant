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
import { colors } from "../../../shared/styles/colors";
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

const STATUS_STYLES: Record<
  TaskStatus,
  { background: string; text: string; border: string }
> = {
  todo: {
    background: colors.statusUi.todo.background,
    text: colors.statusUi.todo.text,
    border: colors.statusUi.todo.border,
  },
  in_progress: {
    background: colors.statusUi.inProgress.background,
    text: colors.statusUi.inProgress.text,
    border: colors.statusUi.inProgress.border,
  },
  done: {
    background: colors.statusUi.done.background,
    text: colors.statusUi.done.text,
    border: colors.statusUi.done.border,
  },
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
  <ListItem disablePadding sx={{ mb: 0.5 }} onClick={() => onClick?.(task)}>
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
            sx={{
              bgcolor: STATUS_STYLES[task.status].background,
              color: STATUS_STYLES[task.status].text,
              borderRadius: 1,
              minWidth: 132,
              padding: 0,
              "& .MuiSelect-select": {
                display: "flex",
                alignItems: "center",
                px: 1,
                py: 0,
                height: "22px",
                fontWeight: "bold",
                fontSize: "0.65rem",
              },
              "& .MuiSvgIcon-root": {
                color: STATUS_STYLES[task.status].text,
              },
              "& fieldset": {
                borderColor: STATUS_STYLES[task.status].border,
              },
              "&:hover fieldset": {
                borderColor: STATUS_STYLES[task.status].border,
              },
              "&.Mui-focused fieldset": {
                borderColor: STATUS_STYLES[task.status].border,
              },
            }}
          >
            {(["todo", "in_progress", "done"] as TaskStatus[]).map((status) => (
              <MenuItem
                key={status}
                value={status}
                sx={{
                  bgcolor: STATUS_STYLES[status].background,
                  color: STATUS_STYLES[status].text,
                  fontSize: "0.6rem",
                  "&:hover": {
                    bgcolor: STATUS_STYLES[status].border,
                  },
                  "&.Mui-selected": {
                    bgcolor: STATUS_STYLES[status].border,
                    "&:hover": {
                      bgcolor: STATUS_STYLES[status].border,
                    },
                  },
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
