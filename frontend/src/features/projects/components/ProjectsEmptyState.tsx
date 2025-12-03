import { AlertColor, Box, Button, Paper, Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FolderOffOutlinedIcon from "@mui/icons-material/FolderOffOutlined";
import { alpha } from "@mui/material/styles";
import { glassPanel } from "../../../shared/styles/glassPanel";

type ProjectsEmptyStateProps = {
  onCreate: () => void;
  message?: string;
  subMessage?: string;
  severity?: AlertColor;
};

export function ProjectsEmptyState({
  onCreate,
  message = "No projects match these filters",
  subMessage = "Try a different search or start a fresh project to keep work moving.",
}: ProjectsEmptyStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        ...glassPanel(),
        p: { xs: 4, md: 5 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Box
        sx={(theme) => ({
          width: 72,
          height: 72,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mx: "auto",
          backgroundColor: alpha(theme.palette.primary.main, 0.08),
          color: theme.palette.primary.main,
        })}
      >
        <FolderOffOutlinedIcon fontSize="large" />
      </Box>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        {message}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {subMessage}
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={1} justifyContent="center">
        <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
          Create a project
        </Button>
      </Stack>
    </Paper>
  );
}

export default ProjectsEmptyState;
