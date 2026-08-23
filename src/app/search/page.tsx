"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, Search, X, TrendingUp, Sparkles, Stethoscope, BookOpen, ArrowRight, CheckCircle2 } from "lucide-react";
import { blogs, doctors, categories } from "@/lib/data";

const POPULAR_TAGS = [
  "Melanoma",
  "Sunscreen Guide",
  "Mole Check",
  "Dr. Alexa Nova",
  "Eczema Care",
  "ABCD Rules",
  "Skin Lesion"
];

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  
  const [query, setQuery] = useState(initialQ);

  useEffect(() => {
    if (initialQ) {
      setQuery(initialQ);
    }
  }, [initialQ]);

  const handleSelectTag = (tag: string) => {
    setQuery(tag);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `/search?q=${encodeURIComponent(tag)}`);
    }
  };

  const handleClearQuery = () => {
    setQuery("");
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", "/search");
    }
  };

  const handleHeaderBack = () => {
    if (query) {
      handleClearQuery();
    } else {
      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back();
      } else {
        router.push("/");
      }
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(query.toLowerCase()) || 
    b.excerpt.toLowerCase().includes(query.toLowerCase()) ||
    b.author.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(query.toLowerCase()) || 
    d.specialty.toLowerCase().includes(query.toLowerCase()) ||
    d.hospital.toLowerCase().includes(query.toLowerCase())
  );

  const filteredCategories = categories.filter(c =>
    c.title.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  const hasResults = filteredBlogs.length > 0 || filteredDoctors.length > 0 || filteredCategories.length > 0;
  const fromQueryString = query ? `?from=search&q=${encodeURIComponent(query)}` : "?from=search";

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Sticky Top Header without drop shadow */}
      <header className="sticky top-0 z-20 bg-background/95 backdrop-blur-md px-4 py-3 border-b border-border flex items-center gap-3">
        <button
          onClick={handleHeaderBack}
          type="button"
          className="w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors shrink-0 active:scale-95"
          aria-label="Go back"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles, dermatologists, conditions..."
            className="w-full bg-card border border-border/60 rounded-xl pl-9 pr-8 py-2 text-xs font-medium text-foreground placeholder:text-muted-foreground outline-none focus:border-blue-500 transition-all"
          />
          {query && (
            <button 
              onClick={handleClearQuery}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </header>

      <div className="p-4 sm:p-5 max-w-2xl mx-auto space-y-6">
        {/* Default View when query is empty */}
        {!query && (
          <>
            {/* Popular Search Tags without drop shadow */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                <TrendingUp size={14} className="text-blue-500" /> Popular Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleSelectTag(tag)}
                    className="bg-card hover:bg-blue-50 dark:hover:bg-blue-950/60 border border-border/60 hover:border-blue-500/40 text-foreground hover:text-blue-600 dark:hover:text-blue-400 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all active:scale-95"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Dermatologists */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <Stethoscope size={14} className="text-indigo-500" /> Recommended Specialists
                </h2>
                <Link href="/dermatologists?from=search" className="text-blue-500 text-xs font-semibold hover:underline">View All</Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {doctors.slice(0, 2).map((doc) => (
                  <Link 
                    key={doc.id} 
                    href={`/dermatologists/${doc.id}?from=search`} 
                    className="bg-card p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-border/50 hover:border-blue-500/30 active:scale-[0.99] transition-all"
                  >
                    <div className="w-11 h-11 shrink-0 bg-muted rounded-xl overflow-hidden relative border border-border/40">
                      <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xs text-foreground truncate flex items-center gap-1">
                        {doc.name}
                        <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                      </h3>
                      <p className="text-[11px] text-muted-foreground font-medium truncate">{doc.specialty} · {doc.hospital}</p>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      Book <ArrowRight size={12} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Health Articles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen size={14} className="text-emerald-500" /> Suggested Insights
                </h2>
                <Link href="/blog?from=search" className="text-blue-500 text-xs font-semibold hover:underline">Browse Blog</Link>
              </div>

              <div className="flex flex-col gap-2.5">
                {blogs.slice(0, 3).map((blog) => (
                  <Link 
                    key={blog.id} 
                    href={`/blog/${blog.id}?from=search`} 
                    className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border/40 hover:border-blue-500/30 active:scale-[0.98] transition-all flex p-2.5 gap-3"
                  >
                    <div className="w-16 h-16 bg-muted rounded-xl relative shrink-0 overflow-hidden">
                      <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-center flex-1 min-w-0">
                      <h3 className="font-bold text-xs text-foreground mb-1 leading-snug truncate">{blog.title}</h3>
                      <p className="text-[10px] text-muted-foreground font-medium line-clamp-1">{blog.excerpt}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Live Filter Search Results */}
        {query && (
          <div className="space-y-5">
            {!hasResults ? (
              <div className="text-center p-8 bg-card rounded-2xl border border-border/50 shadow-sm space-y-2">
                <div className="w-12 h-12 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mx-auto mb-2 border border-border/40">
                  <Search size={20} />
                </div>
                <h3 className="text-sm font-bold text-foreground">No matches found for "{query}"</h3>
                <p className="text-xs text-muted-foreground font-medium max-w-xs mx-auto">
                  Try searching for terms like "melanoma", "sunscreen", "dermatologist", or select from popular tags above.
                </p>
              </div>
            ) : (
              <>
                {/* Matched Doctors */}
                {filteredDoctors.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Dermatologists ({filteredDoctors.length})</h3>
                    <div className="flex flex-col gap-2">
                      {filteredDoctors.map((doc) => (
                        <Link 
                          key={doc.id} 
                          href={`/dermatologists/${doc.id}${fromQueryString}`} 
                          className="bg-card p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-border/50 hover:border-blue-500/30 transition-all"
                        >
                          <div className="w-11 h-11 shrink-0 bg-muted rounded-xl overflow-hidden relative border border-border/40">
                            <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-foreground truncate">{doc.name}</h4>
                            <p className="text-[11px] text-muted-foreground font-medium truncate">{doc.specialty} · {doc.hospital}</p>
                          </div>
                          <span className="text-xs font-bold text-blue-500">Book</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Matched Articles */}
                {filteredBlogs.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Articles & Guides ({filteredBlogs.length})</h3>
                    <div className="flex flex-col gap-2">
                      {filteredBlogs.map((blog) => (
                        <Link 
                          key={blog.id} 
                          href={`/blog/${blog.id}${fromQueryString}`} 
                          className="bg-card p-3 rounded-2xl flex items-center gap-3 shadow-sm border border-border/50 hover:border-blue-500/30 transition-all"
                        >
                          <div className="w-14 h-14 shrink-0 bg-muted rounded-xl relative shrink-0 overflow-hidden border border-border/40">
                            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-foreground truncate">{blog.title}</h4>
                            <p className="text-[10px] text-muted-foreground font-medium truncate">{blog.excerpt}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center"><Search className="animate-spin text-blue-500" size={24} /></div>}>
      <SearchPageContent />
    </Suspense>
  );
}
