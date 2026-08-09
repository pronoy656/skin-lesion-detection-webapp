import Link from "next/link";
import { ChevronLeft, Search, Filter, Star } from "lucide-react";
import { doctors } from "@/lib/data";

export default function DermatologistsPage() {
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
        
        <div className="flex gap-3 overflow-x-auto pb-4 mb-2 snap-x [&::-webkit-scrollbar]:hidden">
          {["All", "Dermatologist", "Oncologist", "Skin Specialist"].map((filter, i) => (
            <button key={i} className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-bold snap-start transition-colors ${i === 0 ? "bg-blue-600 text-white" : "bg-card border border-border text-foreground hover:bg-muted"}`}>
              {filter}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {doctors.map((doc) => (
            <Link key={doc.id} href={`/dermatologists/${doc.id}`} className="bg-card p-4 rounded-[2rem] flex flex-col gap-4 shadow-sm border border-border/40 active:scale-[0.98] transition-transform relative overflow-hidden">
              <div className="flex gap-4">
                <div className="w-20 h-20 shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-2xl overflow-hidden relative">
                  <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 py-1">
                  <h3 className="font-bold text-lg text-foreground mb-1">{doc.name}</h3>
                  <p className="text-sm text-blue-500 font-medium mb-2">{doc.specialty}</p>
                  <p className="text-xs text-muted-foreground font-medium mb-2">{doc.hospital}</p>
                  <div className="flex items-center gap-1">
                    <Star size={14} className="text-amber-400 fill-amber-400" />
                    <span className="text-sm font-bold ml-1">{doc.rating}</span>
                    <span className="text-xs text-muted-foreground font-medium ml-1">({doc.reviews} Reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 pt-4 border-t border-border mt-2">
                <div className="flex-1 bg-muted rounded-xl py-3 text-center">
                  <p className="text-xs text-muted-foreground font-medium mb-1">Availability</p>
                  <p className="text-sm font-bold text-green-600 dark:text-green-500">{doc.availability}</p>
                </div>
                <div className="flex-1 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-sm shadow-md">
                  View Profile
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
