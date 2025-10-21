import { createContext, useState, useEffect, type ReactNode } from "react";

interface User {
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  ready: boolean;
  login: (name?: string, password?: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  const login = async (name?: string, password?: string) => {
    try {
      const res = await fetch("https://randomuser.me/api/");
      const data = await res.json();
      const person = data.results[0];
      const avatar = person.picture.medium;
      const newUser: User = {
        name: name || `${person.name.first} ${person.name.last}`,
        avatar,
      };
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
    setReady(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
