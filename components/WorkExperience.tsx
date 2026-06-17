"use client";
import { workExperiences } from "@/app/_lib/portfolio-data";

export default function WorkExperience() {
  return (
    <section
      id="experience"
      className="experience-section"
      style={{ position: "relative", zIndex: 1 }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <p
            style={{
              fontSize: 14,
              color: "#378add",
              fontFamily: "'Courier New', monospace",
              margin: "0 0 8px",
              letterSpacing: "0.05em",
            }}
          >
            02. Experience
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 700,
              color: "#e8f4ff",
              margin: "0 0 12px",
            }}
          >
            Work Experience
          </h2>
          <p style={{ fontSize: 16, color: "rgba(200,220,255,0.55)", maxWidth: 500, margin: 0 }}>
            Companies and projects I have contributed to throughout my career.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {workExperiences.map((exp, i) => (
            <div key={i} className={`exp-card${exp.period.toLowerCase().includes("present") ? " exp-card-current" : ""}`}>
              <div className="exp-main">
                <div className="exp-header">
                  <h3 className="exp-role">{exp.role}</h3>
                  <span className="exp-company">{exp.company}</span>
                  {exp.period.toLowerCase().includes("present") && (
                    <span className="exp-current-badge">
                      <span className="exp-current-dot" />
                      Current
                    </span>
                  )}
                </div>

                <p className="exp-location">{exp.location}</p>

                <p className="exp-desc">{exp.description}</p>

                {exp.projects && (
                  <p className="exp-projects">
                    <span className="exp-projects-label">Projects: </span>{exp.projects}
                  </p>
                )}

                {exp.tools.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {exp.tools.map((tool) => (
                      <span key={tool} className="exp-tool">{tool}</span>
                    ))}
                  </div>
                )}
              </div>

              <div className="exp-period">
                <span>{exp.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .experience-section {
          padding: 100px 32px;
        }

        .exp-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(55,138,221,0.25);
          border-radius: 14px;
          padding: 24px 28px;
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 4px 16px;
          align-items: start;
          box-shadow: 0 0 18px rgba(55,138,221,0.12), 0 0 6px rgba(55,138,221,0.08) inset;
          position: relative;
        }

        .exp-card-current {
          background: rgba(93,202,165,0.04);
          border-color: rgba(93,202,165,0.35);
          box-shadow:
            0 0 0 1px rgba(93,202,165,0.15),
            0 0 24px rgba(93,202,165,0.18),
            0 0 48px rgba(93,202,165,0.08),
            inset 0 0 20px rgba(93,202,165,0.04);
          animation: current-card-glow 2.8s ease-in-out infinite;
        }

        .exp-card-current::before {
          content: '';
          position: absolute;
          left: 0;
          top: 12%;
          height: 76%;
          width: 3px;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, transparent, #5dcaa5 30%, #5dcaa5 70%, transparent);
          box-shadow: 0 0 12px #5dcaa5, 0 0 24px rgba(93,202,165,0.6);
          animation: current-bar-pulse 2.8s ease-in-out infinite;
        }

        @keyframes current-card-glow {
          0%, 100% {
            box-shadow:
              0 0 0 1px rgba(93,202,165,0.15),
              0 0 24px rgba(93,202,165,0.18),
              0 0 48px rgba(93,202,165,0.08),
              inset 0 0 20px rgba(93,202,165,0.04);
          }
          50% {
            box-shadow:
              0 0 0 1px rgba(93,202,165,0.28),
              0 0 36px rgba(93,202,165,0.28),
              0 0 64px rgba(93,202,165,0.14),
              inset 0 0 28px rgba(93,202,165,0.07);
          }
        }

        @keyframes current-bar-pulse {
          0%, 100% { opacity: 0.75; box-shadow: 0 0 10px #5dcaa5, 0 0 20px rgba(93,202,165,0.5); }
          50% { opacity: 1; box-shadow: 0 0 16px #5dcaa5, 0 0 32px rgba(93,202,165,0.8); }
        }

        .exp-main {
          min-width: 0;
        }

        .exp-header {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 4px;
        }

        .exp-role {
          font-size: 18px;
          font-weight: 700;
          color: #e8f4ff;
          margin: 0;
        }

        .exp-company {
          font-size: 13px;
          color: #5dcaa5;
          font-family: 'Courier New', monospace;
          background: rgba(93,202,165,0.08);
          border: 1px solid rgba(93,202,165,0.2);
          border-radius: 6px;
          padding: 2px 8px;
          white-space: nowrap;
        }

        .exp-current-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 12px;
          font-weight: 600;
          color: #5dcaa5;
          background: rgba(93,202,165,0.1);
          border: 1px solid rgba(93,202,165,0.35);
          border-radius: 999px;
          padding: 2px 10px 2px 7px;
          box-shadow: 0 0 10px rgba(93,202,165,0.25);
          white-space: nowrap;
        }

        .exp-current-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #5dcaa5;
          box-shadow: 0 0 6px #5dcaa5;
          animation: exp-dot-pulse 1.8s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes exp-dot-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #5dcaa5; }
          50% { opacity: 0.5; box-shadow: 0 0 12px #5dcaa5; }
        }

        .exp-location {
          font-size: 13px;
          color: rgba(200,220,255,0.45);
          margin: 0 0 12px;
          font-family: 'Courier New', monospace;
        }

        .exp-desc {
          font-size: 15px;
          color: rgba(200,220,255,0.65);
          margin: 0 0 16px;
          line-height: 1.65;
        }

        .exp-projects {
          font-size: 13px;
          color: rgba(200,220,255,0.55);
          margin: 0 0 14px;
          font-family: 'Courier New', monospace;
          line-height: 1.6;
        }

        .exp-projects-label {
          color: #378add;
          font-weight: 600;
        }

        .exp-tool {
          font-size: 12px;
          color: #378add;
          background: rgba(55,138,221,0.08);
          border: 1px solid rgba(55,138,221,0.18);
          border-radius: 6px;
          padding: 3px 10px;
          font-family: 'Courier New', monospace;
        }

        .exp-period {
          text-align: right;
          white-space: nowrap;
          font-size: 13px;
          color: rgba(200,220,255,0.4);
          font-family: 'Courier New', monospace;
          padding-top: 3px;
        }

        @media (max-width: 640px) {
          .experience-section {
            padding: 64px 16px;
          }
          .exp-card {
            grid-template-columns: 1fr;
            padding: 18px 16px;
            gap: 0;
          }
          .exp-period {
            text-align: left;
            margin-bottom: 10px;
            order: -1;
          }
          .exp-role {
            font-size: 16px;
          }
          .exp-desc {
            font-size: 14px;
          }
        }

        @media (max-width: 820px) and (min-width: 641px) {
          .experience-section {
            padding: 80px 24px;
          }
          .exp-card {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .exp-period {
            text-align: left;
            margin-bottom: 10px;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}
