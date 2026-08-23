"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Star, CheckCircle2, SlidersHorizontal, CalendarPlus } from "lucide-react";
import { doctors } from "@/lib/data";

const FILTERS = ["All", "Available Today", "Dermatologist", "Oncologist", "Skin Specialist"];

export default function DermatologistsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDoctors = doctors.filter((doc) => {
    // Specialty / Availability filter
    const matchesFilter = 
      activeFilter === "All" ||
      (activeFilter === "Available Today" && doc.availability === "Available Today") ||
      doc.specialty === activeFilter;

    // Search query filter
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header Bar */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">Find Dermatologists</h1>
        </div>
      </header>
      
      <div className="p-4 sm:p-5">
        {/* Compact Search Input without drop shadow */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, specialty or hospital..."
            className="w-full bg-card border border-border/60 pl-9 pr-9 py-2.5 rounded-xl outline-none focus:border-blue-500 text-xs font-medium text-foreground transition-all placeholder:text-muted-foreground/70"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4 snap-x [&::-webkit-scrollbar]:hidden pr-2 -mr-2">
          {FILTERS.map((filter) => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold snap-start transition-all ${
                activeFilter === filter 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                  : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="flex flex-col gap-3 transition-all duration-300">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <Link 
                key={doc.id} 
                href={`/dermatologists/${doc.id}`} 
                className="bg-card p-3.5 rounded-2xl flex flex-col gap-3 shadow-sm border border-border/50 hover:border-blue-500/30 active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 shrink-0 bg-muted rounded-xl overflow-hidden relative border border-border/40 shadow-sm">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 mb-0.5">
                      <h3 className="font-bold text-xs sm:text-sm text-foreground truncate">{doc.name}</h3>
                      <CheckCircle2 size={13} className="text-blue-500 fill-blue-500/20 shrink-0" />
                    </div>
                    <p className="text-[11px] text-blue-500 font-semibold mb-1 truncate">{doc.specialty} • {doc.hospital}</p>
                    
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                      <span className="flex items-center gap-1 font-bold text-amber-500">
                        <Star size={11} className="fill-amber-400" /> {doc.rating}.0 ({doc.reviews})
                      </span>
                      <span>•</span>
                      <span>{doc.experience} Exp</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Card Row */}
                <div className="flex items-center justify-between pt-2.5 border-t border-border/40 text-[10px]">
                  <span className={`font-semibold px-2 py-0.5 rounded-md ${
                    doc.availability === "Available Today" 
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {doc.availability}
                  </span>
                  
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold px-3.5 py-1.5 rounded-xl shadow-sm inline-flex items-center gap-1">
                    <CalendarPlus size={12} /> Book Appointment
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 px-6 bg-card rounded-2xl border border-border/50 border-dashed">
              <p className="text-xs text-muted-foreground font-medium mb-3">No dermatologists found matching your search.</p>
              <button 
                onClick={() => { setActiveFilter("All"); setSearchQuery(""); }}
                className="text-xs font-bold text-blue-600 hover:underline"
              >
                Reset Filters & Search
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
