import {
  Box,
  Breadcrumbs,
  Button,
  Chip,
  Divider,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { alpha } from "@mui/material/styles";
import { MouseEvent } from "react";
import { Link as RouterLink } from "react-router-dom";

import { colors } from "../../../shared/styles/colors";

type ProjectPageHeaderProps = {
  projectName: string;
  projectId: number;
  status: string;
  ownerName: string;
  dueDateLabel: string;
  createdDateLabel: string;
  onEditProject: () => void;
  onAddTask: () => void;
  actionsAnchorEl: HTMLElement | null;
  actionsMenuOpen: boolean;
  onOpenActions: (event: MouseEvent<HTMLElement>) => void;
  onCloseActions: () => void;
};

export function ProjectPageHeader({
  projectName,
  projectId,
  status,
  ownerName,
  dueDateLabel,
  createdDateLabel,
  onEditProject,
  onAddTask,
  actionsAnchorEl,
  actionsMenuOpen,
  onOpenActions,
  onCloseActions,
}: ProjectPageHeaderProps) {
  return (
    <Box
      sx={{
        position: "relative",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
        width: "100vw",
        borderBottom: `1px solid ${colors.border.subtle}`,
        backgroundColor: colors.base.surface,
        py: { xs: 2.5, md: 3 },
        mb: { xs: 1, md: 1.5 },
      }}
    >
      <Box
        sx={(theme) => ({
          maxWidth: theme.breakpoints.values.xl,
          margin: "0 auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: theme.spacing(1.5),
          paddingLeft: theme.spacing(2.5),
          paddingRight: theme.spacing(2.5),
          [theme.breakpoints.up("md")]: {
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: theme.spacing(7),
            paddingRight: theme.spacing(7),
          },
        })}
      >
        <Breadcrumbs
          aria-label="breadcrumb"
          separator=">"
          sx={{ color: colors.text.secondary, "& a": { color: "inherit" } }}
        >
          <Link component={RouterLink} to="/projects" underline="hover">
            Projects
          </Link>
          <Typography color="text.primary">{projectName}</Typography>
        </Breadcrumbs>

        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
        >
          <Stack spacing={1} alignItems="flex-start">
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "flex-start", sm: "center" }}
              spacing={1.5}
            >
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {projectName}
              </Typography>
              <Chip
                label={status.replace("_", " ")}
                size="small"
                sx={(theme) => ({
                  textTransform: "capitalize",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  px: 1.5,
                  backgroundColor: alpha(theme.palette.secondary.main, 0.16),
                  color: theme.palette.secondary.light,
                  border: `1px solid ${alpha(
                    theme.palette.secondary.main,
                    0.32
                  )}`,
                })}
              />
            </Stack>
            <Typography variant="body2" color="text.secondary">
              Project key: #{projectId}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1.5} alignItems="center">
            <Button
              variant="outlined"
              startIcon={<EditOutlinedIcon />}
              onClick={onEditProject}
              sx={{ minHeight: 40 }}
            >
              Edit details
            </Button>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAddTask}
              sx={{ minHeight: 40 }}
            >
              Add task
            </Button>
            <Tooltip title="More actions">
              <IconButton
                aria-label="More actions"
                onClick={onOpenActions}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${colors.border.subtle}`,
                  color: colors.text.secondary,
                  width: 40,
                  height: 40,
                }}
              >
                <MoreHorizIcon />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={actionsAnchorEl}
              open={actionsMenuOpen}
              onClose={onCloseActions}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem onClick={onEditProject}>Edit project</MenuItem>
              <MenuItem onClick={onAddTask}>Create task</MenuItem>
              <MenuItem disabled>Archive project</MenuItem>
            </Menu>
          </Stack>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 3 }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{ borderColor: alpha(colors.text.secondary, 0.1) }}
            />
          }
          sx={{
            color: colors.text.secondary,
            "& .meta-label": {
              fontSize: "0.75rem",
              textTransform: "uppercase",
            },
            "& .meta-value": { color: colors.text.primary, fontWeight: 500 },
          }}
        >
          <Stack spacing={0.25}>
            <Typography className="meta-label">Owner</Typography>
            <Typography className="meta-value">{ownerName}</Typography>
          </Stack>
          <Stack spacing={0.25}>
            <Typography className="meta-label">Due date</Typography>
            <Typography className="meta-value">{dueDateLabel}</Typography>
          </Stack>
          <Stack spacing={0.25}>
            <Typography className="meta-label">Created</Typography>
            <Typography className="meta-value">{createdDateLabel}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Box>
    // </Box>
  );
}
