"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Full Stack Development",
    desc: "End-to-end web apps with React / Next.js on the frontend and Laravel or Node.js on the backend.",
    color: "#378add",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: "DevOps & Infrastructure",
    desc: "Docker, GitHub Actions CI/CD, Nginx, Linux server administration, and multi-environment deployments.",
    color: "#5dcaa5",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
    title: "R&D Engineering",
    desc: "Designing and prototyping internal systems, researching emerging tech, and solving complex business problems.",
    color: "#e5a44b",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "UI / UX Design",
    desc: "Wireframes, prototypes, and high-fidelity designs in Figma for web and mobile platforms.",
    color: "#c678dd",
  },
];

const facts = [
  { label: "Based in",      value: "Davao City, PH" },
  { label: "Degree",        value: "BSIT — Holy Cross of Davao College" },
  { label: "Experience",    value: "2+ years professional" },
  { label: "Availability",  value: "Open to opportunities" },
  { label: "Languages",     value: "Filipino · English" },
];

const modalInfo = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Location",
    value: "Davao City, Philippines",
    color: "#378add",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="m22 7-10 7L2 7"/>
      </svg>
    ),
    label: "Email",
    value: "renzcarljansen@gmail.com",
    color: "#5dcaa5",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.36 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.11 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/>
      </svg>
    ),
    label: "Phone",
    value: "+63 926 673 5768",
    color: "#e5a44b",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>
      </svg>
    ),
    label: "Role",
    value: "Full Stack · DevOps · R&D Engineer",
    color: "#c678dd",
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
    label: "Education",
    value: "BSIT — Holy Cross of Davao College",
    color: "#378add",
  },
];

function PhotoModal({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Double-frame trick for entry animation
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300);
  }

  return createPortal(
    <div
      className="apm-backdrop"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={handleClose}
    >
      <div
        className="apm-modal"
        style={{ transform: visible ? "scale(1) translateY(0)" : "scale(0.94) translateY(16px)", opacity: visible ? 1 : 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="apm-close" onClick={handleClose} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Left: large photo */}
        <div className="apm-photo-side">
          <div className="apm-photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/renz-profile.png" alt="Renz Carljansen Sarucam" className="apm-photo" />
            {/* Corner accents */}
            <div className="apm-corner apm-corner-tl" />
            <div className="apm-corner apm-corner-tr" />
            <div className="apm-corner apm-corner-bl" />
            <div className="apm-corner apm-corner-br" />
          </div>
        </div>

        {/* Right: info */}
        <div className="apm-info-side">
          {/* Name + role */}
          <div className="apm-info-header">
            <div className="apm-info-tag">Portfolio</div>
            <h2 className="apm-info-name">Renz Carljansen Sarucam</h2>
            <p className="apm-info-role">Full Stack Developer &amp; R&amp;D Engineer</p>
            {/* Status badge */}
            <div className="apm-info-status">
              <span className="apm-info-status-dot" />
              Open to opportunities
            </div>
          </div>

          {/* Divider */}
          <div className="apm-divider" />

          {/* Info rows */}
          <div className="apm-info-rows">
            {modalInfo.map(item => (
              <div key={item.label} className="apm-info-row">
                <span className="apm-info-icon" style={{ color: item.color, background: `${item.color}14`, border: `1px solid ${item.color}28` }}>
                  {item.icon}
                </span>
                <div>
                  <p className="apm-info-label">{item.label}</p>
                  <p className="apm-info-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="apm-divider" />

          {/* Short bio */}
          <p className="apm-bio">
            Passionate about building efficient, scalable software systems — from frontend UIs to backend APIs, DevOps pipelines, and internal R&amp;D tooling.
          </p>

          {/* Social links */}
          <div className="apm-socials">
            <a href="https://github.com/1amrenz" target="_blank" rel="noopener noreferrer" className="apm-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/renz-carljansen-sarucam" target="_blank" rel="noopener noreferrer" className="apm-social-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .apm-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(2,6,14,0.82);
          backdrop-filter: blur(10px);
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          transition: opacity 0.3s ease;
        }
        .apm-modal {
          display: flex; flex-direction: row;
          background: rgba(8,18,36,0.97);
          border: 1px solid rgba(55,138,221,0.22);
          border-radius: 24px;
          overflow: hidden;
          max-width: 820px; width: 100%;
          max-height: 90vh;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(55,138,221,0.08);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s ease;
        }

        /* ── Photo side ── */
        .apm-photo-side {
          flex: 0 0 300px;
          background: rgba(5,13,26,0.8);
          display: flex; align-items: center; justify-content: center;
          padding: 32px 24px;
          border-right: 1px solid rgba(55,138,221,0.1);
          position: relative;
        }
        .apm-photo-frame {
          position: relative;
          width: 220px; height: 280px;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 0 0 1px rgba(55,138,221,0.2), 0 8px 40px rgba(55,138,221,0.15);
        }
        .apm-photo {
          width: 100%; height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        /* Corner accents */
        .apm-corner {
          position: absolute; width: 18px; height: 18px;
          border-color: #61afff; border-style: solid;
          opacity: 0.7;
        }
        .apm-corner-tl { top: 0; left: 0; border-width: 2px 0 0 2px; border-radius: 4px 0 0 0; }
        .apm-corner-tr { top: 0; right: 0; border-width: 2px 2px 0 0; border-radius: 0 4px 0 0; }
        .apm-corner-bl { bottom: 0; left: 0; border-width: 0 0 2px 2px; border-radius: 0 0 0 4px; }
        .apm-corner-br { bottom: 0; right: 0; border-width: 0 2px 2px 0; border-radius: 0 0 4px 0; }

        /* ── Info side ── */
        .apm-info-side {
          flex: 1;
          padding: 32px 28px;
          overflow-y: auto;
          display: flex; flex-direction: column; gap: 20px;
          position: relative;
        }
        .apm-close {
          position: absolute; top: 16px; right: 16px;
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(55,138,221,0.2);
          color: rgba(200,220,255,0.6);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
          z-index: 1;
        }
        .apm-close:hover { background: rgba(55,138,221,0.15); color: #e8f4ff; }

        .apm-info-tag {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(55,138,221,0.6);
          font-family: 'Courier New', monospace; margin-bottom: 8px;
        }
        .apm-info-name {
          font-size: 20px; font-weight: 800; color: #e8f4ff;
          margin: 0 0 4px; line-height: 1.25;
        }
        .apm-info-role {
          font-size: 13px; color: rgba(200,220,255,0.45);
          font-family: 'Courier New', monospace; margin: 0 0 12px;
        }
        .apm-info-status {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 4px 12px; border-radius: 100px;
          background: rgba(93,202,165,0.1);
          border: 1px solid rgba(93,202,165,0.25);
          color: #5dcaa5; font-size: 12px; font-weight: 500;
          width: fit-content;
        }
        .apm-info-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #5dcaa5;
          animation: statusPulse 2s ease-in-out infinite;
        }
        .apm-divider {
          height: 1px;
          background: linear-gradient(90deg, rgba(55,138,221,0.18), transparent);
        }
        .apm-info-rows { display: flex; flex-direction: column; gap: 12px; }
        .apm-info-row {
          display: flex; align-items: flex-start; gap: 12px;
        }
        .apm-info-icon {
          width: 30px; height: 30px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-top: 2px;
        }
        .apm-info-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(200,220,255,0.35);
          font-family: 'Courier New', monospace; margin: 0 0 2px;
        }
        .apm-info-value {
          font-size: 13px; color: #e8f4ff; margin: 0; font-weight: 500;
          line-height: 1.4;
        }
        .apm-bio {
          font-size: 13.5px; color: rgba(200,220,255,0.5);
          line-height: 1.7; margin: 0;
        }
        .apm-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .apm-social-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 14px; border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(55,138,221,0.18);
          color: rgba(200,220,255,0.65); font-size: 13px; font-weight: 500;
          text-decoration: none; transition: background 0.2s, border-color 0.2s, color 0.2s;
          font-family: inherit;
        }
        .apm-social-btn:hover {
          background: rgba(55,138,221,0.12);
          border-color: rgba(55,138,221,0.4);
          color: #61afff;
        }

        @media (max-width: 640px) {
          .apm-modal { flex-direction: column; max-height: 88vh; }
          .apm-photo-side { flex: 0 0 auto; border-right: none; border-bottom: 1px solid rgba(55,138,221,0.1); padding: 24px 16px; }
          .apm-photo-frame { width: 160px; height: 200px; }
          .apm-info-side { padding: 20px 18px; }
        }
      `}</style>
    </div>,
    document.body
  );
}

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <section id="about-section" className="about-section" style={{ position: "relative", zIndex: 1 }}>

      {/* Subtle top divider gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(55,138,221,0.25), transparent)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 14, color: "#378add", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            00. About
          </p>
          <h2 style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, color: "#e8f4ff", margin: "0 0 12px" }}>
            Who I Am
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.5)", margin: 0 }}>
            A little bit about me, what I do, and how I work.
          </p>
        </div>

        {/* Main two-column */}
        <div className="about-grid">

          {/* ── Left: Avatar + quick facts ── */}
          <div className="about-left">

            {/* Avatar card */}
            <div className="about-avatar-card">
              {/* Glow ring */}
              <div className="about-avatar-ring" />
              {/* Photo — clickable */}
              <button
                className="about-avatar about-avatar-btn"
                onClick={() => setModalOpen(true)}
                aria-label="View profile photo"
                title="Click to view"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/renz-profile.png"
                  alt="Renz Carljansen Sarucam"
                  className="about-avatar-img"
                />
                {/* Hover zoom hint */}
                <div className="about-avatar-zoom">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                  </svg>
                </div>
                {/* Orbiting dot */}
                <div className="about-orbit">
                  <div className="about-orbit-dot" />
                </div>
              </button>
              <h3 className="about-avatar-name">Renz Carljansen Sarucam</h3>
              <p className="about-avatar-role">Full Stack · DevOps · R&D Engineer</p>

              {/* Status */}
              <div className="about-status">
                <span className="about-status-dot" />
                Open to opportunities
              </div>
            </div>

            {/* Quick facts */}
            <div className="about-facts">
              {facts.map(f => (
                <div key={f.label} className="about-fact-row">
                  <span className="about-fact-label">{f.label}</span>
                  <span className="about-fact-value">{f.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Bio + services ── */}
          <div className="about-right">

            <div className="about-bio-block">
              <p className="about-bio-text">
                I&apos;m a <strong style={{ color: "#e8f4ff" }}>Full Stack Developer and R&D Engineer</strong> based in Davao City, Philippines, passionate about building efficient, scalable software systems from the ground up.
              </p>
              <p className="about-bio-text">
                My work spans the full development lifecycle — from designing clean user interfaces and building robust APIs, to configuring server infrastructure, automating deployments, and researching new technologies for internal systems.
              </p>
              <p className="about-bio-text">
                Currently working at <strong style={{ color: "#5dcaa5" }}>DSG Son&apos;s Group Inc.</strong> as an R&D Engineer, where I design and manage multi-project Docker infrastructure, CI/CD pipelines, and internal web applications across multiple business units.
              </p>
            </div>

            {/* Services */}
            <div className="about-services-label">What I do</div>
            <div className="about-services">
              {services.map(s => (
                <div key={s.title} className="about-service-card">
                  <div className="about-service-icon" style={{ background: `${s.color}14`, color: s.color, border: `1px solid ${s.color}28` }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="about-service-title" style={{ color: s.color }}>{s.title}</p>
                    <p className="about-service-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Photo modal */}
      {modalOpen && <PhotoModal onClose={() => setModalOpen(false)} />}

      <style suppressHydrationWarning>{`
        .about-section { padding: 80px 32px 100px; position: relative; overflow: hidden; }

        .about-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 56px;
          align-items: start;
        }

        /* ── Avatar card ── */
        .about-left { display: flex; flex-direction: column; gap: 20px; }

        .about-avatar-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.14);
          border-radius: 20px;
          padding: 32px 24px 24px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; position: relative;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .about-avatar-ring {
          position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
          width: 92px; height: 92px; border-radius: 50%;
          border: 1px solid rgba(55,138,221,0.25);
          animation: ringPulse 3s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%,100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          50%      { transform: translateX(-50%) scale(1.12); opacity: 0.2; }
        }

        .about-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #0d2040, #050e1c);
          border: 2px solid rgba(55,138,221,0.4);
          display: flex; align-items: center; justify-content: center;
          position: relative; margin-bottom: 16px;
          box-shadow: 0 0 0 4px rgba(55,138,221,0.08), 0 0 28px rgba(55,138,221,0.25);
        }
        .about-avatar-btn {
          cursor: pointer;
          padding: 0;
          transition: box-shadow 0.25s, transform 0.25s;
        }
        .about-avatar-btn:hover {
          box-shadow: 0 0 0 4px rgba(55,138,221,0.18), 0 0 36px rgba(55,138,221,0.45);
          transform: scale(1.06);
        }
        .about-avatar-btn:hover .about-avatar-zoom { opacity: 1; }

        .about-avatar-zoom {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(5,13,26,0.55);
          display: flex; align-items: center; justify-content: center;
          color: #61afff; opacity: 0;
          transition: opacity 0.2s;
          z-index: 1;
        }

        .about-avatar-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .about-orbit {
          position: absolute; width: 100%; height: 100%;
          border-radius: 50%;
          animation: orbitSpin 4s linear infinite;
          pointer-events: none;
        }
        @keyframes orbitSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .about-orbit-dot {
          position: absolute; top: -4px; left: 50%; transform: translateX(-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: #5dcaa5;
          box-shadow: 0 0 8px #5dcaa5;
        }

        .about-avatar-name {
          font-size: 15px; font-weight: 700; color: #e8f4ff;
          margin: 0 0 4px; line-height: 1.3;
        }
        .about-avatar-role {
          font-size: 12px; color: rgba(200,220,255,0.45);
          font-family: 'Courier New', monospace; margin: 0 0 16px;
        }
        .about-status {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 13px; border-radius: 100px;
          background: rgba(93,202,165,0.1);
          border: 1px solid rgba(93,202,165,0.25);
          color: #5dcaa5; font-size: 12px; font-weight: 500;
        }
        .about-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #5dcaa5;
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        /* Facts */
        .about-facts {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(55,138,221,0.1);
          border-radius: 14px;
          overflow: hidden;
        }
        .about-fact-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 11px 16px; gap: 12px;
          border-bottom: 1px solid rgba(55,138,221,0.07);
        }
        .about-fact-row:last-child { border-bottom: none; }
        .about-fact-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(200,220,255,0.35);
          font-family: 'Courier New', monospace; flex-shrink: 0;
        }
        .about-fact-value {
          font-size: 12.5px; color: #e8f4ff; text-align: right;
          font-weight: 500;
        }

        /* ── Bio + services ── */
        .about-right { display: flex; flex-direction: column; gap: 28px; }

        .about-bio-block { display: flex; flex-direction: column; gap: 14px; }
        .about-bio-text {
          font-size: 16px; color: rgba(200,220,255,0.62);
          line-height: 1.8; margin: 0;
        }

        .about-services-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(55,138,221,0.6);
          font-family: 'Courier New', monospace;
        }
        .about-services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .about-service-card {
          display: flex; gap: 14px; align-items: flex-start;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.1);
          border-radius: 12px; padding: 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .about-service-card:hover {
          border-color: rgba(55,138,221,0.28);
          transform: translateY(-2px);
        }
        .about-service-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .about-service-title {
          font-size: 13px; font-weight: 700; margin: 0 0 4px;
        }
        .about-service-desc {
          font-size: 12.5px; color: rgba(200,220,255,0.45);
          line-height: 1.6; margin: 0;
        }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 36px; }
          .about-left { flex-direction: row; flex-wrap: wrap; }
          .about-avatar-card { flex: 1; min-width: 240px; }
          .about-facts { flex: 1; min-width: 240px; }
        }
        @media (max-width: 640px) {
          .about-section { padding: 64px 16px 80px; }
          .about-left { flex-direction: column; }
          .about-services { grid-template-columns: 1fr; }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .about-section { padding: 80px 24px; }
          .about-services { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
