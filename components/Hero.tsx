"use client";

import { useEffect, useState } from "react";

const roles = [
  "Junior R&D Engineer",
  "DevOps Engineer",
  "Web Designer",
  "Web Developer",
];

const techStack = [
  { name: "JavaScript", color: "#f7df1e" },
  { name: "React", color: "#61dafb" },
  { name: "Node.js", color: "#1d9e75" },
  { name: "HTML/CSS", color: "#e34c26" },
  { name: "Python", color: "#7f77dd" },
  { name: "Next.js", color: "#e8f4ff" },
];

const contribs = [
  6, 8, 4, 10, 7, 14, 5, 18, 9, 22, 6, 11, 8, 28, 10, 7, 15, 12, 24, 9, 6, 20,
  13, 8,
];

const sections = ["about", "projects", "skills", "certificates", "contact"];

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setRoleIdx((index) => (index + 1) % roles.length);
        setVisible(true);
      }, 400);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const fadeStyle = {
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.55s ease",
  } as const;

  return (
    <section className="hero-shell" id="about">
      <div className="hero-wrapper">
        <div className="hero-frame" style={fadeStyle}>
          <div className="hero-topbar">
            <div className="hero-brand">
              <span className="hero-brand-dot" />
              <span className="hero-brand-name">RCS.dev</span>
            </div>

            <div className="hero-nav">
              {["Home", "Projects", "Skills", "Certificates", "Contact"].map(
                (label, index) => (
                  <button
                    className={`hero-nav-link ${index === 0 ? "active" : ""}`}
                    key={label}
                    onClick={() =>
                      document
                        .getElementById(sections[index])
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    type="button"
                  >
                    {label}
                  </button>
                ),
              )}
            </div>

            <button
              className="hero-hire-button"
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              type="button"
            >
              Hire me
            </button>
          </div>

          <div className="hero-grid">
            <div className="hero-left">
              <div>
                <div className="hero-status">
                  <span className="hero-status-dot" />
                  <span>Open to opportunities</span>
                </div>

                <h1 className="hero-title">
                  Renz Carljansen
                  <br />
                  <span>Sarucam</span>
                </h1>

                <div className="hero-role-wrap">
                  <p
                    className="hero-role"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "translateY(0)" : "translateY(-8px)",
                    }}
                  >
                    &gt; {roles[roleIdx]}
                  </p>
                </div>

                <p className="hero-bio">
                  Building research-driven solutions at the intersection of software and
                  innovation.
                  <br />
                  Based in Davao City, PH.
                </p>

                <div className="hero-actions">
                  <a
                    href="https://github.com/RenzSarucam"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GithubIcon />
                    View Resume
                  </a>
                  <a
                    href="https://github.com/RenzSarucam"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <GithubIcon />
                    GitHub
                  </a>
                </div>
              </div>

              <div className="hero-footer">
                <span className="hero-footer-item">
                  <span>•</span>
                  Davao City, PH
                </span>
                <a
                  className="hero-footer-item"
                  href="https://facebook.com/renz134542770"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span>•</span>
                  renz134542770
                </a>
              </div>
            </div>

            <div className="hero-right">
              <div className="hero-stats">
                {[
                  { val: "12+", label: "Projects done" },
                  { val: "3+", label: "Certificates" },
                ].map((item) => (
                  <div className="hero-stat-card" key={item.label}>
                    <div className="hero-stat-value">{item.val}</div>
                    <div className="hero-stat-label">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero-panel">
                <p className="hero-panel-title">Tech Stack</p>
                <div className="hero-chip-grid">
                  {techStack.map((item) => (
                    <span className="hero-chip" key={item.name}>
                      <span className="hero-chip-dot" style={{ background: item.color }} />
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="hero-panel hero-chart-panel">
                <p className="hero-panel-title">2026 Contributions</p>
                <div className="hero-chart">
                  {contribs.map((height, index) => (
                    <div
                      className="hero-chart-bar"
                      key={index}
                      style={{
                        height: `${(height / 28) * 100}%`,
                        background:
                          height > 20
                            ? "#1d9e75"
                            : height > 12
                              ? "#5dcaa5"
                              : height > 7
                                ? "rgba(93,202,165,0.5)"
                                : "rgba(29,158,117,0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>

              <div className="hero-link-row">
                <a
                  className="hero-link"
                  href="https://github.com/RenzSarucam"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  github.com/RenzSarucam →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .hero-shell {
          min-height: 100svh;
          display: flex;
          justify-content: center;
          align-items: stretch;
          padding: 0;
          position: relative;
          z-index: 1;
        }

        .hero-wrapper {
          width: 100%;
          min-height: 100svh;
          background: transparent;
          padding: 18px;
          box-sizing: border-box;
        }

        .hero-frame {
          width: 100%;
          min-height: calc(100svh - 36px);
          display: flex;
          flex-direction: column;
          background: rgba(8,16,32,0.88);
          border: 1px solid rgba(55,138,221,0.16);
          border-radius: 14px;
          overflow: hidden;
          backdrop-filter: blur(8px);
        }

        .hero-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 22px;
          border-bottom: 1px solid rgba(55,138,221,0.1);
          flex-wrap: wrap;
        }

        .hero-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hero-brand-dot {
          width: 12px;
          height: 12px;
          border-radius: 999px;
          background: #378add;
          box-shadow: 0 0 10px rgba(55,138,221,0.95);
        }

        .hero-brand-name {
          color: #e8f4ff;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }

        .hero-nav {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .hero-nav-link {
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 6px 10px;
          border-radius: 6px;
          font: inherit;
          font-size: 12px;
          color: rgba(200,220,255,0.55);
          text-underline-offset: 6px;
        }

        .hero-nav-link.active {
          color: #378add;
          font-weight: 600;
          text-decoration: underline;
        }

        .hero-hire-button {
          padding: 11px 24px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid rgba(55,138,221,0.55);
          color: #378add;
          font: inherit;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          flex: 1;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 26px 22px 0;
          border-right: 1px solid rgba(55,138,221,0.1);
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 28px 22px 0;
        }

        .hero-status {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 999px;
          background: rgba(29,158,117,0.12);
          border: 1px solid rgba(29,158,117,0.32);
          width: fit-content;
          margin-bottom: 22px;
          color: #5dcaa5;
          font-size: 15px;
          font-weight: 600;
        }

        .hero-status-dot {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: #1d9e75;
          animation: blink 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .hero-title {
          margin: 0 0 12px;
          color: #e8f4ff;
          font-family: "Courier New", monospace;
          font-size: clamp(42px, 4.6vw, 66px);
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: -0.035em;
        }

        .hero-title span {
          color: #378add;
        }

        .hero-role-wrap {
          min-height: 30px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .hero-role {
          margin: 0;
          font-size: 16px;
          color: #5dcaa5;
          font-family: "Courier New", monospace;
          transition: all 0.3s ease;
        }

        .hero-bio {
          margin: 0;
          max-width: 600px;
          font-size: 15px;
          line-height: 1.6;
          color: rgba(220,235,255,0.68);
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 22px;
          flex-wrap: wrap;
        }

        .hero-actions a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: #e8f4ff;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
        }

        .hero-footer {
          margin-top: auto;
          padding: 16px 0 12px;
          border-top: 1px solid rgba(55,138,221,0.08);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hero-footer-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          color: rgba(200,220,255,0.5);
          text-decoration: none;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .hero-stat-card {
          background: rgba(55,138,221,0.07);
          border: 1px solid rgba(55,138,221,0.14);
          border-radius: 14px;
          padding: 20px 22px;
          text-align: left;
        }

        .hero-stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #e8f4ff;
          font-family: "Courier New", monospace;
        }

        .hero-stat-label {
          margin-top: 6px;
          font-size: 13px;
          color: rgba(200,220,255,0.42);
        }

        .hero-panel {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.12);
          border-radius: 14px;
          padding: 20px 20px 16px;
        }

        .hero-panel-title {
          margin: 0 0 16px;
          font-size: 11px;
          color: rgba(200,220,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          max-width: 560px;
        }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 12px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 13px;
          color: rgba(200,220,255,0.75);
        }

        .hero-chip-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          flex-shrink: 0;
        }

        .hero-chart-panel {
          display: flex;
          flex-direction: column;
        }

        .hero-chart {
          display: flex;
          gap: 5px;
          align-items: flex-end;
          height: 96px;
        }

        .hero-chart-bar {
          flex: 1;
          min-width: 6px;
          border-radius: 3px;
        }

        .hero-link-row {
          margin-top: auto;
          display: flex;
          justify-content: flex-end;
          padding: 10px 0 12px;
        }

        .hero-link {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 13px;
          color: #378add;
          text-decoration: none;
        }

        @media (max-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }

          .hero-left {
            border-right: none;
            border-bottom: 1px solid rgba(55,138,221,0.1);
          }

          .hero-right {
            padding-top: 28px;
          }
        }

        @media (max-width: 820px) {
          .hero-wrapper {
            padding: 12px;
          }

          .hero-topbar {
            padding: 14px 16px;
            gap: 12px;
          }

          .hero-brand {
            width: 100%;
          }

          .hero-nav {
            width: 100%;
            justify-content: flex-start;
            gap: 4px;
          }

          .hero-nav-link {
            padding: 7px 10px;
            font-size: 13px;
          }

          .hero-hire-button {
            padding: 10px 18px;
            border-radius: 12px;
            font-size: 14px;
          }

          .hero-left,
          .hero-right {
            padding-left: 18px;
            padding-right: 18px;
          }

          .hero-left {
            padding-top: 26px;
          }

          .hero-right {
            gap: 16px;
            padding-top: 24px;
          }

          .hero-status {
            margin-bottom: 24px;
            padding: 9px 16px;
            font-size: 15px;
          }

          .hero-status-dot {
            width: 8px;
            height: 8px;
          }

          .hero-title {
            font-size: clamp(42px, 9vw, 62px);
            margin-bottom: 14px;
          }

          .hero-role-wrap {
            min-height: 34px;
            margin-bottom: 18px;
          }

          .hero-role {
            font-size: 18px;
          }

          .hero-bio {
            font-size: 16px;
            max-width: 100%;
          }

          .hero-actions {
            gap: 12px;
            margin-top: 24px;
          }

          .hero-actions a {
            font-size: 15px;
            padding: 12px 20px;
          }

          .hero-stats {
            gap: 14px;
          }

          .hero-stat-card {
            padding: 20px 20px;
            border-radius: 14px;
          }

          .hero-stat-value {
            font-size: 34px;
          }

          .hero-stat-label {
            font-size: 14px;
          }

          .hero-panel {
            padding: 22px 20px 18px;
            border-radius: 14px;
          }

          .hero-panel-title {
            font-size: 12px;
            margin-bottom: 16px;
          }

          .hero-chip-grid {
            gap: 10px;
            max-width: 100%;
          }

          .hero-chip {
            font-size: 14px;
            padding: 8px 14px;
          }

          .hero-chip-dot {
            width: 10px;
            height: 10px;
          }

          .hero-chart {
            height: 104px;
            gap: 4px;
          }

          .hero-chart-bar {
            min-width: 6px;
          }

          .hero-link {
            font-size: 14px;
          }
        }

        @media (max-width: 640px) {
          .hero-wrapper {
            padding: 8px;
          }

          .hero-topbar {
            padding: 12px 14px;
          }

          .hero-left,
          .hero-right {
            padding-left: 14px;
            padding-right: 14px;
          }

          .hero-left {
            padding-top: 20px;
            gap: 12px;
          }

          .hero-right {
            padding-top: 18px;
            gap: 12px;
          }

          .hero-title {
            font-size: clamp(34px, 12vw, 46px);
            margin-bottom: 10px;
          }

          .hero-role-wrap {
            min-height: 28px;
            margin-bottom: 14px;
          }

          .hero-role {
            font-size: 15px;
          }

          .hero-bio {
            font-size: 14px;
            line-height: 1.55;
          }

          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .hero-actions a {
            justify-content: center;
            width: 100%;
            font-size: 15px;
            padding: 12px 16px;
          }

          .hero-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .hero-stat-card {
            padding: 18px 18px;
          }

          .hero-stat-value {
            font-size: 30px;
          }

          .hero-stat-label {
            font-size: 13px;
          }

          .hero-panel {
            padding: 18px 16px 16px;
          }

          .hero-panel-title {
            font-size: 11px;
          }

          .hero-chip {
            font-size: 13px;
            padding: 7px 12px;
          }

          .hero-chip-dot {
            width: 8px;
            height: 8px;
          }

          .hero-chart {
            height: 86px;
            gap: 3px;
          }

          .hero-chart-bar {
            min-width: 4px;
          }

          .hero-link-row {
            justify-content: flex-start;
          }

          .hero-link {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
}

function GithubIcon() {
  return (
    <svg aria-hidden="true" fill="currentColor" height="20" viewBox="0 0 24 24" width="20">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
