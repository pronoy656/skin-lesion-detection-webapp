import Link from "next/link";
import { ChevronLeft, ArrowRight, Clock } from "lucide-react";
import * as Icons from "lucide-react";
import { categories, blogs } from "@/lib/data";

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categories.find(c => c.id === id) || categories[0];
  const relatedBlogs = blogs.filter(b => b.categoryId === category.id);
  const featuredBlog = relatedBlogs[0];
  const remainingBlogs = relatedBlogs.slice(1);
  const Icon = (Icons as any)[category.icon];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Compact Top Bar */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <Link href="/categories" className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors">
          <ChevronLeft size={18} />
        </Link>
        <span className="text-xs font-bold text-foreground truncate max-w-[150px]">{category.title}</span>
        <div className="w-9"></div>
      </header>
      
      <div className="p-4 sm:p-5">
        {/* Compact Selected Category Card */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 sm:p-5 shadow-sm mb-6 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className={`${category.color} shrink-0 mt-0.5`}>
              <Icon size={22} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-foreground leading-snug">{category.title}</h1>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {category.description}
              </p>
            </div>
          </div>
        </div>

        {/* Featured Article */}
        {featuredBlog && (
          <div className="mb-6">
            <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Featured Article</h2>
            <Link href={`/blog/${featuredBlog.id}`} className="block bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:border-blue-500/30 active:scale-[0.98] transition-all">
              <div className="h-40 w-full relative bg-muted">
                <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-base text-foreground mb-1.5 leading-tight">{featuredBlog.title}</h3>
                <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">{featuredBlog.excerpt}</p>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-blue-600 flex items-center gap-1">Read Article <ArrowRight size={14} /></span>
                  <span className="text-muted-foreground font-medium flex items-center gap-1"><Clock size={12} /> {featuredBlog.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
        )}
        
        {/* Latest Articles */}
        {remainingBlogs.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-bold text-foreground mb-3">More from {category.title}</h2>
            <div className="flex flex-col gap-3">
              {remainingBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:border-blue-500/30 active:scale-[0.98] transition-all flex p-2.5 gap-3">
                  <div className="w-20 h-20 bg-muted rounded-xl relative shrink-0 overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-xs text-foreground mb-1 leading-snug line-clamp-2">{blog.title}</h3>
                    <div className="mt-1 flex items-center gap-2 text-[10px]">
                      <span className="text-blue-600 font-bold">Read →</span>
                      <span className="text-muted-foreground font-medium">{blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Empty State if no blogs at all */}
        {relatedBlogs.length === 0 && (
          <div className="text-center p-8 bg-card rounded-2xl border border-border/50 border-dashed mb-6">
            <p className="text-xs text-muted-foreground font-medium">New articles coming soon.</p>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-2 border-t border-border/50 pt-5">
          <h2 className="text-sm font-bold text-foreground mb-3">Explore Related Topics</h2>
          <div className="flex gap-2.5 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden pr-4 -mr-4">
            {categories.filter(c => c.id !== category.id).map((cat) => {
              const CatIcon = (Icons as any)[cat.icon];
              return (
                <Link key={cat.id} href={`/categories/${cat.id}`} className="flex flex-col items-center justify-center gap-2 bg-card p-3 min-w-[92px] max-w-[92px] rounded-2xl shadow-sm border border-border/50 hover:border-blue-500/30 active:scale-95 transition-all shrink-0 snap-start">
                  <div className={`${cat.color} shrink-0`}>
                    <CatIcon size={18} strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold text-[11px] text-foreground text-center leading-tight line-clamp-1">{cat.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
