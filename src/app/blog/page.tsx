"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Search, Clock, ArrowRight, BookOpen, User, Sparkles } from "lucide-react";
import { blogs, categories } from "@/lib/data";

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = blogs.filter((article) => {
    const matchesCategory = 
      activeCategory === "All" || 
      article.categoryId === activeCategory;

    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const featuredArticle = filteredArticles[0] || blogs[0];
  const regularArticles = filteredArticles.length > 1 ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky Header */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link 
            href="/" 
            className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
          >
            <ChevronLeft size={18} />
          </Link>
          <h1 className="text-sm sm:text-base font-bold text-foreground">Skin Health Insights</h1>
        </div>
      </header>
      
      <div className="p-4 sm:p-5">
        {/* Compact Search Bar without drop shadow */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles, guides & health tips..."
            className="w-full bg-card border border-border/60 pl-9 pr-9 py-2.5 rounded-xl outline-none focus:border-blue-500 text-xs font-medium text-foreground transition-all placeholder:text-muted-foreground/70"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          )}
        </div>
        
        {/* Category Filter Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 snap-x [&::-webkit-scrollbar]:hidden pr-2 -mr-2">
          <button 
            onClick={() => setActiveCategory("All")}
            className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold snap-start transition-all ${
              activeCategory === "All"
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button 
              key={cat.id} 
              onClick={() => setActiveCategory(cat.id)}
              className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold snap-start transition-all ${
                activeCategory === cat.id 
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" 
                  : "bg-card border border-border/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Articles List Container */}
        {filteredArticles.length > 0 ? (
          <div className="space-y-6">
            {/* Featured Article Hero Card */}
            <div>
              <div className="flex items-center gap-1.5 mb-2.5">
                <Sparkles size={14} className="text-amber-500" />
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">Featured Article</h2>
              </div>
              <Link 
                href={`/blog/${featuredArticle.id}`} 
                className="block bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-blue-500/30 active:scale-[0.99] transition-all shadow-sm group"
              >
                <div className="h-44 sm:h-48 w-full relative bg-muted overflow-hidden">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute top-2.5 left-2.5 bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                    {categories.find(c => c.id === featuredArticle.categoryId)?.title || "Featured"}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base text-foreground mb-1.5 leading-snug group-hover:text-blue-600 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex justify-between items-center text-xs font-bold border-t border-border/40 pt-3">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-5 h-5 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center text-[10px] font-bold">
                        {featuredArticle.author.charAt(0)}
                      </div>
                      <span className="text-[11px] font-medium truncate max-w-[120px]">{featuredArticle.author}</span>
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 flex items-center gap-1 text-[11px]">
                      Read <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Regular Articles Section */}
            {regularArticles.length > 0 && (
              <div>
                <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Latest Medical Articles</h2>
                <div className="flex flex-col gap-3">
                  {regularArticles.map((blog) => (
                    <Link 
                      key={blog.id} 
                      href={`/blog/${blog.id}`} 
                      className="bg-card p-3 rounded-2xl flex items-center gap-3.5 border border-border/50 hover:border-blue-500/30 active:scale-[0.99] transition-all shadow-sm group"
                    >
                      <div className="w-20 h-20 shrink-0 bg-muted rounded-xl overflow-hidden relative border border-border/40">
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                      <div className="flex-1 min-w-0 py-0.5">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-wider mb-0.5 block truncate">
                          {categories.find(c => c.id === blog.categoryId)?.title}
                        </span>
                        <h3 className="font-bold text-xs sm:text-sm text-foreground mb-1.5 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        <div className="flex items-center text-[10px] text-muted-foreground font-medium gap-2">
                          <span>{blog.date}</span>
                          <span>•</span>
                          <span className="flex items-center gap-1"><Clock size={10} /> {blog.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 px-6 bg-card rounded-2xl border border-border/50 border-dashed">
            <p className="text-xs text-muted-foreground font-medium mb-3">No health articles found matching your criteria.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="text-xs font-bold text-blue-600 hover:underline"
            >
              Reset Filters & Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
