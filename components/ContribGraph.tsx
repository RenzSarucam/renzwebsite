"use client";

import { useEffect, useState } from "react";

type Day = { date: string; count: number };

const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [CURRENT_YEAR, CURRENT_YEAR - 1, CURRENT_YEAR - 2, CURRENT_YEAR - 3];

function getColor(count: number, max: number) {
  if (count === 0) return "rgba(255,255,255,0.07)";
  const ratio = count / Math.max(max, 1);
  if (ratio <= 0.25) return "#196c2e";  // visible low
  if (ratio <= 0.5)  return "#2ea043";  // medium
  if (ratio <= 0.75) return "#3ec655";  // high
  return "#4ae168";                      // max
}

export default function ContribGraph() {
  const [data, setData] = useState<{ total: number; days: Day[]; year: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

  useEffect(() => {
    setLoading(true);
    setData(null);
    fetch(`/api/github?year=${selectedYear}`)
      .then((r) => r.json())
      .then((d) => { if (d.days) setData(d); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [selectedYear]);

  if (loading) return (
    <div style={{ height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ fontSize: 12, color: "rgba(200,220,255,0.3)", fontFamily: "'Courier New', monospace" }}>
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
      {/* Year selector */}
      <div style={{ display: "flex", gap: 6, marginBottom: 10, flexWrap: "wrap" }}>
        {YEARS.map((y) => (
          <button
            key={y}
            onClick={() => setSelectedYear(y)}
            style={{
              padding: "3px 12px",
              borderRadius: 6,
              border: `1px solid ${selectedYear === y ? "#378add" : "rgba(55,138,221,0.2)"}`,
              background: selectedYear === y ? "#378add" : "transparent",
              color: selectedYear === y ? "#fff" : "rgba(200,220,255,0.5)",
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
      </div>

      <p style={{ margin: "0 0 8px 28px", fontSize: 12, color: "rgba(200,220,255,0.45)", fontFamily: "'Courier New', monospace" }}>
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
                color: "rgba(200,220,255,0.3)",
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
                  color: "rgba(200,220,255,0.4)",
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
                      border: day ? "1px solid rgba(255,255,255,0.04)" : "none",
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
        <span style={{ fontSize: 10, color: "rgba(200,220,255,0.3)", fontFamily: "'Courier New', monospace" }}>Less</span>
        {["rgba(255,255,255,0.05)", "#0e4429", "#006d32", "#26a641", "#39d353"].map((c) => (
          <div key={c} style={{ width: 10, height: 10, borderRadius: 2, background: c, border: "1px solid rgba(255,255,255,0.06)" }} />
        ))}
        <span style={{ fontSize: 10, color: "rgba(200,220,255,0.3)", fontFamily: "'Courier New', monospace" }}>More</span>
      </div>
    </div>
  );
}
