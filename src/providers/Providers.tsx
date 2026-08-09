"use client";

import { ThemeProvider } from "next-themes";
import { UIProvider } from "@/context/UIContext";
import { AuthProvider } from "@/context/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <AuthProvider>
        <UIProvider>
          {children}
        </UIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
