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

  if (!isGet) {
    const endsWithIdSlash = /\/(\d+)\/$/.test(urlForChecks);
    if (endsWithIdSlash && config.url?.endsWith("/")) {
      config.url = config.url.slice(0, -1);
    }
  }

  return config;
});

export default api;
