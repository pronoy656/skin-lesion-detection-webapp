"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type UIContextType = {
  isUploadModalOpen: boolean;
  setUploadModalOpen: (isOpen: boolean) => void;
};

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isUploadModalOpen, setUploadModalOpen] = useState(false);
  return (
    <UIContext.Provider value={{ isUploadModalOpen, setUploadModalOpen }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
}
