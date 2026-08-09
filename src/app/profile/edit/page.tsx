"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, Camera, Save } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function EditProfilePage() {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      updateProfile(name, email);
      setIsSaving(false);
      router.push("/profile");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="p-4 border-b border-border bg-card sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/profile" className="text-muted-foreground hover:text-foreground font-medium transition-colors">
            <ChevronLeft size={24} />
          </Link>
          <h1 className="text-xl font-bold">Edit Profile</h1>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto">
        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-28 h-28 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-full flex items-center justify-center mb-4 border-4 border-background shadow-md">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
            ) : (
              <span className="text-4xl font-black">{name.charAt(0) || user?.name.charAt(0)}</span>
            )}
            
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 active:scale-95 transition-all border-4 border-background">
              <Camera size={18} />
            </button>
          </div>
          <p className="text-sm text-muted-foreground font-medium">Tap to change profile picture</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={20} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-card border border-border rounded-[1.25rem] pl-12 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow font-medium"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-foreground ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User size={20} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-card border border-border rounded-[1.25rem] pl-12 pr-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-shadow font-medium"
                required
              />
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[1.25rem] py-4 shadow-[0_8px_20px_rgba(37,99,235,0.2)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={20} />
              )}
              {isSaving ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
