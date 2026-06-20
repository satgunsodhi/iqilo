import type { Metadata } from "next";
import { ProgressProvider } from "@/hooks/useProgress";
import { SiteHeader } from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "iqilo",
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
      <body className="min-h-full flex flex-col bg-[#f6f1dd] text-[#171411] dark:bg-[#0f131a] dark:text-[#e7edf7]">
        <ProgressProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
        </ProgressProvider>
      </body>
    </html>
  );
}
