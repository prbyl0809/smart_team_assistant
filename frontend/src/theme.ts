import { createTheme } from "@mui/material/styles";
import { colors } from "./shared/styles/colors";

const theme = createTheme({
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
    background: {
      default: colors.navy.backdrop,
      paper: "rgba(14, 19, 34, 0.94)",
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    divider: "rgba(60, 157, 255, 0.22)",
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
    h4: {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "0.015em",
    },
    button: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          minHeight: "100vh",
          backgroundColor: colors.navy.backdrop,
          backgroundImage: `
            ${colors.effects.ray},
            radial-gradient(circle at 48% -18%, ${colors.accent.heroHighlight}, transparent 68%),
            radial-gradient(circle at 18% 24%, rgba(68, 155, 232, 0.18), transparent 60%),
            radial-gradient(circle at 82% 22%, rgba(31, 207, 240, 0.2), transparent 64%),
            radial-gradient(circle at 34% 78%, rgba(48, 130, 214, 0.14), transparent 60%),
            ${colors.effects.depth}
          `,
          backgroundBlendMode:
            "screen, screen, screen, soft-light, normal, normal",
          backgroundAttachment: "fixed",
          color: colors.text.primary,
        },
        "#root": {
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        },
        "::-webkit-scrollbar": {
          width: 10,
          height: 10,
        },
        "::-webkit-scrollbar-track": {
          backgroundColor: "rgba(6, 12, 24, 0.75)",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundImage:
            "linear-gradient(180deg, rgba(60, 157, 255, 0.8), rgba(31, 207, 240, 0.78))",
          borderRadius: 10,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          paddingInline: "1.4rem",
          paddingBlock: "0.5rem",
          letterSpacing: "0.04em",
          color: colors.text.primary,
          fontWeight: 600,
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            color: "inherit",
          },
        },
        contained: {
          color: colors.white,
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            color: colors.white,
          },
        },
        containedPrimary: {
          backgroundImage:
            "linear-gradient(135deg, #0d60ccff 0%, #2675c0ff 45%, #178497ff 100%)",
          boxShadow:
            "0 8px 18px rgba(15, 92, 191, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
          "&:hover": {
            backgroundImage:
              "linear-gradient(135deg, #2A8EFF 0%, #27A7FF 50%, #3DE2FF 100%)",
            boxShadow:
              "0 12px 22px rgba(14, 91, 189, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
          },
        },
        outlined: {
          borderColor: "rgba(60, 157, 255, 0.5)",
          color: colors.text.primary,
          "&:hover": {
            borderColor: colors.accent.primary.main,
            backgroundColor: "rgba(31, 207, 240, 0.08)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(4, 12, 25, 0.9)",
          backgroundImage: `
            linear-gradient(155deg, rgba(255, 255, 255, 0.045) 6%, rgba(4, 12, 25, 0) 46%),
            linear-gradient(170deg, rgba(60, 157, 255, 0.12), rgba(31, 207, 240, 0.07))
          `,
          border: "1px solid rgba(60, 157, 255, 0.18)",
          boxShadow:
            "0 22px 42px rgba(3, 8, 18, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(3, 10, 20, 0.6)",
          backgroundImage: `
            linear-gradient(118deg, rgba(255, 255, 255, 0.035) 0%, rgba(3, 10, 20, 0.02) 25%),
            linear-gradient(120deg, rgba(14, 35, 62, 0.6) 0%, rgba(10, 52, 82, 0.54) 58%, rgba(15, 48, 78, 0.58) 100%)
          `,
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(60, 157, 255, 0.28)",
          boxShadow:
            "0 18px 36px rgba(4, 10, 22, 0.58), inset 0 1px 0 rgba(210, 238, 255, 0.07)",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 14,
          backdropFilter: "blur(22px)",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(60, 157, 255, 0.3)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(60, 157, 255, 0.6)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: colors.accent.primary.main,
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingTop: "2.5rem",
          paddingBottom: "2.5rem",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        underline: "hover",
        color: "#74DBFF",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid rgba(60, 157, 255, 0.2)",
          backgroundColor: "rgba(4, 12, 25, 0.86)",
          backgroundImage: `
            linear-gradient(150deg, rgba(255, 255, 255, 0.035) 10%, rgba(4, 12, 25, 0) 42%),
            linear-gradient(165deg, rgba(60, 157, 255, 0.1), rgba(31, 207, 240, 0.06))
          `,
        },
      },
    },
  },
});

export default theme;
