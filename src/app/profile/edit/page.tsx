"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, User, Camera, Save, Mail, CheckCircle2, Shield, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const SKIN_TYPES = [
  { type: "Type I", desc: "Always burns, never tans (Very Fair)" },
  { type: "Type II", desc: "Usually burns, tans minimally (Fair)" },
  { type: "Type III", desc: "Sometimes burns, tans uniformly (Medium)" },
  { type: "Type IV", desc: "Burns minimally, tans easily (Olive/Brown)" },
];

export default function EditProfilePage() {
  const { user, updateProfile, isAuthenticated } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [skinType, setSkinType] = useState("Type II");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-base font-bold text-foreground mb-2">Authentication Required</h1>
        <p className="text-xs text-muted-foreground mb-4">Please sign in to edit your profile.</p>
        <Link href="/sign-in" className="bg-blue-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const rawSrc = event.target.result as string;
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 200;
          let w = img.width;
          let h = img.height;
          if (w > h) {
            if (w > maxDim) {
              h = Math.round((h * maxDim) / w);
              w = maxDim;
            }
          } else {
            if (h > maxDim) {
              w = Math.round((w * maxDim) / h);
              h = maxDim;
            }
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, w, h);
          const compressed = canvas.toDataURL("image/jpeg", 0.75);
          setAvatarPreview(compressed);
        };
        img.src = rawSrc;
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    setTimeout(() => {
      try {
        updateProfile(name, email, avatarPreview || undefined);
        setSavedSuccess(true);
        setTimeout(() => {
          router.push("/profile");
        }, 600);
      } catch (err) {
        console.error("Error saving profile", err);
      } finally {
        setIsSaving(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Hidden File Input for Avatar */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleAvatarFileChange} 
        accept="image/*" 
        className="hidden" 
      />

      {/* Sticky Header without drop shadow */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/profile" 
            className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">Edit Profile Information</h1>
        </div>
      </header>

      <main className="p-4 sm:p-5 max-w-lg mx-auto space-y-6">
        {/* Avatar Section */}
        <div className="bg-card border border-border/60 rounded-2xl p-5 flex flex-col items-center text-center shadow-sm">
          <div 
            onClick={handleAvatarClick}
            className="relative w-24 h-24 bg-muted text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-3 border border-border/50 shadow-sm overflow-hidden group cursor-pointer"
          >
            {avatarPreview ? (
              <img src={avatarPreview} alt={user?.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-3xl font-black">{name.charAt(0) || user?.name.charAt(0)}</span>
            )}
            
            <button 
              type="button"
              onClick={handleAvatarClick}
              className="absolute bottom-1 right-1 w-7 h-7 bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md hover:bg-blue-700 active:scale-95 transition-all"
            >
              <Camera size={14} />
            </button>
          </div>
          <h2 className="text-sm font-bold text-foreground">{user?.name}</h2>
          <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Tap camera button to change profile photo</p>
        </div>

        {/* Success Toast */}
        {savedSuccess && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 p-3 rounded-xl text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 size={16} /> Profile changes saved successfully! Redirecting...
          </div>
        )}

        {/* Form Fields */}
        <form onSubmit={handleSave} className="bg-card border border-border/60 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <User size={14} className="text-blue-500" /> Full Name
            </label>
            <input 
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter full name"
              className="w-full bg-background border border-border/60 rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-500 text-xs font-medium text-foreground transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Mail size={14} className="text-indigo-500" /> Email Address
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              className="w-full bg-background border border-border/60 rounded-xl px-3.5 py-2.5 outline-none focus:border-blue-500 text-xs font-medium text-foreground transition-all"
              required
            />
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <Shield size={14} className="text-purple-500" /> Fitzpatrick Skin Phototype
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {SKIN_TYPES.map((st) => (
                <button
                  type="button"
                  key={st.type}
                  onClick={() => setSkinType(st.type)}
                  className={`p-2.5 rounded-xl border text-left transition-all ${
                    skinType === st.type
                      ? "bg-blue-50 dark:bg-blue-950/60 border-blue-500 text-blue-600 dark:text-blue-400 font-bold"
                      : "bg-background border border-border/60 text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <p className="text-xs font-bold">{st.type}</p>
                  <p className="text-[10px] opacity-80 leading-tight mt-0.5">{st.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border/40">
            <button 
              type="submit"
              disabled={isSaving}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs py-3 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save size={16} />
              )}
              {isSaving ? "Saving Profile..." : "Save Profile Changes"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
