"use client";

import { useState, useRef, Suspense } from "react";
import * as Icons from "lucide-react";
import StackedCards from "@/components/StackedCards";
import { useUI } from "@/context/UIContext";
import Image from "next/image";
import Link from "next/link";
import { categories, doctors, blogs } from "@/lib/data";

type AppState = "idle" | "preview" | "processing" | "result" | "error";

function MobileAppContent() {
  const { isUploadModalOpen, setUploadModalOpen } = useUI();
  
  return (
    <div className="w-full bg-background text-foreground pb-24 px-6 pt-12 overflow-x-hidden min-h-screen">
      
      {/* HEADER SECTION */}
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-muted border border-border">
            <img 
              src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-foreground">Hi, Shadhin</h1>
            <p className="text-sm text-gray-400 font-medium">How is your skin today?</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-900 dark:text-foreground active:scale-90 transition-transform">
            <Icons.Search size={24} strokeWidth={1.5} />
          </button>
          <button className="relative text-gray-900 dark:text-foreground active:scale-90 transition-transform">
            <Icons.Bell size={24} strokeWidth={1.5} />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-background rounded-full"></span>
          </button>
        </div>
      </header>

      {/* RECENT SCAN SECTION */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-foreground">AI Skin Analysis</h2>
          <button className="text-blue-500 text-sm font-semibold active:opacity-70 transition-opacity">History</button>
        </div>
        
        {/* Vertical Stacked Doctor Cards Component */}
        <StackedCards />
      </section>

      {/* CATEGORIES SECTION */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-foreground">Categories</h2>
          <Link href="/categories" className="text-blue-500 text-sm font-semibold active:opacity-70 transition-opacity">See All</Link>
        </div>
        
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-6">
          {categories.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="flex flex-col items-center justify-center gap-3 bg-card px-4 py-5 min-w-[110px] rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform shrink-0 snap-start">
                <div className={`${cat.color.replace(/bg-\S+/g, '')} drop-shadow-sm`}>
                  <Icon size={30} strokeWidth={2} />
                </div>
                <span className="text-xs font-bold text-foreground text-center leading-tight">{cat.title}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* TOP DERMATOLOGISTS SECTION */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-foreground">Top Dermatologists</h2>
          <Link href="/dermatologists" className="text-blue-500 text-sm font-semibold active:opacity-70 transition-opacity">See All</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {doctors.slice(0, 2).map((doc) => (
            <Link key={doc.id} href={`/dermatologists/${doc.id}`} className="bg-card p-3 rounded-3xl flex items-center gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 relative active:scale-[0.98] transition-transform">
              <div className="w-[85px] h-[85px] shrink-0 bg-blue-100 dark:bg-blue-900/30 rounded-2xl overflow-hidden relative">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
              </div>
              <div className="flex-1 py-1">
                <h3 className="font-bold text-base text-gray-900 dark:text-foreground mb-1">{doc.name}</h3>
                <p className="text-xs text-gray-500 font-medium mb-2">{doc.specialty} • {doc.hospital}</p>
                <div className="flex items-center gap-1">
                  {[...Array(doc.rating)].map((_, j) => (
                    <Icons.Star key={j} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                  <span className="text-[10px] text-gray-400 font-semibold ml-1">({doc.reviews})</span>
                </div>
              </div>
              <button className="absolute top-4 right-4 text-gray-400 active:text-gray-700 p-1">
                <Icons.MoreVertical size={18} />
              </button>
            </Link>
          ))}
        </div>
      </section>


      {/* HEALTH TIPS SECTION */}
      <section className="mt-8 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 dark:text-foreground">Skin Care Tips</h2>
          <Link href="/blog" className="text-blue-500 text-sm font-semibold active:opacity-70 transition-opacity">See All</Link>
        </div>
        
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pr-6">
          {blogs.slice(0, 3).map((tip) => (
            <Link key={tip.id} href={`/blog/${tip.id}`} className="min-w-[240px] max-w-[240px] bg-card rounded-3xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 snap-start active:scale-[0.98] transition-transform flex flex-col">
              <div className="h-32 w-full bg-muted relative">
                <img src={tip.image} alt="Tip" className="w-full h-full object-cover" />
              </div>
              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-bold text-sm text-gray-900 dark:text-foreground mb-2 line-clamp-2 leading-snug">{tip.title}</h3>
                <div className="mt-auto flex justify-between items-center text-xs">
                  <span className="text-blue-500 font-bold">{tip.readTime}</span>
                  <span className="text-muted-foreground">{tip.date.split(',')[0]}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHY USE OUR AI SECTION */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-foreground mb-4">Why Use Our AI?</h2>
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-[0_8px_30px_rgba(59,130,246,0.2)]">
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-full mt-0.5 shrink-0"><Icons.Zap size={18} /></div>
              <div>
                <h4 className="font-bold text-base">Instant Analysis</h4>
                <p className="text-blue-100 text-[13px] mt-1 leading-snug">Get preliminary insights in seconds without waiting for an appointment.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-full mt-0.5 shrink-0"><Icons.ShieldCheck size={18} /></div>
              <div>
                <h4 className="font-bold text-base">High Accuracy</h4>
                <p className="text-blue-100 text-[13px] mt-1 leading-snug">Trained on hundreds of thousands of clinically validated images.</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="bg-white/20 p-2 rounded-full mt-0.5 shrink-0"><Icons.Lock size={18} /></div>
              <div>
                <h4 className="font-bold text-base">Private & Secure</h4>
                <p className="text-blue-100 text-[13px] mt-1 leading-snug">Your health data and images remain completely private and securely processed.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* MEDICAL DISCLAIMER SECTION */}
      <section className="mb-4">
        <div className="bg-card border border-red-200 dark:border-red-900/50 shadow-sm rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
          <div className="flex items-center gap-3 mb-3 text-red-600 dark:text-red-500">
            <Icons.ShieldAlert size={24} strokeWidth={2.5} />
            <h3 className="text-lg font-black m-0 text-foreground">Medical Disclaimer</h3>
          </div>
          <p className="text-muted-foreground m-0 font-medium leading-relaxed text-sm">
            The AI model provides informational insights. It is <strong className="text-foreground font-black underline decoration-red-500 decoration-2 underline-offset-2">NOT</strong> a medical diagnosis. Always consult a qualified healthcare provider for any concerns regarding your skin health.
          </p>
        </div>
      </section>

      {/* Upload/Scan Modal Flow stays hidden here */}
      <AppFlow />
    </div>
  );
}

// Keeping the existing AppFlow modal logic intact since it is critical to the app's function
function AppFlow() {
  const { isUploadModalOpen, setUploadModalOpen } = useUI();
  const [appState, setAppState] = useState<AppState>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleSavePDF = async () => {
    if (!resultRef.current) return;
    setIsSaving(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      
      const canvas = await html2canvas(resultRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: document.documentElement.classList.contains("dark") ? "#09090b" : "#ffffff"
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height]
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("Skin_Lesion_Analysis.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
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
    setTimeout(() => {
      setAppState("result");
    }, 3500);
  };

  const resetFlow = () => {
    setImageSrc(null);
    setAppState("idle");
    setErrorMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <>
      <input type="file" accept="image/jpeg, image/png, image/webp" className="hidden" ref={fileInputRef} onChange={handleFileChange} />
      <input type="file" accept="image/*" capture="environment" className="hidden" ref={cameraInputRef} onChange={handleFileChange} />
      
      {isUploadModalOpen && appState === "idle" && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end items-center pb-32 pointer-events-auto">
          <div 
            className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" 
            onClick={() => setUploadModalOpen(false)}
          />
          
          <div className="relative flex gap-8 z-10">
              <button 
                onClick={() => { setUploadModalOpen(false); handleCameraClick(); }}
                className="flex flex-col items-center gap-3 group animate-in slide-in-from-bottom-12 fade-in duration-300"
              >
                <div className="w-16 h-16 bg-white dark:bg-card text-blue-500 rounded-full flex items-center justify-center shadow-xl group-active:scale-90 transition-transform">
                  <Icons.Camera size={28} />
                </div>
                <span className="text-sm font-bold text-white drop-shadow-md">Take Photo</span>
              </button>

              <button 
                onClick={() => { setUploadModalOpen(false); handleUploadClick(); }}
                className="flex flex-col items-center gap-3 group animate-in slide-in-from-bottom-16 fade-in duration-500"
              >
                <div className="w-16 h-16 bg-white dark:bg-card text-blue-500 rounded-full flex items-center justify-center shadow-xl group-active:scale-90 transition-transform">
                  <Icons.Upload size={28} />
                </div>
                <span className="text-sm font-bold text-white drop-shadow-md">Upload Image</span>
              </button>
          </div>
          
          {/* Close button */}
          <button 
            onClick={() => setUploadModalOpen(false)}
            className="relative z-10 mt-10 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform animate-in fade-in duration-500 delay-100"
          >
            <Icons.X size={24} />
          </button>
        </div>
      )}

      {/* Keeping Preview, Processing, and Result UI the same for now */}
      {appState !== "idle" && (
        <div className="fixed inset-0 z-40 bg-background/95 backdrop-blur-md overflow-y-auto pb-24 animate-in fade-in duration-300">
          {appState === "error" && (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-200">
                <Icons.AlertCircle size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Issue with Image</h2>
              <p className="text-muted-foreground mb-8 text-lg max-w-sm">{errorMessage}</p>
              <button 
                onClick={resetFlow}
                className="w-full max-w-xs bg-card border border-border text-foreground py-4 rounded-xl font-bold text-lg shadow-sm hover:bg-muted active:scale-95 transition-all"
              >
                Try Again
              </button>
            </div>
          )}

          {appState === "preview" && (
             <div className="flex flex-col min-h-screen pb-safe">
             <header className="p-4 flex items-center justify-between bg-card border-b border-border">
               <button onClick={resetFlow} className="text-muted-foreground font-medium px-4 py-2 hover:bg-muted rounded-full transition-colors">Cancel</button>
               <span className="font-bold text-lg">Confirm Image</span>
               <div className="w-[84px]"></div>
             </header>

             <div className="flex-1 p-6 flex flex-col justify-center max-w-md mx-auto w-full">
               <div className="w-full aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl mb-8 bg-black relative border-8 border-card">
                 {imageSrc && (
                   <img src={imageSrc} alt="Preview" className="w-full h-full object-cover" />
                 )}
                 <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                   <button 
                     onClick={handleUploadClick}
                     className="bg-black/60 backdrop-blur-md text-white text-sm font-semibold px-6 py-3 rounded-full flex items-center gap-2 hover:bg-black/80 transition-colors"
                   >
                     <Icons.RotateCcw size={16} /> Change Image
                   </button>
                 </div>
               </div>
               <button 
                 onClick={handleAnalyze}
                 className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(59,130,246,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
               >
                 <Icons.Activity size={24} /> Analyze Image
               </button>
             </div>
           </div>
          )}

          {appState === "processing" && (
            <div className="flex flex-col items-center justify-center min-h-screen p-6">
              <div className="relative w-full max-w-[300px] aspect-square rounded-[3rem] overflow-hidden mb-10 bg-black shadow-2xl border-4 border-card">
                {imageSrc && (
                  <>
                    <img src={imageSrc} alt="Processing" className="w-full h-full object-cover opacity-50" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/30 to-indigo-500/60 mix-blend-overlay animate-pulse" />
                    <div className="absolute inset-0 scanner-line"></div>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center text-center max-w-sm">
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-500 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                  <Icons.Activity size={32} />
                </div>
                <h2 className="text-3xl font-extrabold mb-3 text-foreground">Analyzing...</h2>
                <p className="text-muted-foreground text-lg">Scanning patterns.</p>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                .scanner-line { width: 100%; height: 6px; background: #3b82f6; box-shadow: 0 0 20px 5px rgba(59, 130, 246, 0.7); position: absolute; top: 0; left: 0; animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
                @keyframes scan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
              `}} />
            </div>
          )}

          {appState === "result" && (
            <div className="flex flex-col min-h-screen pb-safe">
              <header className="p-4 flex items-center justify-between border-b border-border bg-card sticky top-0 z-10">
                <h1 className="text-xl font-bold">Analysis Result</h1>
                <button onClick={resetFlow} className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-full transition-colors">
                  <Icons.X size={20} />
                </button>
              </header>

              <div className="flex-1 max-w-md mx-auto w-full flex flex-col">
                {/* PDF Content Area */}
                <div ref={resultRef} className="p-6 space-y-6 bg-background dark:bg-zinc-950 rounded-b-[2rem]">
                  <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden bg-black shadow-xl border-4 border-card">
                    {imageSrc && (
                      <>
                        <img src={imageSrc} alt="Analyzed" className="w-full h-full object-cover" />
                        {/* Mock Bounding Box Overlay */}
                        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 border-2 border-red-500 rounded-xl bg-red-500/10 flex items-start p-1.5 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                          <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-md uppercase tracking-wider">Detected</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="bg-card rounded-3xl p-6 border border-border shadow-md">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center shrink-0 shadow-sm border border-red-100 dark:border-red-900/50">
                        <Icons.AlertCircle size={28} />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-foreground">Melanoma</h2>
                        <div className="inline-flex items-center gap-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-full mt-2 border border-red-100 dark:border-red-900/50">
                          <Icons.Activity size={16} />
                          <span className="text-sm font-bold">High Risk (94% Match)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <h3 className="font-bold text-gray-900 dark:text-foreground mb-2">Treatment & Care</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Melanoma is a serious form of skin cancer. The primary treatment is surgical excision to remove the melanoma and surrounding healthy skin. 
                        Early detection significantly increases the cure rate. Please consult a dermatologist immediately for a biopsy and professional diagnosis.
                      </p>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-xs text-red-500 font-bold flex items-center gap-2">
                        <Icons.AlertCircle size={14} /> This is an AI assessment, not a medical diagnosis.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons (Not included in PDF) */}
                <div className="grid grid-cols-2 gap-4 p-6 pt-2 pb-8">
                  <button 
                    onClick={handleSavePDF}
                    disabled={isSaving}
                    className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-muted py-4 rounded-2xl font-bold text-base transition-colors shadow-sm text-gray-900 dark:text-foreground disabled:opacity-70"
                  >
                    {isSaving ? <Icons.Activity className="animate-spin" size={20} /> : <Icons.Save size={20} />} 
                    {isSaving ? "Saving..." : "Save PDF"}
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-muted py-4 rounded-2xl font-bold text-base transition-colors shadow-sm text-gray-900 dark:text-foreground">
                    <Icons.Share2 size={20} /> Share
                  </button>
                  <button className="col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-5 rounded-2xl font-bold text-lg shadow-[0_4px_16px_rgba(59,130,246,0.3)] active:scale-95 transition-transform" onClick={resetFlow}>
                    <Icons.RotateCcw size={20} /> Scan Another
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

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Icons.Activity className="animate-spin text-indigo-500" size={40}/></div>}>
      <MobileAppContent />
    </Suspense>
  );
}
