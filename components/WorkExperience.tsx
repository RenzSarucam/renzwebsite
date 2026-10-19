"use client";
import { workExperiences } from "@/app/_lib/portfolio-data";

const roleColor = (role: string, isCurrent: boolean) => {
  if (isCurrent) return { dot: "#F5F5F5", border: "rgba(255,255,255,0.132)", badge: "rgba(255,255,255,0.06)", badgeText: "#F5F5F5", badgeBorder: "rgba(255,255,255,0.18)" };
  if (/design|ui|ux/i.test(role)) return { dot: "#F5F5F5", border: "rgba(255,255,255,0.075)", badge: "rgba(255,255,255,0.05)", badgeText: "#F5F5F5", badgeBorder: "rgba(255,255,255,0.125)" };
  return { dot: "#F5F5F5", border: "rgba(255,255,255,0.108)", badge: "rgba(255,255,255,0.05)", badgeText: "#F5F5F5", badgeBorder: "rgba(255,255,255,0.15)" };
};

const locationFlag = (loc: string) => {
  if (/australia/i.test(loc)) return "🇦🇺";
  if (/germany/i.test(loc)) return "🇩🇪";
  if (/united states|usa|us\b/i.test(loc)) return "🇺🇸";
  if (/philippines|davao/i.test(loc)) return "🇵🇭";
  return "🌐";
};

export default function WorkExperience() {
  return (
    <section id="experience" className="exp-section" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 14, color: "#FFFFFF", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            02. Experience
          </p>
          <h2 style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 12px" }}>
            Work Experience
          </h2>
          <p style={{ fontSize: 16, color: "#A3A3A3", margin: 0 }}>
            Companies and projects I have contributed to throughout my career.
          </p>
        </div>

        {/* Timeline */}
        <div className="exp-timeline">
          {workExperiences.map((exp, i) => {
            const isCurrent = exp.period.toLowerCase().includes("present");
            const c = roleColor(exp.role, isCurrent);
            const isLast = i === workExperiences.length - 1;

            return (
              <div key={i} className="exp-row">

                {/* Spine */}
                <div className="exp-spine">
                  <div
                    className={`exp-dot${isCurrent ? " exp-dot-current" : ""}`}
                    style={{ background: c.dot, boxShadow: `0 0 0 3px ${c.dot}22, 0 0 12px ${c.dot}55` }}
                  />
                  {!isLast && <div className="exp-spine-line" />}
                </div>

                {/* Card */}
                <div
                  className="exp-card"
                  style={{ borderColor: c.border, marginBottom: isLast ? 0 : 24 }}
                >
                  {/* Left accent bar */}
                  <div className="exp-accent" style={{ background: c.dot }} />

                  <div className="exp-card-inner">
                    {/* Top row: role + period */}
                    <div className="exp-top">
                      <div className="exp-top-left">
                        <h3 className="exp-role">{exp.role}</h3>
                        <div className="exp-meta">
                          <span className="exp-company-badge" style={{ background: c.badge, color: c.badgeText, borderColor: c.badgeBorder }}>
                            {exp.company}
                          </span>
                          <span className="exp-loc">
                            {locationFlag(exp.location)} {exp.location}
                          </span>
                          {isCurrent && (
                            <span className="exp-live-badge">
                              <span className="exp-live-dot" />
                              Current
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="exp-period-pill">
                        {exp.period}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="exp-desc">{exp.description}</p>

                    {/* Projects */}
                    {exp.projects && (
                      <div className="exp-projects-row">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                          <path d="M9 18c-4.51 2-5-2-7-2"/>
                        </svg>
                        <span className="exp-projects-text">
                          <span style={{ color: "#FFFFFF", fontWeight: 600 }}>Projects: </span>
                          {exp.projects}
                        </span>
                      </div>
                    )}

                    {/* Tools */}
                    {exp.tools.length > 0 && (
                      <div className="exp-tools">
                        {exp.tools.map(tool => (
                          <span key={tool} className="exp-tool">{tool}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .exp-section { padding: 100px 32px; }

        /* ── Timeline layout ── */
        .exp-timeline { display: flex; flex-direction: column; }
        .exp-row { display: flex; gap: 22px; align-items: flex-start; }

        .exp-spine {
          display: flex; flex-direction: column; align-items: center;
          flex-shrink: 0; padding-top: 18px; width: 16px;
        }
        .exp-dot {
          width: 14px; height: 14px; border-radius: 50%; flex-shrink: 0;
          position: relative; z-index: 1; transition: box-shadow 0.3s;
        }
        .exp-dot-current {
          animation: dotGlow 2.4s ease-in-out infinite;
        }
        @keyframes dotGlow {
          0%,100% { box-shadow: 0 0 0 3px rgba(0,0,0,0.2), 0 0 10px rgba(0,0,0,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(0,0,0,0.1), 0 0 18px rgba(0,0,0,0.7); }
        }
        .exp-spine-line {
          width: 1px; flex: 1; min-height: 28px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0.025));
          margin: 6px 0;
        }

        /* ── Card ── */
        .exp-card {
          flex: 1; min-width: 0;
          background: #1A1A1A;
          border: 1px solid;
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .exp-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0,0,0,0.28);
        }

        .exp-accent {
          width: 3px; flex-shrink: 0;
          opacity: 0.75;
        }

        .exp-card-inner {
          flex: 1; padding: 20px 22px 20px;
          min-width: 0;
        }

        /* Top row */
        .exp-top {
          display: flex; justify-content: space-between;
          align-items: flex-start; gap: 12px; margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .exp-top-left { min-width: 0; }

        .exp-role {
          font-size: 17px; font-weight: 700; color: #F5F5F5;
          margin: 0 0 8px; line-height: 1.3;
        }
        .exp-meta { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

        .exp-company-badge {
          font-size: 12px; font-weight: 600;
          padding: 3px 9px; border-radius: 6px;
          border: 1px solid; white-space: nowrap;
          font-family: 'Courier New', monospace;
        }
        .exp-loc {
          font-size: 12px; color: #A3A3A3;
          font-family: 'Courier New', monospace;
        }
        .exp-live-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 11px; font-weight: 600; color: #FFFFFF;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 999px; padding: 2px 9px;
          white-space: nowrap;
        }
        .exp-live-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #F5F5F5;
          animation: livePulse 1.8s ease-in-out infinite;
        }
        @keyframes livePulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        .exp-period-pill {
          font-size: 12px; color: #A3A3A3;
          font-family: 'Courier New', monospace;
          background: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.072);
          border-radius: 8px; padding: 4px 10px;
          white-space: nowrap; flex-shrink: 0;
          align-self: flex-start;
        }

        /* Body */
        .exp-desc {
          font-size: 14.5px; color: #A3A3A3;
          margin: 0 0 14px; line-height: 1.7;
        }

        .exp-projects-row {
          display: flex; gap: 7px; align-items: flex-start;
          margin-bottom: 14px;
        }
        .exp-projects-text {
          font-size: 13px; color: #A3A3A3;
          font-family: 'Courier New', monospace; line-height: 1.6;
        }

        .exp-tools { display: flex; flex-wrap: wrap; gap: 6px; }
        .exp-tool {
          font-size: 11.5px; color: rgba(255,255,255,0.425);
          background: rgba(255,255,255,0.035);
          border: 1px solid rgba(255,255,255,0.096);
          border-radius: 6px; padding: 3px 9px;
          font-family: 'Courier New', monospace;
          transition: background 0.15s, color 0.15s;
        }
        .exp-tool:hover {
          background: rgba(255,255,255,0.07);
          color: #FFFFFF;
        }

        @media (max-width: 640px) {
          .exp-section { padding: 64px 16px; }
          .exp-row { gap: 14px; }
          .exp-spine { padding-top: 14px; }
          .exp-role { font-size: 15px; }
          .exp-top { flex-direction: column; gap: 8px; }
          .exp-period-pill { align-self: auto; }
          .exp-desc { font-size: 13.5px; }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .exp-section { padding: 80px 24px; }
        }
      `}</style>
    </section>
  );
}
