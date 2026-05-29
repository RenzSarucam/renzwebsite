"use client";

import { useState, useEffect } from "react";

const navLinks: [string, string][] = [
  ["Home", "about"],
  ["Projects", "projects"],
  ["Skills", "skills"],
  ["Certificates", "certificates"],
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
          <div style={{ display: "flex", alignItems: "center", gap: 9, flexShrink: 0 }}>
            <div
              style={{
                width: 9,
                height: 9,
                borderRadius: "50%",
                background: "#378add",
                boxShadow: "0 0 8px #378add",
              }}
            />
            <span style={{ color: "#e8f4ff", fontSize: 16, fontWeight: 700 }}>RCS.dev</span>
          </div>

          {/* Desktop nav links */}
          <div className="navbar-links" style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
            {navLinks.map(([label, id]) => (
              <button
                key={label}
                onClick={() => scrollTo(id)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 14px",
                  borderRadius: 999,
                  fontSize: 15,
                  color: "rgba(200,220,255,0.6)",
                  fontFamily: "inherit",
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

      <style>{`
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
