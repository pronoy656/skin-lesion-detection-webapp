"use client";

import { User, Settings, Info, ChevronRight, Moon, Sun, LogOut } from "lucide-react";
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
    <div className="flex flex-col min-h-screen pb-24 bg-background">
      <header className="p-4 border-b border-border bg-card sticky top-0 z-10 flex items-center justify-between">
        <h1 className="text-xl font-bold">Profile</h1>
      </header>

      <div className="p-6 space-y-8">
        {/* User Info Section */}
        {isAuthenticated && user ? (
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center shrink-0">
                {user.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  <span className="text-xl font-black">{user.name.charAt(0)}</span>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground font-medium">{user.email}</p>
              </div>
            </div>

            {/* Quick Stats Premium Card */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/10 dark:to-indigo-900/10 rounded-3xl p-6 border border-blue-100 dark:border-blue-800/30 flex items-center justify-between shadow-sm relative overflow-hidden">
              <div className="flex flex-col relative z-10 w-1/2">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Total Scans</p>
                <h3 className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-1">4</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">This month</p>
              </div>
              
              <div className="h-16 w-px bg-blue-200 dark:bg-blue-800/50 relative z-10"></div>
              
              <div className="flex flex-col relative z-10 w-1/2 pl-6">
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Healthy</p>
                <h3 className="text-4xl font-black text-green-500 mb-1">100%</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">Overall results</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-card border border-border rounded-2xl p-6 text-center">
            <div className="w-16 h-16 bg-muted text-muted-foreground rounded-full flex items-center justify-center mx-auto mb-4">
              <User size={32} />
            </div>
            <h2 className="text-xl font-bold mb-2">Guest User</h2>
            <p className="text-sm text-muted-foreground mb-6 font-medium px-4">
              You are currently browsing as a guest. Sign in to access your profile and settings.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <Link href="/sign-in" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-[1.25rem] shadow-[0_4px_14px_rgba(37,99,235,0.2)] active:scale-[0.98] transition-all">
                Sign In
              </Link>
              <Link href="/sign-up" className="w-full bg-muted hover:bg-muted/80 text-foreground font-bold py-3.5 rounded-[1.25rem] active:scale-[0.98] transition-all">
                Create Account
              </Link>
            </div>
          </div>
        )}

        {/* Menu Sections - Only fully shown if authenticated, or limited if guest */}
        
        {isAuthenticated && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Account</h3>
            <Link href="/profile/edit" className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition">
              <div className="flex items-center gap-3 font-medium">
                <User size={20} className="text-muted-foreground" /> Edit Profile
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          </div>
        )}

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Preferences</h3>
          
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
            <div className="w-12 h-6 bg-muted rounded-full relative transition-colors shadow-inner flex items-center px-1">
              <div className={`w-4 h-4 bg-foreground rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`} />
            </div>
          </button>

          {isAuthenticated && (
            <Link href="/settings" className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition">
              <div className="flex items-center gap-3 font-medium">
                <Settings size={20} className="text-muted-foreground" /> App Settings
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </Link>
          )}
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Information</h3>
          
          <Link href="/about-ai" className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-muted/50 transition">
            <div className="flex items-center gap-3 font-medium">
              <Info size={20} className="text-muted-foreground" /> About AI Model
            </div>
            <ChevronRight size={20} className="text-muted-foreground" />
          </Link>
        </div>

        {isAuthenticated && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3 px-2">Account Actions</h3>
            
            <button 
              onClick={logout}
              className="w-full flex items-center justify-between p-4 bg-card border border-border rounded-xl shadow-sm hover:bg-red-50 dark:hover:bg-red-950/20 transition text-red-600 dark:text-red-500"
            >
              <div className="flex items-center gap-3 font-medium">
                <LogOut size={20} /> Logout
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
