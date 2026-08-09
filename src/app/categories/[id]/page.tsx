import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import * as Icons from "lucide-react";
import { categories, blogs } from "@/lib/data";

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categories.find(c => c.id === id) || categories[0];
  const relatedBlogs = blogs.filter(b => b.categoryId === category.id);
  const Icon = (Icons as any)[category.icon];

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/categories" className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
        </div>
      </header>
      
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-24 h-24 bg-card rounded-[2rem] flex items-center justify-center shadow-md border border-border mb-4">
            <div className={category.color.split(' ')[0] + " " + category.color.split(' ')[1]}>
              <Icon size={40} strokeWidth={1.5} />
            </div>
          </div>
          <h1 className="text-3xl font-black text-foreground mb-3">{category.title}</h1>
          <p className="text-muted-foreground leading-relaxed max-w-sm">
            {category.description} Learn how to identify, treat, and prevent conditions related to {category.title.toLowerCase()}.
          </p>
        </div>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">Featured Articles</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            {relatedBlogs.length > 0 ? relatedBlogs.map((blog) => (
              <Link key={blog.id} href={`/blog/${blog.id}`} className="bg-card rounded-3xl overflow-hidden shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform">
                <div className="h-40 w-full bg-muted relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-base text-foreground mb-2 leading-snug">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{blog.excerpt}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-blue-500 font-bold">{blog.readTime}</span>
                    <span className="text-muted-foreground">{blog.date}</span>
                  </div>
                </div>
              </Link>
            )) : (
              <div className="text-center p-8 bg-muted rounded-3xl border border-border border-dashed">
                <p className="text-muted-foreground font-medium">New articles coming soon.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-bold text-foreground mb-4">Explore More Categories</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden pr-6">
            {categories.filter(c => c.id !== category.id).map((cat) => {
              const CatIcon = (Icons as any)[cat.icon];
              return (
                <Link key={cat.id} href={`/categories/${cat.id}`} className="min-w-[140px] bg-card p-4 rounded-3xl flex flex-col gap-3 shadow-sm border border-border/40 shrink-0 snap-start">
                  <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                    <div className={cat.color.split(' ')[0] + " " + cat.color.split(' ')[1]}>
                      <CatIcon size={20} />
                    </div>
                  </div>
                  <h3 className="font-bold text-sm text-foreground">{cat.title}</h3>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
