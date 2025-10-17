import { alpha } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { colors } from "./colors";

export const glassPanel = (theme: Theme) => {
  const panelBase = alpha(colors.navy.surface, 0.92);
  const highlight = colors.navy.highlight;
  const topGlow = alpha(theme.palette.primary.light, 0.08);
  const caustic = alpha(theme.palette.secondary.light, 0.06);
  const depthVeil = alpha(colors.navy.surfaceAlt, 0.9);
  const borderTint = alpha(theme.palette.primary.light, 0.18);

  return {
    p: { xs: 3, md: 4 },
    borderRadius: 2,
    border: `1px solid ${borderTint}`,
    backgroundImage: `
      radial-gradient(120% 140% at 50% -26%, ${topGlow} 0%, transparent 52%),
      linear-gradient(152deg, ${highlight} 12%, ${panelBase} 46%, ${caustic} 100%),
      linear-gradient(180deg, ${panelBase} 0%, ${depthVeil} 100%)
    `,
    boxShadow: `0 18px 42px ${alpha(
      theme.palette.common.black,
      0.55
    )}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.035)}`,
    backdropFilter: "blur(16px)",
  };
};
