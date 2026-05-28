"use client";

const skillGroups = [
  {
    category: "Frontend",
    icon: "Frontend",
    skills: [
      { name: "React / Next.js", level: 85 },
      { name: "HTML / CSS", level: 90 },
      { name: "TypeScript", level: 75 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Backend",
    icon: "Backend",
    skills: [
      { name: "Node.js / Express", level: 80 },
      { name: "Python", level: 82 },
      { name: "REST API Design", level: 85 },
      { name: "PostgreSQL / MongoDB", level: 72 },
    ],
  },
  {
    category: "R&D / Embedded",
    icon: "R&D",
    skills: [
      { name: "Arduino / C++", level: 78 },
      { name: "IoT Systems", level: 74 },
      { name: "Data Analysis", level: 76 },
      { name: "ML Basics (sklearn)", level: 65 },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "Tools",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Linux CLI", level: 72 },
      { name: "Figma", level: 68 },
      { name: "VS Code", level: 95 },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      style={{
        padding: "100px 32px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 52 }}>
          <p
            style={{
              fontSize: 12,
              color: "#378add",
              fontFamily: "'Courier New', monospace",
              marginBottom: 8,
              letterSpacing: "0.05em",
            }}
          >
            03. Skills
          </p>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 700,
              color: "#e8f4ff",
              margin: "0 0 12px",
            }}
          >
            My Expertise
          </h2>
          <p style={{ fontSize: 15, color: "rgba(200,220,255,0.55)", maxWidth: 500 }}>
            Technologies and tools I work with as a Junior R&D Engineer.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
                <span style={{ fontSize: 12, color: "#5dcaa5", fontFamily: "'Courier New', monospace" }}>
                  {group.icon}
                </span>
                <h3
                  style={{
                    fontSize: 14,
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
                      <span style={{ fontSize: 13, color: "rgba(200,220,255,0.7)" }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
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
    </section>
  );
}
