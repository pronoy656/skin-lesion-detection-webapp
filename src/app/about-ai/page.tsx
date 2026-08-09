"use client";

import Link from "next/link";
import { ChevronLeft, Brain, ScanLine, FileBarChart, CheckCircle2, ShieldAlert } from "lucide-react";

export default function AboutAIPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md p-4 border-b border-border">
        <Link href="/profile" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground font-medium transition-colors">
          <ChevronLeft size={20} /> Back
        </Link>
      </header>

      <main className="max-w-2xl mx-auto px-6 pt-8">
        
        {/* Editorial Header */}
        <div className="mb-12">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 rounded-2xl flex items-center justify-center mb-6 drop-shadow-sm">
            <Brain size={32} strokeWidth={2.5} />
          </div>
          <h1 className="text-4xl font-black text-foreground mb-4 leading-tight tracking-tight">
            About Our AI Model
          </h1>
          <p className="text-xl text-muted-foreground font-medium leading-relaxed">
            Discover how advanced neural networks power our skin lesion detection platform to assist in early identification and care.
          </p>
        </div>

        {/* Featured Visual */}
        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-border">
          <img 
            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            alt="AI Neural Network representation" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <article className="prose prose-blue dark:prose-invert prose-headings:font-black prose-p:font-medium prose-p:text-muted-foreground prose-p:leading-relaxed max-w-none">
          
          <h2 className="text-2xl border-b border-border pb-2 mb-6">How Our AI Works</h2>
          <p>
            Our artificial intelligence model is built on state-of-the-art convolutional neural networks (CNNs), which are algorithms specifically designed to analyze visual imagery. By learning from hundreds of thousands of clinically validated dermoscopic images, the AI has developed an extraordinary ability to recognize complex patterns and subtle visual features in skin lesions.
          </p>

          <h2 className="text-2xl border-b border-border pb-2 mt-12 mb-6 flex items-center gap-3">
            <ScanLine className="text-blue-500" /> Image Analysis
          </h2>
          <p>
            When you upload a photo, the AI does not simply "look" at the image; it breaks it down into millions of individual pixels and mathematical features. It adjusts for lighting, color balance, and noise before comparing the structural patterns of your lesion against its vast database of known conditions.
          </p>

          {/* Timeline Section */}
          <div className="my-12">
            <h3 className="text-2xl font-black mb-8 text-foreground">From Image to Insight</h3>
            
            <div className="relative space-y-6 before:absolute before:inset-0 before:ml-7 before:-translate-x-px before:h-[calc(100%-3rem)] before:w-0.5 before:bg-gradient-to-b before:from-blue-200 before:via-indigo-200 before:to-transparent dark:before:from-blue-800 dark:before:via-indigo-800">
              
              <div className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-[6px] border-background bg-blue-500 text-white shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                  <span className="text-lg font-black">1</span>
                </div>
                <div className="bg-card p-6 rounded-[1.5rem] border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 transition-all group-hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] group-hover:border-blue-200 dark:group-hover:border-blue-800">
                  <h4 className="font-bold text-lg text-foreground mb-1.5">Upload Image</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0">User submits a high-quality photo of the skin lesion.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-[6px] border-background bg-indigo-500 text-white shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                  <span className="text-lg font-black">2</span>
                </div>
                <div className="bg-card p-6 rounded-[1.5rem] border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 transition-all group-hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] group-hover:border-indigo-200 dark:group-hover:border-indigo-800">
                  <h4 className="font-bold text-lg text-foreground mb-1.5">Image Processing</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0">The image is normalized, cropped, and enhanced for clarity.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-[6px] border-background bg-purple-500 text-white shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                  <span className="text-lg font-black">3</span>
                </div>
                <div className="bg-card p-6 rounded-[1.5rem] border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 transition-all group-hover:shadow-[0_8px_30px_rgba(168,85,247,0.1)] group-hover:border-purple-200 dark:group-hover:border-purple-800">
                  <h4 className="font-bold text-lg text-foreground mb-1.5">AI Detection</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0">The neural network extracts features and performs pattern matching.</p>
                </div>
              </div>

              <div className="relative flex items-start gap-6 group">
                <div className="flex items-center justify-center w-14 h-14 rounded-full border-[6px] border-background bg-emerald-500 text-white shadow-sm shrink-0 z-10 transition-transform group-hover:scale-110">
                  <span className="text-lg font-black">4</span>
                </div>
                <div className="bg-card p-6 rounded-[1.5rem] border border-border/60 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex-1 transition-all group-hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] group-hover:border-emerald-200 dark:group-hover:border-emerald-800">
                  <h4 className="font-bold text-lg text-foreground mb-1.5">Result Generation</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0">A probability score and preliminary classification are generated.</p>
                </div>
              </div>

            </div>
          </div>

          <h2 className="text-2xl border-b border-border pb-2 mt-12 mb-6">Lesion Detection</h2>
          <p>
            During the detection phase, the model specifically looks for indicators categorized by dermatologists in the ABCD rule (Asymmetry, Border irregularity, Color variegation, Diameter). While it cannot perform a biopsy, its ability to quickly flag suspicious micro-structures is a powerful tool for early intervention.
          </p>

          <h2 className="text-2xl border-b border-border pb-2 mt-12 mb-6 flex items-center gap-3">
            <FileBarChart className="text-blue-500" /> Results & Confidence
          </h2>
          <p>
            When a result is provided, it is accompanied by a confidence percentage. A high confidence score means the visual features strongly align with patterns the AI has seen before. However, a low confidence score usually indicates poor image quality, ambiguous lesion characteristics, or a condition outside the model's primary training data.
          </p>

          <h2 className="text-2xl border-b border-border pb-2 mt-12 mb-6">Responsible AI & Privacy</h2>
          <p>
            We prioritize both accuracy and privacy. In this application, image processing happens securely. Your uploaded images are not used to further train the model without explicit consent, ensuring your personal health data remains entirely in your control.
          </p>

          {/* Medical Disclaimer Card */}
          <div className="mt-12 bg-card border border-red-200 dark:border-red-900/50 shadow-sm rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
            <div className="flex items-center gap-3 mb-3 text-red-600 dark:text-red-500">
              <ShieldAlert size={28} strokeWidth={2.5} />
              <h3 className="text-xl font-black m-0 text-foreground">Medical Disclaimer</h3>
            </div>
            <p className="text-muted-foreground m-0 font-medium leading-relaxed">
              The AI model provides informational insights based on visual pattern recognition. It is <strong className="text-foreground font-black underline decoration-red-500 decoration-2 underline-offset-2">NOT</strong> a medical diagnosis. The results should not replace professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for any concerns regarding your skin health.
            </p>
          </div>

        </article>
      </main>
    </div>
  );
}
