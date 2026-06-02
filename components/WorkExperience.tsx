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
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 700,
              color: "#e8f4ff",
              margin: "0 0 12px",
            }}
          >
            Work Experience
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.55)", maxWidth: 500, margin: 0 }}>
            Companies and projects I have contributed to throughout my career.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {workExperiences.map((exp, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(55,138,221,0.12)",
                borderRadius: 14,
                padding: "24px 28px",
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "4px 16px",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
                  <h3
                    style={{
                      fontSize: 18,
                      fontWeight: 700,
                      color: "#e8f4ff",
                      margin: 0,
                    }}
                  >
                    {exp.role}
                  </h3>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#5dcaa5",
                      fontFamily: "'Courier New', monospace",
                      background: "rgba(93,202,165,0.08)",
                      border: "1px solid rgba(93,202,165,0.2)",
                      borderRadius: 6,
                      padding: "2px 8px",
                    }}
                  >
                    {exp.company}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(200,220,255,0.45)",
                    margin: "0 0 12px",
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  {exp.location}
                </p>

                <p
                  style={{
                    fontSize: 15,
                    color: "rgba(200,220,255,0.65)",
                    margin: "0 0 16px",
                    lineHeight: 1.65,
                  }}
                >
                  {exp.description}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {exp.tools.map((tool) => (
                    <span
                      key={tool}
                      style={{
                        fontSize: 12,
                        color: "#378add",
                        background: "rgba(55,138,221,0.08)",
                        border: "1px solid rgba(55,138,221,0.18)",
                        borderRadius: 6,
                        padding: "3px 10px",
                        fontFamily: "'Courier New', monospace",
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ textAlign: "right", whiteSpace: "nowrap" }}>
                <span
                  style={{
                    fontSize: 13,
                    color: "rgba(200,220,255,0.4)",
                    fontFamily: "'Courier New', monospace",
                  }}
                >
                  {exp.period}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .experience-section {
          padding: 100px 32px;
        }
        @media (max-width: 640px) {
          .experience-section {
            padding: 64px 16px;
          }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .experience-section {
            padding: 80px 24px;
          }
        }
        @media (max-width: 540px) {
          .experience-section [style*="grid-template-columns"] {
            grid-template-columns: 1fr;
          }
          .experience-section [style*="text-align: right"] {
            text-align: left;
          }
        }
      `}</style>
    </section>
  );
}
