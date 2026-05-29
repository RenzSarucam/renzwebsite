"use client";

const education = [
  {
    level: "College",
    degree: "Bachelor of Science in Information Technology",
    school: "Holy Cross of Davao College",
    period: "2021 - 2025",
    status: "Graduated",
    highlights: [],
  },
  {
    level: "Senior High School",
    degree: "ICT - Information and Communication Technology",
    school: "Assumption College of Davao",
    period: "2018 - 2020",
    status: "Graduated with Honors",
    highlights: ["Graduated with Honors"],
  },
  {
    level: "Junior High School",
    degree: "Junior High School",
    school: "Don Manuel A. Javellana Memorial National High School",
    period: "2014 - 2018",
    status: "Completed",
    highlights: ["Badminton Player", "ICT Club Member"],
  },
  {
    level: "Elementary",
    degree: "Elementary",
    school: "Magsaysay Elementary School",
    period: "2007 - 2014",
    status: "Completed",
    highlights: ["Volleyball Player", "DLC Club Member"],
  },
];

export const certificates = [
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
                className="education-card"
                key={`${item.level}-${item.school}`}
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(55,138,221,0.15)",
                  borderRadius: 14,
                  padding: "22px",
                  borderLeft: "3px solid #378add",
                }}
              >
                <div
                  className="education-card-top"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <span
                    className="education-card-status"
                    style={{
                      fontSize: 13,
                      padding: "3px 9px",
                      borderRadius: 100,
                      background:
                        item.status === "Graduated with Honors"
                          ? "rgba(29,158,117,0.12)"
                          : item.status === "Graduated"
                            ? "rgba(55,138,221,0.12)"
                            : "rgba(239,159,39,0.1)",
                      color:
                        item.status === "Graduated with Honors"
                          ? "#5dcaa5"
                          : item.status === "Graduated"
                            ? "#61afff"
                            : "#ef9f27",
                      border: `1px solid ${
                        item.status === "Graduated with Honors"
                          ? "rgba(29,158,117,0.25)"
                          : item.status === "Graduated"
                            ? "rgba(55,138,221,0.25)"
                            : "rgba(239,159,39,0.25)"
                      }`,
                    }}
                  >
                    {item.status}
                  </span>
                  <span
                    className="education-card-period"
                    style={{
                      fontSize: 14,
                      color: "#378add",
                      fontFamily: "'Courier New', monospace",
                    }}
                  >
                    {item.period}
                  </span>
                </div>
                <p
                  className="education-card-level"
                  style={{
                    fontSize: 12,
                    color: "rgba(200,220,255,0.45)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  {item.level}
                </p>
                <h3
                  className="education-card-degree"
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
                <p className="education-card-school" style={{ fontSize: 15, color: "#378add", margin: "0 0 4px" }}>
                  {item.school}
                </p>
                {item.highlights.length > 0 && (
                  <div className="education-card-highlights" style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 14 }}>
                    {item.highlights.map((highlight) => (
                      <p
                        key={highlight}
                        style={{
                          fontSize: 14,
                          color: "rgba(200,220,255,0.62)",
                          margin: 0,
                        }}
                      >
                        {"\u2705"} {highlight}
                      </p>
                    ))}
                  </div>
                )}
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
                  className="certificate-card"
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
                    className="certificate-card-badge"
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
                  <div className="certificate-card-body" style={{ flex: 1, minWidth: 0 }}>
                    <p
                      className="certificate-card-title"
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
                    <p
                      className="certificate-card-issuer"
                      style={{ fontSize: 13, color: "rgba(200,220,255,0.45)", margin: 0 }}
                    >
                      {item.issuer}
                    </p>
                  </div>
                  <span
                    className="certificate-card-year"
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
          .education-card {
            padding: 20px 16px !important;
          }
          .education-card-top {
            gap: 12px !important;
            margin-bottom: 12px !important;
            flex-wrap: wrap;
          }
          .education-card-period {
            font-size: 13px !important;
          }
          .education-card-degree {
            font-size: 17px !important;
            margin-bottom: 8px !important;
          }
          .education-card-school {
            font-size: 14px !important;
            margin-bottom: 0 !important;
          }
          .education-card-highlights {
            gap: 8px !important;
            margin-top: 12px !important;
          }
          .certificate-card {
            gap: 12px !important;
            padding: 14px 14px !important;
          }
          .certificate-card-badge {
            width: 36px !important;
            height: 36px !important;
            font-size: 12px !important;
          }
          .certificate-card-title {
            font-size: 14px !important;
          }
        }
        @media (max-width: 480px) {
          .education-card {
            padding: 18px 14px !important;
          }
          .education-card-top {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 10px !important;
          }
          .education-card-status,
          .education-card-period {
            font-size: 12px !important;
          }
          .education-card-level {
            margin-bottom: 10px !important;
          }
          .education-card-degree {
            font-size: 15px !important;
            line-height: 1.45 !important;
          }
          .education-card-school {
            font-size: 13px !important;
            line-height: 1.5 !important;
          }
          .certificate-card {
            align-items: flex-start !important;
            padding: 12px !important;
          }
          .certificate-card-badge {
            width: 32px !important;
            height: 32px !important;
            border-radius: 8px !important;
            font-size: 11px !important;
          }
          .certificate-card-title {
            font-size: 13px !important;
            white-space: normal !important;
            overflow: visible !important;
            text-overflow: clip !important;
            line-height: 1.45 !important;
          }
          .certificate-card-issuer {
            font-size: 12px !important;
            line-height: 1.45 !important;
          }
          .certificate-card-year {
            font-size: 12px !important;
            align-self: flex-start !important;
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
