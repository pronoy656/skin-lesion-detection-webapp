"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  updateProfile: (name: string, email: string) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    // Restore from localStorage if available
    const storedUser = localStorage.getItem("demoUser");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const login = (email: string) => {
    // Demo login implementation
    const demoUser = {
      name: "Alex Morgan",
      email: email || "demo@example.com",
    };
    setUser(demoUser);
    localStorage.setItem("demoUser", JSON.stringify(demoUser));
    router.push("/profile");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("demoUser");
    router.push("/sign-in");
  };

  const updateProfile = (name: string, email: string) => {
    if (!user) return;
    const updatedUser = { ...user, name, email };
    setUser(updatedUser);
    localStorage.setItem("demoUser", JSON.stringify(updatedUser));
  };

  // Prevent hydration mismatch by not rendering anything auth-dependent until mounted
  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
