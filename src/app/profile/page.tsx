"use client";

import { 
  User, 
  Settings, 
  Info, 
  ChevronRight, 
  Moon, 
  Sun, 
  LogOut, 
  History, 
  ChevronLeft,
  ShieldCheck,
  Brain,
  Sparkles,
  Sliders,
  Bell,
  Camera
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col min-h-screen pb-28 bg-background">
      {/* Sticky Header without drop shadow */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">My Profile</h1>
        </div>
      </header>

      <div className="p-4 sm:p-5 max-w-2xl mx-auto w-full space-y-5">
        {/* User Profile Card */}
        {isAuthenticated && user ? (
          <div className="bg-card border border-border/60 rounded-2xl p-4 sm:p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-start gap-4 mb-4">
              <Link 
                href="/profile/edit" 
                className="w-16 h-16 shrink-0 rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm relative flex items-center justify-center text-blue-600 dark:text-blue-400 block hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                aria-label="Edit Profile Information"
              >
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black">{user.name.charAt(0)}</span>
                )}
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1 mb-1">
                  <h2 className="text-base font-bold text-foreground truncate">{user.name}</h2>
                  <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 flex items-center gap-1">
                    <ShieldCheck size={11} /> Verified
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-medium truncate mb-2">{user.email}</p>
                <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-lg text-[10px] font-semibold border border-blue-200/40">
                  <Sparkles size={11} /> AI Screening Member
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-2 pt-3.5 border-t border-border/40 text-center">
              <div className="bg-muted/40 border border-border/40 rounded-xl p-2.5">
                <p className="text-base font-black text-blue-600 dark:text-blue-400 leading-none mb-1">4 Scans</p>
                <p className="text-[10px] text-muted-foreground font-medium">Completed This Month</p>
              </div>
              <div className="bg-muted/40 border border-border/40 rounded-xl p-2.5">
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400 leading-none mb-1">100% Healthy</p>
                <p className="text-[10px] text-muted-foreground font-medium">Overall AI Risk Index</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border/60 rounded-2xl p-5 text-center shadow-sm">
            <div className="w-14 h-14 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-3 border border-border/50">
              <User size={24} />
            </div>
            <h2 className="text-base font-bold text-foreground mb-1">Guest Account</h2>
            <p className="text-xs text-muted-foreground mb-4 font-medium max-w-xs mx-auto">
              Sign in to save your detection scans, consult dermatologists, and sync your health history.
            </p>
            <div className="flex gap-2.5 w-full">
              <Link 
                href="/sign-in" 
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-sm active:scale-95 transition-all text-center"
              >
                Sign In
              </Link>
              <Link 
                href="/sign-up" 
                className="flex-1 bg-card border border-border/60 text-foreground font-bold py-2.5 px-4 rounded-xl text-xs active:scale-95 transition-all text-center hover:bg-muted"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}

        {/* Menu Sections */}
        
        {isAuthenticated && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Account & Medical Data</h3>
            <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm divide-y divide-border/40">
              <Link 
                href="/history" 
                className="flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                    <History size={16} />
                  </div>
                  <span>Detection Scan History</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>

              <Link 
                href="/profile/edit" 
                className="flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                  <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <User size={16} />
                  </div>
                  <span>Edit Profile Information</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
            </div>
          </div>
        )}

        {/* Preferences */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Preferences & Theme</h3>
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm divide-y divide-border/40">
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="w-full flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors text-left"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </div>
                <span>Theme Mode ({theme === 'dark' ? 'Dark' : 'Light'})</span>
              </div>
              <div className="w-10 h-5 bg-muted rounded-full relative transition-colors shadow-inner flex items-center px-0.5 border border-border/40">
                <div className={`w-4 h-4 bg-blue-600 rounded-full transition-transform ${theme === 'dark' ? 'translate-x-5' : 'translate-x-0'}`} />
              </div>
            </button>

            {isAuthenticated && (
              <Link 
                href="/settings" 
                className="flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                    <Settings size={16} />
                  </div>
                  <span>App Settings & Notifications</span>
                </div>
                <ChevronRight size={16} className="text-muted-foreground" />
              </Link>
            )}
          </div>
        </div>

        {/* Knowledge & Platform Info */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Platform Information</h3>
          <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm divide-y divide-border/40">
            <Link 
              href="/about-ai" 
              className="flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Brain size={16} />
                </div>
                <span>About AI Model Architecture</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>

            <Link 
              href="/blog" 
              className="flex items-center justify-between p-3.5 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 text-xs font-semibold text-foreground">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Info size={16} />
                </div>
                <span>Skin Health Insights & Articles</span>
              </div>
              <ChevronRight size={16} className="text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* Account Actions */}
        {isAuthenticated && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-1">Account Actions</h3>
            <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={logout}
                className="w-full flex items-center justify-between p-3.5 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors text-red-600 dark:text-red-500 text-left"
              >
                <div className="flex items-center gap-3 text-xs font-semibold">
                  <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center shrink-0">
                    <LogOut size={16} />
                  </div>
                  <span>Log Out of Account</span>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Clean Copyright Footer */}
        <footer className="pt-4 pb-2 text-center border-t border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">
            © {new Date().getFullYear()} Skin Lesion AI Screening Platform. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}
