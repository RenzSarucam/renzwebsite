import { profile, contactEmail, workExperiences, education, skillGroups, certificates } from "@/app/_lib/portfolio-data";
import PrintButton from "./PrintButton";

export const metadata = { title: "Resume – Renz Carljansen Sarucam" };

const extraSkills = ["React Native", "Python", "PHP", "Django", "Firebase", "Figma", "Canva", "Arduino", "C++", "Nginx"];
const allSkills = [
  ...skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
  ...extraSkills,
];

export default function ResumePage() {
  return (
    <>
      <style suppressHydrationWarning>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f0f0f0; font-family: 'Segoe UI', Arial, sans-serif; }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 24px auto;
          background: #fff;
          padding: 18mm 16mm 14mm;
          color: #1a1a1a;
          font-size: 10.5pt;
          line-height: 1.5;
          box-shadow: 0 4px 24px rgba(0,0,0,0.12);
        }

        /* ── Header ── */
        .header { border-bottom: 2px solid #1a73e8; padding-bottom: 10px; margin-bottom: 14px; }
        .header h1 { font-size: 22pt; font-weight: 700; color: #1a1a1a; letter-spacing: -0.3px; }
        .header .meta {
          display: flex; flex-wrap: wrap; gap: 14px;
          margin-top: 5px; font-size: 9.5pt; color: #444;
        }

        /* ── Sections ── */
        .section { margin-bottom: 16px; }
        .section-title {
          font-size: 10pt; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.08em; color: #1a73e8;
          border-bottom: 1px solid #d0e4fa; padding-bottom: 3px; margin-bottom: 10px;
        }

        /* ── Experience rows ── */
        .exp-item { margin-bottom: 11px; }
        .exp-header {
          display: flex; justify-content: space-between; align-items: baseline;
          flex-wrap: wrap; gap: 4px;
        }
        .exp-title { font-weight: 700; font-size: 10.5pt; }
        .exp-company { font-size: 10pt; color: #1a73e8; font-weight: 600; }
        .exp-period { font-size: 9pt; color: #666; white-space: nowrap; }
        .exp-desc { font-size: 9.5pt; color: #333; margin-top: 3px; line-height: 1.5; }
        .exp-tools { margin-top: 4px; font-size: 9pt; color: #555; font-style: italic; }

        /* ── Education rows ── */
        .edu-item { margin-bottom: 9px; }
        .edu-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; }
        .edu-degree { font-weight: 700; font-size: 10.5pt; }
        .edu-school { font-size: 10pt; color: #1a73e8; font-weight: 600; }
        .edu-period { font-size: 9pt; color: #666; }
        .edu-note { font-size: 9pt; color: #555; margin-top: 2px; font-style: italic; }

        /* ── Skills ── */
        .skills-grid { display: flex; flex-wrap: wrap; gap: 6px; }
        .skill-tag {
          background: #e8f0fe; color: #1a73e8;
          border-radius: 4px; padding: 2px 8px;
          font-size: 9pt; font-weight: 500;
        }

        /* ── Languages ── */
        .lang-list { display: flex; gap: 16px; font-size: 10pt; }

        /* ── Print ── */
        @media print {
          body { background: #fff; }
          .page { margin: 0; box-shadow: none; width: 100%; padding: 0; }
          .no-print { display: none !important; }
          .exp-item { break-inside: avoid; page-break-inside: avoid; }
          .edu-item { break-inside: avoid; page-break-inside: avoid; }
          @page { size: A4; margin: 18mm 16mm; }
        }
      `}</style>

      <PrintButton />

      <div className="page">
        {/* ── Header ── */}
        <div className="header">
          <h1>{profile.fullName}</h1>
          <div className="meta">
            <span>📞 09266735768</span>
            <span>✉ {contactEmail}</span>
            <span>📍 {profile.location}</span>
            <span>💼 {profile.role}</span>
          </div>
        </div>

        {/* ── Work Experience ── */}
        <div className="section">
          <div className="section-title">Experience</div>
          {workExperiences.map((exp, i) => (
            <div className="exp-item" key={i}>
              <div className="exp-header">
                <div>
                  <span className="exp-title">{exp.role}</span>
                  {" · "}
                  <span className="exp-company">{exp.company}</span>
                  {" · "}
                  <span style={{ fontSize: "9.5pt", color: "#555" }}>{exp.location}</span>
                </div>
                <span className="exp-period">{exp.period}</span>
              </div>
              <div className="exp-desc">{exp.description}</div>
              {exp.tools.length > 0 && (
                <div className="exp-tools">Tools: {exp.tools.join(", ")}</div>
              )}
            </div>
          ))}
        </div>

        {/* ── Education ── */}
        <div className="section">
          <div className="section-title">Education</div>
          {education.map((edu, i) => (
            <div className="edu-item" key={i}>
              <div className="edu-header">
                <div>
                  <span className="edu-degree">{edu.degree}</span>
                  {" · "}
                  <span className="edu-school">{edu.school}</span>
                </div>
                <span className="edu-period">{edu.period}</span>
              </div>
              {edu.highlights.length > 0 && (
                <div className="edu-note">{edu.highlights.join(" · ")}</div>
              )}
            </div>
          ))}
        </div>

        {/* ── Skills ── */}
        <div className="section">
          <div className="section-title">Skills</div>
          <div className="skills-grid">
            {allSkills.map((skill) => (
              <span className="skill-tag" key={skill}>{skill}</span>
            ))}
          </div>
        </div>

        {/* ── Certificates ── */}
        <div className="section">
          <div className="section-title">Certificates</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {certificates.map((cert) => (
              <span
                key={cert.title}
                style={{
                  fontSize: "9pt", background: "#f5f5f5",
                  border: "1px solid #ddd", borderRadius: "4px",
                  padding: "2px 8px", color: "#333",
                }}
              >
                {cert.title} ({cert.year})
              </span>
            ))}
          </div>
        </div>

        {/* ── Languages ── */}
        <div className="section">
          <div className="section-title">Languages</div>
          <div className="lang-list">
            <span>Tagalog</span>
            <span>Bisaya</span>
            <span>English</span>
          </div>
        </div>
      </div>
    </>
  );
}
