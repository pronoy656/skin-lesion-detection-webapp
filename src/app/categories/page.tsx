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
        <div className="grid grid-cols-2 gap-4">
          {categories.map((cat) => {
            const Icon = (Icons as any)[cat.icon];
            const relatedCount = blogs.filter(b => b.categoryId === cat.id).length;
            
            return (
              <Link key={cat.id} href={`/categories/${cat.id}`} className="bg-card p-5 rounded-3xl flex flex-col items-center text-center gap-3 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform">
                <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center shadow-sm">
                  <div className={cat.color.split(' ')[0] + " " + cat.color.split(' ')[1]}>
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-foreground mb-1">{cat.title}</h3>
                  <p className="text-[10px] text-muted-foreground font-semibold">{relatedCount} Articles</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
