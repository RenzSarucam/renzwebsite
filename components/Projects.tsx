"use client";

import { useState, useEffect } from "react";
import { projects, type Project } from "@/app/_lib/portfolio-data";

const filters = ["All", "Web App", "Mobile", "Figma", "Docker"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [shuffledProjects, setShuffledProjects] = useState(projects);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    setShuffledProjects([...projects].sort(() => Math.random() - 0.5));
  }, []);

  const shown =
    filter === "All" ? shuffledProjects : shuffledProjects.filter((project) => project.type === filter);

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
            {project.type}
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
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        background: "rgba(5,13,26,0.85)",
        backdropFilter: "blur(6px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "24px 16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0b1829",
          border: "1px solid rgba(55,138,221,0.28)",
          borderRadius: 16,
          padding: "28px 28px 24px",
          maxWidth: 560,
          width: "100%",
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          boxShadow: "0 0 60px rgba(55,138,221,0.18)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12 }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, padding: "3px 9px", borderRadius: 4, background: "rgba(55,138,221,0.1)", color: "#378add", border: "1px solid rgba(55,138,221,0.2)" }}>
              {project.type}
            </span>
            <span style={{
              fontSize: 12, padding: "3px 9px", borderRadius: 100,
              background: project.status === "Completed" ? "rgba(29,158,117,0.12)" : "rgba(239,159,39,0.12)",
              color: project.status === "Completed" ? "#5dcaa5" : "#ef9f27",
              border: `1px solid ${project.status === "Completed" ? "rgba(29,158,117,0.25)" : "rgba(239,159,39,0.25)"}`,
            }}>
              {project.status}
            </span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(200,220,255,0.4)", cursor: "pointer", fontSize: 20, lineHeight: 1, padding: "0 2px" }}>✕</button>
        </div>

        <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#e8f4ff" }}>{project.title}</h3>

        {project.place && (
          <span style={{ fontSize: 13, color: "rgba(200,220,255,0.45)", display: "inline-flex", alignItems: "center", gap: 5, marginTop: -8 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {project.place}
          </span>
        )}

        <p style={{ margin: 0, fontSize: 15, color: "rgba(200,220,255,0.65)", lineHeight: 1.7 }}>{project.desc}</p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tags.map((tag) => (
            <span key={tag} style={{ fontSize: 13, padding: "3px 9px", borderRadius: 4, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(200,220,255,0.65)" }}>
              {tag}
            </span>
          ))}
        </div>

        {project.link ? (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, background: "rgba(55,138,221,0.1)", border: "1px solid rgba(55,138,221,0.3)", color: "#378add", fontSize: 14, fontWeight: 600, textDecoration: "none", alignSelf: "flex-start" }}
          >
            {project.type === "Figma" ? "View on Figma" : "View on GitHub"} →
          </a>
        ) : (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: "rgba(200,220,255,0.35)", fontStyle: "italic" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            This project is under a confidentiality agreement
          </span>
        )}
      </div>
    </div>
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
