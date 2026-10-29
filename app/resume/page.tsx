import {
  profile,
  contactEmail,
  githubUrl,
  linkedinUrl,
  workExperiences,
  education,
  certificates,
  techStack,
  projects,
} from "@/app/_lib/portfolio-data";
import PrintButton from "./PrintButton";

export const metadata = { title: "Resume – Renz Carljansen Sarucam" };

const allSkills = techStack.map((s) => s.name);
const bare = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "");

// Everything is namespaced with `rs-` so it can't collide with the site's global classes.
const css = `
  .rs-root { min-height: 100vh; padding: 28px 12px; background: #1b1815; position: relative; z-index: 1; }
  .rs-page {
    width: 210mm; min-height: 297mm; margin: 0 auto; display: flex;
    box-shadow: 0 16px 56px rgba(0,0,0,0.55);
    background: #f6f2e8; color: #15120f;
    font-family: var(--serif-body), Georgia, serif;
  }

  /* ── Sidebar ── */
  .rs-sidebar {
    width: 70mm; flex-shrink: 0; background: #15120f; color: #e9e3d3;
    padding: 13mm 7mm 12mm; display: flex; flex-direction: column; gap: 14px;
  }
  .rs-bar { width: 34px; height: 3px; background: #b3261e; margin-bottom: 10px; }
  .rs-name { font-family: var(--serif-display), Georgia, serif; font-weight: 400; font-size: 20pt; line-height: 1.08; color: #f6f2e8; }
  .rs-role { margin-top: 8px; font-family: var(--sans), Arial, sans-serif; font-size: 6.8pt; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; line-height: 1.9; color: #c9c1ad; }
  .rs-divider { height: 1px; background: rgba(246,242,232,0.16); }
  .rs-side-title { font-family: var(--sans), Arial, sans-serif; font-size: 6.5pt; font-weight: 700; letter-spacing: 0.18em; text-transform: uppercase; color: #e0554b; margin-bottom: 8px; }

  .rs-contact { margin-bottom: 7px; }
  .rs-contact-label { font-family: var(--sans), Arial, sans-serif; font-size: 5.8pt; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #9a927f; }
  .rs-contact-value { font-size: 7.8pt; line-height: 1.4; color: #f1ecdf; word-break: break-all; }

  .rs-tags { display: flex; flex-wrap: wrap; gap: 4px; }
  .rs-tag { border: 1px solid rgba(246,242,232,0.3); color: #e9e3d3; padding: 1px 5px; font-family: var(--mono), "Courier New", monospace; font-size: 6.3pt; line-height: 1.7; }

  .rs-lang { font-size: 8pt; margin-bottom: 4px; padding-left: 8px; border-left: 2px solid #b3261e; color: #f1ecdf; }
  .rs-item { margin-bottom: 8px; padding: 1px 0 1px 8px; border-left: 2px solid rgba(246,242,232,0.25); }
  .rs-item-title { font-size: 7.6pt; line-height: 1.4; color: #f6f2e8; font-weight: 700; }
  .rs-item-meta { font-size: 6.6pt; margin-top: 2px; color: #b6ae9a; line-height: 1.4; }

  /* ── Main ── */
  .rs-main { flex: 1; padding: 13mm 11mm 12mm 9mm; font-size: 10pt; line-height: 1.5; }
  .rs-section { margin-bottom: 14px; }
  .rs-title {
    font-family: var(--sans), Arial, sans-serif; font-size: 8pt; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase; color: #15120f;
    border-bottom: 2px solid #15120f; padding-bottom: 4px; margin-bottom: 10px;
  }
  .rs-title::before { content: ""; display: inline-block; width: 7px; height: 7px; background: #b3261e; margin-right: 8px; }

  .rs-exp { margin-bottom: 11px; }
  .rs-exp-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 2px 10px; }
  .rs-exp-role { font-weight: 700; font-size: 10pt; }
  .rs-exp-company { font-size: 9.2pt; color: #b3261e; font-weight: 700; }
  .rs-exp-place { font-size: 8.6pt; color: #5a5347; }
  .rs-exp-desc { font-size: 8.8pt; color: #2b2620; margin-top: 3px; line-height: 1.5; }
  .rs-exp-line { margin-top: 3px; font-size: 8.2pt; color: #3d372f; }
  .rs-exp-line b { color: #15120f; }
  .rs-exp-tools { font-style: italic; color: #5a5347; }

  .rs-projects { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 16px; }
  .rs-proj { break-inside: avoid; }
  .rs-proj-title { font-weight: 700; font-size: 8.6pt; }
  .rs-proj-place { font-size: 7.8pt; color: #5a5347; }
  .rs-proj-type { font-family: var(--sans), Arial, sans-serif; font-size: 6.6pt; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #b3261e; }
  .rs-proj-tags { font-size: 7.2pt; color: #5a5347; font-style: italic; line-height: 1.4; }

  /* ── Phone ── */
  @media (max-width: 860px) {
    .rs-root { padding: 0; }
    .rs-page { width: 100%; min-height: 0; flex-direction: column; }
    .rs-sidebar { width: 100%; padding: 28px 22px; }
    .rs-main { padding: 28px 22px; }
    .rs-projects { grid-template-columns: 1fr; }
  }

  /* ── Print ── */
  @media print {
    html, body { background: #f6f2e8 !important; }
    body::before { display: none !important; }
    .rs-root { padding: 0; background: #f6f2e8; }
    .rs-page { margin: 0; box-shadow: none; width: 100%; min-height: unset; display: flex; flex-direction: row; }
    .rs-sidebar {
      width: 60mm; padding: 10mm 5mm; gap: 10px; background: #15120f !important;
      -webkit-print-color-adjust: exact; print-color-adjust: exact;
    }
    .rs-bar, .rs-tag, .rs-lang, .rs-item { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .rs-bar { background: #b3261e !important; }
    .rs-name { font-size: 15pt; }
    .rs-role { font-size: 6pt; line-height: 1.7; margin-top: 5px; }
    .rs-side-title { font-size: 5.6pt; margin-bottom: 5px; }
    .rs-contact { margin-bottom: 4px; }
    .rs-contact-label { font-size: 5pt; }
    .rs-contact-value { font-size: 6.6pt; }
    .rs-tags { gap: 3px; }
    .rs-tag { font-size: 5.5pt; padding: 0 4px; }
    .rs-lang { font-size: 7pt; margin-bottom: 2px; padding-left: 6px; }
    .rs-item { margin-bottom: 4px; padding-left: 6px; }
    .rs-item-title { font-size: 6.4pt; }
    .rs-item-meta { font-size: 5.6pt; margin-top: 1px; }
    /* Block (not flex) so the sidebar can break between pages; keep each entry whole */
    .rs-sidebar { display: block; }
    .rs-sidebar > div { margin-bottom: 6px; }
    .rs-sidebar > div:not(.rs-certs) { break-inside: avoid; page-break-inside: avoid; }
    .rs-divider { margin: 8px 0; break-after: avoid; page-break-after: avoid; }
    .rs-side-title { break-after: avoid; page-break-after: avoid; }
    .rs-item, .rs-lang { break-inside: avoid; page-break-inside: avoid; }

    .rs-main { padding: 10mm 8mm 10mm 7mm; font-size: 8.5pt; }
    .rs-section { margin-bottom: 10px; }
    .rs-title { font-size: 7pt; margin-bottom: 6px; padding-bottom: 2px; }
    .rs-exp { margin-bottom: 8px; break-inside: avoid; page-break-inside: avoid; }
    .rs-exp-role { font-size: 9pt; }
    .rs-exp-company { font-size: 8.5pt; }
    .rs-exp-place { font-size: 7.6pt; }
    .rs-exp-desc { font-size: 8pt; line-height: 1.4; margin-top: 2px; }
    .rs-exp-line { font-size: 7.4pt; margin-top: 2px; }
    .rs-projects { gap: 4px 14px; }
    .rs-proj { margin-bottom: 3px; page-break-inside: avoid; }
    .rs-proj-title { font-size: 7.8pt; }
    .rs-proj-place { font-size: 7pt; }
    .rs-proj-type { font-size: 6pt; }
    .rs-proj-tags { font-size: 6.4pt; }
    .no-print { display: none !important; }
    @page { size: A4; margin: 10mm 12mm; }
  }
`;

export default function ResumePage() {
  return (
    <div className="rs-root">
      <style suppressHydrationWarning>{css}</style>

      <PrintButton />

      <div className="rs-page">
        {/* ── Sidebar ── */}
        <div className="rs-sidebar">
          <div>
            <div className="rs-bar" />
            <div className="rs-name">{profile.fullName}</div>
            <div className="rs-role">
              Full-Stack Web Developer<br />
              Docker &amp; CI/CD<br />
              R&amp;D Engineer
            </div>
          </div>

          <div className="rs-divider" />

          <div>
            <div className="rs-side-title">Contact</div>
            <div className="rs-contact">
              <div className="rs-contact-label">Phone</div>
              <div className="rs-contact-value">09266735768</div>
            </div>
            <div className="rs-contact">
              <div className="rs-contact-label">Email</div>
              <div className="rs-contact-value">{contactEmail}</div>
            </div>
            <div className="rs-contact">
              <div className="rs-contact-label">Location</div>
              <div className="rs-contact-value">{profile.location}</div>
            </div>
            <div className="rs-contact">
              <div className="rs-contact-label">LinkedIn</div>
              <div className="rs-contact-value">{bare(linkedinUrl)}</div>
            </div>
            <div className="rs-contact">
              <div className="rs-contact-label">GitHub</div>
              <div className="rs-contact-value">{bare(githubUrl)}</div>
            </div>
          </div>

          <div className="rs-divider" />

          <div>
            <div className="rs-side-title">Skills</div>
            <div className="rs-tags">
              {allSkills.map((skill) => (
                <span className="rs-tag" key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="rs-divider" />

          <div>
            <div className="rs-side-title">Languages</div>
            {["Tagalog", "Bisaya", "English"].map((lang) => (
              <div className="rs-lang" key={lang}>{lang}</div>
            ))}
          </div>

          <div className="rs-divider" />

          <div className="rs-certs">
            <div className="rs-side-title">Certificates</div>
            {certificates.map((cert) => (
              <div className="rs-item" key={cert.title}>
                <div className="rs-item-title">{cert.title}</div>
                <div className="rs-item-meta">{cert.issuer} · {cert.year}</div>
              </div>
            ))}
          </div>

          <div className="rs-divider" />

          <div className="rs-edu-section">
            <div className="rs-side-title">Education</div>
            {education
              .filter((edu) => edu.level === "College" || edu.level === "Senior High School")
              .map((edu) => (
                <div className="rs-item" key={edu.school}>
                  <div className="rs-item-title">{edu.degree}</div>
                  <div className="rs-item-meta">{edu.school}</div>
                  <div className="rs-item-meta">
                    {edu.period}
                    {edu.highlights.length > 0 ? ` · ${edu.highlights.join(" · ")}` : ""}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* ── Main ── */}
        <div className="rs-main">
          <div className="rs-section">
            <div className="rs-title">Experience</div>
            {workExperiences.map((exp) => (
              <div className="rs-exp" key={`${exp.company}-${exp.period}`}>
                <div className="rs-exp-head">
                  <div>
                    <span className="rs-exp-role">{exp.role}</span>
                    {" · "}
                    <span className="rs-exp-company">{exp.company}</span>
                    {" · "}
                    <span className="rs-exp-place">{exp.location}</span>
                  </div>
                </div>
                <div className="rs-exp-desc">{exp.description}</div>
                {(exp.projects || exp.autoProjectsFromPlace) && (
                  <div className="rs-exp-line">
                    <b>Projects: </b>
                    {exp.autoProjectsFromPlace
                      ? projects.filter((p) => p.place === exp.autoProjectsFromPlace).map((p) => p.title).join(", ")
                      : exp.projects}
                  </div>
                )}
                {exp.tools.length > 0 && (
                  <div className="rs-exp-line rs-exp-tools">Tools: {exp.tools.join(", ")}</div>
                )}
              </div>
            ))}
          </div>

          <div className="rs-section">
            <div className="rs-title">Projects</div>
            <div className="rs-projects">
              {projects.map((project) => (
                <div className="rs-proj" key={project.title}>
                  <div>
                    <span className="rs-proj-title">{project.title}</span>
                    {project.place && <span className="rs-proj-place"> · {project.place}</span>}
                  </div>
                  <div className="rs-proj-type">
                    {Array.isArray(project.type) ? project.type.join(" / ") : project.type}
                  </div>
                  <div className="rs-proj-tags">{project.tags.join(", ")}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
