"use client";

import { Suspense } from "react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { categories, doctors, blogs } from "@/lib/data";
import AppFlow from "@/components/AppFlow";

function MobileAppContent() {
  return (
    <div className="w-full bg-background text-foreground pb-28 px-4 sm:px-6 pt-6 overflow-x-hidden min-h-screen">
      
      {/* TOP HEADER SECTION */}
      <header className="flex items-center justify-between mb-6 pt-2">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-muted border-2 border-primary/20">
              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-background rounded-full"></span>
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-foreground tracking-tight">Hi, Shadhin</h1>
            <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AI Safeguard Active
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Link 
            href="/search" 
            className="w-10 h-10 rounded-2xl bg-card border border-border/60 flex items-center justify-center text-foreground hover:bg-muted active:scale-95 transition-all"
          >
            <Icons.Search size={18} strokeWidth={2} />
          </Link>
          <Link 
            href="/notifications" 
            className="relative w-10 h-10 rounded-2xl bg-card border border-border/60 flex items-center justify-center text-foreground hover:bg-muted active:scale-95 transition-all"
            aria-label="Notifications"
          >
            <Icons.Bell size={18} strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full"></span>
          </Link>
        </div>
      </header>

      {/* COMPACT CLINICAL SKIN SAFEGUARD HERO BANNER */}
      <section className="mb-5">
        <div className="relative rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white p-3.5 sm:p-4 border border-blue-500/30 shadow-sm overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-white/10 rounded-full blur-lg pointer-events-none" />

          <div className="relative z-10 space-y-2.5">
            {/* Header Row */}
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1 bg-white/15 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase text-blue-100 border border-white/20">
                <Icons.Sparkles size={10} className="text-amber-300" />
                <span>AI Skin Safeguard</span>
              </div>
              <Link 
                href="/about-ai" 
                className="text-[10px] font-bold text-white/90 hover:text-white flex items-center gap-1 transition-colors bg-white/10 px-2 py-0.5 rounded-lg border border-white/15"
              >
                <span>How AI Works</span>
                <Icons.ArrowRight size={11} />
              </Link>
            </div>

            {/* Headline & Brief Text */}
            <div>
              <h2 className="text-sm sm:text-base font-extrabold leading-tight tracking-tight">
                Early Detection Saves Lives
              </h2>
              <p className="text-[11px] text-blue-100/90 leading-snug font-normal mt-0.5 max-w-[95%]">
                Perform regular mole checks using clinical ABCDE guidelines for early lesion assessment.
              </p>
            </div>

            {/* Micro Metrics Footer */}
            <div className="pt-2 border-t border-white/15 flex items-center justify-between text-[10px] font-medium text-blue-100/80">
              <span className="flex items-center gap-1">
                <Icons.CheckCircle2 size={11} className="text-cyan-300" /> 98.4% Precision
              </span>
              <span className="flex items-center gap-1">
                <Icons.Zap size={11} className="text-amber-300" /> 3s AI Analysis
              </span>
              <span className="flex items-center gap-1">
                <Icons.Lock size={11} className="text-emerald-300" /> Private & Encrypted
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SINGLE UNIFIED SKIN HEALTH CATEGORIES SECTION */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-foreground tracking-tight">Skin Health Categories</h2>
          <Link href="/categories" className="text-blue-500 text-xs font-semibold hover:underline active:opacity-70 transition-opacity">See All</Link>
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-4 -mr-4">
          {categories.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="flex flex-col items-center justify-center gap-2 bg-card p-3 min-w-[90px] max-w-[90px] rounded-2xl border border-border/50 hover:border-blue-500/30 active:scale-95 transition-all shrink-0 snap-start">
                <div className={`${cat.color} shrink-0`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <span className="text-[11px] font-semibold text-foreground text-center leading-tight tracking-tight line-clamp-1">{cat.title}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* TOP DERMATOLOGISTS SECTION */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-foreground tracking-tight">Top Dermatologists</h2>
          <Link href="/dermatologists" className="text-blue-500 text-xs font-semibold hover:underline active:opacity-70 transition-opacity">See All</Link>
        </div>
        
        <div className="flex flex-col gap-2.5">
          {doctors.slice(0, 2).map((doc) => (
            <Link key={doc.id} href={`/dermatologists/${doc.id}`} className="bg-card p-3 rounded-2xl flex items-center gap-3 border border-border/50 hover:border-blue-500/30 active:scale-[0.99] transition-all">
              <div className="w-12 h-12 shrink-0 bg-muted rounded-xl overflow-hidden relative border border-border/40">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-xs sm:text-sm text-foreground truncate flex items-center gap-1">
                  {doc.name}
                  <Icons.CheckCircle2 size={13} className="text-blue-500 shrink-0" />
                </h3>
                <p className="text-[11px] text-muted-foreground font-medium truncate">{doc.specialty}</p>
              </div>
              <div className="shrink-0">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold px-3.5 py-1.5 rounded-xl hover:opacity-95 transition-all inline-block">
                  Book
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* HEALTH TIPS & ARTICLES SECTION */}
      <section className="mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-foreground tracking-tight">Skin Health Insights</h2>
          <Link href="/blog" className="text-blue-500 text-xs font-semibold hover:underline active:opacity-70 transition-opacity">See All</Link>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-4 -mr-4">
          {blogs.slice(0, 3).map((tip) => (
            <Link key={tip.id} href={`/blog/${tip.id}`} className="min-w-[210px] max-w-[210px] bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-blue-500/30 snap-start active:scale-[0.98] transition-all flex flex-col">
              <div className="h-26 w-full bg-muted relative">
                <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 bg-background/90 backdrop-blur-md text-[9px] font-bold px-2 py-0.5 rounded-md text-foreground">
                  {tip.readTime}
                </span>
              </div>
              <div className="p-2.5 flex flex-col flex-1">
                <h3 className="font-bold text-xs text-foreground mb-1.5 line-clamp-2 leading-snug">{tip.title}</h3>
                <div className="mt-auto flex justify-between items-center text-[10px] text-muted-foreground font-medium border-t border-border/40 pt-1.5">
                  <span>{tip.author}</span>
                  <span>{tip.date.split(',')[0]}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MEDICAL DISCLAIMER SECTION */}
      <section className="mb-4">
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 flex items-start gap-2.5">
          <Icons.ShieldAlert size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-bold text-amber-700 dark:text-amber-300">Medical Disclaimer</h4>
            <p className="text-[10px] text-amber-800/80 dark:text-amber-300/80 leading-relaxed mt-0.5">
              This AI tool provides preliminary risk indicators for educational purposes. It is <strong>NOT</strong> a medical diagnosis. Always consult a certified dermatologist for clinical evaluation.
            </p>
          </div>
        </div>
      </section>

      {/* Upload/Scan Modal Flow */}
      <AppFlow />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Icons.Activity className="animate-spin text-indigo-500" size={40}/></div>}>
      <MobileAppContent />
    </Suspense>
  );
}
