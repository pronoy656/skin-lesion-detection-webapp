import Link from "next/link";
import { ChevronLeft, Search, Filter } from "lucide-react";
import { blogs, categories } from "@/lib/data";

export default function BlogListingPage() {
  const featuredArticle = blogs[0];
  const regularArticles = blogs.slice(1);

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md p-4 flex items-center justify-between border-b border-border">
        <div className="flex items-center gap-3">
          <Link href="/" className="w-10 h-10 flex items-center justify-center bg-muted text-foreground hover:bg-muted/80 rounded-full transition-colors">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-xl font-bold">Skin Health & Insights</h1>
        </div>
      </header>
      
      <div className="p-6">
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <input 
              type="text" 
              placeholder="Search articles..."
              className="w-full bg-card border border-border pl-12 pr-4 py-3.5 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
            />
          </div>
          <button className="w-[52px] shrink-0 bg-card border border-border rounded-2xl flex items-center justify-center text-foreground active:scale-95 transition-transform">
            <Filter size={20} />
          </button>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 mb-2 snap-x [&::-webkit-scrollbar]:hidden">
          <button className="shrink-0 px-5 py-2.5 rounded-full text-sm font-bold snap-start transition-colors bg-blue-600 text-white">All</button>
          {categories.map((cat, i) => (
            <button key={i} className="shrink-0 px-5 py-2.5 rounded-full text-sm font-bold snap-start transition-colors bg-card border border-border text-foreground hover:bg-muted">
              {cat.title}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Featured</h2>
            <Link href={`/blog/${featuredArticle.id}`} className="block bg-card rounded-[2rem] overflow-hidden shadow-sm border border-border/40 active:scale-[0.98] transition-transform">
              <div className="h-56 w-full relative">
                <img src={featuredArticle.image} alt={featuredArticle.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm">
                  {categories.find(c => c.id === featuredArticle.categoryId)?.title || "Featured"}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-black text-xl text-foreground mb-3 leading-tight">{featuredArticle.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{featuredArticle.excerpt}</p>
                <div className="flex justify-between items-center text-xs border-t border-border pt-4">
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                      {featuredArticle.author.charAt(0)}
                    </div>
                    {featuredArticle.author}
                  </div>
                  <span className="text-muted-foreground">{featuredArticle.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
          
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">Latest Articles</h2>
            <div className="flex flex-col gap-4">
              {regularArticles.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="bg-card p-3 rounded-3xl flex items-center gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.03)] border border-border/40 active:scale-[0.98] transition-transform">
                  <div className="w-24 h-24 shrink-0 bg-muted rounded-2xl overflow-hidden">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 py-1">
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-1 block">
                      {categories.find(c => c.id === blog.categoryId)?.title}
                    </span>
                    <h3 className="font-bold text-sm text-foreground mb-2 line-clamp-2 leading-snug">{blog.title}</h3>
                    <div className="flex items-center text-[10px] text-muted-foreground font-medium">
                      <span>{blog.date}</span>
                      <span className="mx-1.5">•</span>
                      <span>{blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
