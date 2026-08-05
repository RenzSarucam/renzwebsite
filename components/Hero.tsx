"use client";

import { useEffect, useRef, useState } from "react";
import { certificates, projects, techStack } from "@/app/_lib/portfolio-data";
import ContribGraph from "@/components/ContribGraph";

const roles = [
  "Full Stack Developer",
  "DevOps Engineer",
  "Research & Development Engineer",
  "Web & Mobile Designer",
];

const contribs = [
  6, 8, 4, 10, 7, 14, 5, 18, 9, 22, 6, 11, 8, 28, 10, 7, 15, 12, 24, 9, 6, 20,
  13, 8,
];

const sections = ["about", "projects", "experience", "skills", "certificates", "contact"];
const navLabels = ["Home", "Projects", "Experience", "Skills", "Credential", "Contact"];
const heroStats = [
  { val: `${projects.length}`, label: "Projects done" },
  { val: `${certificates.length}`, label: "Certificates" },
];

function AnimatedCounter({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        setTimeout(() => {
          let start = 0;
          const step = Math.ceil(value / 30);
          const timer = setInterval(() => {
            start += step;
            if (start >= value) { setCount(value); clearInterval(timer); }
            else setCount(start);
          }, 40);
        }, delay);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, delay]);

  return <div ref={ref} className="hero-stat-value">{count}{suffix}</div>;
}

export default function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (!element) return;

      const navbar = document.querySelector("nav");
      const baseOffset = navbar
        ? navbar.getBoundingClientRect().bottom
        : window.innerWidth <= 640
          ? 68
          : 80;
      const targetOffset = baseOffset + 26;
      const sectionPaddingTop = Number.parseFloat(window.getComputedStyle(element).paddingTop) || 0;
      const top =
        element.getBoundingClientRect().top +
        window.scrollY -
        targetOffset +
        sectionPaddingTop;

      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  };

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
              {navLabels.map(
                (label, index) => (
                  <button
                    className={`hero-nav-link ${index === 0 ? "active" : ""}`}
                    key={label}
                    onClick={() => scrollToSection(sections[index])}
                    type="button"
                  >
                    {label}
                  </button>
                ),
              )}
            </div>

            <button
              className="hero-hire-button"
              onClick={() => scrollToSection("contact")}
              type="button"
            >
              Hire me
            </button>

            <button
              aria-expanded={menuOpen}
              aria-label="Toggle navigation menu"
              className="hero-menu-toggle"
              onClick={() => setMenuOpen((open) => !open)}
              type="button"
            >
              <span />
              <span />
              <span />
            </button>

            {menuOpen && (
              <div className="hero-mobile-menu">
                {navLabels.map((label, index) => (
                  <button
                    className="hero-mobile-menu-link"
                    key={label}
                    onClick={() => scrollToSection(sections[index])}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
                <button
                  className="hero-mobile-menu-link hero-mobile-menu-cta"
                  onClick={() => scrollToSection("contact")}
                  type="button"
                >
                  Hire me
                </button>
              </div>
            )}
          </div>

          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-intro">
                <div className="hero-status">
                  <span className="hero-status-dot" />
                  <span>Open to opportunities</span>
                </div>

                <h1 className="hero-title">
                  <span className="hero-title-line">
                    <span className="hero-title-word">Renz</span>
                    <span className="hero-title-word">Carljansen</span>
                  </span>
                  <span className="hero-title-line hero-title-accent">Sarucam</span>
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
                  Full Stack Developer & R&D Engineer focused on building efficient server infrastructure and crafting clean web experiences.
                  <br />
                  Combining DevOps and full stack development in Davao City, PH.
                </p>

                <div className="hero-actions">
                  <a
                    href="/resume"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ResumeIcon />
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  Davao City, PH
                </span>
                <a
                  className="hero-footer-item"
                  href="https://facebook.com/renz134542770"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                  </svg>
                  renz134542770
                </a>
              </div>
            </div>

              <div className="hero-right">
                <div className="hero-stats">
                {heroStats.map((item, i) => (
                  <div className="hero-stat-card" key={item.label}>
                    <AnimatedCounter value={parseInt(item.val)} delay={i * 200} />
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
                <ContribGraph />
              </div>

              <div className="hero-link-row">
                <a
                  className="hero-link"
                  href="https://github.com/RenzSarucam"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  github.com/RenzSarucam â†’
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
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
          width: 100%;
          max-width: 100%;
          overflow-x: clip;
        }

        .hero-wrapper {
          width: 100%;
          max-width: 100%;
          min-height: 100svh;
          background: transparent;
          padding: 18px;
          box-sizing: border-box;
        }

        .hero-frame {
          width: 100%;
          max-width: 100%;
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
          max-width: 100%;
        }

        .hero-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
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
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.02em;
          min-width: 0;
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
          font-size: 14px;
          color: rgba(200,220,255,0.55);
          text-underline-offset: 6px;
        }

        .hero-nav-link.active {
          color: #378add;
          font-weight: 600;
          text-decoration: underline;
        }

        .hero-nav-link:hover {
          color: #61afff;
          background: rgba(55,138,221,0.12);
          box-shadow: 0 0 12px rgba(55,138,221,0.35), 0 0 4px rgba(55,138,221,0.2) inset;
          transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }

        .hero-hire-button {
          padding: 11px 24px;
          border-radius: 12px;
          background: transparent;
          border: 1px solid rgba(55,138,221,0.55);
          color: #378add;
          font: inherit;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .hero-hire-button:hover {
          background: rgba(55,138,221,0.12);
          border-color: rgba(55,138,221,0.85);
          box-shadow: 0 0 16px rgba(55,138,221,0.5), 0 0 6px rgba(55,138,221,0.25) inset;
        }

        .hero-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(55,138,221,0.4);
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          color: #378add;
          cursor: pointer;
          flex-shrink: 0;
        }

        .hero-menu-toggle span {
          display: block;
          width: 18px;
          height: 2px;
          border-radius: 999px;
          background: currentColor;
        }

        .hero-mobile-menu {
          display: none;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          flex: 1;
          min-width: 0;
        }

        .hero-left {
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 26px 22px 0;
          border-right: 1px solid rgba(55,138,221,0.1);
          min-width: 0;
          overflow-x: clip;
        }

        .hero-intro {
          width: 100%;
          min-width: 0;
          overflow-x: clip;
        }

        .hero-right {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 18px 22px 0;
          min-width: 0;
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
          font-size: 17px;
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
          font-size: 58px;
          font-weight: 800;
          line-height: 1.02;
          letter-spacing: 0;
          max-width: 100%;
        }

        .hero-title-line {
          display: block;
          max-width: 100%;
        }

        .hero-title-word {
          display: inline-block;
          margin-right: 0.28em;
        }

        .hero-title-accent {
          color: #378add;
        }

        .hero-role-wrap {
          min-height: 30px;
          overflow: hidden;
          margin-bottom: 16px;
        }

        .hero-role {
          margin: 0;
          font-size: 18px;
          color: #5dcaa5;
          font-family: "Courier New", monospace;
          transition: all 0.3s ease;
        }

        .hero-bio {
          margin: 0;
          max-width: 600px;
          font-size: 17px;
          line-height: 1.6;
          color: rgba(220,235,255,0.68);
          overflow-wrap: anywhere;
        }

        .hero-actions {
          display: flex;
          gap: 12px;
          margin-top: 22px;
          flex-wrap: wrap;
          align-items: stretch;
          width: 100%;
          max-width: 100%;
        }

        .hero-actions a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          flex: 1 1 220px;
          max-width: 100%;
          padding: 12px 20px;
          border-radius: 12px;
          background: rgba(55,138,221,0.06);
          border: 1px solid rgba(55,138,221,0.22);
          color: #e8f4ff;
          font-size: 17px;
          font-weight: 600;
          text-decoration: none;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease;
          box-shadow: 0 0 18px rgba(55,138,221,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hero-actions a:hover {
          transform: translateY(-3px);
          background: rgba(55,138,221,0.12);
          border-color: rgba(55,138,221,0.45);
          box-shadow: 0 0 32px rgba(55,138,221,0.25), 0 8px 24px rgba(55,138,221,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
          opacity: 1;
        }
        .hero-actions a:active {
          transform: translateY(-1px);
        }
        .hero-actions a::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(55,138,221,0.6), transparent);
          animation: shimmer 3s infinite ease-in-out;
        }
        .hero-actions a:nth-child(2) {
          border-color: rgba(93,202,165,0.22);
          box-shadow: 0 0 18px rgba(93,202,165,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hero-actions a:nth-child(2)::before {
          background: linear-gradient(90deg, transparent, rgba(93,202,165,0.6), transparent);
          animation-delay: 1.5s;
        }
        .hero-actions a:nth-child(2):hover {
          border-color: rgba(93,202,165,0.45);
          background: rgba(93,202,165,0.08);
          box-shadow: 0 0 32px rgba(93,202,165,0.25), 0 8px 24px rgba(93,202,165,0.15), inset 0 1px 0 rgba(255,255,255,0.08);
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
          min-width: 0;
          font-size: 16px;
          color: rgba(200,220,255,0.5);
          text-decoration: none;
          overflow-wrap: anywhere;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .hero-stat-card {
          background: rgba(55,138,221,0.06);
          border: 1px solid rgba(55,138,221,0.22);
          border-radius: 12px;
          padding: 14px 18px;
          text-align: left;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          box-shadow: 0 0 18px rgba(55,138,221,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hero-stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 32px rgba(55,138,221,0.25), 0 0 64px rgba(55,138,221,0.08), inset 0 1px 0 rgba(255,255,255,0.08);
          border-color: rgba(55,138,221,0.45);
        }
        .hero-stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(55,138,221,0.6), transparent);
          animation: shimmer 3s infinite ease-in-out;
        }
        .hero-stat-card:nth-child(2)::before {
          animation-delay: 1.5s;
          background: linear-gradient(90deg, transparent, rgba(93,202,165,0.6), transparent);
        }
        .hero-stat-card:nth-child(2) {
          border-color: rgba(93,202,165,0.22);
          box-shadow: 0 0 18px rgba(93,202,165,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .hero-stat-card:nth-child(2):hover {
          box-shadow: 0 0 32px rgba(93,202,165,0.25), 0 0 64px rgba(93,202,165,0.08), inset 0 1px 0 rgba(255,255,255,0.08);
          border-color: rgba(93,202,165,0.45);
        }
        @keyframes shimmer {
          0%,100% { opacity: 0; transform: scaleX(0.3); }
          50%      { opacity: 1; transform: scaleX(1); }
        }

        .hero-stat-value {
          font-size: 26px;
          font-weight: 700;
          color: #e8f4ff;
          font-family: "Courier New", monospace;
          text-shadow: 0 0 20px rgba(55,138,221,0.5);
        }
        .hero-stat-card:nth-child(2) .hero-stat-value {
          text-shadow: 0 0 20px rgba(93,202,165,0.5);
        }

        .hero-stat-label {
          margin-top: 4px;
          font-size: 12px;
          color: rgba(200,220,255,0.42);
        }

        .hero-panel {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.12);
          border-radius: 12px;
          padding: 14px 16px 12px;
        }

        .hero-panel-title {
          margin: 0 0 10px;
          font-size: 10px;
          color: rgba(200,220,255,0.35);
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .hero-chip-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          max-width: 100%;
        }

        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 12px;
          color: rgba(200,220,255,0.75);
        }

        .hero-chip-dot {
          width: 8px;
          height: 8px;
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
          width: 100%;
          max-width: 100%;
          min-width: 0;
        }

        .hero-link {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
          min-width: 0;
          max-width: 100%;
          font-size: 13px;
          color: #378add;
          text-decoration: none;
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        /* â”€â”€ Tablet: single-column grid â”€â”€ */
        @media (max-width: 1100px) {
          .hero-grid {
            grid-template-columns: 1fr;
          }
          .hero-left {
            border-right: none;
            border-bottom: 1px solid rgba(55,138,221,0.1);
          }
          .hero-right {
            padding-top: 24px;
            padding-bottom: 24px;
          }
        }

        /* â”€â”€ Tablet narrow (820px) â”€â”€ */
        @media (max-width: 820px) {
          .hero-wrapper {
            padding: 10px;
          }
          .hero-frame {
            min-height: calc(100svh - 20px);
            overflow-x: hidden;
          }
          .hero-topbar {
            padding: 12px 16px;
            gap: 10px;
            align-items: center;
          }
          .hero-topbar > * {
            min-width: 0;
          }
          .hero-brand {
            width: auto;
            flex: 1;
          }
          .hero-nav {
            display: none;
          }
          .hero-hire-button {
            display: none;
          }
          .hero-menu-toggle {
            display: inline-flex;
          }
          .hero-mobile-menu {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            width: 100%;
            gap: 8px;
            padding-top: 12px;
            border-top: 1px solid rgba(55,138,221,0.1);
          }
          .hero-mobile-menu-link {
            width: 100%;
            min-width: 0;
            padding: 10px 12px;
            border: 1px solid rgba(55,138,221,0.16);
            border-radius: 10px;
            background: rgba(255,255,255,0.035);
            color: rgba(220,235,255,0.74);
            cursor: pointer;
            font: inherit;
            font-size: 14px;
            text-align: center;
          }
          .hero-mobile-menu-cta {
            grid-column: 1 / -1;
            color: #61afff;
            border-color: rgba(55,138,221,0.36);
          }
          .hero-left,
          .hero-right {
            padding-left: 16px;
            padding-right: 16px;
          }
          .hero-left {
            padding-top: 24px;
          }
          .hero-right {
            gap: 14px;
            padding-top: 20px;
          }
        .hero-status {
            margin-bottom: 20px;
            padding: 8px 14px;
            font-size: 14px;
            max-width: 100%;
          }
          .hero-title {
            font-size: 44px;
            margin-bottom: 12px;
          }
          .hero-role-wrap {
            min-height: 30px;
            margin-bottom: 14px;
          }
          .hero-role { font-size: 16px; }
          .hero-bio {
            font-size: 15px;
            max-width: 100%;
          }
          .hero-actions {
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
            flex-wrap: wrap;
          }
          .hero-actions a {
            font-size: 14px;
            padding: 11px 18px;
          }
          .hero-stats { gap: 12px; }
          .hero-stat-card { padding: 18px; border-radius: 12px; }
          .hero-stat-value { font-size: 30px; }
          .hero-stat-label { font-size: 13px; }
          .hero-panel { padding: 18px 16px 14px; border-radius: 12px; }
          .hero-panel-title { font-size: 11px; margin-bottom: 14px; }
          .hero-chip-grid { gap: 8px; max-width: 100%; }
          .hero-chip { font-size: 13px; padding: 7px 11px; }
          .hero-chart { height: 90px; gap: 3px; }
          .hero-chart-bar { min-width: 5px; }
          .hero-link { font-size: 13px; }
        }

        /* â”€â”€ Phone (640px and below) â”€â”€ */
        @media (max-width: 640px) {
          .hero-wrapper {
            padding: 6px;
          }
          .hero-frame {
            min-height: calc(100svh - 12px);
            border-radius: 10px;
            overflow-x: hidden;
          }
          .hero-right {
            overflow-x: hidden;
            max-width: 100%;
          }
          .hero-stats {
            grid-template-columns: 1fr 1fr;
            max-width: 100%;
          }
          .hero-topbar {
            padding: 10px 12px;
            flex-direction: row;
            align-items: center;
            text-align: left;
            flex-wrap: wrap;
          }
          .hero-brand {
            justify-content: flex-start;
          }
          .hero-mobile-menu {
            grid-template-columns: 1fr;
          }
          .hero-mobile-menu-link {
            font-size: 13px;
          }
          .hero-left,
          .hero-right {
            padding-left: 14px;
            padding-right: 14px;
          }
          .hero-left {
            padding-top: 18px;
            gap: 10px;
          }
          .hero-right {
            padding-top: 16px;
            gap: 10px;
          }
          .hero-status {
            margin-bottom: 16px;
            padding: 7px 13px;
            font-size: 13px;
          }
          .hero-intro {
            text-align: center;
          }
          .hero-status {
            margin-left: auto;
            margin-right: auto;
          }
          .hero-title {
            font-size: 34px;
            margin-bottom: 8px;
            line-height: 1.08;
          }
          .hero-title-word {
            display: block;
            margin-right: 0;
          }
          .hero-role-wrap {
            min-height: 24px;
            margin-bottom: 12px;
          }
          .hero-role { font-size: 14px; }
          .hero-bio {
            font-size: 13px;
            line-height: 1.55;
            max-width: 100%;
          }
          .hero-actions {
            flex-direction: column;
            align-items: center;
            gap: 10px;
            margin-top: 18px;
          }
          .hero-actions a {
            width: min(100%, 320px);
            flex-basis: auto;
            font-size: 14px;
            padding: 11px 14px;
            border-radius: 10px;
          }
          .hero-footer {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 12px 0 10px;
          }
          .hero-stats {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
          .hero-stat-card { padding: 14px 14px; border-radius: 10px; }
          .hero-stat-value { font-size: 26px; }
          .hero-stat-label { font-size: 12px; }
          .hero-panel { padding: 14px 14px 12px; border-radius: 10px; }
          .hero-panel-title { font-size: 10px; margin-bottom: 12px; }
          .hero-chip-grid { gap: 6px; }
          .hero-chip { font-size: 12px; padding: 6px 10px; }
          .hero-chip-dot { width: 7px; height: 7px; }
          /* Hide chart on very small screens to reduce clutter */
          .hero-chart-panel { display: none; }
          .hero-link-row { justify-content: flex-start; }
          .hero-link {
            width: 100%;
            font-size: 13px;
          }
        }

        @media (max-width: 380px) {
          .hero-wrapper {
            padding: 4px;
          }
          .hero-frame {
            border-radius: 8px;
          }
          .hero-topbar {
            padding: 9px 8px;
          }
          .hero-brand-name {
            font-size: 15px;
          }
          .hero-menu-toggle {
            width: 38px;
            height: 38px;
          }
          .hero-left,
          .hero-right {
            padding-left: 10px;
            padding-right: 10px;
          }
          .hero-status {
            border-radius: 12px;
            font-size: 12px;
            white-space: normal;
          }
          .hero-title {
            font-size: 30px;
          }
          .hero-role {
            font-size: 13px;
          }
          .hero-bio {
            font-size: 12px;
          }
          .hero-actions a {
            width: 100%;
          }
          .hero-stats {
            grid-template-columns: 1fr;
          }
          .hero-footer {
            align-items: center;
            text-align: center;
          }
          .hero-footer-item {
            justify-content: center;
            overflow-wrap: anywhere;
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

function ResumeIcon() {
  return (
    <svg aria-hidden="true" fill="none" height="20" viewBox="0 0 24 24" width="20">
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zm0 0v5h5M9 13h6M9 17h6M9 9h2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}


