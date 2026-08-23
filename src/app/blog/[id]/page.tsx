"use client";

import Link from "next/link";
import { Clock, Calendar as CalendarIcon, User, Share2 } from "lucide-react";
import * as Icons from "lucide-react";
import { blogs, categories } from "@/lib/data";
import BackButton from "@/components/BackButton";
import { use } from "react";

export default function BlogArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const article = blogs.find(b => b.id === id) || blogs[0];
  const category = categories.find(c => c.id === article.categoryId) || categories[0];
  const relatedArticles = blogs.filter(b => b.categoryId === category.id && b.id !== article.id);
  const fallbackRelated = relatedArticles.length > 0 ? relatedArticles : blogs.filter(b => b.id !== article.id).slice(0, 3);
  
  // Format content for mock display
  const contentParagraphs = article.content.split('\n\n');

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Sticky Header without drop shadow */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center justify-between">
        <BackButton fallbackHref="/blog" />
        <span className="text-xs font-bold text-foreground truncate max-w-[180px]">{article.title}</span>
        <button 
          className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors"
          aria-label="Share"
        >
          <Share2 size={16} />
        </button>
      </header>
      
      <div className="p-4 sm:p-5">
        {/* Article Cover Image */}
        <div className="w-full h-48 sm:h-64 relative rounded-2xl overflow-hidden border border-border/50 shadow-sm mb-5 bg-muted">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
            {category.title}
          </div>
        </div>
        
        {/* Article Header Info */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">{article.title}</h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium leading-relaxed mb-4">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-muted-foreground pt-3 border-t border-border/50">
            <div className="flex items-center gap-1.5 text-foreground">
              <User size={14} className="text-blue-500" />
              <span>{article.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={14} className="text-purple-500" />
              <span>{article.date}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock size={14} className="text-emerald-500" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Main Article Body */}
        <article className="mb-10 text-xs sm:text-sm leading-relaxed text-foreground space-y-4 border-t border-border/40 pt-5">
          {contentParagraphs.map((para, idx) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h3 key={idx} className="text-sm sm:text-base font-bold text-foreground pt-2">{para.replace(/\*\*/g, '')}</h3>;
            } else if (para.startsWith('* **')) {
              const items = para.split('\n');
              return (
                <ul key={idx} className="list-disc pl-5 space-y-1.5 my-3 text-muted-foreground">
                  {items.map((item, i) => {
                    const text = item.replace('* ', '');
                    const boldMatch = text.match(/\*\*(.*?)\*\*/);
                    if (boldMatch) {
                      return <li key={i}><strong className="text-foreground">{boldMatch[1]}</strong>{text.replace(boldMatch[0], '')}</li>;
                    }
                    return <li key={i}>{text}</li>;
                  })}
                </ul>
              );
            }
            return <p key={idx} className="text-muted-foreground leading-relaxed">{para}</p>;
          })}
        </article>

        {/* Sleek Related Articles Section */}
        {fallbackRelated.length > 0 && (
          <div className="mb-8 pt-5 border-t border-border/50">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">Related Articles</h2>
              <Link href="/blog" className="text-blue-500 text-xs font-bold hover:underline">View All</Link>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden pr-2 -mr-2">
              {fallbackRelated.map((blog) => (
                <Link 
                  key={blog.id} 
                  href={`/blog/${blog.id}`} 
                  className="min-w-[210px] max-w-[210px] bg-card p-3 rounded-2xl border border-border/50 hover:border-blue-500/30 snap-start active:scale-[0.99] transition-all shadow-sm flex flex-col justify-between group"
                >
                  <div>
                    <div className="h-28 w-full bg-muted rounded-xl overflow-hidden relative mb-2.5 border border-border/40">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                    <h3 className="font-bold text-xs text-foreground line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground pt-2 border-t border-border/40">
                    <span className="font-semibold text-blue-500">{blog.readTime}</span>
                    <span>{blog.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Sleek More Categories Section */}
        <div className="pt-4 border-t border-border/50">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">Explore Health Categories</h2>
            <Link href="/categories" className="text-blue-500 text-xs font-bold hover:underline">See All</Link>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x [&::-webkit-scrollbar]:hidden pr-2 -mr-2">
            {categories.map((cat) => {
              const CatIcon = (Icons as any)[cat.icon] || Icons.Tag;
              return (
                <Link 
                  key={cat.id} 
                  href={`/categories/${cat.id}`} 
                  className="flex items-center gap-2 bg-card px-3.5 py-2 rounded-xl border border-border/60 hover:border-blue-500/30 shrink-0 snap-start active:scale-95 transition-all shadow-sm"
                >
                  <CatIcon size={14} className="text-blue-500" />
                  <span className="font-semibold text-xs text-foreground">{cat.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
