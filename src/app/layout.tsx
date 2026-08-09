import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomNavigation from "@/components/BottomNavigation";
import { Providers } from "@/providers/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Lesion Detection",
  description: "AI-Powered Lesion Detection platform for informational purposes.",
};

export const viewport: Viewport = {
  themeColor: "#0ea5e9",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-muted text-foreground">
        <Providers>
          <div className="flex-1 w-full max-w-md mx-auto bg-background min-h-screen relative shadow-2xl overflow-x-hidden pb-24">
            <main className="flex-1 w-full h-full">
              {children}
            </main>
            <BottomNavigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}
