import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const isGet = (config.method ?? "get").toLowerCase() === "get";
  const isAuth = config.url?.startsWith("/auth/");
  const hasQuery = config.url?.includes("?");
  const looksLikeFile = /\.[a-z0-9]+$/i.test(config.url ?? "");

  if (
    config.url &&
    isGet &&
    !isAuth &&
    !hasQuery &&
    !looksLikeFile &&
    !config.url!.endsWith("/")
  ) {
    config.url = `${config.url}/`;
  }

  return config;
});

export default api;
