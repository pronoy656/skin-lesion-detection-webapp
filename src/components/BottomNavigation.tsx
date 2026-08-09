"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, MessageSquare, User, Scan } from "lucide-react";
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
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-md bg-white dark:bg-card border-t border-gray-100 dark:border-border/50 pb-safe">
      <nav className="flex justify-between items-center h-[72px] px-8">
        
        <Link href="/" className={`flex flex-col items-center justify-center p-2 transition-colors ${pathname === "/" ? "text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}>
          <Home size={24} strokeWidth={pathname === "/" ? 2.5 : 2} />
        </Link>
        
        <Link href="/search" className={`flex flex-col items-center justify-center p-2 transition-colors ${pathname === "/search" ? "text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}>
          <Search size={24} strokeWidth={pathname === "/search" ? 2.5 : 2} />
        </Link>

        {/* Center Scan Action - Flat and Prominent */}
        <button 
          onClick={handleScanClick}
          className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-full shadow-[0_4px_12px_rgba(59,130,246,0.4)] active:scale-95 transition-transform"
          aria-label="Scan Image"
        >
          <Scan size={26} strokeWidth={2.5} />
        </button>
        
        <Link href="/history" className={`flex flex-col items-center justify-center p-2 transition-colors ${pathname === "/history" ? "text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}>
          <MessageSquare size={24} strokeWidth={pathname === "/history" ? 2.5 : 2} />
        </Link>
        
        <Link href="/profile" className={`flex flex-col items-center justify-center p-2 transition-colors ${pathname === "/profile" ? "text-blue-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"}`}>
          <User size={24} strokeWidth={pathname === "/profile" ? 2.5 : 2} />
        </Link>

      </nav>
    </div>
  );
}
