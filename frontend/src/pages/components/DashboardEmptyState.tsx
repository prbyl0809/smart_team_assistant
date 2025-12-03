import { alpha } from "@mui/material/styles";
import { Paper, Typography } from "@mui/material";
import { colors } from "../../shared/styles/colors";

export function DashboardEmptyState() {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 3,
        p: 3,
        border: `1px dashed ${colors.border.default}`,
        background: alpha(colors.text.secondary, 0.06),
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
        No projects match your filters
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Clear the search or pick another status to see your drag & drop board.
      </Typography>
    </Paper>
  );
}
