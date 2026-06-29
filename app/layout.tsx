import type { Metadata } from "next";
import { ProgressProvider } from "@/hooks/useProgress";
import { SiteHeader } from "@/components/SiteHeader";
import { ToastProvider } from "@/components/ToastNotification";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL('https://iqilo.vercel.com'),
  title: {
    default: "Iqilo | Gamified Tech Learning Platform",
    template: "%s | Iqilo"
  },
  description:
    "A gamified learning platform with curated roadmaps for tech skills. Track your coding streaks and earn XP as you learn.",
  keywords: ["gamified developer roadmaps", "AI generated learning paths", "tech skill roadmaps", "track coding streaks", "earn XP learning to code", "gamified tech learning platform", "iqilo"],
  openGraph: {
    title: "Iqilo | Gamified Tech Learning Platform",
    description: "Curated learning roadmaps for tech skills with built-in gamification. Track streaks and earn XP.",
    url: "https://iqilo.vercel.com",
    siteName: "Iqilo",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Iqilo | Gamified Tech Learning Platform",
    description: "Curated learning roadmaps for tech skills with built-in gamification. Track streaks and earn XP.",
  },
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
        className="min-h-full flex flex-col bg-[var(--bg-base)] text-[var(--text-primary)]"
        suppressHydrationWarning
      >
        <ProgressProvider>
          <ToastProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
          </ToastProvider>
        </ProgressProvider>
        <Analytics />
      </body>
    </html>
  );
}
