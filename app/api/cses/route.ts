import { NextResponse } from "next/server";

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
    const solvedTaskIds = new Set<string>();

    // Using regex to parse /problemset/task/(\d+) links.
    // This removes the heavy dependency on 'jsdom', which is prone to failing
    // in serverless / edge environments on hosted platforms like Vercel.
    const regex = /\/problemset\/task\/(\d+)/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[1]) {
        solvedTaskIds.add(match[1]);
      }
    }

    return NextResponse.json({ solved: Array.from(solvedTaskIds) });
  } catch (error) {
    console.error("CSES sync error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
