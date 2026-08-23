"use client";

import Link from "next/link";
import { Star, Clock, Award, Shield, FileText, CalendarPlus } from "lucide-react";
import { doctors } from "@/lib/data";
import BackButton from "@/components/BackButton";
import { use } from "react";

export default function DermatologistProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const doctor = doctors.find(d => d.id === id) || doctors[0];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <BackButton fallbackHref="/dermatologists" />
        <span className="text-xs font-bold text-foreground truncate max-w-[150px]">Doctor Profile</span>
        <div className="w-9"></div>
      </header>

      <div className="p-4 sm:p-5">
        {/* Doctor Header Profile Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 sm:p-5 shadow-sm mb-5 relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-muted border border-border/50 shadow-sm relative">
              <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-1">
                <h1 className="text-base sm:text-lg font-bold text-foreground truncate">{doctor.name}</h1>
                <div className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                  <Star size={12} className="fill-current" />
                  <span className="font-bold text-xs">{doctor.rating}</span>
                </div>
              </div>
              <p className="text-xs font-semibold text-blue-500 mb-0.5">{doctor.specialty}</p>
              <p className="text-[11px] text-muted-foreground truncate">{doctor.hospital}</p>
              
              {/* Compact Availability Status */}
              <div className="mt-2 inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{doctor.availability}</span>
              </div>
            </div>
          </div>

          {/* Refined Minimal Stat Cards Grid */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-3.5 border-t border-border/40">
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <span className="text-blue-500 mb-1"><Clock size={15} strokeWidth={2} /></span>
              <p className="text-xs font-bold text-foreground leading-tight">{doctor.experience}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Experience</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 text-center border-x border-border/40">
              <span className="text-amber-500 mb-1"><Star size={15} strokeWidth={2} /></span>
              <p className="text-xs font-bold text-foreground leading-tight">{doctor.reviews}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Reviews</p>
            </div>
            
            <div className="flex flex-col items-center justify-center p-2 text-center">
              <span className="text-emerald-500 mb-1"><Shield size={15} strokeWidth={2} /></span>
              <p className="text-xs font-bold text-foreground leading-tight">{doctor.patients}</p>
              <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Patients</p>
            </div>
          </div>
        </div>
        
        {/* Professional Details */}
        <div className="space-y-4">
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <FileText size={14} className="text-blue-500" /> About Doctor
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {doctor.bio}
            </p>
          </div>
          
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <Award size={14} className="text-purple-500" /> Qualifications
            </h2>
            <ul className="space-y-2">
              {doctor.qualifications.map((qual, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <span className="w-1.5 h-1.5 bg-purple-500 rounded-full shrink-0"></span>
                  <span>{qual}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Shield size={14} className="text-emerald-500" /> Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {doctor.expertise.map((exp, i) => (
                <span key={i} className="bg-muted text-foreground border border-border/60 px-3 py-1 rounded-lg text-[11px] font-semibold">
                  {exp}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Clean Consultation Fee & Book Button Block */}
        <div className="mt-6 bg-card border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <div>
            <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Consultation Fee</p>
            <p className="text-lg font-black text-foreground">$120</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm hover:opacity-95 active:scale-95 transition-all flex items-center gap-1.5">
            <CalendarPlus size={15} /> Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}
