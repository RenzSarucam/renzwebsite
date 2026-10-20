"use client";

import { useState, useEffect } from "react";

const navLinks: [string, string][] = [
  ["Home",       "about"],
  ["About",      "about-section"],
  ["Projects",   "projects"],
  ["Experience", "experience"],
  ["Skills",     "skills"],
  ["Credential", "certificates"],
  ["Contact",    "contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("about");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      if (window.scrollY <= 80) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map(([, id]) => id);
    const observers: IntersectionObserver[] = [];
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  if (!scrolled) return null;

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const element = document.getElementById(id);
        const navbar = document.querySelector("nav");
        if (!element || !navbar) return;

        const targetOffset = navbar.getBoundingClientRect().bottom + 26;
        const sectionPaddingTop = Number.parseFloat(window.getComputedStyle(element).paddingTop) || 0;
        const top =
          element.getBoundingClientRect().top +
          window.scrollY -
          targetOffset +
          sectionPaddingTop;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      });
    });
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 12,
        left: 8,
        right: 8,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: 0,
        transition: "all 0.3s ease",
      }}
      className="main-navbar"
    >
      <div
        style={{
          width: "min(1280px, 100%)",
          display: "flex",
          flexDirection: "column",
          background: "rgba(13,13,13,0.35)",
          backdropFilter: "blur(16px) saturate(140%)",
          WebkitBackdropFilter: "blur(16px) saturate(140%)",
          border: "1px solid rgba(255,255,255,0.108)",
          borderRadius: 18,
          boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
          overflow: "hidden",
        }}
      >
        {/* Main bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            padding: "10px 18px",
            minHeight: 56,
          }}
        >
          {/* Brand */}
          <button
            type="button"
            aria-label="Renz.dev — back to home"
            onClick={() => { setMenuOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, background: "transparent", border: "none", padding: 0, cursor: "pointer", font: "inherit" }}
          >
            <div className="nav-atom">
              <div className="nav-rings" aria-hidden="true">
                <div className="nav-plane nav-plane-1"><div className="nav-spin nav-spin-1"><i className="nav-orb no-1" /></div></div>
                <div className="nav-plane nav-plane-2"><div className="nav-spin nav-spin-2"><i className="nav-orb no-2" /></div></div>
                <div className="nav-plane nav-plane-3"><div className="nav-spin nav-spin-3"><i className="nav-orb no-3" /></div></div>
                <div className="nav-atom-core nav-atom-core-base">
                  <span className="nav-atom-lt">&lt;</span>
                  <span className="nav-atom-sl">/</span>
                  <span className="nav-atom-gt">&gt;</span>
                </div>
              </div>
            </div>
            <span style={{ color: "#F5F5F5", fontSize: 16, fontWeight: 700 }}>Renz.dev</span>
          </button>

          {/* Desktop nav links */}
          <div className="navbar-links" style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
            {navLinks.map(([label, id]) => {
              const isActive = activeId === id;
              return (
                <button
                  key={label}
                  onClick={() => scrollTo(id)}
                  className={`navbar-link-btn${isActive ? " navbar-link-active" : ""}`}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "8px 13px",
                    borderRadius: 999,
                    fontSize: 14,
                    color: isActive ? "#FFFFFF" : "#A3A3A3",
                    fontFamily: "inherit",
                    fontWeight: isActive ? 600 : 400,
                    transition: "color 0.2s, background 0.2s, box-shadow 0.2s",
                    position: "relative",
                  }}
                >
                  {label}
                  {isActive && (
                    <span style={{
                      position: "absolute",
                      bottom: 3,
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: 20,
                      height: 2,
                      borderRadius: 99,
                      background: "linear-gradient(90deg, #F5F5F5, #F5F5F5)",
                      boxShadow: "0 0 6px rgba(0,0,0,0.7)",
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right side: hire btn + hamburger */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <button
              className="navbar-hire"
              onClick={() => scrollTo("contact")}
              style={{
                padding: "10px 18px",
                borderRadius: 12,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.27)",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                whiteSpace: "nowrap",
                transition: "background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
              }}
            >
              Hire me
            </button>

            {/* Hamburger — visible only on mobile via CSS */}
            <button
              className="navbar-hamburger"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 8,
                color: "#FFFFFF",
                cursor: "pointer",
                width: 40,
                height: 40,
                padding: 0,
                fontFamily: "inherit",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 4,
              }}
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div
            className="navbar-mobile-menu"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.09)",
              padding: "14px 18px 16px",
              gap: 8,
            }}
          >
            {navLinks.map(([label, id]) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                style={{
                  background: "#1A1A1A",
                  border: "1px solid rgba(255,255,255,0.096)",
                  cursor: "pointer",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "#A3A3A3",
                  fontFamily: "inherit",
                  textAlign: "center",
                  width: "100%",
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: "#1A1A1A",
                border: "1px solid rgba(255,255,255,0.216)",
                cursor: "pointer",
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                color: "#FFFFFF",
                fontFamily: "inherit",
                textAlign: "center",
                width: "100%",
              }}
            >
              Hire me
            </button>
          </div>
        )}
      </div>

      <style suppressHydrationWarning>{`
        /* ── Nav atom logo ── */
        .nav-atom {
          position: relative;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          perspective: 110px;
        }
        /* Three real 3D orbits, tumbling slowly around the core */
        .nav-rings {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          animation: navTumble 10s linear infinite;
        }
        @keyframes navTumble {
          from { transform: rotateX(-22deg) rotateY(0deg); }
          to   { transform: rotateX(-22deg) rotateY(360deg); }
        }
        .nav-plane {
          position: absolute; left: 50%; top: 50%;
          width: 36px; height: 36px; margin: -18px 0 0 -18px;
          border: 1.5px solid rgba(255,255,255,0.32);
          border-radius: 50%;
          transform-style: preserve-3d;
        }
        .nav-plane-1 { transform: rotateX(78deg) rotateZ(0deg); }
        .nav-plane-2 { transform: rotateX(78deg) rotateZ(60deg); }
        .nav-plane-3 { transform: rotateX(78deg) rotateZ(120deg); }
        .nav-spin { position: absolute; inset: -1.5px; border-radius: 50%; }
        .nav-spin-1 { animation: navSpin 2.6s linear infinite; }
        .nav-spin-2 { animation: navSpin 2.0s linear infinite reverse; }
        .nav-spin-3 { animation: navSpin 3.2s linear infinite; }
        @keyframes navSpin { to { transform: rotateZ(360deg); } }
        .nav-orb {
          position: absolute; display: block;
          border-radius: 50%;
          top: -3px; left: 50%; margin-left: -3px;
          width: 6px; height: 6px;
          background: radial-gradient(circle at 35% 30%, #FFFFFF, #A3A3A3 60%, #525252);
          box-shadow: 0 0 6px rgba(255,255,255,0.35);
        }
        .no-2 { width: 5px; height: 5px; margin-left: -2.5px; top: -2.5px; }
        .no-3 { width: 4.5px; height: 4.5px; margin-left: -2.25px; top: -2.25px; }
        /* Glossy sphere core */
        .nav-atom-core {
          left: 50%; top: 50%; margin: -10px 0 0 -10px;
          animation: navFace 10s linear infinite;
        }
        @keyframes navFace {
          from { transform: rotateY(0deg) rotateX(22deg); }
          to   { transform: rotateY(-360deg) rotateX(22deg); }
        }
        .nav-atom-core, .nav-atom-core-base {
          position: absolute;
          width: 20px; height: 20px;
          border-radius: 50%;
          background: radial-gradient(circle at 32% 26%, #6b6b6b 0%, #2a2a2a 48%, #0b0b0b 100%);
          box-shadow: inset -2px -3px 5px rgba(0,0,0,0.85), inset 1px 1px 2px rgba(255,255,255,0.25), 0 3px 8px rgba(0,0,0,0.7);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Courier New', monospace; font-weight: 900;
        }
        .nav-atom-lt, .nav-atom-gt {
          font-size: 6px; line-height: 1;
          background: linear-gradient(135deg, #F5F5F5, #F5F5F5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-atom-sl {
          font-size: 5px; line-height: 1;
          color: #A3A3A3;
        }

        @media (max-width: 640px) {
          .main-navbar { top: 4px !important; left: 4px !important; right: 4px !important; }
        }

        /* Nav link hover glow */
        .navbar-link-btn:hover {
          color: #FFFFFF !important;
          background: rgba(255,255,255,0.06) !important;
          box-shadow: 0 0 12px rgba(0,0,0,0.35), 0 0 4px rgba(0,0,0,0.2) inset !important;
        }

        /* Hire me button hover glow */
        .navbar-hire:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(255,255,255,0.51) !important;
          box-shadow: 0 0 16px rgba(0,0,0,0.5), 0 0 6px rgba(0,0,0,0.25) inset !important;
        }

        /* Desktop: show links, hide hamburger */
        .navbar-links { display: flex !important; }
        .navbar-hire { display: block !important; }
        .navbar-hamburger { display: none !important; }
        .navbar-mobile-menu { display: none !important; }
        .navbar-mobile-menu {
          flex-direction: column !important;
          align-items: stretch !important;
          gap: 8px !important;
        }
        .navbar-hamburger {
          font-size: 0 !important;
          background-image:
            linear-gradient(currentColor, currentColor),
            linear-gradient(currentColor, currentColor),
            linear-gradient(currentColor, currentColor) !important;
          background-position: center calc(50% - 6px), center, center calc(50% + 6px) !important;
          background-repeat: no-repeat !important;
          background-size: 18px 2px !important;
        }

        @media (max-width: 640px) {
          /* Mobile: hide links, show hamburger */
          .navbar-links { display: none !important; }
          .navbar-hire { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile-menu { display: flex !important; }
        }

        @media (max-width: 820px) and (min-width: 641px) {
          /* Tablet: hide links, show hamburger */
          .navbar-links { display: none !important; }
          .navbar-hire { display: none !important; }
          .navbar-hamburger { display: flex !important; }
          .navbar-mobile-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
