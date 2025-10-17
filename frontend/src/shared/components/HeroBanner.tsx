import {
  Box,
  Container,
  type BoxProps,
  type ContainerProps,
} from "@mui/material";
import type { ReactNode } from "react";
import { alpha } from "@mui/material/styles";
import type { Theme } from "@mui/material/styles";
import { colors } from "../styles/colors";

const baseHeroSx = (theme: Theme) => ({
  mt: { xs: -2.5, md: -3 },
  pt: { xs: 5.5, md: 6.5 },
  pb: { xs: 4.5, md: 6 },
  width: "100%",
  position: "relative",
  overflow: "hidden",
  background: `linear-gradient(135deg, ${alpha(
    colors.navy.heroStart,
    0.96
  )} 0%, ${alpha(colors.navy.heroMid, 0.93)} 48%, ${alpha(
    colors.navy.heroEnd,
    0.9
  )} 100%)`,
  borderBottom: "1px solid rgba(90, 132, 210, 0.3)",
  boxShadow: "0 28px 54px rgba(9, 10, 30, 0.6)",
  color: theme.palette.text.primary,
  "&::before": {
    content: '""',
    position: "absolute",
    top: -120,
    right: -95,
    width: 260,
    height: 260,
    background: `radial-gradient(circle, ${colors.accent.heroGlow} 0%, rgba(210,218,255,0) 65%)`,
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: -180,
    left: -140,
    width: 360,
    height: 360,
    background: `radial-gradient(circle, ${colors.accent.heroSecondaryGlow} 0%, rgba(90,132,210,0) 70%)`,
  },
});

type HeroBannerProps = BoxProps & {
  children: ReactNode;
  containerProps?: ContainerProps;
  disableContainer?: boolean;
};

export default function HeroBanner({
  children,
  containerProps,
  disableContainer = false,
  sx,
  ...boxProps
}: HeroBannerProps) {
  const content = disableContainer ? (
    children
  ) : (
    <Container maxWidth="xl" {...containerProps}>
      {children}
    </Container>
  );

  return (
    <Box
      {...boxProps}
      sx={[baseHeroSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
    >
      {content}
    </Box>
  );
}
