"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, Sparkles, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const fillDemoCredentials = () => {
    setEmail("demo@example.com");
    setPassword("demo123");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-background">
      {/* Premium Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-[100px]" />
        <div className="absolute top-[40%] -left-[20%] w-[60vw] h-[60vw] rounded-full bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px]" />
      </div>

      <header className="p-6 relative z-10">
        <Link href="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-semibold transition-colors">
          <ChevronLeft size={20} /> <span className="mt-0.5">Back</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col justify-center px-6 pb-20 relative z-10 max-w-md mx-auto w-full">
        
        {/* Brand Logo */}
        <div className="mb-10 flex flex-col items-center">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-[1.5rem] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 shadow-sm mb-6">
            <div className="absolute inset-0 rounded-[1.5rem] bg-blue-500/5 animate-pulse" />
            <Activity className="text-blue-600 dark:text-blue-400 z-10" size={32} strokeWidth={2} />
            <Sparkles className="absolute -top-1 -right-1 text-indigo-400 z-10" size={14} />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-3 text-center tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground font-medium text-center max-w-[280px] leading-relaxed text-sm">
            Sign in to continue to your AI skin health experience.
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground/80 uppercase tracking-wider ml-1">Email</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                <Mail size={20} strokeWidth={2} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl pl-12 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium placeholder:text-muted-foreground/50"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-foreground/80 uppercase tracking-wider ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-blue-500 transition-colors">
                <Lock size={20} strokeWidth={2} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-card/50 backdrop-blur-sm border border-border/60 rounded-2xl pl-12 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all font-medium placeholder:text-muted-foreground/50"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
              </button>
            </div>
            <div className="flex justify-end pt-1">
              <button type="button" className="text-xs font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                Forgot password?
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full relative group overflow-hidden bg-foreground text-background font-bold rounded-2xl py-4 shadow-[0_4px_14px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_14px_rgba(255,255,255,0.1)] active:scale-[0.98] transition-all mt-4"
          >
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 dark:via-black/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            <span className="relative flex items-center justify-center gap-2">
              Sign In <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </button>
        </form>

        {/* Demo Login Helper */}
        <div className="mt-8">
          <button 
            type="button"
            onClick={fillDemoCredentials}
            className="w-full py-3 px-4 rounded-xl border border-border/50 bg-muted/30 hover:bg-muted/60 transition-colors flex items-center justify-center gap-2 group"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">
              Use Demo Account
            </span>
          </button>
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-foreground font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Register
            </Link>
          </p>
        </div>
      </main>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
