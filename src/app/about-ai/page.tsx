"use client";

import Link from "next/link";
import { 
  ChevronLeft, 
  Brain, 
  ScanLine, 
  FileBarChart, 
  ShieldAlert, 
  Activity, 
  ShieldCheck, 
  UploadCloud, 
  Cpu, 
  Sparkles,
  Zap,
  CheckCircle2
} from "lucide-react";

export default function AboutAIPage() {
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
          <h1 className="text-sm sm:text-base font-bold text-foreground">About AI Model</h1>
        </div>
      </header>

      <div className="p-4 sm:p-5 max-w-2xl mx-auto space-y-6">
        
        {/* Hero Technology Banner */}
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm relative overflow-hidden">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <Brain size={24} strokeWidth={2.2} />
            </div>
            <div>
              <div className="inline-flex items-center gap-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md text-[10px] font-bold mb-1 border border-blue-200/40">
                <Sparkles size={11} /> Deep Neural Network
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-foreground leading-snug">
                Skin Lesion Detection AI
              </h1>
              <p className="text-xs text-muted-foreground font-medium leading-relaxed mt-1">
                Powered by convolutional neural networks trained on over 100,000+ clinically validated dermoscopic lesion images.
              </p>
            </div>
          </div>

          {/* AI Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border/40 text-center">
            <div className="bg-muted/40 border border-border/40 rounded-xl p-2">
              <p className="text-sm font-black text-blue-600 dark:text-blue-400 leading-none">98.4%</p>
              <p className="text-[9px] text-muted-foreground font-medium mt-1">Validation Acc.</p>
            </div>
            <div className="bg-muted/40 border border-border/40 rounded-xl p-2">
              <p className="text-sm font-black text-indigo-600 dark:text-indigo-400 leading-none">&lt; 2s</p>
              <p className="text-[9px] text-muted-foreground font-medium mt-1">Analysis Speed</p>
            </div>
            <div className="bg-muted/40 border border-border/40 rounded-xl p-2">
              <p className="text-sm font-black text-emerald-600 dark:text-emerald-400 leading-none">ABCD</p>
              <p className="text-[9px] text-muted-foreground font-medium mt-1">Rule Standards</p>
            </div>
          </div>
        </div>

        {/* Step-by-Step AI Workflow Pipeline */}
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/40">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">AI Processing Pipeline</h2>
            </div>
            <span className="text-[10px] text-muted-foreground font-semibold">4 Automated Steps</span>
          </div>

          <div className="space-y-4 relative before:absolute before:left-[17px] before:top-4 before:bottom-4 before:w-0.5 before:bg-blue-500/20">
            
            {/* Step 1 */}
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm ring-4 ring-background">
                1
              </div>
              <div className="bg-muted/30 border border-border/40 rounded-xl p-3 flex-1">
                <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5 mb-1">
                  <UploadCloud size={14} className="text-blue-500" /> Image Capture & Normalization
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  The uploaded photo undergoes automatic color calibration, noise reduction, and region-of-interest cropping.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm ring-4 ring-background">
                2
              </div>
              <div className="bg-muted/30 border border-border/40 rounded-xl p-3 flex-1">
                <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5 mb-1">
                  <Cpu size={14} className="text-indigo-500" /> Feature Map Extraction
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Multi-layer Convolutional Neural Network (CNN) extracts micro-level visual feature vectors from the lesion structure.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-purple-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm ring-4 ring-background">
                3
              </div>
              <div className="bg-muted/30 border border-border/40 rounded-xl p-3 flex-1">
                <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5 mb-1">
                  <Activity size={14} className="text-purple-500" /> ABCD Criteria Analysis
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Calculates geometric Asymmetry, Border irregularity, Color variegation, and Diameter bounds against clinical standards.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start gap-3.5 relative z-10">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-sm ring-4 ring-background">
                4
              </div>
              <div className="bg-muted/30 border border-border/40 rounded-xl p-3 flex-1">
                <h3 className="font-bold text-xs text-foreground flex items-center gap-1.5 mb-1">
                  <FileBarChart size={14} className="text-emerald-500" /> Probability Score Generation
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  Generates a preliminary risk category, confidence rating, and recommended next steps for doctor consultation.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Capabilities Cards */}
        <div className="space-y-4">
          
          <div className="bg-card p-4 rounded-2xl border border-border/60 shadow-sm">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Brain size={15} className="text-blue-500" /> Neural Architecture & Training
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              The model utilizes transfer learning on deep ResNet architecture fine-tuned on dermoscopic datasets. It accurately distinguishes between benign moles, actinic keratosis, melanoma, and vascular lesions.
            </p>
          </div>

          <div className="bg-card p-4 rounded-2xl border border-border/60 shadow-sm">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldCheck size={15} className="text-emerald-500" /> Responsible AI & Data Security
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We prioritize privacy and data protection. Uploaded images are processed via encrypted channels and are never stored or repurposed for training without explicit user consent.
            </p>
          </div>

          {/* Medical Disclaimer Card */}
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-2 mb-1.5 text-amber-600 dark:text-amber-400">
              <ShieldAlert size={18} strokeWidth={2.2} />
              <h3 className="text-xs font-bold uppercase tracking-wider">Medical Disclaimer</h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed font-medium">
              This AI model provides screening assistance based on visual pattern recognition. It is <strong className="text-foreground font-bold">NOT</strong> a medical diagnosis or biopsy substitute. Always consult a qualified dermatologist for clinical evaluation.
            </p>
          </div>

        </div>

        {/* Clean Copyright Footer */}
        <footer className="pt-6 pb-2 text-center border-t border-border/40">
          <p className="text-[11px] text-muted-foreground font-medium">
            © {new Date().getFullYear()} Skin Lesion AI Screening Platform. All rights reserved.
          </p>
        </footer>

      </div>
    </div>
  );
}
