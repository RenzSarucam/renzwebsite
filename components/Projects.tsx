"use client";

import { useState } from "react";

export const projects = [
  {
    title: "TrackGuard Admin Panel",
    desc: "Smart and secure control center for tracking, managing, and safeguarding your data all in one powerful dashboard.",
    tags: ["Admin Panel", "Dashboard", "Security"],
    type: "Web App",
    status: "Completed",
    link: "https://github.com/TrackGuard/Trackguard-WebAdmin",
  },
  {
    title: "TrackGuard Mobile App",
    desc: "Real-time tracking and smart protection right in your pocket. Stay connected, stay secure, anytime, anywhere.",
    tags: ["Mobile App", "Tracking", "Security"],
    type: "Mobile",
    status: "Completed",
    link: "https://github.com/TrackGuard/trackguard-mobile",
  },
  {
    title: "TrueNest Seekers Website Design",
    desc: "A sleek real estate platform helping seekers find their perfect nest with ease, style, and smart location tools.",
    tags: ["UI/UX", "Real Estate", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
  },
  {
    title: "TrueNest Seekers Mobile Design",
    desc: "A seamless real estate experience at your fingertips explore, discover, and secure your dream home with ease and elegance.",
    tags: ["Mobile UI", "Real Estate", "App Design"],
    type: "Mobile",
    status: "Completed",
    link: "https://www.figma.com/design/yHev3Md58ibmab66ZDCBpw/Real-Estate%7C-TrueNest-Seekers?node-id=13-2&t=q48CBJJSDRO9OPQp-1",
  },
  {
    title: "Clotify Ecomm",
    desc: "Style meets simplicity your personalized fashion destination with seamless shopping at your fingertips.",
    tags: ["E-Commerce", "Fashion", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://github.com/RenzSarucam/Clothify-Ecomm",
  },
  {
    title: "Good Taste",
    desc: "Curated elegance in every bite. Savor the finest flavors and elevate your dining experience.",
    tags: ["Restaurant", "Mobile UI", "Food App"],
    type: "Mobile",
    status: "Completed",
    link: "https://www.figma.com/design/IPXOqKQOcXlH7s8wb1xK24/Good-Taste?node-id=0-1&t=dYubPY7NNZECtJVD-1",
  },
  {
    title: "Facebook Clone",
    desc: "A sleek social experience connect, share, and engage with friends and communities, just like the original.",
    tags: ["Social App", "UI Clone", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/Els0kit8BXfniyEsmdE48Y/HCIACtivity1?node-id=0-1&t=jXQKsUDKxx88GlDi-1",
  },
  {
    title: "JIT (Jairo Institute of Technology) Design",
    desc: "A creative division of JIT focused on innovative, user-centered design solutions that blend technology and aesthetics.",
    tags: ["Education", "UI/UX", "Web Design"],
    type: "Figma",
    status: "Completed",
    link: "https://www.figma.com/design/aMb9FTGYo8G0MlHldnoxxa/MVP-%7C-JIT?node-id=352-2321&t=7TiJ5HnhQp1ffiPJ-1",
  },
  {
    title: "Jairosoft ELMS Designer",
    desc: "A smart e-learning platform with tools for course management, student tracking, and interactive learning simple and effective.",
    tags: ["E-Learning", "Dashboard", "UI Design"],
    type: "Figma",
    status: "Completed",
    link: "",
  },
];

const filters = ["All", "Web App", "Mobile", "Figma", "Docker"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const shown =
    filter === "All" ? projects : projects.filter((project) => project.type === filter);

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
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>

      <style>{`
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
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
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

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="project-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(55,138,221,0.06)" : "rgba(255,255,255,0.03)",
        border: `1px solid ${
          hovered ? "rgba(55,138,221,0.35)" : "rgba(55,138,221,0.12)"
        }`,
        borderRadius: 14,
        padding: "22px 22px",
        transition: "all 0.25s ease",
        cursor: "default",
        display: "flex",
        flexDirection: "column",
        gap: 14,
        minWidth: 0,
        overflow: "hidden",
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
              fontSize: 19,
              fontWeight: 600,
              color: "#e8f4ff",
              margin: 0,
              overflowWrap: "anywhere",
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

      <p style={{ fontSize: 15, color: "rgba(200,220,255,0.6)", lineHeight: 1.65, margin: 0 }}>
        {project.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 13,
              padding: "3px 9px",
              borderRadius: 4,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "rgba(200,220,255,0.65)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {project.link ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "#378add",
            textDecoration: "none",
            marginTop: "auto",
          }}
        >
          {project.type === "Figma" ? "View on Figma" : "View on GitHub"} -{">"}
        </a>
      ) : (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 14,
            color: "rgba(200,220,255,0.48)",
            marginTop: "auto",
          }}
        >
          Confidential
        </span>
      )}

      <style>{`
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
