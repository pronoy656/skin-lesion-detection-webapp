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
      {/* Editorial Header */}
      <header className="pt-6 px-6 pb-8 border-b border-border/60 bg-card">
        <Link href="/categories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 font-medium transition-colors">
          <ChevronLeft size={18} /> Back to Categories
        </Link>
        
        <div className="flex items-center gap-3 mb-4">
          <div className={`${category.color.replace(/bg-\S+/g, '')} drop-shadow-md`}>
            <Icon size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-3xl font-black text-foreground">{category.title}</h1>
        </div>
        
        <div className="w-12 h-1 bg-border rounded-full mb-5"></div>
        
        <p className="text-lg text-muted-foreground leading-relaxed max-w-sm font-medium">
          {category.description}
        </p>
      </header>
      
      <div className="p-6">
        {/* Featured Article */}
        {featuredBlog && (
          <div className="mb-10">
            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Featured Article</h2>
            <Link href={`/blog/${featuredBlog.id}`} className="block bg-card rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-border/50 active:scale-[0.98] transition-transform">
              <div className="h-48 w-full relative bg-muted">
                <img src={featuredBlog.image} alt={featuredBlog.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl text-foreground mb-2 leading-tight">{featuredBlog.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">{featuredBlog.excerpt}</p>
                <div className="flex justify-between items-center text-sm font-bold">
                  <span className="text-blue-600 flex items-center gap-1">Read Article <ArrowRight size={16} /></span>
                  <span className="text-muted-foreground font-medium flex items-center gap-1.5"><Clock size={14} /> {featuredBlog.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
        )}
        
        {/* Latest Articles */}
        {remainingBlogs.length > 0 && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-foreground mb-4">More from {category.title}</h2>
            <div className="flex flex-col gap-4">
              {remainingBlogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="bg-card rounded-[1.5rem] overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform flex">
                  <div className="w-1/3 min-w-[110px] bg-muted relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col justify-center flex-1">
                    <h3 className="font-bold text-sm text-foreground mb-1 leading-snug line-clamp-2">{blog.title}</h3>
                    <div className="mt-2 flex items-center gap-3 text-xs">
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
          <div className="text-center p-10 bg-card rounded-[2rem] border border-border/50 border-dashed mb-10">
            <p className="text-muted-foreground font-medium">New articles coming soon.</p>
          </div>
        )}

        {/* Related Categories */}
        <div className="mt-4 border-t border-border/60 pt-8">
          <h2 className="text-lg font-bold text-foreground mb-4">Explore Related Topics</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden pr-6 -mr-6">
            {categories.filter(c => c.id !== category.id).map((cat) => {
              const CatIcon = (Icons as any)[cat.icon];
              return (
                <Link key={cat.id} href={`/categories/${cat.id}`} className="flex flex-col items-center justify-center gap-3 bg-card px-4 py-5 min-w-[120px] rounded-[1.5rem] shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform shrink-0 snap-start">
                  <div className={`${cat.color.replace(/bg-\S+/g, '')} drop-shadow-sm`}>
                    <CatIcon size={26} strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-xs text-foreground text-center leading-tight">{cat.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
