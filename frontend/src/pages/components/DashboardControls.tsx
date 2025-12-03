import {
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { alpha } from "@mui/material/styles";
import { colors } from "../../shared/styles/colors";
import { Project } from "../../types/project";
import {
  ProjectSortOption,
  statusFilters,
} from "../../shared/constants/dashboard";

type DashboardControlsProps = {
  search: string;
  onSearchChange: (value: string) => void;
  sortOption: ProjectSortOption;
  onSortChange: (value: ProjectSortOption) => void;
  statusFilter: "all" | Project["status"];
  onStatusChange: (value: "all" | Project["status"]) => void;
  onToggleExpandAll: () => void;
  forcedExpanded?: boolean;
  projectCount: number;
};

export function DashboardControls({
  search,
  onSearchChange,
  sortOption,
  onSortChange,
  statusFilter,
  onStatusChange,
  onToggleExpandAll,
  forcedExpanded,
  projectCount,
}: DashboardControlsProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        px: { xs: 2.5, md: 3 },
        py: { xs: 2, md: 2.5 },
        border: `1px solid ${colors.border.default}`,
        background: colors.base.surfaceAlt,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2,
        alignItems: { xs: "stretch", md: "center" },
        justifyContent: "space-between",
      }}
    >
      <Stack spacing={0.5}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Projects
        </Typography>
        <Typography variant="body2" sx={{ color: colors.text.tertiary }}>
          All projects in your workspace: {projectCount}
        </Typography>
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={1.5}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="flex-end"
      >
        <TextField
          size="small"
          placeholder="Search projects..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          sx={{ minWidth: { xs: "100%", md: 240 } }}
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
          label="Sort"
          value={sortOption}
          onChange={(event) =>
            onSortChange(event.target.value as ProjectSortOption)
          }
          sx={{ minWidth: 160 }}
        >
          <MenuItem value="recent">Recently updated</MenuItem>
          <MenuItem value="name">Name A–Z</MenuItem>
        </TextField>

        <ToggleButtonGroup
          exclusive
          value={statusFilter}
          onChange={(_, value) => value && onStatusChange(value)}
          size="small"
          color="primary"
          sx={{
            borderRadius: 1,
            overflow: "hidden",
            border: `1px solid ${colors.border.default}`,
            "& .MuiToggleButton-root": {
              borderRadius: 0,
              borderColor: "transparent",
              color: colors.text.primary,
              px: 1.75,
              py: 0.75,
              textTransform: "none",
            },
            "& .MuiToggleButtonGroup-grouped:not(:last-of-type)": {
              borderRight: `1px solid ${colors.border.default}`,
            },
            "& .MuiToggleButtonGroup-grouped:not(:first-of-type)": {
              marginLeft: 0,
            },
            "& .Mui-selected": {
              backgroundColor: alpha(colors.accent.primary.main, 0.12),
              color: colors.text.primary,
            },
            "& .MuiToggleButton-root:hover": {
              backgroundColor: alpha(colors.accent.primary.main, 0.08),
            },
          }}
        >
          {statusFilters.map((item) => (
            <ToggleButton key={item.value} value={item.value}>
              {item.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Button
          variant="text"
          onClick={onToggleExpandAll}
          sx={{ whiteSpace: "nowrap", color: colors.text.secondary }}
        >
          {forcedExpanded === true ? "Collapse all" : "Expand all"}
        </Button>
      </Stack>
    </Paper>
  );
}
