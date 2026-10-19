"use client";

import { useEffect, useState } from "react";

type Day = { date: string; count: number };

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3];

function getColor(count: number, max: number) {
  if (count === 0) return "#2A2A2A";
  const ratio = count / Math.max(max, 1);
  if (ratio <= 0.25) return "#0e4429";  // visible low
  if (ratio <= 0.5)  return "#006d32";  // medium
  if (ratio <= 0.75) return "#26a641";  // high
  return "#39d353";                      // max
}

function usePHTime() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-PH", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

export default function ContribGraph() {
  const [data, setData] = useState<{ total: number; days: Day[]; year: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const phTime = usePHTime();

  useEffect(() => {
    let cancelled = false;

    const load = (showLoading: boolean, force = false) => {
      if (showLoading) { setLoading(true); setData(null); }
      fetch(`/api/github?year=${selectedYear}${force ? "&force=1" : ""}`)
        .then((r) => r.json())
        .then((d) => { if (!cancelled && d.days) { setData(d); setLastUpdated(new Date()); } })
        .catch(() => {})
        .finally(() => { if (!cancelled) setLoading(false); });
    };

    load(true);

    // Auto-refresh every 5 minutes in background
    const interval = setInterval(() => load(false, true), 60 * 1000);

    return () => { cancelled = true; clearInterval(interval); };
  }, [selectedYear]);

  const handleRefresh = () => {
    if (refreshing) return;
    setRefreshing(true);
    fetch(`/api/github?year=${selectedYear}&force=1`)
      .then((r) => r.json())
      .then((d) => { if (d.days) { setData(d); setLastUpdated(new Date()); } })
      .catch(() => {})
      .finally(() => setRefreshing(false));
  };

  if (loading) return (
    <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 12, color: "#A3A3A3", fontFamily: "'Courier New', monospace" }}>
        Loading contributions...
      </span>
    </div>
  );

  if (!data) return null;

  const { days, total, year } = data;
  const max = Math.max(...days.map((d) => d.count), 1);

  // Build lookup: date string → Day
  const dayMap: Record<string, Day> = {};
  for (const d of days) dayMap[d.date] = d;

  // Start from Sunday on or before Jan 1
  const jan1 = new Date(Date.UTC(year, 0, 1));
  const startSunday = new Date(jan1);
  startSunday.setUTCDate(jan1.getUTCDate() - jan1.getUTCDay());

  // End on last Saturday on or after Dec 31
  const dec31 = new Date(Date.UTC(year, 11, 31));
  const endSaturday = new Date(dec31);
  endSaturday.setUTCDate(dec31.getUTCDate() + (6 - dec31.getUTCDay()));

  // Build week columns
  const weeks: ({ date: string; count: number; inYear: boolean } | null)[][] = [];
  let currentWeek: ({ date: string; count: number; inYear: boolean } | null)[] = [];

  for (let d = new Date(startSunday); d <= endSaturday; d.setUTCDate(d.getUTCDate() + 1)) {
    const dateStr = d.toISOString().slice(0, 10);
    const inYear = d.getUTCFullYear() === year;
    const count = dayMap[dateStr]?.count ?? 0;
    currentWeek.push(inYear ? { date: dateStr, count, inYear } : null);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  // Month label positions — first week that has a day in each month
  const monthPositions: { month: number; weekIdx: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstReal = week.find((d) => d !== null);
    if (firstReal) {
      const m = new Date(firstReal.date).getUTCMonth();
      if (m !== lastMonth) { monthPositions.push({ month: m, weekIdx: wi }); lastMonth = m; }
    }
  });

  const CELL = 10;
  const GAP  = 2;
  const STEP = CELL + GAP;

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Title */}
      <a
        href="https://github.com/RenzSarucam"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, color: "#F5F5F5", textDecoration: "none", fontSize: 15, fontWeight: 700 }}
      >
        <svg aria-hidden="true" fill="currentColor" height="18" viewBox="0 0 24 24" width="18">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
        GitHub Contributions
      </a>

      {/* PH Time clock */}
      {phTime && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px rgba(34,197,94,0.5)", display: "inline-block", flexShrink: 0 }} />
          <span style={{ fontSize: 11, color: "#A3A3A3", fontFamily: "'Courier New', monospace", letterSpacing: "0.06em", textTransform: "uppercase" }}>PH Time</span>
          <span style={{ fontSize: 13, color: "#FFFFFF", fontFamily: "'Courier New', monospace", fontWeight: 600, letterSpacing: "0.04em" }}>{phTime}</span>
        </div>
      )}

      {/* Year selector + refresh */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap", alignItems: "center" }}>
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            style={{
              padding: "3px 12px",
              borderRadius: 6,
              border: `1px solid ${selectedYear === y ? "#F5F5F5" : "rgba(255,255,255,0.1)"}`,
              background: selectedYear === y ? "#F5F5F5" : "transparent",
              color: selectedYear === y ? "#111111" : "#A3A3A3",
              fontSize: 12,
              cursor: "pointer",
              fontFamily: "'Courier New', monospace",
              fontWeight: selectedYear === y ? 700 : 400,
              transition: "all 0.15s",
            }}
          >
            {y}
          </button>
        ))}

        {/* Refresh button */}
        <button
          onClick={handleRefresh}
          title={lastUpdated ? `Last updated: ${lastUpdated.toLocaleTimeString()}` : "Refresh contributions"}
          style={{
            marginLeft: "auto",
            padding: "3px 8px",
            borderRadius: 6,
            border: "1px solid rgba(255,255,255,0.12)",
            background: "transparent",
            color: "#A3A3A3",
            fontSize: 12,
            cursor: refreshing ? "default" : "pointer",
            fontFamily: "'Courier New', monospace",
            display: "flex",
            alignItems: "center",
            gap: 4,
            transition: "all 0.15s",
            opacity: refreshing ? 0.5 : 1,
          }}
        >
          <svg
            width="11" height="11" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ animation: refreshing ? "spin 0.8s linear infinite" : "none" }}
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
          </svg>
          {refreshing ? "Syncing..." : lastUpdated ? lastUpdated.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "Sync"}
        </button>
      </div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      <p style={{ margin: "0 0 8px 28px", fontSize: 12, color: "#A3A3A3", fontFamily: "'Courier New', monospace" }}>
        {year} Contributions &nbsp;·&nbsp; <span style={{ color: "#39d353" }}>{total.toLocaleString()} total</span>
      </p>

      <div style={{ display: "flex", gap: 0 }}>
        {/* Day labels */}
        <div style={{ display: "flex", flexDirection: "column", gap: GAP, marginRight: 4, paddingTop: 18 }}>
          {[0,1,2,3,4,5,6].map((d) => (
            <div
              key={d}
              style={{
                height: CELL,
                fontSize: 9,
                color: "#A3A3A3",
                fontFamily: "'Courier New', monospace",
                lineHeight: `${CELL}px`,
                visibility: d % 2 === 1 ? "visible" : "hidden",
              }}
            >
              {DAY_LABELS[d]}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div style={{ position: "relative" }}>
          {/* Month labels */}
          <div style={{ position: "relative", height: 16, marginBottom: 2 }}>
            {monthPositions.map(({ month, weekIdx }) => (
              <span
                key={month}
                style={{
                  position: "absolute",
                  left: weekIdx * STEP,
                  fontSize: 10,
                  color: "#A3A3A3",
                  fontFamily: "'Courier New', monospace",
                  whiteSpace: "nowrap",
                }}
              >
                {MONTHS[month]}
              </span>
            ))}
          </div>

          {/* Squares */}
          <div style={{ display: "flex", gap: GAP }}>
            {weeks.map((week, wi) => (
              <div key={wi} style={{ display: "flex", flexDirection: "column", gap: GAP }}>
                {week.map((day, di) => (
                  <div
                    key={di}
                    title={day ? `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}` : ""}
                    style={{
                      width: CELL,
                      height: CELL,
                      borderRadius: 2,
                      background: day ? getColor(day.count, max) : "transparent",
                      border: day ? "1px solid #2A2A2A" : "none",
                      cursor: day ? "default" : "default",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8, marginLeft: 28, justifyContent: "flex-end" }}>
        <span style={{ fontSize: 10, color: "#A3A3A3", fontFamily: "'Courier New', monospace" }}>Less</span>
        {["#2A2A2A", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: 2, background: c, border: "1px solid #2A2A2A" }} />
        ))}
        <span style={{ fontSize: 10, color: "#A3A3A3", fontFamily: "'Courier New', monospace" }}>More</span>
      </div>
    </div>
  );
}
