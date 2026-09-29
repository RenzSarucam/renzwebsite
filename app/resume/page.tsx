import { profile, contactEmail, workExperiences, education, certificates, techStack, projects } from "@/app/_lib/portfolio-data";
import PrintButton from "./PrintButton";

export const metadata = { title: "Resume – Renz Carljansen Sarucam" };

const allSkills = techStack.map((s) => s.name);

export default function ResumePage() {
  return (
    <>
      <style suppressHydrationWarning>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060d1a; font-family: 'Segoe UI', Arial, sans-serif; }

        .page {
          width: 210mm;
          min-height: 297mm;
          margin: 28px auto;
          display: flex;
          box-shadow: 0 16px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(55,138,221,0.18);
          border-radius: 6px;
          overflow: hidden;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 70mm;
          flex-shrink: 0;
          background: linear-gradient(170deg, #0d1b2e 0%, #091320 100%);
          padding: 13mm 7mm 12mm;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .sb-accent-bar {
          width: 32px;
          height: 3px;
          background: linear-gradient(90deg, #378add, #5dcaa5);
          border-radius: 2px;
          margin-bottom: 8px;
        }

        .sb-name {
          font-size: 14.5pt;
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          letter-spacing: -0.3px;
        }

        .sb-subtitle {
          margin-top: 6px;
          font-size: 7.5pt;
          color: rgba(255,255,255,0.48);
          line-height: 1.85;
        }

        .sb-divider {
          height: 1px;
          background: rgba(55,138,221,0.14);
        }

        .sb-section-title {
          font-size: 6.5pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #5dcaa5;
          margin-bottom: 8px;
        }

        .sb-contact-item {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 7.5pt;
          color: rgba(255,255,255,0.7);
          margin-bottom: 5px;
          line-height: 1.45;
          word-break: break-all;
        }

        .sb-icon {
          flex-shrink: 0;
          font-size: 9pt;
        }

        .sb-skills {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .sb-skill-tag {
          background: rgba(55,138,221,0.09);
          border: 1px solid rgba(55,138,221,0.22);
          color: rgba(255,255,255,0.72);
          border-radius: 3px;
          padding: 1px 5px;
          font-size: 6.5pt;
          line-height: 1.7;
        }

        .sb-lang-item {
          font-size: 8pt;
          color: rgba(255,255,255,0.7);
          margin-bottom: 4px;
          padding-left: 8px;
          border-left: 2px solid rgba(93,202,165,0.4);
        }

        .sb-cert-item {
          margin-bottom: 7px;
          padding: 4px 7px;
          border-left: 2px solid rgba(55,138,221,0.35);
        }

        .sb-cert-name {
          font-size: 7.5pt;
          color: rgba(255,255,255,0.68);
          line-height: 1.4;
        }

        .sb-cert-meta {
          font-size: 6.5pt;
          color: rgba(255,255,255,0.32);
          margin-top: 2px;
        }

        /* ── Main ── */
        .main {
          flex: 1;
          background: #fff;
          padding: 13mm 11mm 12mm 9mm;
          color: #1a1a1a;
          font-size: 10pt;
          line-height: 1.5;
        }

        .section { margin-bottom: 13px; }

        .section-title {
          font-size: 8pt;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.11em;
          color: #1a73e8;
          border-bottom: 1.5px solid #d0e4fa;
          padding-bottom: 3px;
          margin-bottom: 9px;
        }

        /* ── Experience ── */
        .exp-item { margin-bottom: 10px; }
        .exp-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 2px;
        }
        .exp-title { font-weight: 700; font-size: 10pt; }
        .exp-company { font-size: 9.5pt; color: #1a73e8; font-weight: 600; }
        .exp-location { font-size: 9pt; color: #666; }
        .exp-period { font-size: 8.5pt; color: #666; white-space: nowrap; }
        .exp-desc { font-size: 9pt; color: #333; margin-top: 3px; line-height: 1.5; }
        .exp-projects { margin-top: 2px; font-size: 8.5pt; color: #333; }
        .exp-projects-label { font-weight: 600; color: #1a73e8; }
        .exp-tools { margin-top: 3px; font-size: 8.5pt; color: #555; font-style: italic; }

        /* ── Education ── */
        .edu-item { margin-bottom: 8px; }
        .edu-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
        }
        .edu-degree { font-weight: 700; font-size: 10pt; }
        .edu-school { font-size: 9.5pt; color: #1a73e8; font-weight: 600; }
        .edu-period { font-size: 8.5pt; color: #666; }
        .edu-note { font-size: 8.5pt; color: #555; margin-top: 2px; font-style: italic; }

        /* ── Projects ── */
        .project-item { margin-bottom: 7px; }
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 4px;
        }
        .project-title { font-weight: 700; font-size: 9.5pt; }
        .project-place { font-size: 9pt; color: #555; }
        .project-type { font-size: 8.5pt; color: #1a73e8; font-weight: 600; }
        .project-tags { font-size: 8pt; color: #666; font-style: italic; margin-top: 1px; }

        /* ── Print ── */
        @media print {
          body { background: #fff; }
          .page {
            margin: 0;
            box-shadow: none;
            border-radius: 0;
            width: 100%;
            min-height: unset;
          }

          /* Sidebar — compact + force dark bg */
          .sidebar {
            width: 60mm;
            padding: 10mm 5mm 10mm;
            gap: 10px;
            background: #0d1b2e !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .sb-accent-bar {
            background: linear-gradient(90deg, #378add, #5dcaa5) !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .sb-name { font-size: 12pt; }
          .sb-subtitle { font-size: 6.5pt; line-height: 1.65; margin-top: 4px; }
          .sb-section-title { font-size: 5.5pt; margin-bottom: 5px; }
          .sb-contact-item { font-size: 6.5pt; margin-bottom: 3px; gap: 5px; }
          .sb-icon { font-size: 8pt; }
          .sb-skills { gap: 3px; }
          .sb-skill-tag { font-size: 5.5pt; padding: 0 4px; }
          .sb-lang-item { font-size: 7pt; margin-bottom: 2px; padding-left: 6px; }
          .sb-cert-item { margin-bottom: 4px; padding: 2px 5px; }
          .sb-cert-name { font-size: 6.5pt; }
          .sb-cert-meta { font-size: 5.5pt; margin-top: 1px; }

          /* Main — compact */
          .main { padding: 10mm 8mm 10mm 7mm; font-size: 8.5pt; }
          .section { margin-bottom: 10px; }
          .section-title { font-size: 7pt; margin-bottom: 6px; padding-bottom: 2px; }

          .exp-item { margin-bottom: 8px; }
          .exp-title { font-size: 9pt; }
          .exp-company { font-size: 8.5pt; }
          .exp-location { font-size: 7.5pt; }
          .exp-period { font-size: 7.5pt; }
          .exp-desc { font-size: 8pt; line-height: 1.4; margin-top: 2px; }
          .exp-projects { font-size: 7.5pt; margin-top: 1px; }
          .exp-tools { font-size: 7.5pt; margin-top: 2px; }

          /* Projects — 2 columns to halve vertical space */
          .projects-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 4px 14px;
          }
          .project-item { margin-bottom: 3px; }
          .project-title { font-size: 8pt; }
          .project-place { font-size: 7.5pt; }
          .project-type { font-size: 7.5pt; }
          .project-tags { font-size: 6.5pt; margin-top: 0; }

          .edu-item { margin-bottom: 6px; }
          .edu-degree { font-size: 9pt; }
          .edu-school { font-size: 8.5pt; }
          .edu-period { font-size: 7.5pt; }
          .edu-note { font-size: 7.5pt; margin-top: 1px; }

          .no-print { display: none !important; }
          .exp-item { break-inside: avoid; page-break-inside: avoid; }
          .edu-item { break-inside: avoid; page-break-inside: avoid; }
          .project-item { break-inside: avoid; page-break-inside: avoid; }
          @page { size: A4; margin: 0; }
        }
      `}</style>

      <PrintButton />

      <div className="page">
        {/* ── Sidebar ── */}
        <div className="sidebar">
          {/* Profile */}
          <div>
            <div className="sb-accent-bar" />
            <div className="sb-name">{profile.fullName}</div>
            <div className="sb-subtitle">
              Full Stack Developer<br />
              R&amp;D Engineer<br />
              DevOps Engineer
            </div>
          </div>

          <div className="sb-divider" />

          {/* Contact */}
          <div>
            <div className="sb-section-title">Contact</div>
            <div className="sb-contact-item">
              <span className="sb-icon">📞</span>
              <span>09266735768</span>
            </div>
            <div className="sb-contact-item">
              <span className="sb-icon">✉</span>
              <span>{contactEmail}</span>
            </div>
            <div className="sb-contact-item">
              <span className="sb-icon">📍</span>
              <span>{profile.location}</span>
            </div>
          </div>

          <div className="sb-divider" />

          {/* Skills */}
          <div>
            <div className="sb-section-title">Skills</div>
            <div className="sb-skills">
              {allSkills.map((skill) => (
                <span className="sb-skill-tag" key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="sb-divider" />

          {/* Languages */}
          <div>
            <div className="sb-section-title">Languages</div>
            {["Tagalog", "Bisaya", "English"].map((lang) => (
              <div className="sb-lang-item" key={lang}>{lang}</div>
            ))}
          </div>

          <div className="sb-divider" />

          {/* Certificates */}
          <div>
            <div className="sb-section-title">Certificates</div>
            {certificates.map((cert) => (
              <div className="sb-cert-item" key={cert.title}>
                <div className="sb-cert-name">{cert.title}</div>
                <div className="sb-cert-meta">{cert.issuer} · {cert.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main ── */}
        <div className="main">
          {/* Experience */}
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
                    <span className="exp-location">{exp.location}</span>
                  </div>
                  <span className="exp-period">{exp.period}</span>
                </div>
                <div className="exp-desc">{exp.description}</div>
                {(exp.projects || exp.autoProjectsFromPlace) && (
                  <div className="exp-projects">
                    <span className="exp-projects-label">Projects: </span>
                    {exp.autoProjectsFromPlace
                      ? projects.filter((p) => p.place === exp.autoProjectsFromPlace).map((p) => p.title).join(", ")
                      : exp.projects}
                  </div>
                )}
                {exp.tools.length > 0 && (
                  <div className="exp-tools">Tools: {exp.tools.join(", ")}</div>
                )}
              </div>
            ))}
          </div>

          {/* Projects */}
          <div className="section">
            <div className="section-title">Projects</div>
            <div className="projects-list">
            {projects.map((project) => (
              <div className="project-item" key={project.title}>
                <div className="project-header">
                  <div>
                    <span className="project-title">{project.title}</span>
                    {project.place && (
                      <span className="project-place"> · {project.place}</span>
                    )}
                  </div>
                  <span className="project-type">
                    {Array.isArray(project.type) ? project.type.join(" / ") : project.type}
                  </span>
                </div>
                <div className="project-tags">{project.tags.join(", ")}</div>
              </div>
            ))}
            </div>
          </div>

          {/* Education */}
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
        </div>
      </div>
    </>
  );
}
