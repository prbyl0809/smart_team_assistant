import {
  IconButton,
  List,
  ListItem,
  MenuItem,
  Paper,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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
}) => {
  return (
    <ListItem disablePadding sx={{ mb: 1 }} onClick={() => onClick?.(task)}>
      <Paper
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: 2,
          borderColor: colors.border.subtle,
          backgroundColor: colors.base.surfaceAlt,
          px: 2.25,
          py: 1.25,
          cursor: onClick ? "pointer" : "default",
          transition: "border-color 0.2s ease, transform 0.2s ease",
          "&:hover": {
            borderColor: colors.accent.secondary.light,
            transform: "translateY(-1px)",
          },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "flex-start", md: "center" }}
          justifyContent="space-between"
          spacing={1.5}
        >
          <Stack spacing={0.5} flex={1} minWidth={0}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ wordBreak: "break-word" }}
            >
              {task.title}
            </Typography>
            {task.description ? (
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {task.description}
              </Typography>
            ) : null}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1} flexShrink={0}>
            <Select
              id={`${task.id}`}
              value={task.status}
              renderValue={(value) => statusLabel(value)}
              onChange={(event) => {
                event.stopPropagation();
                onChangeStatus(task.id, event.target.value as TaskStatus);
              }}
              onClick={(event) => event.stopPropagation()}
              size="small"
              sx={{
                bgcolor: STATUS_STYLES[task.status].background,
                color: STATUS_STYLES[task.status].text,
                borderRadius: 2,
                minWidth: 140,
                "& .MuiSelect-select": {
                  display: "flex",
                  alignItems: "center",
                  px: 1.25,
                  py: 0.5,
                  fontWeight: 600,
                  fontSize: "0.75rem",
                },
                "& .MuiSvgIcon-root": {
                  color: STATUS_STYLES[task.status].text,
                },
                "& fieldset": {
                  borderColor: STATUS_STYLES[task.status].border,
                },
                "&:hover fieldset, &.Mui-focused fieldset": {
                  borderColor: STATUS_STYLES[task.status].border,
                },
              }}
            >
              {(["todo", "in_progress", "done"] as TaskStatus[]).map(
                (status) => (
                  <MenuItem
                    key={status}
                    value={status}
                    sx={{
                      bgcolor: STATUS_STYLES[status].background,
                      color: STATUS_STYLES[status].text,
                      fontSize: "0.75rem",
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
                )
              )}
            </Select>

            {onClick && (
              <IconButton
                size="small"
                color="inherit"
                onClick={(event) => {
                  event.stopPropagation();
                  onClick(task);
                }}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${colors.border.subtle}`,
                }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            )}
          </Stack>
        </Stack>
      </Paper>
    </ListItem>
  );
};

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
        sx={{
          p: 3,
          borderRadius: 2,
          borderColor: colors.border.subtle,
          backgroundColor: colors.base.surfaceAlt,
        }}
      >
        <Typography color="text.secondary">
          No tasks match the selected filters.
        </Typography>
      </Paper>
    );
  }

  return (
    <List disablePadding>
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
