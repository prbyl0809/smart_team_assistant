import {
  Box,
  Button,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

import TaskList from "../../tasks/components/TaskList";
import CreateTaskDialog from "../../tasks/components/CreateTaskDialog";

import { colors } from "../../../shared/styles/colors";
import { Task } from "../../../types/task";
import { User } from "../../../types/user";
import {
  TaskFilterValue,
  TaskSortOption,
  useTaskFilters,
} from "../hooks/useTaskFilters";

type ProjectTasksCardProps = {
  projectId: number;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  users: User[];
  openCreateDialog: boolean;
  onOpenCreateDialog: () => void;
  onCloseCreateDialog: () => void;
};

export default function ProjectTasksCard({
  projectId,
  tasks,
  onTaskClick,
  users,
  openCreateDialog,
  onOpenCreateDialog,
  onCloseCreateDialog,
}: ProjectTasksCardProps) {
  const { filteredTasks, filter, setFilter, search, setSearch, sort, setSort } =
    useTaskFilters(tasks);

  return (
    <Box
      sx={{
        borderRadius: 2,
        border: `1px solid ${colors.border.subtle}`,
        backgroundColor: colors.base.surface,
        px: { xs: 2.5, md: 3 },
        py: { xs: 2.5, md: 3 },
        display: "flex",
        flexDirection: "column",
        gap: 2.5,
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
      >
        <Stack spacing={0.5}>
          <Typography variant="h6">Work items</Typography>
          <Typography variant="body2" color="text.secondary">
            Filter, sort, and track execution progress across the team.
          </Typography>
        </Stack>

        <Button variant="contained" onClick={onOpenCreateDialog}>
          Create task
        </Button>
      </Stack>

      <TaskFiltersBar
        filter={filter}
        onFilterChange={setFilter}
        search={search}
        onSearchChange={setSearch}
        sort={sort}
        onSortChange={setSort}
      />

      <TaskList
        tasks={filteredTasks}
        projectId={projectId}
        onTaskClick={onTaskClick}
      />

      <CreateTaskDialog
        open={openCreateDialog}
        onClose={onCloseCreateDialog}
        projectId={projectId}
        users={users}
      />
    </Box>
  );
}

type TaskFiltersBarProps = {
  filter: TaskFilterValue;
  onFilterChange: (value: TaskFilterValue) => void;
  search: string;
  onSearchChange: (value: string) => void;
  sort: TaskSortOption;
  onSortChange: (value: TaskSortOption) => void;
};

function TaskFiltersBar({
  filter,
  onFilterChange,
  search,
  onSearchChange,
  sort,
  onSortChange,
}: TaskFiltersBarProps) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={2}
      alignItems={{ xs: "stretch", lg: "center" }}
      justifyContent="space-between"
    >
      <ToggleButtonGroup
        value={filter}
        exclusive
        onChange={(_, value) => value && onFilterChange(value)}
        aria-label="Task filter"
        sx={{
          borderRadius: 2,
          borderColor: colors.border.subtle,
          "& .MuiToggleButton-root": {
            px: 2,
            fontWeight: 500,
            textTransform: "none",
            "&.Mui-selected": {
              backgroundColor: colors.base.surfaceAlt,
            },
          },
        }}
      >
        <ToggleButton value="all" aria-label="All tasks">
          All
        </ToggleButton>
        <ToggleButton value="todo" aria-label="To do">
          To do
        </ToggleButton>
        <ToggleButton value="in_progress" aria-label="In progress">
          In progress
        </ToggleButton>
        <ToggleButton value="done" aria-label="Done">
          Done
        </ToggleButton>
      </ToggleButtonGroup>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        alignItems={{ xs: "stretch", sm: "center" }}
      >
        <TextField
          size="small"
          placeholder="Search tasks"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          size="small"
          value={sort}
          onChange={(event) =>
            onSortChange(event.target.value as TaskSortOption)
          }
          sx={{ minWidth: 180 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FilterListIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        >
          <MenuItem value="created_desc">Newest first</MenuItem>
          <MenuItem value="created_asc">Oldest first</MenuItem>
          <MenuItem value="title_asc">Title A → Z</MenuItem>
        </TextField>
      </Stack>
    </Stack>
  );
}
