"use client";

import { useState } from "react";

const projects = [
  {
    title: "Research Management System",
    desc: "A web-based platform for managing R&D research workflows, documentation, and team collaboration.",
    tags: ["Next.js", "Node.js", "PostgreSQL"],
    type: "Web App",
    status: "Completed",
    link: "https://github.com/RenzSarucam",
  },
  {
    title: "IoT Monitoring Dashboard",
    desc: "Real-time sensor data visualization dashboard for IoT devices with alert management.",
    tags: ["React", "MQTT", "Chart.js"],
    type: "IoT",
    status: "Completed",
    link: "https://github.com/RenzSarucam",
  },
  {
    title: "ML Data Classifier",
    desc: "Python-based machine learning model for classifying research datasets using scikit-learn.",
    tags: ["Python", "scikit-learn", "Pandas"],
    type: "ML/AI",
    status: "In Progress",
    link: "https://github.com/RenzSarucam",
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio built with Next.js featuring animated network background and responsive design.",
    tags: ["Next.js", "TypeScript", "CSS"],
    type: "Web App",
    status: "Completed",
    link: "https://github.com/RenzSarucam",
  },
  {
    title: "REST API Backend",
    desc: "RESTful API server for a campus information system with JWT authentication.",
    tags: ["Node.js", "Express", "MongoDB"],
    type: "Backend",
    status: "Completed",
    link: "https://github.com/RenzSarucam",
  },
  {
    title: "Arduino Sensor System",
    desc: "Embedded system project for environmental monitoring using Arduino and various sensors.",
    tags: ["Arduino", "C++", "Python"],
    type: "IoT",
    status: "Completed",
    link: "https://github.com/RenzSarucam",
  },
];

const filters = ["All", "Web App", "IoT", "ML/AI", "Backend"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const shown =
    filter === "All" ? projects : projects.filter((project) => project.type === filter);

  return (
    <section
      id="projects"
      style={{
        padding: "100px 32px",
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

        <div style={{ display: "flex", gap: 8, marginBottom: 36, flexWrap: "wrap" }}>
          {filters.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              style={{
                padding: "7px 16px",
                borderRadius: 6,
                border: "1px solid",
                borderColor: filter === item ? "#378add" : "rgba(55,138,221,0.2)",
                background: filter === item ? "rgba(55,138,221,0.12)" : "transparent",
                color: filter === item ? "#378add" : "rgba(200,220,255,0.5)",
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {item}
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 20,
          }}
        >
          {shown.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
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
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <span
            style={{
              fontSize: 10,
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
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#e8f4ff",
              margin: 0,
            }}
          >
            {project.title}
          </h3>
        </div>
        <span
          style={{
            fontSize: 10,
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

      <p style={{ fontSize: 13, color: "rgba(200,220,255,0.6)", lineHeight: 1.65, margin: 0 }}>
        {project.desc}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {project.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
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

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: 12,
          color: "#378add",
          textDecoration: "none",
          marginTop: "auto",
        }}
      >
        View on GitHub -{">"}
      </a>
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
          fontSize: 12,
          color: "#378add",
          fontFamily: "'Courier New', monospace",
          marginBottom: 8,
          letterSpacing: "0.05em",
        }}
      >
        {tag}
      </p>
      <h2
        style={{
          fontSize: "clamp(28px, 4vw, 40px)",
          fontWeight: 700,
          color: "#e8f4ff",
          margin: "0 0 12px",
        }}
      >
        {title}
      </h2>
      <p style={{ fontSize: 15, color: "rgba(200,220,255,0.55)", maxWidth: 500 }}>{sub}</p>
    </div>
  );
}
