"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { projects, type Project } from "@/app/_lib/portfolio-data";

const filters = ["All", "Full Stack", "Mobile", "Figma", "Docker"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<Project | null>(null);

  const shown =
    filter === "All"
      ? projects
      : projects.filter((p) =>
          Array.isArray(p.type) ? p.type.includes(filter) : p.type === filter
        );

  return (
    <section
      id="projects"
      className="projects-section"
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionHeader
          tag="02. Projects"
          title="Things I've Built"
          sub="A collection of projects from research, development, and personal exploration."
        />

        <div className="project-filter-row">
          {filters.map((item) => (
            <button
              className="project-filter-button"
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "7px 16px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: filter === item ? "#378add" : "rgba(55,138,221,0.2)",
                background: filter === item ? "rgba(55,138,221,0.12)" : "transparent",
                color: filter === item ? "#378add" : "rgba(200,220,255,0.5)",
                fontSize: 15,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {shown.map((project) => (
            <ProjectCard key={project.title} project={project} onOpen={() => setSelected(project)} />
          ))}
        </div>

        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </div>

      <style suppressHydrationWarning>{`
        .projects-section {
          padding: 100px 32px;
        }
        .project-filter-row {
          display: flex;
          gap: 8px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }
        .project-filter-button {
          flex: 0 0 auto;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr));
          gap: 20px;
        }
        @media (max-width: 640px) {
          .projects-section {
            padding: 64px 16px;
          }
          .project-filter-row {
            margin-bottom: 28px;
          }
          .project-filter-button {
            flex: 1 1 calc(50% - 8px);
          }
          .project-grid {
            gap: 14px;
          }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .projects-section {
            padding: 80px 24px;
          }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: (typeof projects)[0]; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card"
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(55,138,221,0.07)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(55,138,221,0.4)" : "rgba(55,138,221,0.12)"}`,
        borderRadius: 14,
        padding: "22px 22px",
        transition: "all 0.25s ease",
        cursor: "pointer",
        height: 230,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        minWidth: 0,
        overflow: "hidden",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(55,138,221,0.15), 0 0 0 1px rgba(55,138,221,0.1)" : "none",
      }}
    >
      <div className="project-card-head">
        <div className="project-card-title-wrap">
          <span
            style={{
              fontSize: 12,
              padding: "3px 9px",
              borderRadius: 4,
              background: "rgba(55,138,221,0.1)",
              color: "#378add",
              border: "1px solid rgba(55,138,221,0.2)",
              marginBottom: 8,
              display: "inline-block",
              letterSpacing: "0.06em",
            }}
          >
            {Array.isArray(project.type) ? project.type.join(" / ") : project.type}
          </span>
          <h3
            className="project-card-title"
            style={{
              fontSize: 18,
              fontWeight: 600,
              color: "#e8f4ff",
              margin: 0,
              overflowWrap: "anywhere",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {project.title}
          </h3>
        </div>
        <span
          className="project-card-status"
          style={{
            fontSize: 12,
            padding: "3px 9px",
            borderRadius: 100,
            background:
              project.status === "Completed"
                ? "rgba(29,158,117,0.12)"
                : "rgba(239,159,39,0.12)",
            color: project.status === "Completed" ? "#5dcaa5" : "#ef9f27",
            border: `1px solid ${
              project.status === "Completed"
                ? "rgba(29,158,117,0.25)"
                : "rgba(239,159,39,0.25)"
            }`,
            whiteSpace: "nowrap",
            flexShrink: 0,
            marginTop: 4,
          }}
        >
          {project.status}
        </span>
      </div>

      {project.place && (
        <span style={{ fontSize: 12, color: "rgba(200,220,255,0.4)", display: "inline-flex", alignItems: "center", gap: 5, marginTop: -8 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {project.place}
        </span>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.slice(0, 3).map((tag) => (
          <span key={tag} style={{ fontSize: 12, padding: "3px 9px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,220,255,0.55)" }}>
            {tag}
          </span>
        ))}
        {project.tags.length > 3 && (
          <span style={{ fontSize: 12, padding: "3px 9px", borderRadius: 4, background: "rgba(55,138,221,0.06)", border: "1px solid rgba(55,138,221,0.15)", color: "rgba(55,138,221,0.7)" }}>
            +{project.tags.length - 3} more
          </span>
        )}
      </div>

      <div style={{
        marginTop: "auto",
        paddingTop: 12,
        borderTop: `1px solid ${hovered ? "rgba(55,138,221,0.15)" : "rgba(255,255,255,0.05)"}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "border-color 0.25s",
      }}>
        <span style={{ fontSize: 13, color: hovered ? "#378add" : "rgba(200,220,255,0.35)", transition: "color 0.25s", fontWeight: 500 }}>
          View project details
        </span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={hovered ? "#378add" : "rgba(200,220,255,0.3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.25s, transform 0.25s", transform: hovered ? "translateX(3px)" : "translateX(0)" }}>
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>

      <style suppressHydrationWarning>{`
        .project-card-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          min-width: 0;
        }
        .project-card-title-wrap {
          min-width: 0;
        }
        @media (max-width: 640px) {
          .project-card {
            padding: 18px 16px !important;
            gap: 12px !important;
          }
          .project-card-head {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }
          .project-card-title {
            font-size: 17px !important;
          }
          .project-card-status {
            align-self: flex-start;
            max-width: 100%;
            white-space: normal !important;
            overflow-wrap: anywhere;
          }
        }
      `}</style>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const isFigma = Array.isArray(project.type) ? project.type.includes("Figma") : project.type === "Figma";

  return createPortal(
    <div className="drawer-overlay" style={{ opacity: visible ? 1 : 0 }} onClick={handleClose}>
      <div
        className="drawer-panel"
        style={{ transform: visible ? "translateX(0)" : "translateX(100%)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="drawer-header">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1, minWidth: 0 }}>
            <span className="drawer-badge drawer-badge-type">
              {Array.isArray(project.type) ? project.type.join(" / ") : project.type}
            </span>
            <span className={`drawer-badge drawer-badge-status ${project.status === "Completed" ? "status-done" : "status-wip"}`}>
              {project.status}
            </span>
          </div>
          <button className="drawer-close" onClick={handleClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="drawer-body">
          {/* Title + place */}
          <div className="drawer-title-block">
            <h3 className="drawer-title">{project.title}</h3>
            {project.place && (
              <span className="drawer-place">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {project.place}
              </span>
            )}
          </div>

          <div className="drawer-divider" />

          {/* Description */}
          <div>
            <p className="drawer-section-label">About</p>
            <p className="drawer-desc">{project.desc}</p>
          </div>

          <div className="drawer-divider" />

          {/* Tags */}
          <div>
            <p className="drawer-section-label">Tech Stack</p>
            <div className="drawer-tags">
              {project.tags.map((tag) => (
                <span key={tag} className="drawer-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="drawer-footer">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="drawer-cta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              {isFigma ? "View on Figma" : "View on GitHub"}
            </a>
          ) : (
            <span className="drawer-confidential">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              Confidentiality agreement
            </span>
          )}
          <button className="drawer-back-btn" onClick={handleClose}>
            Close
          </button>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .drawer-overlay {
          position: fixed; inset: 0; z-index: 99999;
          background: rgba(2,8,18,0.75);
          backdrop-filter: blur(4px);
          transition: opacity 0.3s ease;
        }
        .drawer-panel {
          position: fixed; top: 0; right: 0; bottom: 0;
          width: min(480px, 100vw);
          background: #08111f;
          border-left: 1px solid rgba(55,138,221,0.2);
          box-shadow: -24px 0 80px rgba(0,0,0,0.5);
          display: flex; flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.32,0.72,0,1);
          overflow: hidden;
        }
        /* Header */
        .drawer-header {
          display: flex; align-items: center; gap: 12;
          padding: 20px 24px 16px;
          border-bottom: 1px solid rgba(55,138,221,0.1);
          flex-shrink: 0;
        }
        .drawer-close {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,220,255,0.5);
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: all 0.2s;
        }
        .drawer-close:hover { background: rgba(55,138,221,0.12); color: #61afff; border-color: rgba(55,138,221,0.3); }
        /* Badges */
        .drawer-badge { font-size: 12px; padding: 3px 10px; border-radius: 5px; font-weight: 500; }
        .drawer-badge-type { background: rgba(55,138,221,0.1); color: #378add; border: 1px solid rgba(55,138,221,0.22); }
        .status-done { background: rgba(29,158,117,0.12); color: #5dcaa5; border: 1px solid rgba(29,158,117,0.25); border-radius: 100px !important; }
        .status-wip  { background: rgba(239,159,39,0.12);  color: #ef9f27; border: 1px solid rgba(239,159,39,0.25);  border-radius: 100px !important; }
        /* Body */
        .drawer-body {
          flex: 1; overflow-y: auto; padding: 24px;
          display: flex; flex-direction: column; gap: 20px;
          scrollbar-width: thin;
          scrollbar-color: rgba(55,138,221,0.2) transparent;
        }
        .drawer-body::-webkit-scrollbar { width: 4px; }
        .drawer-body::-webkit-scrollbar-track { background: transparent; }
        .drawer-body::-webkit-scrollbar-thumb { background: rgba(55,138,221,0.2); border-radius: 99px; }
        .drawer-title-block { display: flex; flex-direction: column; gap: 8px; }
        .drawer-title { margin: 0; font-size: clamp(20px,4vw,26px); font-weight: 700; color: #e8f4ff; line-height: 1.25; word-break: break-word; }
        .drawer-place { font-size: 13px; color: rgba(200,220,255,0.42); display: inline-flex; align-items: center; gap: 5px; }
        .drawer-divider { height: 1px; background: rgba(55,138,221,0.08); }
        .drawer-section-label { margin: 0 0 10px; font-size: 11px; font-weight: 600; letter-spacing: 0.1em; color: rgba(55,138,221,0.7); text-transform: uppercase; font-family: 'Courier New', monospace; }
        .drawer-desc { margin: 0; font-size: 14.5px; color: rgba(200,220,255,0.62); line-height: 1.75; }
        .drawer-tags { display: flex; flex-wrap: wrap; gap: 7px; }
        .drawer-tag { font-size: 12px; padding: 4px 10px; border-radius: 5px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: rgba(200,220,255,0.6); }
        /* Footer */
        .drawer-footer {
          padding: 16px 24px 24px;
          border-top: 1px solid rgba(55,138,221,0.1);
          display: flex; align-items: center; gap: 12;
          flex-shrink: 0;
        }
        .drawer-cta {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 10px 20px; border-radius: 10px;
          background: rgba(55,138,221,0.12); border: 1px solid rgba(55,138,221,0.32);
          color: #61afff; font-size: 14px; font-weight: 600;
          text-decoration: none; transition: all 0.2s; flex: 1; justify-content: center;
        }
        .drawer-cta:hover { background: rgba(55,138,221,0.2); border-color: rgba(55,138,221,0.6); }
        .drawer-confidential {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 13px; color: rgba(200,220,255,0.3); font-style: italic; flex: 1;
        }
        .drawer-back-btn {
          padding: 10px 20px; border-radius: 10px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
          color: rgba(200,220,255,0.45); font-size: 14px; font-weight: 500;
          cursor: pointer; transition: all 0.2s; font-family: inherit;
        }
        .drawer-back-btn:hover { background: rgba(255,255,255,0.07); color: rgba(200,220,255,0.7); }
        @media (max-width: 640px) {
          .drawer-panel { width: 100vw; border-left: none; border-top: 1px solid rgba(55,138,221,0.2); border-radius: 16px 16px 0 0; top: auto; height: 88dvh; }
          .drawer-body { padding: 18px 18px; }
          .drawer-header { padding: 16px 18px 14px; }
          .drawer-footer { padding: 14px 18px 20px; }
        }
      `}</style>
    </div>,
    document.body
  );
}

function SectionHeader({
  tag,
  title,
  sub,
}: {
  tag: string;
  title: string;
  sub: string;
}) {
  return (
    <div style={{ marginBottom: 48 }}>
      <p
        style={{
          fontSize: 14,
          color: "#378add",
          fontFamily: "'Courier New', monospace",
          margin: "0 0 8px",
          letterSpacing: "0.05em",
        }}
      >
        {tag}
      </p>
      <h2
        style={{
          fontSize: "clamp(32px, 4vw, 44px)",
          fontWeight: 700,
          color: "#e8f4ff",
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 17, color: "rgba(200,220,255,0.55)", maxWidth: 500, margin: 0 }}>{sub}</p>
    </div>
  );
}
