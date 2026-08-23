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
  updateProfile: (name: string, email: string, avatar?: string) => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      try {
        const storedUser = localStorage.getItem("demoUser");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const defaultUser = {
            name: "Shadhin Ahmed",
            email: "shadhin@example.com",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
          };
          setUser(defaultUser);
          localStorage.setItem("demoUser", JSON.stringify(defaultUser));
        }
      } catch (e) {
        console.error("Failed to read/write stored user from localStorage", e);
      }
    }
  }, []);

  const login = (email: string) => {
    const demoUser = {
      name: "Shadhin Ahmed",
      email: email || "shadhin@example.com",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80"
    };
    setUser(demoUser);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("demoUser", JSON.stringify(demoUser));
      } catch (e) {
        console.warn("Could not save user to localStorage", e);
      }
    }
    router.push("/profile");
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("demoUser");
      } catch (e) {
        console.warn("Could not remove user from localStorage", e);
      }
    }
    router.push("/sign-in");
  };

  const updateProfile = (name: string, email: string, avatar?: string) => {
    if (!user) return;
    const updatedUser = { 
      ...user, 
      name, 
      email,
      ...(avatar ? { avatar } : {})
    };
    setUser(updatedUser);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("demoUser", JSON.stringify(updatedUser));
      } catch (e) {
        console.warn("Could not persist user to localStorage", e);
      }
    }
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
