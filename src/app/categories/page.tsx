import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { categories, blogs } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">All Categories</h1>
        </div>
      </header>
      
      <div className="p-6">
        {/* Premium Discovery Header Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-6 mb-8 text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute right-0 bottom-0 opacity-20">
            <Icons.Sparkles size={120} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl font-black mb-2 leading-tight">Explore Categories</h2>
            <p className="text-blue-100 mb-6 text-sm leading-relaxed max-w-[85%]">
              Discover skin health topics, professional insights, and find the information you're looking for.
            </p>
            <button className="bg-white text-blue-600 px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-2">
              Start Exploring <Icons.ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            const relatedCount = blogs.filter(b => b.categoryId === cat.id).length;
            
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="bg-card p-6 rounded-[1.5rem] flex flex-col items-center text-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform">
                <div className={`${cat.color.split(' ')[0]} ${cat.color.split(' ')[1]} mb-1`}>
                  <Icon size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">{cat.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">{relatedCount} Articles</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
