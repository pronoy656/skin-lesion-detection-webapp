import Link from "next/link";
import { 
  ChevronLeft, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Stethoscope, 
  Brain, 
  ShieldAlert, 
  MapPin, 
  Zap,
  Sparkles
} from "lucide-react";
import { historyRecords } from "@/lib/data";

export default async function ScanDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const scan = historyRecords.find(record => record.id === id) || historyRecords[0];

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Sticky Header Bar */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <Link 
          href="/history" 
          className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
        >
          <ChevronLeft size={18} />
        </Link>
        <span className="text-xs font-bold text-foreground truncate max-w-[180px]">Scan Details</span>
        <div className="w-9"></div>
      </header>

      <div className="p-4 sm:p-5 max-w-xl mx-auto space-y-5">
        
        {/* Lesion Photo Card */}
        <div className="bg-card border border-border/60 rounded-2xl overflow-hidden shadow-sm">
          <div className="h-64 w-full bg-muted relative overflow-hidden">
            <img 
              src={scan.image} 
              alt={scan.notes} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1.5 text-xs font-semibold">
                  <MapPin size={14} className="text-blue-400" />
                  <span>{scan.location}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-medium opacity-90">
                  <Calendar size={12} />
                  <span>{scan.date}</span>
                </div>
              </div>
              <h1 className="text-base font-bold text-white leading-tight mt-1">{scan.notes}</h1>
            </div>
          </div>
        </div>

        {/* AI Diagnostic Category Banner */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">AI Classification</span>
            {scan.isPositive === true ? (
              <span className="bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <AlertCircle size={13} /> {scan.status}
              </span>
            ) : scan.isPositive === false ? (
              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <CheckCircle2 size={13} /> {scan.status}
              </span>
            ) : (
              <span className="bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                <AlertCircle size={13} /> {scan.status}
              </span>
            )}
          </div>

          {/* Confidence Meter */}
          <div className="pt-1">
            <div className="flex justify-between text-xs font-bold text-foreground mb-1.5">
              <span className="flex items-center gap-1"><Brain size={14} className="text-blue-500" /> AI Confidence Rating</span>
              <span className="text-blue-600 dark:text-blue-400">{scan.confidence}%</span>
            </div>
            <div className="h-2.5 w-full bg-muted rounded-full overflow-hidden border border-border/40">
              <div 
                className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" 
                style={{ width: `${scan.confidence}%` }}
              />
            </div>
          </div>
        </div>

        {/* ABCD Criteria Assessment Grid */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Zap size={14} className="text-amber-500" /> ABCD Criteria Standards Breakdown
          </h3>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-muted/40 p-3 rounded-xl border border-border/40">
              <p className="text-[10px] text-muted-foreground font-medium">Asymmetry (A)</p>
              <p className="font-bold text-foreground mt-0.5">{scan.abcd.asymmetry}</p>
            </div>
            <div className="bg-muted/40 p-3 rounded-xl border border-border/40">
              <p className="text-[10px] text-muted-foreground font-medium">Border Irregularity (B)</p>
              <p className="font-bold text-foreground mt-0.5">{scan.abcd.border}</p>
            </div>
            <div className="bg-muted/40 p-3 rounded-xl border border-border/40">
              <p className="text-[10px] text-muted-foreground font-medium">Color Variegation (C)</p>
              <p className="font-bold text-foreground mt-0.5">{scan.abcd.color}</p>
            </div>
            <div className="bg-muted/40 p-3 rounded-xl border border-border/40">
              <p className="text-[10px] text-muted-foreground font-medium">Diameter Bounds (D)</p>
              <p className="font-bold text-foreground mt-0.5">{scan.abcd.diameter}</p>
            </div>
          </div>
        </div>

        {/* Clinical Recommendation Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles size={14} className="text-blue-500" /> AI Clinical Recommendation
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed font-medium">
            {scan.recommendation}
          </p>
        </div>

        {/* Medical Disclaimer & CTA */}
        <div className="space-y-3 pt-2">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-2.5">
            <ShieldAlert size={16} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
              This screening analysis is generated by AI visual pattern recognition and does not substitute a clinical biopsy or doctor diagnosis.
            </p>
          </div>

          <Link 
            href="/dermatologists"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white font-bold text-xs py-3.5 rounded-xl shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Stethoscope size={18} /> Book Consultation with Dermatologist
          </Link>
        </div>

      </div>
    </div>
  );
}
