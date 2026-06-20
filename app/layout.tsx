import type { Metadata } from "next";
import { ProgressProvider } from "@/hooks/useProgress";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "iqilo — Focused DSA Practice",
  description:
    "A gamified competitive programming roadmap with day-level progress tracking for placement season prep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Google Fonts – loaded via <link> since Turbopack can't process @import url() in CSS */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        {/* Prevent flash of wrong theme by setting class before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('iqilo-theme');if(t==='dark'||(t==null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[--bg-base] text-[--text-primary]">
        <ProgressProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
