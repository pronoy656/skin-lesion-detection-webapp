"use client";

import { useState, useEffect, useRef } from "react";
import * as Icons from "lucide-react";
import Link from "next/link";
import { useUI } from "@/context/UIContext";

export type AppState = "idle" | "preview" | "processing" | "result" | "error";

export default function AppFlow() {
  const { isUploadModalOpen, setUploadModalOpen } = useUI();
  const [appState, setAppState] = useState<AppState>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStageText, setScanStageText] = useState("Stage 1: Pre-processing & Noise Reduction");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const [showPDFHeader, setShowPDFHeader] = useState(false);

  // Restore scan result state from sessionStorage on browser refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = sessionStorage.getItem("currentScanState");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.appState === "result" && parsed.imageSrc) {
            setAppState("result");
            setImageSrc(parsed.imageSrc);
          }
        }
      } catch (e) {
        console.warn("Could not restore scan state from sessionStorage", e);
      }
    }
  }, []);

  // Persist scan result state to sessionStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        if (appState === "result" && imageSrc) {
          sessionStorage.setItem(
            "currentScanState",
            JSON.stringify({ appState: "result", imageSrc })
          );
        } else if (appState === "idle") {
          sessionStorage.removeItem("currentScanState");
        }
      } catch (e) {
        console.warn("Could not save scan state to sessionStorage", e);
      }
    }
  }, [appState, imageSrc]);

  const handleSavePDF = async () => {
    if (!resultRef.current) return;
    setIsSaving(true);
    setShowPDFHeader(true);

    // Wait 50ms for DOM update to render PDF header
    await new Promise((res) => setTimeout(res, 50));

    // Sanitize document style tags containing oklch/oklab to prevent html2canvas parser crash
    const styleTags = Array.from(document.head.querySelectorAll("style"));
    const savedStyles: { el: HTMLStyleElement; orig: string }[] = [];

    styleTags.forEach((tag) => {
      const text = tag.textContent || "";
      if (text.includes("oklch") || text.includes("oklab")) {
        savedStyles.push({ el: tag, orig: text });
        tag.textContent = text
          .replace(/oklch\([^)]+\)/gi, "#3b82f6")
          .replace(/oklab\([^)]+\)/gi, "#3b82f6");
      }
    });

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const pdfWidth = 210;
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Skin_Lesion_Clinical_Report_${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Restore original style tags immediately & hide PDF header
      savedStyles.forEach(({ el, orig }) => {
        el.textContent = orig;
      });
      setShowPDFHeader(false);
      setIsSaving(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorMessage("This image is too large. Please choose a smaller image (under 10MB).");
      setAppState("error");
      setUploadModalOpen(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target?.result as string);
      setAppState("preview");
      setUploadModalOpen(false);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadClick = () => fileInputRef.current?.click();
  const handleCameraClick = () => cameraInputRef.current?.click();

  const handleAnalyze = () => {
    setAppState("processing");
    setScanProgress(0);
    setScanStageText("Stage 1: Pre-processing & Noise Reduction");

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAppState("result");
          return 100;
        }
        const next = prev + 5;
        if (next >= 70) {
          setScanStageText("Stage 3: ABCDE Pattern & Lesion Profiling");
        } else if (next >= 35) {
          setScanStageText("Stage 2: Deep Convolutional Feature Extraction");
        }
        return next;
      });
    }, 150);
  };

  const resetFlow = () => {
    if (typeof window !== "undefined") {
      try { sessionStorage.removeItem("currentScanState"); } catch (e) {}
    }
    setImageSrc(null);
    setAppState("idle");
    setErrorMessage("");
    setScanProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  const handleScanAnother = () => {
    if (typeof window !== "undefined") {
      try { sessionStorage.removeItem("currentScanState"); } catch (e) {}
    }
    setImageSrc(null);
    setErrorMessage("");
    setScanProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
    fileInputRef.current?.click();
  };

  return (
    <>
      <input type="file" accept="image/jpeg, image/png, image/webp" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      <input type="file" accept="image/*" capture="environment" className="hidden" ref={cameraInputRef} onChange={handleFileChange} />
      
      {/* STAGE 1: Glassmorphic Medical Action Sheet */}
      {isUploadModalOpen && appState === "idle" && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end items-center pointer-events-auto">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity animate-in fade-in duration-300" 
            onClick={() => setUploadModalOpen(false)}
          />
          
          <div className="relative w-full max-w-lg bg-card border-t border-border/80 rounded-t-[2.5rem] p-5 sm:p-6 z-10 space-y-5 animate-in slide-in-from-bottom duration-300 pb-10">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto" />
            
            <div className="text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold border border-blue-200/40">
                <Icons.Sparkles size={13} />
                <span>AI Skin Dermoscopy</span>
              </div>
              <h2 className="text-lg font-extrabold text-foreground">Select Lesion Image Source</h2>
              <p className="text-xs text-muted-foreground font-medium">Choose camera capture or upload photo for 3s CNN analysis</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => { setUploadModalOpen(false); handleCameraClick(); }}
                className="bg-muted/40 hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-border/60 hover:border-blue-500/40 p-4 rounded-2xl flex flex-col items-center gap-2.5 text-center transition-all group active:scale-95"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform">
                  <Icons.Camera size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground">Take Photo</h3>
                  <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Use camera capture</p>
                </div>
              </button>

              <button 
                onClick={() => { setUploadModalOpen(false); handleUploadClick(); }}
                className="bg-muted/40 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 border border-border/60 hover:border-indigo-500/40 p-4 rounded-2xl flex flex-col items-center gap-2.5 text-center transition-all group active:scale-95"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Icons.Upload size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground">Upload Image</h3>
                  <p className="text-[10px] text-muted-foreground font-medium mt-0.5">Choose from gallery</p>
                </div>
              </button>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 flex items-center gap-2 text-[11px] font-medium text-blue-600 dark:text-blue-400">
              <Icons.Info size={15} className="shrink-0" />
              <span>For best results, ensure good lighting and clear focus on the skin lesion.</span>
            </div>
          </div>
        </div>
      )}

      {/* STAGE 2 & STAGE 3 & STAGE 4 FULLSCREEN CONTAINER */}
      {appState !== "idle" && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md overflow-y-auto pb-24 animate-in fade-in duration-300">
          
          {/* ERROR STATE */}
          {appState === "error" && (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
              <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-4 border border-rose-500/20">
                <Icons.AlertCircle size={32} />
              </div>
              <h2 className="text-lg font-bold mb-1 text-foreground">Image Quality Issue</h2>
              <p className="text-xs text-muted-foreground mb-6 max-w-xs">{errorMessage}</p>
              <button 
                onClick={resetFlow}
                className="bg-card border border-border text-foreground px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-muted active:scale-95 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {/* STAGE 2: Photo Studio Preview & Confirmation */}
          {appState === "preview" && (
            <div className="flex flex-col min-h-screen">
              <header className="p-4 flex items-center justify-between border-b border-border bg-background/90 sticky top-0 z-10">
                <button onClick={resetFlow} className="text-xs font-semibold text-muted-foreground px-3 py-1.5 hover:bg-muted rounded-xl transition-colors">
                  Cancel
                </button>
                <span className="text-xs font-bold text-foreground">Confirm Lesion Image</span>
                <div className="w-[60px]" />
              </header>

              <div className="p-4 sm:p-5 max-w-md mx-auto w-full space-y-3">
                {/* Compact Photo Canvas */}
                <div className="relative w-full h-[380px] sm:h-[420px] rounded-2xl overflow-hidden bg-black border border-border/60 shadow-sm flex items-center justify-center">
                  {imageSrc && (
                    <img src={imageSrc} alt="Lesion Preview" className="w-full h-full object-cover" />
                  )}

                  {/* Simulated Scanning Target Reticle Overlay */}
                  <div className="absolute inset-4 border-2 border-dashed border-cyan-400/60 rounded-xl pointer-events-none flex items-center justify-center">
                    <div className="w-3.5 h-3.5 border-t-2 border-l-2 border-cyan-400 absolute top-0 left-0" />
                    <div className="w-3.5 h-3.5 border-t-2 border-r-2 border-cyan-400 absolute top-0 right-0" />
                    <div className="w-3.5 h-3.5 border-b-2 border-l-2 border-cyan-400 absolute bottom-0 left-0" />
                    <div className="w-3.5 h-3.5 border-b-2 border-r-2 border-cyan-400 absolute bottom-0 right-0" />
                    <span className="bg-black/60 backdrop-blur-md text-cyan-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-cyan-400/40 uppercase">
                      Target Area
                    </span>
                  </div>
                </div>

                {/* Clinical Guidance Tip Box */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border border-blue-200/80 dark:border-blue-800/60 rounded-xl p-3 flex items-start gap-2.5 shadow-sm">
                  <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <Icons.Sparkles size={13} />
                  </div>
                  <p className="text-[11px] text-blue-950 dark:text-blue-200 leading-snug font-medium">
                    For accurate CNN dermoscopy, ensure <strong className="font-bold text-blue-600 dark:text-blue-400">good natural lighting</strong> and <strong className="font-bold text-blue-600 dark:text-blue-400">sharp focus</strong> directly on the lesion.
                  </p>
                </div>

                {/* Action Buttons: Choose Different Left, Start AI Analysis Right */}
                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <button 
                    onClick={handleUploadClick}
                    className="bg-card border border-border/60 hover:bg-muted text-foreground py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-1.5 active:scale-95 truncate"
                  >
                    <Icons.RotateCcw size={14} className="shrink-0" /> Choose Different
                  </button>

                  <button 
                    onClick={handleAnalyze}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-95 text-white py-2.5 rounded-xl font-bold text-xs shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all truncate"
                  >
                    <Icons.Activity size={15} className="shrink-0" /> Start AI Analysis
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STAGE 3: Neural Network Processing Progress HUD */}
          {appState === "processing" && (
            <div className="flex flex-col items-center justify-start pt-20 sm:pt-28 min-h-screen p-6 text-center space-y-6">
              {/* Neural Scanner HUD Rings */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-500/20 animate-ping opacity-40" />
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-indigo-500/40 animate-spin" style={{ animationDuration: '6s' }} />
                <div className="absolute inset-6 rounded-full border-4 border-t-blue-600 border-r-indigo-500 border-b-cyan-400 border-l-purple-500 animate-spin" style={{ animationDuration: '2s' }} />
                
                <div className="w-32 h-32 rounded-full bg-card border border-border/60 flex flex-col items-center justify-center shadow-lg relative z-10">
                  <Icons.Brain size={28} className="text-blue-500 animate-pulse mb-1" />
                  <span className="text-lg font-black text-foreground">{scanProgress}%</span>
                </div>
              </div>

              <div className="space-y-2 max-w-xs mx-auto">
                <h2 className="text-base font-bold text-foreground">AI Neural Network Scanning</h2>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-950/60 border border-blue-200/40 px-3 py-1 rounded-full inline-block">
                  {scanStageText}
                </p>
                <p className="text-[11px] text-muted-foreground font-medium pt-1">
                  Analyzing dermatological lesion features against 50,000+ clinical datasets...
                </p>
              </div>
            </div>
          )}

          {/* STAGE 4: Premium Clinical Diagnosis & ABCD Report */}
          {appState === "result" && (
            <div className="flex flex-col min-h-screen pb-safe">
              <header className="p-4 flex items-center justify-between border-b border-border bg-card sticky top-0 z-10">
                <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Icons.ShieldCheck size={16} className="text-blue-500" /> AI Dermoscopy Report
                </span>
                <button onClick={resetFlow} className="w-8 h-8 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-xl transition-colors">
                  <Icons.X size={16} />
                </button>
              </header>

              <div className="flex-1 max-w-lg mx-auto w-full p-4 sm:p-5 space-y-4">
                {/* Printable Report Canvas Area */}
                <div ref={resultRef} className="space-y-4 bg-white dark:bg-zinc-950 p-4 sm:p-5 rounded-2xl border border-border/60">
                  {/* Official Clinical PDF Header (Only renders inside Export PDF document) */}
                  {showPDFHeader && (
                    <>
                      <div className="border-b border-border/60 pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                            <Icons.Activity size={20} />
                          </div>
                          <div>
                            <h2 className="text-xs font-black text-foreground uppercase tracking-wider">AI Dermoscopy Diagnostic Center</h2>
                            <p className="text-[10px] text-muted-foreground font-semibold">Clinical DermNet CNN Model v4.2 • Certified Analysis</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-bold bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md border border-blue-200/40">
                            REF: #SLS-98421
                          </span>
                          <p className="text-[9px] text-muted-foreground font-medium mt-0.5">{new Date().toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Patient Metadata Row */}
                      <div className="grid grid-cols-3 gap-2 bg-muted/40 border border-border/40 rounded-xl p-2.5 text-[10px] font-medium text-muted-foreground">
                        <div>
                          <p className="text-[9px] font-bold uppercase text-foreground">Patient</p>
                          <p className="font-semibold text-foreground truncate">Shadhin Ahmed</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase text-foreground">Phototype</p>
                          <p className="font-semibold text-foreground">Fitzpatrick Type II</p>
                        </div>
                        <div>
                          <p className="text-[9px] font-bold uppercase text-foreground">Status</p>
                          <p className="font-semibold text-rose-600 dark:text-rose-400">Action Required</p>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Lesion Photo & Bounding Marker */}
                  <div className="relative w-full h-52 sm:h-56 rounded-2xl overflow-hidden bg-black border border-border/60 shadow-sm">
                    {imageSrc && (
                      <img src={imageSrc} alt="Analyzed Skin Lesion" className="w-full h-full object-cover" />
                    )}
                    <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-rose-500 rounded-xl bg-rose-500/15 flex items-start p-1.5 shadow-sm">
                      <span className="bg-rose-600 text-white text-[9px] font-extrabold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">
                        Lesion Region Flagged
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis Result Card */}
                  <div className="bg-card border border-rose-500/30 rounded-2xl p-4 shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-200/50 mb-1">
                          <Icons.AlertTriangle size={11} /> Clinical Concern
                        </div>
                        <h2 className="text-lg font-extrabold text-foreground">Melanoma</h2>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-rose-600 dark:text-rose-400">94% Confidence</span>
                        <p className="text-[10px] text-muted-foreground font-medium">CNN Model Match</p>
                      </div>
                    </div>

                    {/* Risk Bar Meter */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-muted-foreground">Risk Level</span>
                        <span className="text-rose-600 dark:text-rose-400 uppercase">High Risk</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="w-[94%] h-full bg-gradient-to-r from-amber-500 to-rose-600 rounded-full" />
                      </div>
                    </div>
                  </div>

                  {/* ABCD Breakdown Grid */}
                  <div className="bg-card border border-border/60 rounded-2xl p-4 shadow-sm space-y-2.5">
                    <h3 className="text-xs font-bold text-foreground uppercase tracking-wider flex items-center gap-1.5">
                      <Icons.Sliders size={14} className="text-blue-500" /> ABCD Criteria Breakdown
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">A - Asymmetry</p>
                        <p className="font-bold text-rose-600 dark:text-rose-400 text-xs mt-0.5">Asymmetrical</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">B - Border</p>
                        <p className="font-bold text-rose-600 dark:text-rose-400 text-xs mt-0.5">Irregular Edges</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">C - Color</p>
                        <p className="font-bold text-amber-600 dark:text-amber-400 text-xs mt-0.5">Multi-Tone</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-muted/40 border border-border/40">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase">D - Diameter</p>
                        <p className="font-bold text-rose-600 dark:text-rose-400 text-xs mt-0.5">6.2 mm (&gt;6mm)</p>
                      </div>
                    </div>
                  </div>

                  {/* Doctor Consultation CTA */}
                  <div className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200/50 dark:border-blue-900/50 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-blue-900 dark:text-blue-200 truncate">Consult Specialist Immediately</h4>
                      <p className="text-[11px] text-blue-700 dark:text-blue-300 font-medium line-clamp-1">Dr. Alexa Nova is available for clinical evaluation.</p>
                    </div>
                    <Link 
                      href="/dermatologists/1" 
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-xl shrink-0 active:scale-95 transition-all"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Report Actions */}
                <div className="grid grid-cols-2 gap-2.5 pt-2">
                  <button 
                    onClick={handleSavePDF}
                    disabled={isSaving}
                    className="bg-card border border-border/60 hover:bg-muted py-2.5 rounded-xl font-bold text-xs text-foreground flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Icons.Save size={15} /> {isSaving ? "Saving..." : "Export PDF"}
                  </button>
                  <button 
                    onClick={handleScanAnother}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Icons.RotateCcw size={15} /> Scan Another
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}
