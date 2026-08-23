import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { categories, blogs } from "@/lib/data";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors">
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">All Categories</h1>
        </div>
      </header>
      
      <div className="p-5">
        {/* Sleek Discovery Header Card */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 mb-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute right-2 bottom-2 opacity-15">
            <Icons.Sparkles size={80} strokeWidth={1} />
          </div>
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-1 leading-tight">Explore Categories</h2>
            <p className="text-blue-100 mb-4 text-xs leading-relaxed max-w-[90%]">
              Discover skin health topics and professional insights tailored for you.
            </p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-xl text-xs font-bold shadow-sm hover:bg-blue-50 active:scale-95 transition-all flex items-center gap-1.5">
              Start Exploring <Icons.ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {categories.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            const relatedCount = blogs.filter(b => b.categoryId === cat.id).length;
            
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="bg-card p-3.5 rounded-2xl flex flex-col items-center text-center gap-1.5 shadow-sm border border-border/50 hover:border-blue-500/30 hover:shadow-md active:scale-95 transition-all">
                <div className={`${cat.color} shrink-0 mb-0.5`}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-bold text-xs text-foreground mb-0.5">{cat.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-medium">{relatedCount} Articles</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
