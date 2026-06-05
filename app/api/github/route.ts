import { NextResponse } from "next/server";

const GITHUB_USERNAME = "RenzSarucam";

export const revalidate = 0; // always dynamic; cache handled by fetch tags

export const CONTRIB_TAG = "github-contributions";

// In-memory cache so dev mode doesn't hit GitHub on every request
export const memCache = new Map<number, { data: { total: number; dayMap: Record<string, number> }; at: number }>();
const MEM_TTL = 300_000; // 5 minutes

// Parse GitHub's public contribution page — exact same data as GitHub profile
async function scrapeGitHub(year: number) {
  const url = `https://github.com/users/${GITHUB_USERNAME}/contributions?from=${year}-01-01&to=${year}-12-31`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
      Accept: "text/html,application/xhtml+xml",
    },
    next: { tags: [CONTRIB_TAG] },
  });

  if (!res.ok) { console.error("[scrape] status", res.status); return null; }

  const html = await res.text();

  const dayMap: Record<string, number> = {};

  // Format 1 — modern GitHub: <tool-tip for="...">N contributions on ...</tool-tip>
  // First build a map of rect id → date
  const idDateMap: Record<string, string> = {};
  const rectIdRegex = /id="(contribution-day-[^"]+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"/g;
  let m;
  while ((m = rectIdRegex.exec(html)) !== null) {
    idDateMap[m[1]] = m[2];
  }

  // Then parse tool-tip elements
  const tooltipRegex = /<tool-tip[^>]+for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  while ((m = tooltipRegex.exec(html)) !== null) {
    const id   = m[1];
    const text = m[2].trim();
    const date = idDateMap[id];
    if (!date) continue;
    const num = text.match(/^(\d+)\s+contribution/);
    dayMap[date] = num ? parseInt(num[1], 10) : 0;
  }

  // Format 2 — old GitHub: <rect data-date="..."><title>N contributions...</title></rect>
  if (Object.keys(dayMap).length === 0) {
    const rectRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*>[\s\S]*?<title>([^<]*)<\/title>/g;
    while ((m = rectRegex.exec(html)) !== null) {
      const date = m[1];
      const text = m[2].trim();
      const num  = text.match(/^(\d+)\s+contribution/);
      dayMap[date] = num ? parseInt(num[1], 10) : 0;
    }
  }

  // Format 3 — data-level only (approximate from level 0-4)
  if (Object.keys(dayMap).length === 0) {
    const levelRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d)"/g;
    while ((m = levelRegex.exec(html)) !== null) {
      const levels = [0, 1, 3, 6, 10];
      dayMap[m[1]] = levels[parseInt(m[2], 10)] ?? 0;
    }
  }

  if (Object.keys(dayMap).length === 0) {
    console.error("[scrape] no days found — HTML might have changed");
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
      next: { tags: [CONTRIB_TAG] },
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

  const force = searchParams.get("force") === "1";

  // Check in-memory cache first
  const cached = memCache.get(year);
  if (!force && cached && Date.now() - cached.at < MEM_TTL) {
    const { total, dayMap } = cached.data;
    const days: { date: string; count: number }[] = [];
    const end = new Date(Date.UTC(year, 11, 31));
    for (let d = new Date(Date.UTC(year, 0, 1)); d <= end; d.setUTCDate(d.getUTCDate() + 1)) {
      const dateStr = d.toISOString().slice(0, 10);
      days.push({ date: dateStr, count: dayMap[dateStr] ?? 0 });
    }
    return NextResponse.json({ total, days, year });
  }

  // 1. Try GraphQL (most accurate, includes private)
  let result = token ? await fromGraphQL(token, year) : null;

  // 2. Scrape GitHub public page (matches exactly what GitHub shows)
  if (!result) {
    console.log("[GitHub] GraphQL failed — scraping github.com");
    result = await scrapeGitHub(year);
  }

  if (result) memCache.set(year, { data: result, at: Date.now() });

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
