"use client";
import { skillGroups } from "@/app/_lib/portfolio-data";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:           "#b09ffc",
  Backend:            "#2dd4bf",
  DevOps:             "#e5a44b",
  "APIs & Integrations": "#f59e0b",
};

function RadarChart({ skills, color }: { skills: { name: string; level: number }[]; color: string }) {
  const size = 180;
  const cx = size / 2;
  const cy = size / 2;
  const R = 72;
  const n = skills.length;

  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });

  const polyPath = (ratio: number) => {
    const pts = skills.map((_, i) => pt(i, R * ratio));
    return pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ") + "Z";
  };

  const dataPath = skills
    .map((s, i) => pt(i, R * (s.level / 100)))
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ") + "Z";

  const dataPts = skills.map((s, i) => pt(i, R * (s.level / 100)));
  const labelPts = skills.map((_, i) => pt(i, R + 14));
  const axePts   = skills.map((_, i) => pt(i, R));

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`rg-${color.replace("#", "")}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Grid rings */}
      {[0.33, 0.66, 1].map((r, i) => (
        <path key={i} d={polyPath(r)} fill="none" stroke="rgba(139,124,248,0.1)" strokeWidth="1" />
      ))}

      {/* Axes */}
      {axePts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(139,124,248,0.1)" strokeWidth="1" />
      ))}

      {/* Data fill */}
      <path d={dataPath} fill={`url(#rg-${color.replace("#", "")})`} stroke={color} strokeWidth="1.8" strokeLinejoin="round" />

      {/* Data dots */}
      {dataPts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color} stroke="#08111f" strokeWidth="1.5" />
      ))}

      {/* Labels */}
      {labelPts.map((p, i) => {
        const dx = p.x - cx;
        const dy = p.y - cy;
        const anchor = Math.abs(dx) < 5 ? "middle" : dx > 0 ? "start" : "end";
        const raw = skills[i].name.split("/")[0].trim();
        const name = raw.length > 10 ? raw.slice(0, 9) + "…" : raw;
        return (
          <text
            key={i}
            x={p.x}
            y={p.y + (dy > 0 ? 4 : dy < 0 ? -2 : 0)}
            textAnchor={anchor}
            fontSize="8.5"
            fill="rgba(200,195,240,0.55)"
            fontFamily="inherit"
          >
            {name}
          </text>
        );
      })}
    </svg>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 14, color: "#8b7cf8", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            03. Skills
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "#ede8fd", margin: "0 0 12px" }}>
            My Expertise
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,195,240,0.55)", maxWidth: 500, margin: 0 }}>
            Technologies and tools I work with as a Full Stack Developer &amp; DevOps Engineer.
          </p>
        </div>

        {/* Skill group cards */}
        <div className="skills-grid">
          {skillGroups.map((group) => {
            const color = CATEGORY_COLORS[group.category] ?? "#8b7cf8";
            return (
              <div key={group.category} className="skill-card">

                {/* Card header */}
                <div className="skill-card-header" style={{ borderColor: `${color}30` }}>
                  <span style={{ fontSize: 13, color, fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{group.icon}</span>
                  <h3 style={{ margin: 0, fontSize: group.category.length > 10 ? 13 : 15, fontWeight: 700, color: "#ede8fd", lineHeight: 1.2 }}>{group.category}</h3>
                  <span className="skill-avg-badge" style={{ background: `${color}18`, color, border: `1px solid ${color}30`, whiteSpace: "nowrap" }}>
                    {Math.round(group.skills.reduce((s, k) => s + k.level, 0) / group.skills.length)}% avg
                  </span>
                </div>

                {/* Radar */}
                <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
                  <RadarChart skills={group.skills} color={color} />
                </div>

                {/* Skill list */}
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="skill-row">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-bar-track">
                        <div className="skill-bar-fill" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${color}cc, ${color})` }} />
                      </div>
                      <span className="skill-pct" style={{ color }}>{skill.level}%</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .skills-section { padding: 100px 32px; }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
          gap: 20px;
        }

        .skill-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(139,124,248,0.12);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.3);
          border-color: rgba(139,124,248,0.28);
        }

        .skill-card-header {
          display: flex; align-items: center; gap: 8px;
          padding: 16px 18px 14px;
          border-bottom: 1px solid;
          flex-wrap: nowrap;
          min-width: 0;
        }
        .skill-card-header h3 { min-width: 0; flex: 1; }
        .skill-avg-badge {
          margin-left: auto; flex-shrink: 0;
          font-size: 11px; font-weight: 700;
          padding: 2px 8px; border-radius: 100px;
          font-family: 'Courier New', monospace;
          white-space: nowrap;
        }

        .skill-list {
          display: flex; flex-direction: column; gap: 8px;
          padding: 12px 18px 18px;
        }
        .skill-row {
          display: flex; align-items: center; gap: 8px;
        }
        .skill-name {
          font-size: 12px; color: rgba(200,195,240,0.6);
          width: 100px; flex-shrink: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .skill-bar-track {
          flex: 1; height: 3px;
          background: rgba(139,124,248,0.08);
          border-radius: 99px; overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%; border-radius: 99px;
          transition: width 0.6s ease;
        }
        .skill-pct {
          font-size: 11px; font-weight: 700;
          font-family: 'Courier New', monospace;
          width: 32px; text-align: right; flex-shrink: 0;
        }

        @media (max-width: 640px) {
          .skills-section { padding: 64px 16px; }
          .skills-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .skills-section { padding: 80px 24px; }
          .skills-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
