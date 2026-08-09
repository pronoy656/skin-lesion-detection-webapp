import { CheckCircle2, AlertCircle, Calendar, ChevronRight } from "lucide-react";

export default function HistoryPage() {
  const historyItems = [
    {
      id: 1,
      date: "Aug 09, 2026",
      time: "10:23 AM",
      status: "Potential Lesion",
      confidence: 94,
      isPositive: true,
    },
    {
      id: 2,
      date: "Aug 02, 2026",
      time: "02:15 PM",
      status: "No Lesion Detected",
      confidence: 98,
      isPositive: false,
    },
    {
      id: 3,
      date: "Jul 15, 2026",
      time: "09:45 AM",
      status: "Unable to Analyze",
      confidence: 0,
      isPositive: null,
    },
    {
      id: 4,
      date: "Jun 28, 2026",
      time: "11:30 AM",
      status: "Potential Lesion",
      confidence: 85,
      isPositive: true,
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pb-20 bg-background">
      <header className="p-4 border-b border-border bg-card sticky top-0 z-10">
        <h1 className="text-xl font-bold">Detection History</h1>
      </header>

      <div className="p-4 space-y-4">
        {historyItems.map((item) => (
          <div key={item.id} className="bg-card border border-border p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer hover:bg-muted/50 transition-colors">
            {/* Thumbnail Placeholder */}
            <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700"></div>
              {item.isPositive === true && <div className="absolute inset-0 border-2 border-red-500 rounded-xl pointer-events-none" />}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-1">
                {item.isPositive === true ? (
                  <AlertCircle size={14} className="text-red-500" />
                ) : item.isPositive === false ? (
                  <CheckCircle2 size={14} className="text-green-500" />
                ) : (
                  <AlertCircle size={14} className="text-amber-500" />
                )}
                <h3 className="font-bold text-foreground text-sm truncate">{item.status}</h3>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
                <Calendar size={12} />
                <span>{item.date} · {item.time}</span>
              </div>
              
              {item.confidence > 0 && (
                <div className="inline-flex items-center bg-muted text-foreground px-2 py-0.5 rounded text-[10px] font-semibold">
                  Confidence: {item.confidence}%
                </div>
              )}
            </div>
            
            <ChevronRight size={20} className="text-muted-foreground shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
