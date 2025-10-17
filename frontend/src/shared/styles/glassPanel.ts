import { alpha } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { colors } from "./colors";

export const glassPanel = (theme: Theme) => {
  const navy = alpha(colors.navy.surface, 0.95);
  const violetGlow = alpha(theme.palette.primary.main, 0.18);
  const canvas = alpha(theme.palette.background.paper, 0.94);
  const borderTint = alpha(theme.palette.secondary.main, 0.28);

  return {
    p: { xs: 3, md: 4 },
    borderRadius: 2,
    border: `1px solid ${borderTint}`,
    backgroundImage: `linear-gradient(165deg, ${navy} 0%, ${violetGlow} 55%, ${canvas} 100%)`,
    boxShadow: `0 22px 44px ${alpha(
      theme.palette.common.black,
      0.55
    )}, inset 0 1px 0 ${alpha(theme.palette.common.white, 0.04)}`,
    backdropFilter: "blur(14px)",
  };
};
