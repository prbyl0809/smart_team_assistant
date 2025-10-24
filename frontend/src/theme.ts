import { alpha, createTheme } from "@mui/material/styles";
import { colors } from "./shared/styles/colors";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.accent.primary.main,
      light: colors.accent.primary.light,
      dark: colors.accent.primary.dark,
    },
    secondary: {
      main: colors.accent.secondary.main,
      light: colors.accent.secondary.light,
      dark: colors.accent.secondary.dark,
    },
    background: { default: colors.base.background, paper: colors.base.surface },
    text: { primary: colors.text.primary, secondary: colors.text.secondary },
    divider: colors.divider,
    error: { main: "#F87171" },
    success: { main: "#22C55E" },
    warning: { main: "#F59E0B" },
  },

  shape: { borderRadius: 10 },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: colors.base.background,
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          background: colors.base.surfaceGlass,
          border: `1px solid ${colors.border.default}`,
          boxShadow: colors.shadows.panel,
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "24px",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
        },
        containedPrimary: {
          minHeight: 48,
          background: colors.effects.primaryButtonGradient,
          color: colors.white,
          letterSpacing: "0.015em",
          boxShadow: colors.shadows.button,
          "&:hover": {
            boxShadow: colors.shadows.buttonHover,
          },
          "&:active": { transform: "translateY(1px)" },
        },
        outlinedSecondary: {
          borderColor: colors.border.default,
          color: colors.accent.primary.light,
          "&:hover": {
            borderColor: alpha(colors.border.default, 0.8),
            backgroundColor: "rgba(255,255,255,0.02)",
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: "outlined", size: "medium" },
      styleOverrides: {
        root: {
          background: colors.input.background,
          borderRadius: 12,
          "& .MuiFilledInput-root": {
            borderRadius: 12,
            backgroundColor: "transparent",
            border: `1px solid ${alpha(colors.border.default, 0.6)}`,
            "&:hover": {
              backgroundColor: colors.input.hover,
              borderColor: colors.border.default,
            },
            "&.Mui-focused": {
              backgroundColor: colors.input.focusBackground,
              borderColor: colors.accent.primary.main,
              boxShadow: `0 0 0 2px ${colors.accent.primary.focusRing}`,
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.text.secondary,
            "&.Mui-focused": { color: colors.text.primary },
          },
        },
      },
    },

    MuiLink: {
      defaultProps: {
        underline: "hover",
        color: colors.accent.primary.light,
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          "&.MuiAlert-standardInfo": {
            backgroundColor: "rgba(16,20,26,0.75)",
            border: `1px solid ${colors.border.default}`,
            color: colors.text.primary,
          },
          "&.MuiAlert-standardError": {
            backgroundColor: "rgba(248,113,113,0.12)",
            border: "1px solid rgba(248,113,113,0.35)",
          },
        },
      },
    },
  },
});

export default theme;
