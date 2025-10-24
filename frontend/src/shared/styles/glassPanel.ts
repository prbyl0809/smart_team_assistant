import { colors } from "./colors";

export const glassPanel = () => {
  const borderColor = colors.border.default;

  return {
    p: { xs: 3, md: 3.5 },
    borderRadius: 2,
    border: `1px solid ${borderColor}`,
    backgroundColor: colors.base.surfaceGlass,
    boxShadow: colors.shadows.panel,
    backdropFilter: "blur(14px)",
  };
};
