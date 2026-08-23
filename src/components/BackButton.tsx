"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Suspense } from "react";

interface BackButtonProps {
  fallbackHref?: string;
  className?: string;
}

function BackButtonInner({ fallbackHref = "/", className = "" }: BackButtonProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams.get("from");

  const handleBack = () => {
    const qParam = searchParams.get("q");
    if (fromParam === "search") {
      router.push(qParam ? `/search?q=${encodeURIComponent(qParam)}` : "/search");
    } else if (fromParam) {
      router.push(`/${fromParam}`);
    } else if (typeof window !== "undefined" && window.history.length > 2) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      type="button"
      className={`w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground hover:bg-muted rounded-xl transition-colors shrink-0 active:scale-95 ${className}`}
      aria-label="Go back"
    >
      <ChevronLeft size={18} />
    </button>
  );
}

export default function BackButton(props: BackButtonProps) {
  return (
    <Suspense fallback={
      <button
        type="button"
        className={`w-9 h-9 flex items-center justify-center bg-card border border-border/60 text-foreground rounded-xl shrink-0 ${props.className || ""}`}
      >
        <ChevronLeft size={18} />
      </button>
    }>
      <BackButtonInner {...props} />
    </Suspense>
  );
}
