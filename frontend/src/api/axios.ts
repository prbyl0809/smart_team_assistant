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

  const originalUrl = config.url ?? "";
  const isHttpAbsolute = /^https?:\/\//i.test(originalUrl);
  if (!isHttpAbsolute) {
    let u = originalUrl;
    if (!u.startsWith("/")) u = `/${u}`;
    if (!u.startsWith("/api/")) u = `/api${u}`;
    config.url = u;
    config.baseURL = "";
  }

  const urlForChecks = (config.url ?? "").replace(/^\/api/, "");
  const method = (config.method ?? "get").toLowerCase();
  const isGet = method === "get";
  const isAuth = urlForChecks.startsWith("/auth/");
  const hasQuery = urlForChecks.includes("?");
  const looksLikeFile = /\.[a-z0-9]+$/i.test(urlForChecks);
  const endsWithId = /\/(\d+)(?:\/?)(?:\?.*)?$/.test(urlForChecks);

  if (config.url && !isAuth && !hasQuery && !looksLikeFile) {
    const hasTrailingSlash = config.url.endsWith("/");
    if (endsWithId) {
      if (hasTrailingSlash) config.url = config.url.slice(0, -1);
    } else if (isGet) {
      if (!hasTrailingSlash) config.url = `${config.url}/`;
    }
  }

  return config;
});

export default api;
