"use client";

const education = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Your University Name",
    location: "Davao City, Philippines",
    period: "2021 - Present",
    status: "In Progress",
  },
];

const certificates = [
  {
    title: "Certificate 1 - Replace with your actual cert",
    issuer: "Issuing Organization",
    year: "2024",
    color: "#378add",
  },
  {
    title: "Certificate 2 - Replace with your actual cert",
    issuer: "Issuing Organization",
    year: "2024",
    color: "#5dcaa5",
  },
  {
    title: "Certificate 3 - Replace with your actual cert",
    issuer: "Issuing Organization",
    year: "2023",
    color: "#7f77dd",
  },
];

export default function Certificates() {
  return (
    <section
      id="certificates"
      className="certs-section"
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
            04. Credentials
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 700,
              color: "#e8f4ff",
              margin: "0 0 12px",
            }}
          >
            Education & Certificates
          </h2>
        </div>

        <div className="certs-grid">
          <div>
            <p
              style={{
                fontSize: 13,
                color: "rgba(200,220,255,0.4)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Education
            </p>
            {education.map((item) => (
              <div
                key={item.degree}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(55,138,221,0.15)",
                  borderRadius: 14,
                  padding: "22px",
                  borderLeft: "3px solid #378add",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      padding: "3px 9px",
                      borderRadius: 100,
                      background: "rgba(239,159,39,0.1)",
                      color: "#ef9f27",
                      border: "1px solid rgba(239,159,39,0.25)",
                    }}
                  >
                    {item.status}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: "#378add",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {item.period}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 600,
                    color: "#e8f4ff",
                    margin: "0 0 6px",
                    lineHeight: 1.35,
                  }}
                >
                  {item.degree}
                </h3>
                <p style={{ fontSize: 15, color: "#378add", margin: "0 0 4px" }}>
                  {item.school}
                </p>
                <p style={{ fontSize: 14, color: "rgba(200,220,255,0.45)", margin: 0 }}>
                  {item.location}
                </p>
              </div>
            ))}
          </div>

          <div>
            <p
              style={{
                fontSize: 11,
                color: "rgba(200,220,255,0.4)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: 16,
              }}
            >
              Certificates
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certificates.map((item) => (
                <div
                  key={item.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(55,138,221,0.12)",
                    borderRadius: 12,
                    padding: "14px 18px",
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}35`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      color: item.color,
                      flexShrink: 0,
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    CERT
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: 15,
                        fontWeight: 500,
                        color: "#e8f4ff",
                        margin: "0 0 3px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </p>
                    <p style={{ fontSize: 13, color: "rgba(200,220,255,0.45)", margin: 0 }}>
                      {item.issuer}
                    </p>
                  </div>
                  <span
                    style={{
                      fontSize: 13,
                      color: item.color,
                      fontFamily: "'Courier New', monospace",
                      flexShrink: 0,
                    }}
                  >
                    {item.year}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .certs-section {
          padding: 100px 32px;
        }
        .certs-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 32px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .certs-section {
            padding: 64px 16px;
          }
          .certs-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
        @media (max-width: 820px) and (min-width: 769px) {
          .certs-section {
            padding: 80px 24px;
          }
        }
      `}</style>
    </section>
  );
}
