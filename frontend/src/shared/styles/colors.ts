/**
 * Centralized design tokens for custom colors that fall outside of the MUI palette.
 * Prefer pulling values from here (or the theme palette derived from these values)
 * instead of inlining hex strings throughout the codebase.
 */
export const colors = {
  navy: {
    backdrop: "#020712",
    background: "#030C19",
    surface: "#061225",
    surfaceAlt: "#0A1C33",
    heroStart: "#07162B",
    heroMid: "#0E2743",
    heroEnd: "#133757",
    highlight: "rgba(255, 255, 255, 0.08)",
  },
  text: {
    primary: "#EEF4FF",
    secondary: "rgba(196, 206, 232, 0.82)",
    tertiary: "rgba(232, 240, 255, 0.82)",
  },
  accent: {
    primary: {
      main: "#3C9DFF",
      light: "#68C3FF",
      dark: "#0F5CBF",
    },
    secondary: {
      main: "#1FCFF0",
      light: "#53DFF7",
      dark: "#0B8CB8",
    },
    cyan: "#4FEAFC",
    heroGlow: "rgba(84, 189, 255, 0.2)",
    heroSecondaryGlow: "rgba(35, 134, 212, 0.22)",
    heroHighlight: "rgba(255, 255, 255, 0.1)",
  },
  effects: {
    ray: "linear-gradient(195deg, rgba(86, 171, 255, 0.12) 0%, rgba(20, 61, 99, 0) 45%)",
    depth:
      "linear-gradient(180deg, rgba(2, 18, 44, 0.55) 0%, rgba(3, 12, 25, 0.92) 70%, #020712 100%)",
  },
  status: {
    backlog: "#707275",
    active: "#0284C7",
    blocked: "#DC2626",
    completed: "#16A34A",
  },
  statusUi: {
    todo: { background: "#2F3441", text: "#B9C2D6", border: "#465067" },
    inProgress: { background: "#3E341A", text: "#F5CD74", border: "#6B5222" },
    done: { background: "#1F3529", text: "#88DFA5", border: "#2F5C42" },
  },
  priority: {
    low: "#10B981",
    lowAlt: "#66BB6A",
    medium: "#F59E0B",
    high: "#EF4444",
  },
  kanban: {
    columnBg: "#1D1F2B",
    cardBg: "#2A2D3E",
  },
  white: "#FFFFFF",
};
