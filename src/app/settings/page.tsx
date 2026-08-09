"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Database, Trash2, AlertTriangle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AppSettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleClearHistory = () => {
    // In a real app, this would delete local DB or call API
    // For demo, we just show a success message
    setTimeout(() => {
      setCleared(true);
      setShowConfirm(false);
      setTimeout(() => setCleared(false), 3000);
    }, 600);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <h1 className="text-xl font-bold mb-4">Authentication Required</h1>
        <Link href="/sign-in" className="text-blue-600 font-bold hover:underline">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24 relative">
      <header className="p-4 border-b border-border bg-card sticky top-0 z-10 flex items-center">
        <Link href="/profile" className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors">
          <ChevronLeft size={20} /> Back
        </Link>
        <h1 className="text-xl font-bold ml-4">App Settings</h1>
      </header>

      <div className="p-6 max-w-lg mx-auto space-y-6">
        
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 flex items-start gap-4">
          <ShieldCheck className="text-primary mt-0.5" size={24} />
          <div>
            <h3 className="font-bold text-primary mb-1">Data & Privacy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Your detection history is stored locally on this device for your privacy. You can manage your stored data here.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Storage</h3>
          
          <button 
            onClick={() => setShowConfirm(true)}
            className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-red-950/20 transition group"
          >
            <div className="flex items-center gap-3 font-medium text-foreground group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
              <Database size={20} className="text-muted-foreground group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors" /> 
              Clear Data History
            </div>
          </button>
        </div>

        {cleared && (
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl font-medium text-center shadow-sm animate-in fade-in slide-in-from-bottom-4">
            Your history has been successfully cleared.
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-sm rounded-[2rem] p-6 shadow-2xl border border-border animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-full flex items-center justify-center mb-4 mx-auto">
              <AlertTriangle size={32} strokeWidth={2.5} />
            </div>
            <h2 className="text-2xl font-black text-center mb-2">Clear Data History?</h2>
            <p className="text-center text-muted-foreground font-medium mb-8">
              This will permanently remove your saved detection history from this device and account. This action cannot be undone.
            </p>
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleClearHistory}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-[1.25rem] shadow-[0_4px_14px_rgba(220,38,38,0.2)] active:scale-[0.98] transition-all"
              >
                Yes, Clear History
              </button>
              <button 
                onClick={() => setShowConfirm(false)}
                className="w-full bg-muted hover:bg-muted/80 text-foreground font-bold py-4 rounded-[1.25rem] active:scale-[0.98] transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
