"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Custom Premium Logo combining Medical + AI + Tech
const CustomLogo = () => (
  <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-md mx-auto mb-3">
    <rect width="48" height="48" rx="14" fill="url(#blue-gradient)"/>
    <path d="M24 10C16 10 10 16 10 24C10 32 16 38 24 38C32 38 38 32 38 24C38 16 32 10 24 10ZM24 34C18.4772 34 14 29.5228 14 24C14 18.4772 18.4772 14 24 14C29.5228 14 34 18.4772 34 24C34 29.5228 29.5228 34 24 34Z" fill="white" fillOpacity="0.2"/>
    <circle cx="24" cy="24" r="10" fill="white"/>
    <path d="M24 18V30M18 24H30" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="24" cy="24" r="3" fill="#3B82F6"/>
    <circle cx="18" cy="18" r="2" fill="white"/>
    <circle cx="30" cy="18" r="2" fill="white"/>
    <circle cx="18" cy="30" r="2" fill="white"/>
    <circle cx="30" cy="30" r="2" fill="white"/>
    <path d="M20 20L22 22M28 20L26 22M20 28L22 26M28 28L26 26" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <defs>
      <linearGradient id="blue-gradient" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3B82F6"/>
        <stop offset="1" stopColor="#4F46E5"/>
      </linearGradient>
    </defs>
  </svg>
);

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    login(email);
  };

  const fillDemoCredentials = () => {
    setName("Alex Morgan");
    setEmail("demo@example.com");
    setPassword("demo123");
    setConfirmPassword("demo123");
  };

  return (
    <div className="h-[100dvh] overflow-hidden flex flex-col bg-background relative box-border">
      {/* Absolute Background - very subtle */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
        }}
      />

      {/* Header */}
      <header className="p-4 z-10 shrink-0">
        <Link href="/sign-in" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground font-semibold transition-colors">
          <ChevronLeft size={20} /> <span>Back</span>
        </Link>
      </header>

      {/* Main Content - Centered vertically, takes remaining space */}
      <main className="flex-1 flex flex-col justify-center px-6 max-w-[400px] mx-auto w-full z-10 pb-2">
        
        {/* Branding & Title */}
        <div className="text-center mb-5 shrink-0">
          <CustomLogo />
          <h1 className="text-2xl font-black text-foreground mb-1 tracking-tight">Create Account</h1>
          <p className="text-muted-foreground font-medium text-sm">
            Start your AI skin health journey.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-3 shrink-0">
          
          {/* Grid for slightly more compact layout on taller screens, but stacked for mobile */}
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-foreground/80 ml-1 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-muted-foreground pointer-events-none">
                <User size={16} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-card border border-border/80 rounded-[1rem] pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-[15px]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-foreground/80 ml-1 uppercase tracking-wider">Email</label>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-muted-foreground pointer-events-none">
                <Mail size={16} strokeWidth={2.5} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                className="w-full bg-card border border-border/80 rounded-[1rem] pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-[15px]"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-foreground/80 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-muted-foreground pointer-events-none">
                <Lock size={16} strokeWidth={2.5} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-card border border-border/80 rounded-[1rem] pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-[15px]"
                required
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} strokeWidth={2.5} /> : <Eye size={16} strokeWidth={2.5} />}
              </button>
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-[11px] font-bold text-foreground/80 ml-1 uppercase tracking-wider">Confirm Password</label>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 flex items-center justify-center text-muted-foreground pointer-events-none">
                <Lock size={16} strokeWidth={2.5} />
              </div>
              <input 
                type={showPassword ? "text" : "password"} 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-card border border-border/80 rounded-[1rem] pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 transition-all font-medium text-[15px]"
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[1rem] py-3.5 shadow-md active:scale-[0.98] transition-all mt-2 flex items-center justify-center gap-2"
          >
            Create Account <span>→</span>
          </button>
        </form>

        {/* Demo Helper */}
        <div className="mt-4 shrink-0">
          <button 
            type="button"
            onClick={fillDemoCredentials}
            className="mx-auto flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/40 hover:bg-muted/80 transition-colors"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
              Use Demo Info
            </span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-5 text-center shrink-0">
          <p className="text-muted-foreground text-sm font-medium">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-foreground font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
