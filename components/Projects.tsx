"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { projects, type Project } from "@/app/_lib/portfolio-data";

const filters = ["All", "Full Stack", "Mobile", "Figma", "Docker"];

const typeColor = (types: string | string[]) => {
  const t = Array.isArray(types) ? types[0] : types;
  if (t === "Full Stack") return { accent: "#8b7cf8", glow: "rgba(139,124,248,0.18)", badge: "rgba(139,124,248,0.1)", badgeText: "#b09ffc", badgeBorder: "rgba(139,124,248,0.22)" };
  if (t === "Mobile")     return { accent: "#2dd4bf", glow: "rgba(45,212,191,0.15)",  badge: "rgba(45,212,191,0.1)",  badgeText: "#2dd4bf",  badgeBorder: "rgba(45,212,191,0.22)"  };
  if (t === "Figma")      return { accent: "#f59e0b", glow: "rgba(198,120,221,0.15)", badge: "rgba(198,120,221,0.1)", badgeText: "#f59e0b",  badgeBorder: "rgba(198,120,221,0.22)" };
  if (t === "Docker")     return { accent: "#e5a44b", glow: "rgba(229,164,75,0.15)",  badge: "rgba(229,164,75,0.1)",  badgeText: "#e5a44b",  badgeBorder: "rgba(229,164,75,0.22)"  };
  return { accent: "#8b7cf8", glow: "rgba(139,124,248,0.15)", badge: "rgba(139,124,248,0.1)", badgeText: "#b09ffc", badgeBorder: "rgba(139,124,248,0.2)" };
};

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const shown = filter === "All"
    ? projects
    : projects.filter(p => Array.isArray(p.type) ? p.type.includes(filter) : p.type === filter);

  const countFor = (f: string) => f === "All"
    ? projects.length
    : projects.filter(p => Array.isArray(p.type) ? p.type.includes(f) : p.type === f).length;

  return (
    <section id="projects" className="projects-section" style={{ position: "relative", zIndex: 1 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 14, color: "#8b7cf8", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            01. Projects
          </p>
          <h2 style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, color: "#ede8fd", margin: "0 0 12px" }}>
            Things I&apos;ve Built
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,195,240,0.5)", maxWidth: 500, margin: 0 }}>
            A collection of projects from research, development, and personal exploration.
          </p>
        </div>

        {/* Filter pills */}
        <div className="pf-row">
          {filters.map(item => (
            <button
              key={item}
              className={`pf-btn${filter === item ? " pf-btn-active" : ""}`}
              onClick={() => setFilter(item)}
            >
              {item}
              <span className="pf-count">{countFor(item)}</span>
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="pf-legend">
          <span className="pfl-label">Color key:</span>
          {[
            { color: "#8b7cf8", label: "Full Stack" },
            { color: "#2dd4bf", label: "Mobile" },
            { color: "#f59e0b", label: "Figma / Design" },
            { color: "#e5a44b", label: "Docker" },
          ].map(({ color, label }) => (
            <span key={label} className="pfl-item">
              <span className="pfl-dot" style={{ background: color, boxShadow: `0 0 6px ${color}88` }} />
              {label}
            </span>
          ))}
        </div>

        {/* Grid */}
        <div className="project-grid">
          {shown.map((project, idx) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={projects.indexOf(project)}
              featured={idx === 0 && filter === "All"}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>

        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </div>

      <style suppressHydrationWarning>{`
        .projects-section { padding: 100px 32px; }

        /* Filter */
        .pf-row { display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap; }
        .pf-btn {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px; border-radius: 999px;
          border: 1px solid rgba(139,124,248,0.18);
          background: transparent; color: rgba(200,195,240,0.5);
          font-size: 14px; font-weight: 500; cursor: pointer;
          transition: all 0.2s; font-family: inherit;
        }
        .pf-btn:hover { border-color: rgba(139,124,248,0.4); color: #ede8fd; background: rgba(139,124,248,0.06); }
        .pf-btn-active {
          background: rgba(139,124,248,0.14);
          border-color: rgba(139,124,248,0.5);
          color: #b09ffc;
          box-shadow: 0 0 12px rgba(139,124,248,0.18);
        }
        .pf-count {
          font-size: 11px; font-weight: 700;
          background: rgba(139,124,248,0.12);
          border: 1px solid rgba(139,124,248,0.2);
          border-radius: 999px; padding: 1px 7px;
          font-family: 'Courier New', monospace;
          color: inherit;
        }

        /* Legend */
        .pf-legend {
          display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
          margin-bottom: 24px;
          padding: 10px 16px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(139,124,248,0.09);
          border-radius: 10px;
        }
        .pfl-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(200,195,240,0.3);
          font-family: 'Courier New', monospace; flex-shrink: 0;
        }
        .pfl-item {
          display: inline-flex; align-items: center; gap: 7px;
          font-size: 12.5px; color: rgba(200,195,240,0.5);
        }
        .pfl-dot {
          width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0;
        }

        /* Grid */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }
        .project-card-featured {
          grid-column: 1 / -1;
        }

        @media (max-width: 900px) {
          .project-grid { grid-template-columns: repeat(2, 1fr); }
          .project-card-featured { grid-column: 1 / -1; }
        }
        @media (max-width: 640px) {
          .projects-section { padding: 64px 16px; }
          .project-grid { grid-template-columns: 1fr; gap: 14px; }
          .project-card-featured { grid-column: auto; }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .projects-section { padding: 80px 24px; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project, index, featured, onOpen }: {
  project: Project; index: number; featured: boolean; onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const c = typeColor(project.type);
  const num = String(index + 1).padStart(2, "0");
  const typeLabel = Array.isArray(project.type) ? project.type.join(" · ") : project.type;

  return (
    <div
      className={`pc${featured ? " project-card-featured" : ""}`}
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderColor: hovered ? `${c.accent}50` : "rgba(139,124,248,0.1)",
        boxShadow: hovered ? `0 16px 48px rgba(0,0,0,0.3), 0 0 0 1px ${c.accent}22, 0 0 32px ${c.glow}` : "none",
        transform: hovered ? "translateY(-4px)" : "none",
      }}
    >
      {/* Top accent gradient */}
      <div className="pc-accent" style={{ background: `linear-gradient(90deg, ${c.accent}, ${c.accent}66, transparent)` }} />

      <div className={`pc-inner${featured ? " pc-inner-featured" : ""}`}>

        {/* Number + badges */}
        <div className="pc-top">
          <span className="pc-num" style={{ color: `${c.accent}88` }}>#{num}</span>
          <div className="pc-badges">
            <span className="pc-type-badge" style={{ background: c.badge, color: c.badgeText, borderColor: c.badgeBorder }}>{typeLabel}</span>
            <span className={`pc-status-badge${project.status === "Completed" ? " status-done" : " status-wip"}`}>
              {project.status === "Completed" ? "✓ " : "⏳ "}{project.status}
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="pc-title">{project.title}</h3>

        {/* Place */}
        {project.place && (
          <span className="pc-place">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {project.place}
          </span>
        )}

        {/* Description */}
        <p className={`pc-desc${featured ? " pc-desc-featured" : ""}`}>{project.desc}</p>

        {/* Tags */}
        <div className="pc-tags">
          {project.tags.slice(0, featured ? 6 : 3).map(tag => (
            <span key={tag} className="pc-tag">{tag}</span>
          ))}
          {project.tags.length > (featured ? 6 : 3) && (
            <span className="pc-tag-more" style={{ color: c.badgeText, background: c.badge, borderColor: c.badgeBorder }}>
              +{project.tags.length - (featured ? 6 : 3)}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="pc-footer" style={{ borderColor: hovered ? `${c.accent}22` : "rgba(255,255,255,0.05)" }}>
          <span className="pc-cta" style={{ color: hovered ? c.accent : "rgba(200,195,240,0.35)" }}>
            View details
          </span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke={hovered ? c.accent : "rgba(200,195,240,0.3)"}
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: hovered ? "translateX(3px)" : "none", transition: "transform 0.2s, stroke 0.2s" }}
          >
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .pc {
          background: rgba(255,255,255,0.025);
          border: 1px solid; border-radius: 16px;
          overflow: hidden; cursor: pointer;
          display: flex; flex-direction: column;
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .pc-accent { height: 3px; width: 100%; flex-shrink: 0; }
        .pc-inner {
          display: flex; flex-direction: column; gap: 10px;
          padding: 18px 20px 18px; flex: 1;
        }
        .pc-inner-featured {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto auto auto auto 1fr auto;
          column-gap: 40px;
          padding: 22px 28px;
        }
        .pc-inner-featured .pc-top   { grid-column: 1; grid-row: 1; }
        .pc-inner-featured .pc-title { grid-column: 1; grid-row: 2; }
        .pc-inner-featured .pc-place { grid-column: 1; grid-row: 3; }
        .pc-inner-featured .pc-desc  { grid-column: 2; grid-row: 1 / 4; align-self: center; -webkit-line-clamp: 6; }
        .pc-inner-featured .pc-tags  { grid-column: 1 / -1; grid-row: 4; }
        .pc-inner-featured .pc-footer{ grid-column: 1 / -1; grid-row: 5; }

        .pc-top { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .pc-num { font-size: 12px; font-weight: 700; font-family: 'Courier New', monospace; }
        .pc-badges { display: flex; gap: 6px; flex-wrap: wrap; }
        .pc-type-badge {
          font-size: 11px; padding: 2px 8px; border-radius: 5px;
          border: 1px solid; font-weight: 600;
          font-family: 'Courier New', monospace;
        }
        .pc-status-badge {
          font-size: 11px; padding: 2px 8px; border-radius: 100px;
          border: 1px solid; font-weight: 500;
        }
        .status-done { background: rgba(29,158,117,0.1); color: #2dd4bf; border-color: rgba(29,158,117,0.25); }
        .status-wip  { background: rgba(239,159,39,0.1);  color: #ef9f27; border-color: rgba(239,159,39,0.25); }

        .pc-title {
          font-size: 18px; font-weight: 700; color: #ede8fd;
          margin: 0; line-height: 1.3;
        }
        .pc-inner-featured .pc-title { font-size: 26px; }

        .pc-place {
          font-size: 12px; color: rgba(200,195,240,0.38);
          display: inline-flex; align-items: center; gap: 5px;
          font-family: 'Courier New', monospace;
        }

        .pc-desc {
          font-size: 13.5px; color: rgba(200,195,240,0.55);
          margin: 0; line-height: 1.65;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pc-desc-featured { -webkit-line-clamp: 6; font-size: 14.5px; }

        .pc-tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .pc-tag {
          font-size: 11.5px; padding: 3px 9px; border-radius: 5px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,195,240,0.5);
        }
        .pc-tag-more {
          font-size: 11.5px; padding: 3px 9px; border-radius: 5px;
          border: 1px solid; font-weight: 600;
        }

        .pc-footer {
          margin-top: auto; padding-top: 12px;
          border-top: 1px solid;
          display: flex; align-items: center; justify-content: space-between;
          transition: border-color 0.25s;
        }
        .pc-cta { font-size: 13px; font-weight: 500; transition: color 0.25s; }
      `}</style>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const c = typeColor(project.type);

  useEffect(() => {
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 280); };
  const isFigma = Array.isArray(project.type) ? project.type.includes("Figma") : project.type === "Figma";

  return createPortal(
    <div
      className="dm-overlay"
      style={{ opacity: visible ? 1 : 0 }}
      onClick={handleClose}
    >
      <div
        className="dm-panel"
        style={{ transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)", opacity: visible ? 1 : 0 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Top color bar */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${c.accent}, ${c.accent}66, transparent)`, flexShrink: 0 }} />

        {/* Header */}
        <div className="dm-header">
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
            <span className="dm-badge" style={{ background: c.badge, color: c.badgeText, borderColor: c.badgeBorder }}>
              {Array.isArray(project.type) ? project.type.join(" · ") : project.type}
            </span>
            <span className={`dm-badge dm-status${project.status === "Completed" ? " status-done" : " status-wip"}`}>
              {project.status}
            </span>
          </div>
          <button className="dm-close" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="dm-body">
          {/* Title */}
          <div style={{ marginBottom: 6 }}>
            <h3 className="dm-title">{project.title}</h3>
            {project.place && (
              <span className="dm-place">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {project.place}
              </span>
            )}
          </div>

          <div className="dm-divider" />

          {/* About */}
          <div>
            <p className="dm-label">About</p>
            <p className="dm-desc">{project.desc}</p>
          </div>

          <div className="dm-divider" />

          {/* Tech Stack */}
          <div>
            <p className="dm-label">Tech Stack</p>
            <div className="dm-tags">
              {project.tags.map(tag => (
                <span key={tag} className="dm-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="dm-footer">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="dm-cta"
              style={{ background: c.accent, boxShadow: `0 4px 18px ${c.glow}` }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              {isFigma ? "View on Figma" : "View on GitHub"}
            </a>
          ) : (
            <span className="dm-confidential">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Confidentiality agreement
            </span>
          )}
          <button className="dm-close-btn" onClick={handleClose}>Close</button>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .dm-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(2,8,18,0.82);
          backdrop-filter: blur(8px);
          transition: opacity 0.28s ease;
          display: flex; align-items: center; justify-content: center;
          padding: 20px 16px;
        }
        .dm-panel {
          width: min(560px, 100%); max-height: 88vh;
          background: #08111f;
          border: 1px solid rgba(139,124,248,0.18);
          border-radius: 20px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(139,124,248,0.06);
          display: flex; flex-direction: column;
          transition: transform 0.28s cubic-bezier(0.34,1.4,0.64,1), opacity 0.28s ease;
          overflow: hidden;
        }
        .dm-header {
          display: flex; align-items: center; gap: 12px;
          padding: 18px 22px 14px;
          border-bottom: 1px solid rgba(139,124,248,0.1);
          flex-shrink: 0;
        }
        .dm-badge {
          font-size: 12px; padding: 3px 10px; border-radius: 6px;
          border: 1px solid; font-weight: 500;
        }
        .dm-status { border-radius: 100px !important; }
        .status-done { background: rgba(29,158,117,0.12); color: #2dd4bf; border-color: rgba(29,158,117,0.28) !important; }
        .status-wip  { background: rgba(239,159,39,0.12);  color: #ef9f27; border-color: rgba(239,159,39,0.28)  !important; }
        .dm-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,195,240,0.5); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
        }
        .dm-close:hover { background: rgba(139,124,248,0.12); color: #b09ffc; }
        .dm-body {
          flex: 1; overflow-y: auto; padding: 22px 22px;
          display: flex; flex-direction: column; gap: 18px;
          scrollbar-width: thin; scrollbar-color: rgba(139,124,248,0.2) transparent;
        }
        .dm-body::-webkit-scrollbar { width: 4px; }
        .dm-body::-webkit-scrollbar-track { background: transparent; }
        .dm-body::-webkit-scrollbar-thumb { background: rgba(139,124,248,0.2); border-radius: 99px; }
        .dm-title { margin: 0 0 6px; font-size: clamp(20px,4vw,26px); font-weight: 700; color: #ede8fd; line-height: 1.25; }
        .dm-place { font-size: 13px; color: rgba(200,195,240,0.4); display: inline-flex; align-items: center; gap: 5px; }
        .dm-divider { height: 1px; background: rgba(139,124,248,0.08); }
        .dm-label { margin: 0 0 10px; font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: rgba(139,124,248,0.65); text-transform: uppercase; font-family: 'Courier New', monospace; }
        .dm-desc { margin: 0; font-size: 14.5px; color: rgba(200,195,240,0.62); line-height: 1.75; }
        .dm-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .dm-tag { font-size: 12px; padding: 4px 10px; border-radius: 6px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(200,195,240,0.6); }
        .dm-footer {
          padding: 14px 22px 22px;
          border-top: 1px solid rgba(139,124,248,0.1);
          display: flex; gap: 10px; flex-shrink: 0;
        }
        .dm-cta {
          flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 11px 20px; border-radius: 10px; border: none;
          color: #fff; font-size: 14px; font-weight: 600;
          text-decoration: none; cursor: pointer; transition: all 0.2s;
        }
        .dm-cta:hover { opacity: 0.9; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(139,124,248,0.4) !important; }
        .dm-confidential {
          flex: 1; display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: rgba(200,195,240,0.3); font-style: italic;
        }
        .dm-close-btn {
          padding: 11px 20px; border-radius: 10px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          color: rgba(200,195,240,0.5); font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; font-family: inherit; flex-shrink: 0;
        }
        .dm-close-btn:hover { background: rgba(255,255,255,0.09); color: rgba(200,195,240,0.85); }
        @media (max-width: 640px) {
          .dm-overlay { align-items: flex-end; padding: 0; }
          .dm-panel { width: 100%; max-height: 90dvh; border-radius: 20px 20px 0 0; }
          .dm-body { padding: 18px; }
          .dm-header, .dm-footer { padding-left: 18px; padding-right: 18px; }
        }
      `}</style>
    </div>,
    document.body
  );
}
