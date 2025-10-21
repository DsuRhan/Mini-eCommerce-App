import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type AuthContextType = {
  user: { name: string; avatar?: string } | null;
  login: (name: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name: string; avatar?: string } | null>(() => {
    const raw = localStorage.getItem("auth_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("auth_user", JSON.stringify(user));
    else localStorage.removeItem("auth_user");
  }, [user]);

  const login = useCallback(async (name: string, password: string) => {
    // simulasi login sederhana
    await new Promise((r) => setTimeout(r, 300));
    if (name && password) {
      setUser({ name, avatar: `https://i.pravatar.cc/40?u=${encodeURIComponent(name)}` });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
