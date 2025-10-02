import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const target =
    process.env.VITE_API_TARGET ||
    env.VITE_API_TARGET ||
    "http://localhost:8000";

  return {
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 5173,
      proxy: {
        "/api/": {
          target,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
