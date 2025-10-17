import type { SxProps, Theme } from "@mui/material/styles";
import { colors } from "./colors";

export const pageShellSx: SxProps<Theme> = {
  bgcolor: colors.navy.background,
  mx: { xs: -2.5, md: -4 },
  minHeight: "100%",
  display: "flex",
  flexDirection: "column",
};
