export const colors = {
  base: {
    background: "#0A0A0B",
    surface: "#0E1114",
    surfaceAlt: "#111418",
    surfaceGlass: "rgba(15, 18, 22, 0.92)",
  },
  text: {
    primary: "#EDEFF4",
    secondary: "#AEB7C4",
    tertiary: "#8892A6",
  },
  accent: {
    primary: {
      main: "#22D3EE",
      light: "#67E8F9",
      dark: "#0891B2",
      hover: "#38E0F7",
      focusRing: "rgba(34,211,238,0.28)",
    },
    secondary: {
      main: "#8A97A9",
      light: "#A3B0C2",
      dark: "#707C8E",
    },
  },
  border: { subtle: "#191D24", default: "#252B36" },
  divider: "#1A1F29",
  effects: {
    depth:
      "linear-gradient(180deg, rgba(10,10,11,0.70) 0%, rgba(10,10,11,0.94) 68%, #0A0A0B 100%)",
    primaryButtonGradient: "linear-gradient(180deg, #22D3EE 0%, #0891B2 100%)",
  },
  shadows: {
    panel: "0 12px 32px rgba(0,0,0,0.22)",
    button: "0 8px 20px rgba(34,211,238,0.2)",
    buttonHover: "0 10px 24px rgba(34,211,238,0.3)",
  },
  input: {
    background: "#12171C",
    hover: "rgba(255,255,255,0.02)",
    focusBackground: "rgba(18,23,28,0.96)",
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
  kanban: { columnBg: "#12151A", cardBg: "#151921" },
  white: "#FFFFFF",
};
