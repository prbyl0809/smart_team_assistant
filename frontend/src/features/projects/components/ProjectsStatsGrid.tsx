import { Box, Paper, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { glassPanel } from "../../../shared/styles/glassPanel";

export type StatCardData = {
  label: string;
  value: number;
  caption: string;
  icon: React.ReactElement;
  palette: "primary" | "success" | "warning" | "info";
  ratio?: number; // 0..1
};

type ProjectsStatsGridProps = {
  stats: StatCardData[];
};

export function ProjectsStatsGrid({ stats }: ProjectsStatsGridProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 260px))",
        justifyContent: "left",
        justifyItems: "stretch",
      }}
    >
      {stats.map((stat) => (
        <Paper
          key={stat.label}
          elevation={0}
          sx={{
            ...glassPanel(),
            p: 3.25,
            height: "100%",
            minHeight: 120,
            display: "flex",
            flexDirection: "column",
            gap: 1.25,
            borderColor: (theme) =>
              alpha(theme.palette[stat.palette].main, 0.28),
            backgroundImage: (theme) =>
              `linear-gradient(180deg, ${alpha(
                theme.palette[stat.palette].main,
                0.08
              )} 0%, transparent 100%)`,
          }}
        >
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette[stat.palette].main, 0.2),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: (theme) => theme.palette[stat.palette].main,
            }}
          >
            {stat.icon}
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="inherit">
              {stat.label}
            </Typography>
          </Box>
          <Typography
            variant="caption"
            fontSize={"0.875rem"}
            sx={{
              color: (theme) => theme.palette.text.secondary,
            }}
          >
            {stat.caption}
          </Typography>
          {typeof stat.ratio === "number" && (
            <Box sx={{ mt: 0.5 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 0.5,
                  color: (theme) => theme.palette.text.secondary,
                }}
              >
                <Typography variant="caption">
                  {Math.round(stat.ratio * 100)}%
                </Typography>
                <Typography variant="caption">of total</Typography>
              </Box>
              <Box
                sx={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: (theme) =>
                    alpha(theme.palette[stat.palette].main, 0.12),
                  overflow: "hidden",
                }}
              >
                <Box
                  sx={{
                    width: `${Math.min(Math.max(stat.ratio, 0), 1) * 100}%`,
                    height: "100%",
                    backgroundImage: (theme) =>
                      `linear-gradient(90deg, ${alpha(
                        theme.palette[stat.palette].main,
                        0.4
                      )}, ${theme.palette[stat.palette].main})`,
                  }}
                />
              </Box>
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
}

export default ProjectsStatsGrid;
