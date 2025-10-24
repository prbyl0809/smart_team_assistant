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
  mt: 0,
  pt: { xs: 5.5, md: 6.5 },
  pb: { xs: 3, md: 4 },
  width: "100%",
  position: "relative",
  overflow: "hidden",
  backgroundColor: colors.base.surfaceAlt,
  borderBottom: `1px solid ${alpha(colors.border.default, 0.4)}`,
  boxShadow: `0 18px 40px ${alpha(theme.palette.common.black, 0.38)}`,
  color: theme.palette.text.primary,
  backgroundImage: "none",
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
