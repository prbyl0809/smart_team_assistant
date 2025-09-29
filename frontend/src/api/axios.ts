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

  if (
    config.url &&
    config.url.startsWith("/") &&
    !config.url.endsWith("/") &&
    !config.url.includes("?") &&
    !/\.[a-z0-9]+$/i.test(config.url)
  ) {
    config.url = `${config.url}/`;
  }

  return config;
});

export default api;
