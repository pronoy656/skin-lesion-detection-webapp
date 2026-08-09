"use client";

import { User, Shield, Info, Trash2, Settings, ChevronRight, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-background">
      <header className="p-4 border-b border-border bg-card sticky top-0 z-10">
        <h1 className="text-xl font-bold">Profile & Settings</h1>
      </header>

      <div className="p-6 space-y-6">
        {/* User Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Guest User</h2>
            <p className="text-sm text-muted-foreground">Local Session</p>
          </div>
        </div>

        {/* Medical & Privacy Disclaimer */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-primary font-semibold mb-1">
            <Shield size={20} /> Privacy & Disclaimers
          </div>
          <p className="text-xs text-muted-foreground">
            <strong>Medical Disclaimer:</strong> This application uses AI for informational and decision-support purposes only. It is NOT a substitute for professional medical evaluation, diagnosis, or treatment. Always seek the advice of your physician.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            <strong>Data Privacy:</strong> Your images are processed securely. In this demo, images are not permanently stored or used for model training without explicit consent.
          </p>
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition">
            <div className="flex items-center gap-3 font-medium">
              <Settings size={20} className="text-muted-foreground" /> App Settings
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
          
          <button className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition">
            <div className="flex items-center gap-3 font-medium">
              <Info size={20} className="text-muted-foreground" /> About AI Model
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition"
          >
            <div className="flex items-center gap-3 font-medium">
              {theme === 'dark' ? (
                <Sun size={20} className="text-amber-500" />
              ) : (
                <Moon size={20} className="text-indigo-500" />
              )}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>

          <button className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-red-950/20 transition text-red-600 dark:text-red-500">
            <div className="flex items-center gap-3 font-medium">
              <Trash2 size={20} /> Clear Detection History
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
