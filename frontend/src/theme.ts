import { createTheme } from "@mui/material/styles";
import { colors } from "./shared/styles/colors";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: colors.accent.purple.main,
      light: colors.accent.purple.light,
      dark: colors.accent.purple.dark,
    },
    secondary: {
      main: colors.accent.blue.main,
      light: colors.accent.blue.light,
      dark: colors.accent.blue.dark,
    },
    background: {
      default: colors.navy.backdrop,
      paper: "rgba(14, 19, 34, 0.94)",
    },
    text: {
      primary: colors.text.primary,
      secondary: colors.text.secondary,
    },
    divider: "rgba(127, 170, 255, 0.22)",
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
            radial-gradient(circle at 10% 15%, rgba(111, 162, 255, 0.28), transparent 55%),
            radial-gradient(circle at 85% 20%, rgba(127, 109, 255, 0.32), transparent 60%),
            radial-gradient(circle at 35% 75%, rgba(56, 126, 255, 0.25), transparent 58%),
            linear-gradient(145deg, ${colors.navy.heroStart} 0%, ${colors.navy.heroMid} 32%, ${colors.navy.heroEnd} 68%, #121437 100%)
          `,
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
          backgroundColor: "rgba(9, 15, 27, 0.72)",
        },
        "::-webkit-scrollbar-thumb": {
          backgroundImage:
            "linear-gradient(180deg, rgba(79, 166, 255, 0.8), rgba(99, 122, 255, 0.78))",
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
        },
        containedPrimary: {
          backgroundImage:
            "linear-gradient(135deg, #7F6DFF 0%, #4254FF 45%, #4FA6FF 100%)",
          boxShadow:
            "0 8px 18px rgba(109, 75, 204, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
          "&:hover": {
            backgroundImage:
              "linear-gradient(135deg, #998BFF 0%, #4F64FF 50%, #6DC0FF 100%)",
            boxShadow:
              "0 12px 22px rgba(97, 70, 195, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
          },
        },
        outlined: {
          borderColor: "rgba(111, 162, 255, 0.5)",
          "&:hover": {
            borderColor: colors.accent.purple.main,
            backgroundColor: "rgba(127, 170, 255, 0.08)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(12, 21, 40, 0.9)",
          backgroundImage:
            "linear-gradient(170deg, rgba(111, 162, 255, 0.22), rgba(127, 109, 255, 0.12))",
          border: "1px solid rgba(111, 162, 255, 0.2)",
          boxShadow:
            "0 22px 42px rgba(10, 9, 24, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.04)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(8, 14, 28, 0.58)",
          backgroundImage:
            "linear-gradient(120deg, rgba(20, 34, 64, 0.65) 0%, rgba(26, 42, 86, 0.52) 60%, rgba(40, 36, 82, 0.58) 100%)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(90, 132, 210, 0.3)",
          boxShadow:
            "0 18px 36px rgba(4, 6, 18, 0.55), inset 0 1px 0 rgba(210, 218, 255, 0.07)",
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
            borderColor: "rgba(111, 162, 255, 0.3)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(111, 162, 255, 0.6)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#7F6DFF",
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
        color: "#8AD9FF",
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          border: "1px solid rgba(111, 162, 255, 0.2)",
          backgroundImage:
            "linear-gradient(165deg, rgba(111, 162, 255, 0.18), rgba(79, 166, 255, 0.1))",
        },
      },
    },
  },
});

export default theme;
