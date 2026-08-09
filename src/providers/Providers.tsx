"use client";

import { ThemeProvider } from "next-themes";
import { UIProvider } from "@/context/UIContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <UIProvider>
        {children}
      </UIProvider>
    </ThemeProvider>
  );
}
