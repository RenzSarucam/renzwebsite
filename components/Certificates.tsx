"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const education = [
  {
    level: "College",
    degree: "Bachelor of Science in Information Technology",
    school: "Holy Cross of Davao College",
    period: "2021 – 2025",
    status: "Graduated",
    highlights: [],
  },
  {
    level: "Senior High School",
    degree: "ICT – Information and Communication Technology",
    school: "Assumption College of Davao",
    period: "2018 – 2020",
    status: "Graduated with Honors",
    highlights: ["Graduated with Honors"],
  },
  {
    level: "Junior High School",
    degree: "Junior High School",
    school: "Don Manuel A. Javellana Memorial National High School",
    period: "2014 – 2018",
    status: "Completed",
    highlights: ["Badminton Player", "ICT Club Member"],
  },
  {
    level: "Elementary",
    degree: "Elementary",
    school: "Magsaysay Elementary School",
    period: "2007 – 2014",
    status: "Completed",
    highlights: ["Volleyball Player", "DLC Club Member"],
  },
];

export const certificates = [
  { title: "CSS, Bootstrap, JavaScript, Web Development Course",        issuer: "Udemy · Proper Dot Institute",         year: "2025", color: "#378add", image: "/images/certificates/udemy-css-bootstrap-js.jpg" },
  { title: "JavaScript 20 Projects In 20 Days HTML, CSS & JavaScript", issuer: "Udemy · Vijay Kumar",                  year: "2025", color: "#5dcaa5", image: "/images/certificates/udemy-js-20-projects.jpg" },
  { title: "Java And C++ And PHP Crash Course All in One For Beginners",issuer: "Udemy · Crunch Coding",               year: "2025", color: "#7f77dd", image: "/images/certificates/udemy-java-cpp-php.jpg" },
  { title: "UIUX with Figma and Adobe XD",                             issuer: "Udemy · Marcus Menti, Zechariah Tech", year: "2025", color: "#ef9f27", image: "/images/certificates/udemy-uiux-figma-xd.jpg" },
  { title: "Mobile App Design in Figma: From Concept to Prototype",    issuer: "Udemy · Anton Voroniuk",              year: "2025", color: "#378add", image: "/images/certificates/udemy-figma-mobile.jpg" },
  { title: "Hands On React JS From Beginner to Expert",                issuer: "Udemy · Learnify IT",                  year: "2025", color: "#5dcaa5", image: "/images/certificates/udemy-react-js.jpg" },
  { title: "Learn PHP and MySQL for Web Application and Web Development",issuer: "Udemy · Marcus Menti, Zechariah Tech",year: "2025", color: "#7f77dd", image: "/images/certificates/udemy-php-mysql.jpg" },
  { title: "Ethical Hacking: Hacker Methodology",                      issuer: "Udemy · Peter A",                     year: "2025", color: "#ef9f27", image: "/images/certificates/udemy-ethical-hacking.jpg" },
  { title: "Advanced IT Troubleshooting for Helpdesk Support Technicians",issuer: "Udemy · John Courtenay",           year: "2025", color: "#378add", image: "/images/certificates/udemy-it-troubleshooting.jpg" },
  { title: "JavaScript Tutorial: Learn JavaScript Just in 1 Hour",     issuer: "Learnoverse",                         year: "2024", color: "#5dcaa5", image: "/images/certificates/learnoverse-js.jpg" },
  { title: "Build with AI Davao 2024 – Certificate of Participation",  issuer: "Google Developer Groups Davao",        year: "2024", color: "#4285f4", image: "/images/certificates/gdg-build-with-ai.jpg" },
  { title: "Champion – Mobile Legends: Bang Bang Tournament (IT Day 2021)", issuer: "Holy Cross of Davao College – ITS", year: "2021", color: "#ef9f27", image: "/images/certificates/hcdc-mlbb-champion.jpg" },
];

const statusStyle = (status: string) => {
  if (status === "Graduated with Honors") return { bg: "rgba(29,158,117,0.12)", color: "#5dcaa5", border: "rgba(29,158,117,0.25)" };
  if (status === "Graduated") return { bg: "rgba(55,138,221,0.12)", color: "#61afff", border: "rgba(55,138,221,0.25)" };
  return { bg: "rgba(255,255,255,0.06)", color: "rgba(200,220,255,0.5)", border: "rgba(255,255,255,0.1)" };
};

export default function Certificates() {
  const [selected, setSelected] = useState<(typeof certificates)[0] | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const openModal  = (item: (typeof certificates)[0]) => { setSelected(item); document.body.style.overflow = "hidden"; };
  const closeModal = () => { setSelected(null); document.body.style.overflow = ""; };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="certificates" className="certs-section" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 14, color: "#378add", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            04. Credentials
          </p>
          <h2 style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, color: "#e8f4ff", margin: "0 0 12px" }}>
            Education &amp; Certificates
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.5)", margin: 0 }}>
            Academic background and professional certifications.
          </p>
        </div>

        <div className="certs-layout">

          {/* ── Education Timeline ── */}
          <div>
            <p className="creds-section-label">Education</p>
            <div className="edu-timeline">
              {education.map((item, idx) => {
                const st = statusStyle(item.status);
                return (
                  <div key={item.school} className="edu-item">
                    {/* Timeline spine */}
                    <div className="edu-spine">
                      <div className="edu-dot" style={{ boxShadow: `0 0 0 3px rgba(55,138,221,0.15), 0 0 12px rgba(55,138,221,0.3)` }} />
                      {idx < education.length - 1 && <div className="edu-line" />}
                    </div>

                    {/* Card */}
                    <div className="edu-card">
                      <div className="edu-card-top">
                        <span className="edu-level">{item.level}</span>
                        <span className="edu-period">{item.period}</span>
                      </div>
                      <h3 className="edu-degree">{item.degree}</h3>
                      <p className="edu-school">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                        {item.school}
                      </p>
                      <div className="edu-card-footer">
                        <span className="edu-status" style={{ background: st.bg, color: st.color, border: `1px solid ${st.border}` }}>
                          {item.status}
                        </span>
                        {item.highlights.map(h => (
                          <span key={h} className="edu-highlight">✦ {h}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Certificates Grid ── */}
          <div>
            <p className="creds-section-label">Certificates <span style={{ color: "rgba(55,138,221,0.5)", fontSize: 11 }}>— click to view</span></p>
            <div className="cert-grid">
              {certificates.map((item) => (
                <div
                  key={item.title}
                  className="cert-card"
                  onClick={() => openModal(item)}
                  onMouseEnter={() => setHovered(item.title)}
                  onMouseLeave={() => setHovered(null)}
                  style={{ borderColor: hovered === item.title ? `${item.color}50` : "rgba(55,138,221,0.1)" }}
                >
                  {/* Top accent bar */}
                  <div className="cert-accent" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}55)` }} />

                  {/* Icon */}
                  <div className="cert-icon" style={{ background: `${item.color}15`, border: `1px solid ${item.color}30`, color: item.color }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="cert-body">
                    <p className="cert-title">{item.title}</p>
                    <p className="cert-issuer">{item.issuer}</p>
                  </div>

                  {/* Footer */}
                  <div className="cert-footer">
                    <span className="cert-year" style={{ color: item.color }}>{item.year}</span>
                    <span className="cert-view" style={{ color: item.color, opacity: hovered === item.title ? 1 : 0 }}>
                      View →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Certificate Image Modal — rendered in document.body via portal ── */}
      {selected && createPortal(
        <div className="cert-modal-overlay" onClick={closeModal}>
          <button className="cert-modal-close" onClick={closeModal} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
          <div className="cert-modal-inner" onClick={e => e.stopPropagation()}>
            <div className="cert-modal-frame" style={{ boxShadow: `0 0 0 1px ${selected.color}30, 0 40px 100px rgba(0,0,0,0.85), 0 0 80px ${selected.color}12` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={selected.image} alt={selected.title} className="cert-modal-img" />
            </div>
            <div className="cert-modal-caption">
              <div>
                <p className="cert-modal-title">{selected.title}</p>
                <p className="cert-modal-sub">{selected.issuer} · {selected.year}</p>
              </div>
              <span className="cert-modal-year" style={{ background: `${selected.color}18`, border: `1px solid ${selected.color}40`, color: selected.color }}>
                {selected.year}
              </span>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style suppressHydrationWarning>{`
        .certs-section { padding: 100px 32px; }

        .creds-section-label {
          font-size: 11px; font-weight: 600; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(55,138,221,0.6);
          font-family: 'Courier New', monospace;
          margin: 0 0 20px;
        }

        /* Layout */
        .certs-layout {
          display: grid;
          grid-template-columns: 1fr 1.3fr;
          gap: 48px;
          align-items: start;
        }

        /* ── Education Timeline ── */
        .edu-timeline { display: flex; flex-direction: column; }
        .edu-item { display: flex; gap: 18px; }
        .edu-spine { display: flex; flex-direction: column; align-items: center; flex-shrink: 0; padding-top: 4px; }
        .edu-dot {
          width: 12px; height: 12px; border-radius: 50%;
          background: #378add; flex-shrink: 0;
          position: relative; z-index: 1;
        }
        .edu-line {
          width: 1px; flex: 1; min-height: 24px;
          background: linear-gradient(to bottom, rgba(55,138,221,0.4), rgba(55,138,221,0.08));
          margin: 6px 0;
        }
        .edu-card {
          flex: 1; padding-bottom: 28px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.1);
          border-radius: 14px;
          padding: 18px 20px 18px;
          margin-bottom: 16px;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .edu-card:hover {
          border-color: rgba(55,138,221,0.28);
          box-shadow: 0 8px 28px rgba(0,0,0,0.2);
        }
        .edu-card-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 10px;
        }
        .edu-level {
          font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #378add;
          font-family: 'Courier New', monospace;
          background: rgba(55,138,221,0.1);
          padding: 2px 8px; border-radius: 4px;
          border: 1px solid rgba(55,138,221,0.2);
        }
        .edu-period {
          font-size: 12px; color: rgba(200,220,255,0.4);
          font-family: 'Courier New', monospace;
        }
        .edu-degree {
          font-size: 15px; font-weight: 600; color: #e8f4ff;
          margin: 0 0 8px; line-height: 1.4;
        }
        .edu-school {
          font-size: 13px; color: rgba(200,220,255,0.5);
          margin: 0 0 12px; display: flex; align-items: center; gap: 6px;
        }
        .edu-card-footer { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .edu-status {
          font-size: 11px; padding: 3px 9px; border-radius: 100px; font-weight: 500;
        }
        .edu-highlight {
          font-size: 11px; color: rgba(200,220,255,0.4);
          padding: 3px 8px; border-radius: 4px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
        }

        /* ── Certificate Grid ── */
        .cert-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .cert-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          display: flex; flex-direction: column;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .cert-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 32px rgba(0,0,0,0.3);
        }
        .cert-accent {
          height: 3px; width: 100%; flex-shrink: 0;
        }
        .cert-icon {
          width: 36px; height: 36px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          margin: 14px 14px 10px;
          flex-shrink: 0;
        }
        .cert-body {
          padding: 0 14px 10px; flex: 1;
        }
        .cert-title {
          font-size: 12.5px; font-weight: 600; color: #e8f4ff;
          margin: 0 0 5px; line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cert-issuer {
          font-size: 11px; color: rgba(200,220,255,0.4);
          margin: 0; line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cert-footer {
          padding: 10px 14px 12px;
          border-top: 1px solid rgba(55,138,221,0.07);
          display: flex; align-items: center; justify-content: space-between;
        }
        .cert-year {
          font-size: 11px; font-weight: 700;
          font-family: 'Courier New', monospace;
        }
        .cert-view {
          font-size: 11px; font-weight: 600;
          transition: opacity 0.2s;
        }

        /* ── Modal ── */
        .cert-modal-overlay {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(4,8,18,0.93);
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          backdrop-filter: blur(14px);
          animation: certFadeIn 0.2s ease;
        }
        .cert-modal-close {
          position: fixed; top: 20px; right: 20px;
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(232,244,255,0.08);
          border: 1px solid rgba(232,244,255,0.15);
          color: #e8f4ff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; transition: background 0.15s;
        }
        .cert-modal-close:hover { background: rgba(232,244,255,0.16); }
        .cert-modal-inner {
          max-width: 900px; width: 100%;
          display: flex; flex-direction: column; gap: 16px;
          animation: certSlideUp 0.25s ease;
        }
        .cert-modal-frame { border-radius: 18px; overflow: hidden; }
        .cert-modal-img {
          width: 100%; height: auto; display: block;
          max-height: 76vh; object-fit: contain;
        }
        .cert-modal-caption {
          display: flex; align-items: center;
          justify-content: space-between; gap: 12px; padding: 0 4px;
        }
        .cert-modal-title { margin: 0; font-size: 15px; font-weight: 600; color: #e8f4ff; line-height: 1.4; }
        .cert-modal-sub   { margin: 3px 0 0; font-size: 13px; color: rgba(200,220,255,0.45); }
        .cert-modal-year  { flex-shrink: 0; padding: 5px 14px; border-radius: 999px; font-size: 12px; font-family: 'Courier New', monospace; }

        @keyframes certFadeIn  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes certSlideUp { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: none; } }

        @media (max-width: 900px) {
          .certs-layout { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 640px) {
          .certs-section { padding: 64px 16px; }
          .cert-grid { grid-template-columns: 1fr; }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .certs-section { padding: 80px 24px; }
          .cert-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
