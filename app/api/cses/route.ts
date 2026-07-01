import { NextResponse } from "next/server";
import { JSDOM } from "jsdom";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://cses.fi/user/${userId}`);
    
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch CSES profile" }, { status: response.status });
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const taskLinks = document.querySelectorAll('a[href^="/problemset/task/"]');
    const solvedTaskIds = new Set<string>();

    taskLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (href) {
        const match = href.match(/\/problemset\/task\/(\d+)/);
        if (match && match[1]) {
          solvedTaskIds.add(match[1]);
        }
      }
    });

    return NextResponse.json({ solved: Array.from(solvedTaskIds) });
  } catch (error) {
    console.error("CSES sync error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
