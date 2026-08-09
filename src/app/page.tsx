"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { Upload, Camera, Activity, AlertCircle, RotateCcw, Share2, Save, X, Play, Brain, ChevronRight, BarChart2, FolderHeart, Zap, FileText, Clock, Lock, ShieldCheck, CheckCircle2, User } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUI } from "@/context/UIContext";

type AppState = "idle" | "preview" | "processing" | "result" | "error";

function LandingPageContent() {
  const { isUploadModalOpen, setUploadModalOpen } = useUI();
  
  // Handlers for the modal interactions would ideally go here, but for UI representation 
  // we are rendering the Landing Page and reusing the existing modal logic at the bottom.

  return (
    <div className="w-full bg-background text-foreground pb-24 md:pb-12 overflow-x-hidden">
      {/* HEADER */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white shadow-md">
            <Brain size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold leading-tight">SkinAI</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Smart Skin Analysis</p>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-full border border-blue-100 dark:border-blue-900/50">
          <ShieldCheck size={16} />
          <span className="text-xs font-semibold">AI-Powered &bull; Secure &bull; Private</span>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="w-full max-w-7xl mx-auto px-6 py-12 md:py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col items-start space-y-8 z-10">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Understand <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Your Skin</span> <br />
            With AI
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
            Upload or capture an image of a skin lesion and get an AI-powered analysis in seconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
            <button 
              onClick={() => setUploadModalOpen(true)}
              className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-[0_8px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.6)] hover:scale-105 transition-all active:scale-95"
            >
              <Activity size={20} /> Start Analysis
            </button>
            <button className="flex items-center justify-center gap-3 bg-card border border-border text-foreground px-8 py-4 rounded-full font-bold text-lg shadow-sm hover:bg-muted transition-all active:scale-95">
              <Play size={20} className="text-indigo-500 fill-indigo-500" /> How It Works
            </button>
          </div>
        </div>

        {/* PHONE MOCKUP */}
        <div className="relative mx-auto w-full max-w-[340px] h-[680px] bg-[#1a1a1a] rounded-[3.5rem] p-4 shadow-2xl border-4 border-[#2a2a2a] rotate-0 md:rotate-2 hover:rotate-0 transition-transform duration-500">
          <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-20">
            <div className="w-1/3 h-full bg-[#1a1a1a] rounded-b-3xl"></div>
          </div>
          
          <div className="w-full h-full bg-orange-100 dark:bg-orange-950 rounded-[2.5rem] overflow-hidden relative border border-border/10">
            {/* Skin Image Mock */}
            <div className="absolute inset-0 bg-gradient-to-b from-orange-200 to-orange-300 dark:from-orange-900 dark:to-orange-950 opacity-80" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-900/40 rounded-full blur-2xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-amber-950/60 rounded-full blur-xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-950/90 rounded-full blur-sm" />
            
            {/* Scanner Bracket Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
               <div className="w-56 h-56 relative">
                  <div className="absolute -top-1 -left-1 w-10 h-10 border-t-2 border-l-2 border-white rounded-tl-2xl shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <div className="absolute -top-1 -right-1 w-10 h-10 border-t-2 border-r-2 border-white rounded-tr-2xl shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <div className="absolute -bottom-1 -left-1 w-10 h-10 border-b-2 border-l-2 border-white rounded-bl-2xl shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                  <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-2 border-r-2 border-white rounded-br-2xl shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
               </div>
            </div>
            
            {/* Floating Card: Analyzing... */}
            <div className="absolute top-16 -right-6 md:-right-12 bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-2xl p-4 shadow-xl flex items-center gap-3 z-30 animate-pulse border border-border">
               <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                 <Activity size={20} />
               </div>
               <div className="pr-4">
                 <p className="text-sm font-bold text-gray-900 dark:text-foreground">Analyzing...</p>
                 <p className="text-[10px] text-gray-500 dark:text-muted-foreground font-medium">AI is scanning</p>
                 <div className="w-full h-1.5 bg-gray-100 dark:bg-muted mt-1.5 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-indigo-500 rounded-full" />
                 </div>
               </div>
            </div>
            
            {/* Floating Card: Risk Level */}
            <div className="absolute bottom-16 -left-4 md:-left-8 bg-white/95 dark:bg-card/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl w-64 z-30 border border-border">
              <h4 className="text-xs font-bold text-gray-500 dark:text-muted-foreground uppercase tracking-wider mb-2">Risk Level</h4>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)] animate-pulse" />
                <span className="text-lg font-bold text-green-600 dark:text-green-500">Low Risk</span>
                <span className="ml-auto text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800/50">92%</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-border pb-2">
                  <span className="text-gray-500 dark:text-muted-foreground font-medium">Asymmetry</span>
                  <span className="font-bold text-green-600 dark:text-green-500 flex items-center gap-1">Low <CheckCircle2 size={12}/></span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-100 dark:border-border pb-2">
                  <span className="text-gray-500 dark:text-muted-foreground font-medium">Border</span>
                  <span className="font-bold text-green-600 dark:text-green-500 flex items-center gap-1">Regular <CheckCircle2 size={12}/></span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 dark:text-muted-foreground font-medium">Color</span>
                  <span className="font-bold text-green-600 dark:text-green-500 flex items-center gap-1">Uniform <CheckCircle2 size={12}/></span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle glow behind phone */}
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 blur-3xl -z-10 rounded-full" />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full bg-card py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to understand your skin health better.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Camera, title: "Capture or Upload", desc: "Take a photo or upload an existing image.", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", borderColor: "border-blue-100 dark:border-blue-900/50" },
              { icon: Brain, title: "AI Analysis", desc: "Our AI analyzes the image and identifies characteristics.", color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-900/20", borderColor: "border-purple-100 dark:border-purple-900/50" },
              { icon: BarChart2, title: "Get Results", desc: "Receive a clear, easy-to-understand analysis.", color: "text-green-500", bg: "bg-green-50 dark:bg-green-900/20", borderColor: "border-green-100 dark:border-green-900/50" },
              { icon: FolderHeart, title: "Save & Review", desc: "Save and review your previous analyses anytime.", color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-900/20", borderColor: "border-orange-100 dark:border-orange-900/50" }
            ].map((step, idx) => (
              <div key={idx} className={`relative flex flex-col items-center text-center p-8 rounded-3xl ${step.bg} border ${step.borderColor} transition-transform hover:-translate-y-2`}>
                <div className={`w-16 h-16 rounded-2xl bg-white dark:bg-card flex items-center justify-center shadow-md mb-6 ${step.color}`}>
                  <step.icon size={28} />
                </div>
                <div className={`w-8 h-8 rounded-full ${step.color} bg-white dark:bg-card flex items-center justify-center font-black text-sm absolute top-4 left-4 shadow-sm border border-border`}>
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* POWERFUL FEATURES */}
      <section className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-foreground mb-4">Powerful Features</h2>
          <p className="text-muted-foreground">Built with cutting-edge technology to provide reliable results.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Brain, title: "AI-Powered Analysis", desc: "Advanced AI detects and analyzes skin lesion characteristics." },
            { icon: Zap, title: "Fast & Accurate", desc: "Get results in seconds with high accuracy and reliability." },
            { icon: FileText, title: "Detailed Results", desc: "Easy-to-understand reports with risk indicators." },
            { icon: Clock, title: "Analysis History", desc: "Access and track all your previous analyses in one place." },
            { icon: Lock, title: "Secure & Private", desc: "Your images and data are encrypted and 100% private." },
            { icon: User, title: "Easy to Use", desc: "Simple, intuitive design made for everyone, anywhere." }
          ].map((feat, idx) => (
            <div key={idx} className="flex gap-4 p-6 rounded-3xl border border-border bg-card hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 shrink-0 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-500">
                <feat.icon size={22} />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-1.5">{feat.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="w-full max-w-5xl mx-auto px-6 pb-20 pt-8">
        <div className="w-full rounded-[2.5rem] bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-indigo-950/30 dark:via-blue-950/20 dark:to-purple-950/30 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm border border-indigo-100 dark:border-indigo-900/30">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex w-24 h-24 shrink-0 bg-white dark:bg-card rounded-3xl shadow-xl items-center justify-center text-indigo-500 border border-indigo-50 dark:border-indigo-900/50">
              <ShieldCheck size={48} />
            </div>
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 dark:text-foreground mb-3">Ready to Analyze a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Skin Lesion?</span></h2>
              <p className="text-gray-600 dark:text-muted-foreground">Upload an image or take a photo to start your AI-powered analysis.</p>
            </div>
          </div>
          <button 
            onClick={() => setUploadModalOpen(true)}
            className="shrink-0 w-full md:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-[0_8px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.6)] hover:scale-105 transition-all active:scale-95"
          >
            <Activity size={20} /> Start Analysis
          </button>
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-3 text-center">
          <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
            <ShieldCheck size={16} className="text-amber-600 dark:text-amber-500" />
          </div>
          <p className="text-xs text-muted-foreground max-w-md font-medium">
            This tool provides AI-assisted information and is not a substitute for professional medical advice or diagnosis.
          </p>
        </div>
      </section>
      
      {/* Reusing existing Modal Logic */}
      <AppFlow />
    </div>
  );
}

// Extracting the App Flow Modal logic to keep Landing Page clean
function AppFlow() {
  const { isUploadModalOpen, setUploadModalOpen } = useUI();
  const [appState, setAppState] = useState<AppState>("idle");
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

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
      setUploadModalOpen(false); // Close the option menu
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
      
      {/* Bottom Sheet Options Modal */}
      {isUploadModalOpen && appState === "idle" && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm" 
            onClick={() => setUploadModalOpen(false)}
          />
          <div className="relative bg-card w-full max-w-md mx-auto rounded-t-3xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 pb-safe animate-in slide-in-from-bottom-full duration-300">
            <div className="w-12 h-1.5 bg-muted rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-6 text-center">Choose an option</h3>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setUploadModalOpen(false); handleCameraClick(); }}
                className="flex flex-col items-center justify-center p-6 bg-muted/50 hover:bg-muted rounded-2xl border border-border transition-colors gap-3 group"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Camera size={28} />
                </div>
                <span className="font-semibold text-sm">Take Photo</span>
              </button>
              
              <button 
                onClick={() => { setUploadModalOpen(false); handleUploadClick(); }}
                className="flex flex-col items-center justify-center p-6 bg-muted/50 hover:bg-muted rounded-2xl border border-border transition-colors gap-3 group"
              >
                <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Upload size={28} />
                </div>
                <span className="font-semibold text-sm">Upload Image</span>
              </button>
            </div>
            <button 
              onClick={() => setUploadModalOpen(false)}
              className="w-full mt-6 py-4 font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* App States Modals/Overlays */}
      {appState !== "idle" && (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
          {appState === "error" && (
            <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
              <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-6 shadow-sm border border-red-200">
                <AlertCircle size={40} />
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
                      <RotateCcw size={16} /> Change Image
                    </button>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground px-4">
                    Your image will be securely processed by our AI model to identify potential anomalies.
                  </p>
                </div>

                <button 
                  onClick={handleAnalyze}
                  className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-5 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  <Activity size={24} /> Analyze Image
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
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/30 to-purple-500/60 mix-blend-overlay animate-pulse" />
                    <div className="absolute inset-0 scanner-line"></div>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center text-center max-w-sm">
                <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-500 rounded-full flex items-center justify-center mb-6 shadow-inner animate-bounce">
                  <Activity size={32} />
                </div>
                <h2 className="text-3xl font-extrabold mb-3 text-foreground">Analyzing image...</h2>
                <p className="text-muted-foreground text-lg">Detecting potential lesion patterns based on millions of clinically validated samples.</p>
              </div>
              
              <style dangerouslySetInnerHTML={{__html: `
                .scanner-line {
                  width: 100%;
                  height: 6px;
                  background: #8b5cf6;
                  box-shadow: 0 0 20px 5px rgba(139, 92, 246, 0.7);
                  position: absolute;
                  top: 0;
                  left: 0;
                  animation: scan 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
                }
                @keyframes scan {
                  0% { top: 0%; opacity: 0; }
                  10% { opacity: 1; }
                  90% { opacity: 1; }
                  100% { top: 100%; opacity: 0; }
                }
              `}} />
            </div>
          )}

          {appState === "result" && (
            <div className="flex flex-col min-h-screen pb-safe">
              <header className="p-4 flex items-center justify-between border-b border-border bg-card sticky top-0 z-10">
                <h1 className="text-xl font-bold">Analysis Result</h1>
                <button onClick={resetFlow} className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-full transition-colors">
                  <X size={20} />
                </button>
              </header>

              <div className="flex-1 p-6 space-y-6 max-w-md mx-auto w-full">
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
                      <AlertCircle size={28} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">Potential Lesion</h2>
                      <div className="inline-flex items-center gap-1.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full mt-2 border border-indigo-100 dark:border-indigo-900/50">
                        <Activity size={16} />
                        <span className="text-sm font-bold">94% Confidence</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-base text-muted-foreground mt-4 leading-relaxed">
                    The AI model detected patterns consistent with a potential skin lesion in the highlighted area.
                  </p>
                </div>
                
                <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-2xl p-5 flex gap-4 shadow-sm">
                  <ShieldCheck size={24} className="text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-900 dark:text-amber-400/90 leading-relaxed">
                    <strong>Medical Disclaimer:</strong> This result is generated by AI for informational purposes only. It is not a definitive medical diagnosis. Please consult a qualified healthcare professional.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2 pb-8">
                  <button className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-muted py-4 rounded-2xl font-bold text-base transition-colors shadow-sm">
                    <Save size={20} /> Save
                  </button>
                  <button className="flex items-center justify-center gap-2 bg-card border border-border hover:bg-muted py-4 rounded-2xl font-bold text-base transition-colors shadow-sm">
                    <Share2 size={20} /> Share
                  </button>
                  <button className="col-span-2 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-5 rounded-2xl font-bold text-lg shadow-[0_8px_20px_rgba(99,102,241,0.3)] active:scale-95 transition-transform" onClick={resetFlow}>
                    <RotateCcw size={20} /> Analyze Another Image
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Activity className="animate-spin text-indigo-500" size={40}/></div>}>
      <LandingPageContent />
    </Suspense>
  );
}
