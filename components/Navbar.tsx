"use client";

import { useState, useEffect } from "react";

const navLinks: [string, string][] = [
  ["Home", "about"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Credential", "certificates"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      if (window.scrollY <= 80) setMenuOpen(false);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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
          background: "rgba(5,13,26,0.92)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(55,138,221,0.18)",
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
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <div className="nav-atom">
              <div className="nav-orbit nav-orbit-1"><div className="nav-orb no-1" /></div>
              <div className="nav-orbit nav-orbit-2"><div className="nav-orb no-2" /></div>
              <div className="nav-orbit nav-orbit-3"><div className="nav-orb no-3" /></div>
              <div className="nav-atom-core">
                <span className="nav-atom-lt">&lt;</span>
                <span className="nav-atom-sl">/</span>
                <span className="nav-atom-gt">&gt;</span>
              </div>
            </div>
            <span style={{ color: "#e8f4ff", fontSize: 16, fontWeight: 700 }}>RCS.dev</span>
          </div>

          {/* Desktop nav links */}
          <div className="navbar-links" style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
            {navLinks.map(([label, id]) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                className="navbar-link-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 15,
                  color: "rgba(200,220,255,0.6)",
                  fontFamily: "inherit",
                  transition: "color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {label}
              </button>
            ))}
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
                border: "1px solid rgba(55,138,221,0.45)",
                color: "#61afff",
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
                border: "1px solid rgba(55,138,221,0.3)",
                borderRadius: 8,
                color: "#378add",
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
              borderTop: "1px solid rgba(55,138,221,0.15)",
              padding: "14px 18px 16px",
              gap: 8,
            }}
          >
            {navLinks.map(([label, id]) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                style={{
                  background: "rgba(255,255,255,0.035)",
                  border: "1px solid rgba(55,138,221,0.16)",
                  cursor: "pointer",
                  padding: "10px 14px",
                  borderRadius: 10,
                  fontSize: 13,
                  color: "rgba(220,235,255,0.74)",
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
                background: "rgba(255,255,255,0.035)",
                border: "1px solid rgba(55,138,221,0.36)",
                cursor: "pointer",
                padding: "10px 14px",
                borderRadius: 10,
                fontSize: 13,
                color: "#61afff",
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
          width: 44px; height: 44px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        /* Elliptical orbit rings */
        .nav-orbit {
          position: absolute;
          width: 42px; height: 16px;
          border-radius: 50%;
          top: 50%; left: 50%;
          margin: -8px 0 0 -21px;
        }
        .nav-orbit-1 { border: 1.5px solid rgba(55,138,221,0.6);  animation: navOrbit1 2.4s linear infinite; }
        .nav-orbit-2 { border: 1.5px solid rgba(93,202,165,0.55); animation: navOrbit2 1.9s linear infinite; }
        .nav-orbit-3 { border: 1.5px solid rgba(97,175,255,0.45); animation: navOrbit3 3.1s linear infinite; }
        @keyframes navOrbit1 { from{transform:rotateZ(0deg)}   to{transform:rotateZ(360deg)} }
        @keyframes navOrbit2 { from{transform:rotateZ(60deg)}  to{transform:rotateZ(420deg)} }
        @keyframes navOrbit3 { from{transform:rotateZ(-60deg)} to{transform:rotateZ(300deg)} }
        /* Orbiting dots */
        .nav-orb {
          position: absolute;
          border-radius: 50%;
          top: -3px; left: 50%;
          transform: translateX(-50%);
        }
        .no-1 { width: 6px; height: 6px; background: #378add; box-shadow: 0 0 6px #378add, 0 0 12px rgba(55,138,221,0.8); }
        .no-2 { width: 5px; height: 5px; background: #5dcaa5; box-shadow: 0 0 6px #5dcaa5, 0 0 10px rgba(93,202,165,0.8); }
        .no-3 { width: 4px; height: 4px; background: #61afff; box-shadow: 0 0 5px #61afff, 0 0 9px rgba(97,175,255,0.8); }
        /* Center core */
        .nav-atom-core {
          position: absolute;
          width: 22px; height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle, #0d2040, #050e1c);
          border: 1px solid rgba(55,138,221,0.4);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Courier New', monospace; font-weight: 900;
          animation: navCorePulse 2.5s ease-in-out infinite;
        }
        @keyframes navCorePulse {
          0%,100% { box-shadow: 0 0 8px rgba(55,138,221,0.4); }
          50%     { box-shadow: 0 0 16px rgba(93,202,165,0.6); }
        }
        .nav-atom-lt, .nav-atom-gt {
          font-size: 8px; line-height: 1;
          background: linear-gradient(135deg, #61afff, #5dcaa5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .nav-atom-sl {
          font-size: 7px; line-height: 1;
          color: rgba(255,255,255,0.65);
        }

        @media (max-width: 640px) {
          .main-navbar { top: 4px !important; left: 4px !important; right: 4px !important; }
        }

        /* Nav link hover glow */
        .navbar-link-btn:hover {
          color: #61afff !important;
          background: rgba(55,138,221,0.12) !important;
          box-shadow: 0 0 12px rgba(55,138,221,0.35), 0 0 4px rgba(55,138,221,0.2) inset !important;
        }

        /* Hire me button hover glow */
        .navbar-hire:hover {
          background: rgba(55,138,221,0.12) !important;
          border-color: rgba(55,138,221,0.85) !important;
          box-shadow: 0 0 16px rgba(55,138,221,0.5), 0 0 6px rgba(55,138,221,0.25) inset !important;
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
