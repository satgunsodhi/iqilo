import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Skill Roadmaps",
  description: "Browse curated AI-generated learning paths and roadmaps for Data Structures, Algorithms, Competitive Programming, and Quantitative Finance. Gamify your learning.",
  openGraph: {
    title: "Tech Skill Roadmaps | Iqilo",
    description: "Browse curated AI-generated learning paths and roadmaps for Data Structures, Algorithms, Competitive Programming, and Quantitative Finance. Gamify your learning.",
  }
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
