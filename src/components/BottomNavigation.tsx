"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, MessageSquare, User, Scan } from "lucide-react";
import { useUI } from "@/context/UIContext";

const CurvedSvg = () => (
  <svg 
    viewBox="0 0 390 80" 
    preserveAspectRatio="none" 
    className="absolute inset-0 w-full h-full text-card fill-current"
    style={{ filter: "drop-shadow(0px -4px 16px rgba(0,0,0,0.06))" }}
  >
    <path d="M 0 24 
             A 24 24 0 0 1 24 0 
             L 135 0 
             C 150 0, 150 40, 165 48 
             A 34 34 0 0 0 225 48 
             C 240 40, 240 0, 255 0 
             L 366 0 
             A 24 24 0 0 1 390 24 
             L 390 56 
             A 24 24 0 0 1 366 80 
             L 24 80 
             A 24 24 0 0 1 0 56 
             Z" />
  </svg>
);

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[400px] px-4">
      <div className="relative w-full h-[80px]">
        <CurvedSvg />
        
        <nav className="relative flex justify-between items-center h-full px-6 pb-1">
          
          <Link href="/" className={`flex flex-col items-center justify-center w-12 transition-colors ${pathname === "/" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"}`}>
            <Home size={22} strokeWidth={pathname === "/" ? 2.5 : 2} />
            <span className="text-[11px] font-semibold mt-1">Home</span>
          </Link>
          
          <Link href="/search" className={`flex flex-col items-center justify-center w-12 transition-colors ${pathname === "/search" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"}`}>
            <Search size={22} strokeWidth={pathname === "/search" ? 2.5 : 2} />
            <span className="text-[11px] font-semibold mt-1">Search</span>
          </Link>

          {/* Center Space for Text (Scan) */}
          <div 
            className="relative flex flex-col items-center justify-end w-16 h-full cursor-pointer"
            onClick={handleScanClick}
          >
            <span className="text-[12px] font-bold text-foreground">Scan</span>
          </div>
          
          <Link href="/history" className={`flex flex-col items-center justify-center w-12 transition-colors ${pathname === "/history" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"}`}>
            <MessageSquare size={22} strokeWidth={pathname === "/history" ? 2.5 : 2} />
            <span className="text-[11px] font-semibold mt-1">History</span>
          </Link>
          
          <Link href="/profile" className={`flex flex-col items-center justify-center w-12 transition-colors ${pathname === "/profile" ? "text-indigo-600 dark:text-indigo-400" : "text-muted-foreground hover:text-foreground"}`}>
            <User size={22} strokeWidth={pathname === "/profile" ? 2.5 : 2} />
            <span className="text-[11px] font-semibold mt-1">Profile</span>
          </Link>

        </nav>
        
        {/* Center Floating Action Button */}
        <div className="absolute left-1/2 -translate-x-1/2" style={{ top: '-16px' }}>
          <button 
            onClick={handleScanClick}
            className="flex items-center justify-center w-[64px] h-[64px] bg-card rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-105 active:scale-95 transition-transform"
            aria-label="Scan Image"
          >
            <div className="w-[48px] h-[48px] bg-gradient-to-br from-indigo-500 via-purple-500 to-indigo-600 rounded-[1.2rem] flex items-center justify-center text-white shadow-inner">
              <Scan size={26} strokeWidth={2.5} />
            </div>
          </button>
        </div>
        
      </div>
    </div>
  );
}
