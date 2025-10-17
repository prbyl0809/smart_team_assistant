/**
 * Centralized design tokens for custom colors that fall outside of the MUI palette.
 * Prefer pulling values from here (or the theme palette derived from these values)
 * instead of inlining hex strings throughout the codebase.
 */
export const colors = {
  navy: {
    backdrop: "#080F20",
    background: "#081022",
    surface: "#0C1528",
    surfaceAlt: "#0F172A",
    heroStart: "#182747",
    heroMid: "#21345E",
    heroEnd: "#342866",
  },
  text: {
    primary: "#EEF4FF",
    secondary: "rgba(196, 206, 232, 0.82)",
    tertiary: "rgba(232, 240, 255, 0.82)",
  },
  accent: {
    purple: {
      main: "#7F6DFF",
      light: "#A99CFF",
      dark: "#4B3ED4",
    },
    blue: {
      main: "#4FA6FF",
      light: "#7AC3FF",
      dark: "#1E6BB8",
    },
    cyan: "#5CC8FF",
    heroGlow: "rgba(210, 218, 255, 0.18)",
    heroSecondaryGlow: "rgba(90, 132, 210, 0.2)",
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
