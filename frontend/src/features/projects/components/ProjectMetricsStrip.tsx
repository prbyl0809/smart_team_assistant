import { Box, Typography } from "@mui/material";
import { TaskSummaryStat } from "../hooks/useProjectTaskStats";
import { colors } from "../../../shared/styles/colors";

type ProjectMetricsStripProps = {
  stats: TaskSummaryStat[];
};

export function ProjectMetricsStrip({ stats }: ProjectMetricsStripProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: { xs: 1.5, md: 2 },
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(4, minmax(0, 1fr))",
        },
      }}
    >
      {stats.map((stat) => (
        <Box
          key={stat.label}
          sx={{
            borderRadius: 2,
            border: `1px solid ${colors.border.subtle}`,
            backgroundColor: colors.base.surface,
            px: 2.5,
            py: 2,
            display: "flex",
            flexDirection: "column",
            gap: 0.75,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {stat.label}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 600, color: stat.color }}>
            {stat.value}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
