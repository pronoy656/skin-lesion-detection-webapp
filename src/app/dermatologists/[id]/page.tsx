import Link from "next/link";
import { ChevronLeft, Star, Clock, Award, Shield, FileText, CalendarPlus } from "lucide-react";
import { doctors } from "@/lib/data";

export default async function DermatologistProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doctor = doctors.find(d => d.id === id) || doctors[0];

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="absolute top-0 z-20 w-full p-4 flex items-center justify-between">
        <Link href="/dermatologists" className="w-10 h-10 flex items-center justify-center bg-white/20 backdrop-blur-md text-white hover:bg-white/30 rounded-full transition-colors shadow-sm">
          <ChevronLeft size={20} />
        </Link>
      </header>
      
      <div className="w-full h-[350px] relative bg-muted">
        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
      </div>
      
      <div className="px-6 -mt-16 relative z-10">
        <div className="bg-card rounded-[2.5rem] p-6 shadow-xl border border-border">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h1 className="text-2xl font-black text-foreground mb-1">{doctor.name}</h1>
              <p className="text-sm text-blue-500 font-bold">{doctor.specialty}</p>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-500 px-3 py-1.5 rounded-full flex items-center gap-1">
              <Star size={14} className="fill-current" />
              <span className="font-bold text-sm">{doctor.rating}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground font-medium mb-6">{doctor.hospital}</p>
          
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-muted/50 border border-border/50 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
              <Clock size={18} className="text-blue-600 dark:text-blue-400 mb-2" />
              <span className="text-sm font-bold text-foreground leading-tight">{doctor.experience}</span>
              <span className="text-xs text-muted-foreground">Experience</span>
            </div>
            
            <div className="bg-muted/50 border border-border/50 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
              <Star size={18} className="text-amber-600 dark:text-amber-400 mb-2" />
              <span className="text-sm font-bold text-foreground leading-tight">{doctor.reviews}</span>
              <span className="text-xs text-muted-foreground">Reviews</span>
            </div>
            
            <div className="bg-muted/50 border border-border/50 rounded-2xl p-4 flex flex-col justify-center shadow-sm">
              <Shield size={18} className="text-green-600 dark:text-green-400 mb-2" />
              <span className="text-sm font-bold text-foreground leading-tight">{doctor.patients}</span>
              <span className="text-xs text-muted-foreground">Patients</span>
            </div>
          </div>
        </div>
        
        <div className="mt-8 space-y-8">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <FileText size={18} className="text-blue-500" /> Professional Bio
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {doctor.bio}
            </p>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Award size={18} className="text-purple-500" /> Qualifications
            </h2>
            <ul className="space-y-3">
              {doctor.qualifications.map((qual, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-50 dark:bg-purple-900/20 text-purple-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{qual}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <Shield size={18} className="text-emerald-500" /> Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {doctor.expertise.map((exp, i) => (
                <span key={i} className="bg-muted/80 text-foreground border border-border/80 px-4 py-2 rounded-xl text-sm font-semibold shadow-sm whitespace-nowrap">
                  {exp}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
              <CalendarPlus size={18} className="text-blue-500" /> Availability
            </h2>
            <div className="bg-muted/50 border border-border/50 p-5 rounded-2xl flex items-center justify-between shadow-sm">
               <div>
                  <p className="font-bold text-foreground mb-0.5">{doctor.availability === "Available Today" ? "Available Today" : doctor.availability}</p>
                  <p className="text-xs text-muted-foreground font-medium">Next available appointment</p>
               </div>
               <span className={`w-3 h-3 rounded-full shadow-sm ${doctor.availability === "Available Today" ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)] animate-pulse" : "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]"}`}></span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="fixed bottom-[72px] left-0 right-0 p-6 bg-background/90 backdrop-blur-xl border-t border-border z-30 flex items-center gap-4">
        <div className="flex flex-col flex-1">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">Consultation</p>
          <p className="text-lg font-black text-foreground">$120</p>
        </div>
        <button className="flex-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(59,130,246,0.3)] active:scale-95 transition-transform flex items-center justify-center gap-2 w-2/3">
          <CalendarPlus size={20} /> Book Now
        </button>
      </div>
    </div>
  );
}
