import { NextResponse } from "next/server";

const GITHUB_USERNAME = "RenzSarucam";

export const revalidate = 3600;

// Parse GitHub's public contribution page — exact same data as GitHub profile
async function scrapeGitHub(year: number) {
  const url = `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; portfolio-bot/1.0)",
      Accept: "text/html",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) { console.error("[scrape] status", res.status); return null; }

  const html = await res.text();

  // Extract each day: data-date="YYYY-MM-DD" ... <title>N contributions on ...</title>
  const dayMap: Record<string, number> = {};
  const rectRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*>[\s\S]*?<title>([^<]*)<\/title>/g;

  let match;
  while ((match = rectRegex.exec(html)) !== null) {
    const date  = match[1];
    const title = match[2].trim();

    let count = 0;
    if (title.startsWith("No contributions")) {
      count = 0;
    } else {
      const num = title.match(/^(\d+)\s+contribution/);
      if (num) count = parseInt(num[1], 10);
    }

    dayMap[date] = count;
  }

  if (Object.keys(dayMap).length === 0) {
    console.error("[scrape] no days found");
    return null;
  }

  const total = Object.values(dayMap).reduce((s, c) => s + c, 0);
  console.log(`[scrape] year=${year} total=${total} days=${Object.keys(dayMap).length}`);
  return { total, dayMap };
}

// GraphQL fallback (needs token with read:user or contributions scope)
const GQL_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays { contributionCount date }
          }
        }
      }
    }
  }
`;

async function fromGraphQL(token: string, year: number) {
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        query: GQL_QUERY,
        variables: { username: GITHUB_USERNAME, from: `${year}-01-01T00:00:00Z`, to: `${year}-12-31T23:59:59Z` },
      }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    if (json.errors) { console.error("[GQL]", json.errors[0]?.message); return null; }

    const cal = json?.data?.user?.contributionsCollection?.contributionCalendar;
    if (!cal) return null;

    const dayMap: Record<string, number> = {};
    for (const week of cal.weeks)
      for (const d of week.contributionDays)
        dayMap[d.date] = d.contributionCount;

    return { total: cal.totalContributions as number, dayMap };
  } catch (e) {
    console.error("[GQL exception]", e);
    return null;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const year  = Number(searchParams.get("year") ?? new Date().getFullYear());
  const token = process.env.GITHUB_TOKEN;

  // 1. Try GraphQL (most accurate, includes private)
  let result = token ? await fromGraphQL(token, year) : null;

  // 2. Scrape GitHub public page (matches exactly what GitHub shows)
  if (!result) {
    console.log("[GitHub] GraphQL failed — scraping github.com");
    result = await scrapeGitHub(year);
  }

  if (!result) return NextResponse.json({ error: "No data" }, { status: 500 });

  const { total, dayMap } = result;

  // Build full year array
  const days: { date: string; count: number }[] = [];
  const end = new Date(Date.UTC(year, 11, 31));
  for (let d = new Date(Date.UTC(year, 0, 1)); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    days.push({ date: dateStr, count: dayMap[dateStr] ?? 0 });
  }

  return NextResponse.json({ total, days, year });
}
