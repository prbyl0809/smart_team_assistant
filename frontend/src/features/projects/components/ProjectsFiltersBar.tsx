import {
  Box,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import SortIcon from "@mui/icons-material/Sort";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import { Project } from "../../../types/project";

type SortKey = "recent" | "dueSoon" | "name";

type ProjectsFiltersBarProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: Project["status"] | "all";
  onStatusChange: (value: Project["status"] | "all") => void;
  priorityFilter: Project["priority"] | "all";
  onPriorityChange: (value: Project["priority"] | "all") => void;
  sortBy: SortKey;
  onSortChange: (value: SortKey) => void;
};

const statusOptions: (Project["status"] | "all")[] = [
  "all",
  "active",
  "backlog",
  "blocked",
  "completed",
];

const priorityOptions: (Project["priority"] | "all")[] = [
  "all",
  "high",
  "medium",
  "low",
];

export function ProjectsFiltersBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sortBy,
  onSortChange,
}: ProjectsFiltersBarProps) {
  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      spacing={1.5}
      alignItems={{ xs: "stretch", lg: "center" }}
      sx={{
        gap: 1.25,
        flexWrap: "wrap",
      }}
    >
      <TextField
        value={searchTerm}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search by name or description"
        size="small"
        sx={{
          width: { xs: "100%", lg: 320 },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        flexWrap="wrap"
        useFlexGap
      >
        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(event) =>
            onStatusChange(event.target.value as Project["status"] | "all")
          }
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
        >
          {statusOptions.map((value) => (
            <MenuItem key={value} value={value}>
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          size="small"
          label="Priority"
          value={priorityFilter}
          onChange={(event) =>
            onPriorityChange(event.target.value as Project["priority"] | "all")
          }
          sx={{ minWidth: { xs: "100%", sm: 160 } }}
        >
          {priorityOptions.map((value) => (
            <MenuItem key={value} value={value}>
              {value === "all"
                ? "Any priority"
                : value.charAt(0).toUpperCase() + value.slice(1)}
            </MenuItem>
          ))}
        </TextField>
      </Stack>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          ml: { lg: "auto" },
        }}
      >
        <SortIcon fontSize="small" />
        <ToggleButtonGroup
          exclusive
          value={sortBy}
          onChange={(_, value) => value && onSortChange(value)}
          size="small"
          color="primary"
          sx={{
            "& .MuiToggleButton-root": {
              borderRadius: 0,
              borderColor: (theme) => alpha(theme.palette.divider, 0.6),
              px: 1.75,
              py: 0.75,
            },
            "& .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
              borderRight: "none",
            },
            "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
              marginLeft: 0,
            },
          }}
        >
          <ToggleButton value="recent">Updated</ToggleButton>
          <ToggleButton value="dueSoon">Deadline</ToggleButton>
          <ToggleButton value="name">Name</ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Stack>
  );
}

export default ProjectsFiltersBar;
