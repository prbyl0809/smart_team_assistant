import {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { AUTH_UNAUTHORIZED_EVENT } from "../../../shared/constants/auth";

type TokenPayload = {
  exp?: number;
};

const parseToken = (token: string): TokenPayload | null => {
  try {
    const [, payload] = token.split(".");
    if (!payload) {
      return null;
    }
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(
      base64.length + ((4 - (base64.length % 4)) % 4),
      "="
    );
    const json = atob(padded);
    return JSON.parse(json);
  } catch (error) {
    console.warn("Failed to parse token payload", error);
    return null;
  }
};

const isTokenExpired = (token: string): boolean => {
  const payload = parseToken(token);
  if (!payload?.exp) {
    return true;
  }

  return payload.exp * 1000 <= Date.now();
};

export type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const loadInitialToken = () => {
  const storedToken = localStorage.getItem("token");
  if (!storedToken) {
    return null;
  }

  if (isTokenExpired(storedToken)) {
    localStorage.removeItem("token");
    return null;
  }

  return storedToken;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => loadInitialToken());

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
  }, []);

  const login = useCallback((newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    if (isTokenExpired(token)) {
      logout();
      return;
    }

    const payload = parseToken(token);
    if (!payload?.exp) {
      return;
    }

    const expirationDelay = payload.exp * 1000 - Date.now();
    const timeoutId = window.setTimeout(() => {
      logout();
    }, expirationDelay);

    return () => window.clearTimeout(timeoutId);
  }, [token, logout]);

  useEffect(() => {
    const handleUnauthorized = () => {
      const { pathname, search } = window.location;
      logout();

      if (pathname !== "/login") {
        const next = encodeURIComponent(pathname + search);
        window.location.assign(`/login?next=${next}`);
      }
    };

    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => {
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, handleUnauthorized);
    };
  }, [logout]);

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
