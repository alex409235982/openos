import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(() => localStorage.getItem("openos_access") || "");
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      if (!accessToken) {
        setReady(true);
        return;
      }
      try {
        const me = await apiRequest("/api/auth/me", { token: accessToken });
        setUser(me.user);
      } catch {
        setUser(null);
        setAccessToken("");
        localStorage.removeItem("openos_access");
      } finally {
        setReady(true);
      }
    };
    run();
  }, []);

  const login = async (email, password, remember) => {
    const data = await apiRequest("/api/auth/login", { method: "POST", body: { email, password, remember } });
    setAccessToken(data.accessToken);
    localStorage.setItem("openos_access", data.accessToken);
    setUser(data.user);
  };

  const signup = async (name, email, password) => {
    const data = await apiRequest("/api/auth/signup", { method: "POST", body: { name, email, password } });
    setAccessToken(data.accessToken);
    localStorage.setItem("openos_access", data.accessToken);
    setUser(data.user);
  };

  const logout = async () => {
    try {
      await apiRequest("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      setAccessToken("");
      localStorage.removeItem("openos_access");
    }
  };

  const value = useMemo(() => ({
    user,
    accessToken,
    ready,
    login,
    signup,
    logout
  }), [user, accessToken, ready]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}