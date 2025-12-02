import { alpha } from "@mui/material/styles";
import { Box, Paper, Typography } from "@mui/material";
import type { ReactElement } from "react";
import { colors } from "../../shared/styles/colors";

type DashboardStatProps = {
  icon: ReactElement;
  label: string;
  value: number;
  tone: "neutral" | "danger";
};

export default function DashboardStat({
  icon,
  label,
  value,
  tone,
}: DashboardStatProps) {
  const toneColor =
    tone === "neutral" ? colors.text.secondary : colors.priority.high;

  return (
    <Paper
      elevation={0}
      sx={{
        px: 2,
        py: 1.5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        gap: 1.25,
        border: `1px solid ${colors.border.default}`,
        background: colors.base.surface,
        color: colors.text.primary,
        minWidth: { xs: "100%", md: 220 },
      }}
    >
      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: alpha(colors.text.secondary, 0.14),
          color: toneColor,
        }}
      >
        {icon}
      </Box>
      <Box>
        <Typography variant="overline" sx={{ color: alpha(toneColor, 0.8) }}>
          {label}
        </Typography>
        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {value}
        </Typography>
      </Box>
    </Paper>
  );
}
