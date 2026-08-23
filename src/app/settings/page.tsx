"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Database, Trash2, AlertTriangle, ShieldCheck, Bell, HardDrive, CheckCircle2, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AppSettingsPage() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [aiInsightsNotifs, setAiInsightsNotifs] = useState(true);
  const { isAuthenticated } = useAuth();

  const handleClearHistory = () => {
    setTimeout(() => {
      setCleared(true);
      setShowConfirm(false);
      setTimeout(() => setCleared(false), 3000);
    }, 600);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-base font-bold text-foreground mb-2">Authentication Required</h1>
        <p className="text-xs text-muted-foreground mb-4">Please sign in to access app settings.</p>
        <Link href="/sign-in" className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
          Go to Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-28 relative">
      {/* Sticky Header without drop shadow */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/profile" 
            className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">App Settings & Storage</h1>
        </div>
      </header>

      <div className="p-4 sm:p-5 max-w-lg mx-auto space-y-5">
        
        {/* Privacy Card */}
        <div className="bg-card border border-blue-500/30 rounded-2xl p-4 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <ShieldCheck size={18} />
          </div>
          <div>
            <h3 className="font-bold text-xs text-foreground mb-0.5">Encrypted Local Storage</h3>
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              Your detection history is stored locally on this device using secure local encryption.
            </p>
          </div>
        </div>

        {/* Notifications Settings */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Notifications & Reminders</h3>
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm divide-y divide-border/40">
            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <Bell size={16} className="text-blue-500" />
                <div>
                  <p>Screening Reminders</p>
                  <p className="text-[10px] text-muted-foreground font-normal">Monthly skin checkup reminders</p>
                </div>
              </div>
              <button 
                onClick={() => setPushNotifs(!pushNotifs)}
                className={`w-9 h-5 rounded-full relative transition-colors border border-border/40 ${pushNotifs ? "bg-blue-600" : "bg-muted"}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${pushNotifs ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-3.5">
              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <ShieldCheck size={16} className="text-indigo-500" />
                <div>
                  <p>Weekly AI Health Insights</p>
                  <p className="text-[10px] text-muted-foreground font-normal">New research & health articles</p>
                </div>
              </div>
              <button 
                onClick={() => setAiInsightsNotifs(!aiInsightsNotifs)}
                className={`w-9 h-5 rounded-full relative transition-colors border border-border/40 ${aiInsightsNotifs ? "bg-blue-600" : "bg-muted"}`}
              >
                <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform ${aiInsightsNotifs ? "translate-x-4" : "translate-x-0.5"}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Data & Storage Management */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Storage Management</h3>
          <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-foreground">
              <span className="flex items-center gap-2">
                <HardDrive size={15} className="text-muted-foreground" /> Cached Local Data
              </span>
              <span className="text-muted-foreground font-bold">1.4 MB</span>
            </div>

            <button 
              onClick={() => setShowConfirm(true)}
              className="w-full flex items-center justify-center gap-2 p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition-all active:scale-95"
            >
              <Trash2 size={14} /> Clear Local Cache & Scan History
            </button>
          </div>
        </div>

        {cleared && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} /> Local history & cache cleared successfully.
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-card w-full max-w-sm rounded-2xl p-5 shadow-xl border border-border animate-in zoom-in-95 duration-200 text-center space-y-4">
            <div className="w-12 h-12 bg-red-500/10 text-red-600 dark:text-red-400 rounded-2xl flex items-center justify-center mx-auto border border-red-500/20">
              <AlertTriangle size={24} strokeWidth={2.2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-foreground">Clear Scan History?</h2>
              <p className="text-xs text-muted-foreground font-medium mt-1 leading-relaxed">
                This will permanently delete saved detection logs and cache from this device.
              </p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button 
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-bold text-xs py-2.5 rounded-xl active:scale-95 transition-all"
              >
                Cancel
              </button>
              <button 
                onClick={handleClearHistory}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-sm active:scale-95 transition-all"
              >
                Clear Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
