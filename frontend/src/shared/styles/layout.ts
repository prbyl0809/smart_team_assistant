import type { SxProps, Theme } from "@mui/material/styles";
import { colors } from "./colors";

export const pageShellSx: SxProps<Theme> = {
  bgcolor: colors.base.background,
  mx: { xs: -2.5, md: -4 },
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
  gap: { xs: 3, md: 4 },
};
