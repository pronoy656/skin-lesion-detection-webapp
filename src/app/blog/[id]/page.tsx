import Link from "next/link";
import { ChevronLeft, Clock, Calendar as CalendarIcon, User, Share2 } from "lucide-react";
import * as Icons from "lucide-react";
import { blogs, categories } from "@/lib/data";

export default function BlogArticlePage({ params }: { params: { id: string } }) {
  const article = blogs.find(b => b.id === params.id) || blogs[0];
  const category = categories.find(c => c.id === article.categoryId) || categories[0];
  const relatedArticles = blogs.filter(b => b.categoryId === category.id && b.id !== article.id).slice(0, 3);
  
  // Format content for mock display
  const contentParagraphs = article.content.split('\n\n');

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="absolute top-0 z-20 w-full p-4 flex items-center justify-between">
        <Link href="/blog" className="w-10 h-10 flex items-center justify-center bg-white/30 backdrop-blur-md text-white hover:bg-white/40 rounded-full transition-colors shadow-sm">
          <ChevronLeft size={20} />
        </Link>
        <button className="w-10 h-10 flex items-center justify-center bg-white/30 backdrop-blur-md text-white hover:bg-white/40 rounded-full transition-colors shadow-sm">
          <Share2 size={20} />
        </button>
      </header>
      
      <div className="w-full h-[400px] relative">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
      </div>
      
      <div className="px-6 -mt-32 relative z-10">
        <div className="mb-6">
          <Link href={`/categories/${category.id}`} className="inline-flex items-center gap-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-bold mb-4 shadow-md">
            {category.title}
          </Link>
          <h1 className="text-3xl font-black text-foreground mb-4 leading-tight">{article.title}</h1>
          <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-4 text-xs font-semibold text-muted-foreground pt-6 border-t border-border">
            <div className="flex items-center gap-1.5">
              <User size={16} className="text-blue-500" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon size={16} className="text-purple-500" />
              <span>{article.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={16} className="text-emerald-500" />
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>
        
        <article className="mb-12 mt-8">
          {contentParagraphs.map((para, idx) => {
            if (para.startsWith('**') && para.endsWith('**')) {
              return <h3 key={idx} className="text-xl font-bold mt-8 mb-4 text-foreground">{para.replace(/\*\*/g, '')}</h3>;
            } else if (para.startsWith('* **')) {
              // basic list mock
              const items = para.split('\n');
              return (
                <ul key={idx} className="list-disc pl-5 space-y-2 mb-6 text-foreground leading-relaxed">
                  {items.map((item, i) => {
                    const text = item.replace('* ', '');
                    const boldMatch = text.match(/\*\*(.*?)\*\*/);
                    if (boldMatch) {
                      return <li key={i}><strong>{boldMatch[1]}</strong>{text.replace(boldMatch[0], '')}</li>;
                    }
                    return <li key={i}>{text}</li>;
                  })}
                </ul>
              );
            }
            return <p key={idx} className="mb-6 text-foreground leading-relaxed text-base">{para}</p>;
          })}
        </article>

        {relatedArticles.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-foreground mb-4">Related Articles</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden pr-6 -mr-6">
              {relatedArticles.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`} className="min-w-[240px] max-w-[240px] bg-card rounded-3xl overflow-hidden shadow-sm border border-border/40 snap-start active:scale-[0.98] transition-transform flex flex-col">
                  <div className="h-32 w-full bg-muted relative">
                    <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="font-bold text-sm text-foreground mb-2 line-clamp-2 leading-snug">{blog.title}</h3>
                    <div className="mt-auto flex justify-between items-center text-xs pt-2">
                      <span className="text-blue-500 font-bold">{blog.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-foreground">More Categories</h2>
            <Link href="/categories" className="text-blue-500 text-sm font-bold">See All</Link>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 snap-x [&::-webkit-scrollbar]:hidden pr-6 -mr-6">
            {categories.filter(c => c.id !== category.id).map((cat) => {
              const CatIcon = (Icons as any)[cat.icon];
              return (
                <Link key={cat.id} href={`/categories/${cat.id}`} className="flex items-center gap-3 bg-card px-5 py-3 rounded-2xl shadow-sm border border-border/40 shrink-0 snap-start active:scale-95 transition-transform">
                  <div className={cat.color.split(' ')[0] + " " + cat.color.split(' ')[1]}>
                    <CatIcon size={20} />
                  </div>
                  <span className="font-bold text-sm">{cat.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
