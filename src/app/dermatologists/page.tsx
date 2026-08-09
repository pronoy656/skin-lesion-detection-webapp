"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Star, ArrowRight } from "lucide-react";
import { doctors } from "@/lib/data";

const FILTERS = ["All", "Available Today", "Dermatologist", "Oncologist", "Skin Specialist"];

export default function DermatologistsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredDoctors = doctors.filter((doc) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Available Today") return doc.availability === "Available Today";
    return doc.specialty === activeFilter;
  });

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">All Dermatologists</h1>
        </div>
      </header>
      
      <div className="p-6">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search by name or specialty..."
            className="w-full bg-card border border-border pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
          />
        </div>
        
        {/* Filter Tabs */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-2 snap-x [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((filter) => (
            <button 
              key={filter} 
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold snap-start transition-colors ${
                activeFilter === filter 
                  ? "bg-blue-600 text-white" 
                  : "bg-card border border-border text-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Doctor Cards */}
        <div className="flex flex-col gap-5 transition-opacity duration-300">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doc) => (
              <Link key={doc.id} href={`/dermatologists/${doc.id}`} className="bg-card p-5 rounded-[2rem] flex flex-col gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-border/50 active:scale-[0.98] transition-transform relative overflow-hidden">
                <div className="flex gap-5">
                  <div className="w-[85px] h-[85px] shrink-0 bg-muted rounded-2xl overflow-hidden relative">
                    <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center py-0.5">
                    <h3 className="font-bold text-lg text-foreground mb-1 leading-tight">{doc.name}</h3>
                    <p className="text-sm text-muted-foreground font-medium mb-3">{doc.specialty}</p>
                    
                    {/* Availability Status Badge */}
                    <div className="flex items-center">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        doc.availability === "Available Today" 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800/50"
                          : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${doc.availability === "Available Today" ? "bg-green-500" : "bg-blue-500"}`}></span>
                        {doc.availability === "Available Today" ? "Available Today" : doc.availability}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border mt-1">
                  <div className="flex items-center gap-1.5">
                    <Star size={16} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold">{doc.rating}</span>
                    <span className="text-xs text-muted-foreground font-medium">({doc.reviews} Reviews)</span>
                  </div>
                  
                  {/* Lightweight View Profile Action */}
                  <span className="flex items-center gap-1.5 text-sm font-bold text-blue-600 dark:text-blue-500">
                    View Profile <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-12 px-6 bg-card rounded-[2rem] border border-border/50 border-dashed">
              <p className="text-muted-foreground font-medium">No doctors found for this filter.</p>
              <button 
                onClick={() => setActiveFilter("All")}
                className="mt-4 text-sm font-bold text-blue-600"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
