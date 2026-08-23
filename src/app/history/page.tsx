"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  Sparkles 
} from "lucide-react";
import { historyRecords } from "@/lib/data";

export default function HistoryPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems = historyRecords.filter((item) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Flagged") return item.isPositive === true;
    if (activeFilter === "Healthy") return item.isPositive === false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky Header without drop shadow */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/profile" 
            className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">Detection History</h1>
        </div>
      </header>

      <div className="p-4 sm:p-5 max-w-2xl mx-auto space-y-4">
        {/* Filter Pills without drop shadow */}
        <div className="flex gap-2 pb-1">
          {["All", "Flagged", "Healthy"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* History Items List (Direct Page Links - No Modal) */}
        <div className="space-y-3">
          {filteredItems.map((item) => (
            <Link 
              key={item.id} 
              href={`/history/${item.id}`}
              className="bg-card border border-border/60 rounded-2xl p-3.5 flex items-center gap-3.5 shadow-sm hover:border-blue-500/40 transition-all group active:scale-[0.99]"
            >
              {/* Authentic Skin Lesion Photo Thumbnail */}
              <div className="w-16 h-16 shrink-0 bg-muted rounded-xl overflow-hidden relative border border-border/40 shadow-sm">
                <img 
                  src={item.image} 
                  alt={item.notes} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  {item.isPositive === true ? (
                    <span className="bg-red-500/10 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <AlertCircle size={11} /> {item.status}
                    </span>
                  ) : item.isPositive === false ? (
                    <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 size={11} /> {item.status}
                    </span>
                  ) : (
                    <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-md text-[10px] font-bold flex items-center gap-1">
                      <AlertCircle size={11} /> {item.status}
                    </span>
                  )}
                </div>
                
                <h3 className="font-bold text-xs text-foreground truncate mb-1">{item.notes}</h3>
                
                {/* Single Line Clean Date & Confidence */}
                <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium truncate">
                  <span className="flex items-center gap-1 shrink-0"><Calendar size={10} /> {item.date}</span>
                  {item.confidence > 0 && (
                    <>
                      <span>•</span>
                      <span className="font-semibold text-blue-600 dark:text-blue-400 shrink-0">{item.confidence}% Conf.</span>
                    </>
                  )}
                </div>
              </div>
              
              <ChevronRight size={16} className="text-muted-foreground shrink-0 group-hover:text-foreground transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
