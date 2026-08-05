"use client";
import { skillGroups } from "@/app/_lib/portfolio-data";

export default function Skills() {
  return (
    <section
      id="skills"
      className="skills-section"
      style={{
        position: "relative",
        zIndex: 1,
      }}
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
            03. Skills
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 700,
              color: "#e8f4ff",
              margin: "0 0 12px",
            }}
          >
            My Expertise
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.55)", maxWidth: 500, margin: 0 }}>
            Technologies and tools I work with as a Full Stack Developer & R&D Engineer.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
            gap: 20,
          }}
        >
          {skillGroups.map((group) => (
            <div
              key={group.category}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(55,138,221,0.12)",
                borderRadius: 14,
                padding: "22px",
                transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = "0 10px 30px rgba(55,138,221,0.12)";
                el.style.borderColor = "rgba(55,138,221,0.3)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement;
                el.style.transform = "translateY(0)";
                el.style.boxShadow = "none";
                el.style.borderColor = "rgba(55,138,221,0.12)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 20,
                }}
              >
                <span style={{ fontSize: 14, color: "#5dcaa5", fontFamily: "'Courier New', monospace" }}>
                  {group.icon}
                </span>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#e8f4ff",
                    margin: 0,
                  }}
                >
                  {group.category}
                </h3>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {group.skills.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 6,
                      }}
                    >
                      <span style={{ fontSize: 15, color: "rgba(200,220,255,0.7)" }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: 14,
                          color: "#378add",
                          fontFamily: "'Courier New', monospace",
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: "rgba(55,138,221,0.1)",
                        borderRadius: 4,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${skill.level}%`,
                          background: "linear-gradient(90deg, #378add, #5dcaa5)",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .skills-section {
          padding: 100px 32px;
        }
        @media (max-width: 640px) {
          .skills-section {
            padding: 64px 16px;
          }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .skills-section {
            padding: 80px 24px;
          }
        }
      `}</style>
    </section>
  );
}
