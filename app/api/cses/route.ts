import { NextResponse } from "next/server";
import * as cheerio from "cheerio";

// Helper to log in to CSES and get the PHPSESSID cookie
async function loginToCses(nick: string, pass: string): Promise<{ phpSessId: string; username: string } | null> {
  try {
    // 1. Fetch login page to get initial PHPSESSID and csrf_token
    const loginPageRes = await fetch("https://cses.fi/login", {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Iqilo/1.0",
      },
    });

    if (!loginPageRes.ok) return null;

    const loginPageHtml = await loginPageRes.text();
    const $login = cheerio.load(loginPageHtml);
    const csrfToken = $login('input[name="csrf_token"]').val();

    // Extract PHPSESSID from set-cookie headers
    const setCookieHeaders = loginPageRes.headers.getSetCookie();
    let phpSessId = "";
    for (const cookieStr of setCookieHeaders) {
      if (cookieStr.includes("PHPSESSID")) {
        const match = cookieStr.match(/PHPSESSID=([^;]+)/);
        if (match) {
          phpSessId = match[1];
          break;
        }
      }
    }

    if (!phpSessId || !csrfToken) return null;

    // 2. Submit the login form with credentials and PHPSESSID cookie
    const loginPayload = new URLSearchParams();
    loginPayload.append("csrf_token", csrfToken as string);
    loginPayload.append("nick", nick);
    loginPayload.append("pass", pass);

    const loginSubmitRes = await fetch("https://cses.fi/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cookie": `PHPSESSID=${phpSessId}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Iqilo/1.0",
        "Referer": "https://cses.fi/login",
      },
      body: loginPayload.toString(),
    });

    const submitHtml = await loginSubmitRes.text();
    const $submit = cheerio.load(submitHtml);
    const accountNode = $submit("a.account");
    
    if (accountNode.text().trim() === "Login" || !accountNode.attr("href")) {
      return null;
    }

    return {
      phpSessId,
      username: accountNode.text().trim(),
    };
  } catch (error) {
    console.error("CSES Login error:", error);
    return null;
  }
}

// Scrape solved problems from /problemset list using the session cookie
async function scrapeSolvedTasks(phpSessId: string): Promise<{ solved: string[]; username: string } | null> {
  try {
    const res = await fetch("https://cses.fi/problemset", {
      method: "GET",
      headers: {
        "Cookie": `PHPSESSID=${phpSessId}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Iqilo/1.0",
      },
    });

    if (!res.ok) return null;

    const html = await res.text();
    const $ = cheerio.load(html);

    // Verify session by checking if we see "Login" in the navigation
    const accountNode = $("a.account");
    if (accountNode.text().trim() === "Login" || !accountNode.attr("href")) {
      return null; // session is invalid or expired
    }

    const solvedTaskIds = new Set<string>();

    $("li.task").each((_, element) => {
      const $el = $(element);
      const isSolved = $el.find(".task-score").hasClass("full");
      if (isSolved) {
        const href = $el.find("a").attr("href");
        if (href) {
          const match = href.match(/\/problemset\/(?:task|view)\/(\d+)/);
          if (match && match[1]) {
            solvedTaskIds.add(match[1]);
          }
        }
      }
    });

    return {
      solved: Array.from(solvedTaskIds),
      username: accountNode.text().trim(),
    };
  } catch (error) {
    console.error("CSES scrape error:", error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nick, pass, phpSessId } = body;

    let targetPhpSessId = phpSessId || "";
    let username = "";

    if (!targetPhpSessId) {
      if (!nick || !pass) {
        return NextResponse.json({ error: "Username and password, or PHPSESSID, is required" }, { status: 400 });
      }

      // Perform login
      const loginResult = await loginToCses(nick, pass);
      if (!loginResult) {
        return NextResponse.json({ error: "Incorrect username or password" }, { status: 401 });
      }

      targetPhpSessId = loginResult.phpSessId;
      username = loginResult.username;
    }

    // Scrape solved problems
    const scrapeResult = await scrapeSolvedTasks(targetPhpSessId);
    if (!scrapeResult) {
      return NextResponse.json({ error: "Invalid or expired PHPSESSID cookie" }, { status: 401 });
    }

    return NextResponse.json({
      solved: scrapeResult.solved,
      username: scrapeResult.username || username,
      phpSessId: targetPhpSessId,
    });
  } catch (error) {
    console.error("CSES sync error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Backwards-compatible GET route that scrapes public profile using regex (limited fallback)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const phpSessId = searchParams.get("phpSessId");

  if (phpSessId) {
    const scrapeResult = await scrapeSolvedTasks(phpSessId);
    if (!scrapeResult) {
      return NextResponse.json({ error: "Invalid or expired PHPSESSID cookie" }, { status: 401 });
    }
    return NextResponse.json({
      solved: scrapeResult.solved,
      username: scrapeResult.username,
      phpSessId,
    });
  }

  if (!userId) {
    return NextResponse.json({ error: "userId or phpSessId is required" }, { status: 400 });
  }

  try {
    const response = await fetch(`https://cses.fi/user/${userId}`);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch CSES profile" }, { status: response.status });
    }

    const html = await response.text();
    const solvedTaskIds = new Set<string>();

    const regex = /\/problemset\/(?:task|view)\/(\d+)/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (match[1]) {
        solvedTaskIds.add(match[1]);
      }
    }

    return NextResponse.json({ solved: Array.from(solvedTaskIds) });
  } catch (error) {
    console.error("CSES GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
