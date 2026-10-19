"use client";
import { useState } from "react";
import { skillGroups } from "@/app/_lib/portfolio-data";

const CATEGORY_COLORS: Record<string, string> = {
  Frontend:           "#60A5FA",
  Backend:            "#2DD4BF",
  DevOps:             "#F472B6",
  "APIs & Integrations": "#C084FC",
};

function RadarChart({ skills, color, active, onActive }: { skills: { name: string; level: number }[]; color: string; active: number | null; onActive: (i: number | null) => void }) {
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
        <path key={i} d={polyPath(r)} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      {/* Axes */}
      {axePts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
      ))}

      {/* Data fill */}
      <path d={dataPath} fill={`url(#rg-${color.replace("#", "")})`} stroke={color} strokeWidth="1.8" strokeLinejoin="round" />

      {/* Data dots */}
      {dataPts.map((p, i) => (
        <g key={i} onMouseEnter={() => onActive(i)} onMouseLeave={() => onActive(null)} style={{ cursor: "pointer" }}>
          <circle cx={p.x} cy={p.y} r="11" fill="transparent" />
          {active === i && <circle cx={p.x} cy={p.y} r="8" fill={color} opacity="0.22" />}
          <circle cx={p.x} cy={p.y} r={active === i ? 5 : 3.5} fill={color} stroke="#F5F5F5" strokeWidth="1.5" />
        </g>
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
            fill={active === i ? "#F5F5F5" : "#A3A3A3"}
            fontWeight={active === i ? 700 : 400}
            fontFamily="inherit"
            style={{ cursor: "pointer" }}
            onMouseEnter={() => onActive(i)}
            onMouseLeave={() => onActive(null)}
          >
            {name}
          </text>
        );
      })}
      {/* Tooltip */}
      {active !== null && (() => {
        const p = dataPts[active];
        const label = `${skills[active].name}  ${skills[active].level}%`;
        const w = Math.round(label.length * 6 + 16);
        const x = Math.max(-30, Math.min(size + 30 - w, p.x - w / 2));
        const y = p.y < cy ? p.y + 12 : p.y - 32;
        return (
          <g pointerEvents="none">
            <rect x={x} y={y} width={w} height="20" rx="6" fill="#0D0D0D" stroke={color} strokeWidth="1" />
            <text x={x + w / 2} y={y + 13.5} textAnchor="middle" fontSize="10" fontWeight="600" fill="#F5F5F5" fontFamily="inherit">{label}</text>
          </g>
        );
      })()}
    </svg>
  );
}

function SkillCard({ group, color }: { group: (typeof skillGroups)[number]; color: string }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="skill-card">
      <div className="skill-card-header" style={{ borderColor: `${color}30` }}>
        <span style={{ fontSize: 13, color, fontFamily: "'Courier New', monospace", flexShrink: 0 }}>{group.icon}</span>
        <h3 style={{ margin: 0, fontSize: group.category.length > 10 ? 13 : 15, fontWeight: 700, color: "#F5F5F5", lineHeight: 1.2 }}>{group.category}</h3>
        <span className="skill-avg-badge" style={{ background: `${color}18`, color, border: `1px solid ${color}30`, whiteSpace: "nowrap" }}>
          {Math.round(group.skills.reduce((s, k) => s + k.level, 0) / group.skills.length)}% avg
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
        <RadarChart skills={group.skills} color={color} active={active} onActive={setActive} />
      </div>

      <div className="skill-list">
        {group.skills.map((skill, i) => (
          <div
            key={skill.name}
            className="skill-row"
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            style={{ background: active === i ? `${color}18` : "transparent", borderRadius: 6, margin: "-2px -6px", padding: "2px 6px", transition: "background 0.15s ease" }}
          >
            <span className="skill-name" style={active === i ? { color: "#F5F5F5" } : undefined}>{skill.name}</span>
            <div className="skill-bar-track">
              <div className="skill-bar-fill" style={{ width: `${skill.level}%`, background: `linear-gradient(90deg, ${color}cc, ${color})` }} />
            </div>
            <span className="skill-pct" style={{ color }}>{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="skills-section" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <p style={{ fontSize: 14, color: "#FFFFFF", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            03. Skills
          </p>
          <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 12px" }}>
            My Expertise
          </h2>
          <p style={{ fontSize: 17, color: "#A3A3A3", maxWidth: 500, margin: 0 }}>
            Technologies and tools I work with as a Full Stack Developer &amp; DevOps Engineer.
          </p>
        </div>

        {/* Skill group cards */}
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <SkillCard key={group.category} group={group} color={CATEGORY_COLORS[group.category] ?? "#FFFFFF"} />
          ))}
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
          background: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.072);
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 36px rgba(0,0,0,0.3);
          border-color: rgba(255,255,255,0.168);
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
          font-size: 12px; color: #A3A3A3;
          width: 100px; flex-shrink: 0;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .skill-bar-track {
          flex: 1; height: 3px;
          background: rgba(255,255,255,0.04);
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
