import type { Metadata } from "next";
import { ProgressProvider } from "@/hooks/useProgress";
import { SiteHeader } from "@/components/SiteHeader";
import { ToastProvider } from "@/components/ToastNotification";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "iqilo",
  description:
    "A premium course platform for DSA, competitive programming, and quantitative finance — with day-level progress tracking and structured roadmaps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased dark ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col bg-[--bg-base] text-[--text-primary]"
        suppressHydrationWarning
      >
        <ProgressProvider>
          <ToastProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </ToastProvider>
        </ProgressProvider>
      </body>
    </html>
  );
}
