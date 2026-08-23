"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, User, ScanLine, Stethoscope } from "lucide-react";
import { useUI } from "@/context/UIContext";

export default function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { setUploadModalOpen } = useUI();

  const handleScanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => setUploadModalOpen(true), 150);
    } else {
      setUploadModalOpen(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-sm">
      {/* Theme Adaptive Navbar Capsule */}
      <nav className="bg-card/95 backdrop-blur-xl border border-border shadow-[0_10px_28px_rgba(0,0,0,0.08)] rounded-full px-3 py-1.5 flex justify-around items-center h-16">
        
        <Link 
          href="/" 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            pathname === "/" 
              ? "bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Home"
        >
          <Home size={20} strokeWidth={pathname === "/" ? 2.5 : 2} />
        </Link>
        
        <Link 
          href="/search" 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            pathname === "/search" 
              ? "bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Search"
        >
          <Search size={20} strokeWidth={pathname === "/search" ? 2.5 : 2} />
        </Link>

        {/* Clean Center Scanner Action Button */}
        <button 
          onClick={handleScanClick}
          className="flex items-center justify-center w-12 h-12 -mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/30 ring-4 ring-background active:scale-95 transition-all"
          aria-label="Scan Skin"
        >
          <ScanLine size={22} strokeWidth={2} />
        </button>
        
        <Link 
          href="/dermatologists" 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            pathname.startsWith("/dermatologists") 
              ? "bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Find Doctors"
        >
          <Stethoscope size={20} strokeWidth={pathname.startsWith("/dermatologists") ? 2.5 : 2} />
        </Link>
        
        <Link 
          href="/profile" 
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
            pathname === "/profile" 
              ? "bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400" 
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-label="Profile"
        >
          <User size={20} strokeWidth={pathname === "/profile" ? 2.5 : 2} />
        </Link>

      </nav>
    </div>
  );
}
