"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hide navbar — it's inside the Hero card when at top, show only when scrolled
  if (!scrolled) return null;

  return (
    <nav
      style={{
        position: "fixed",
        top: 12,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        transition: "all 0.3s ease",
      }}
    >
      <div
        style={{
          width: "min(1280px, 100%)",
          minHeight: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          padding: "10px 18px",
          background: "rgba(5,13,26,0.82)",
          backdropFilter: "blur(18px)",
          border: "1px solid rgba(55,138,221,0.18)",
          borderRadius: 18,
          boxShadow: "0 18px 42px rgba(0,0,0,0.28)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <div
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#378add",
              boxShadow: "0 0 8px #378add",
            }}
          />
          <span style={{ color: "#e8f4ff", fontSize: 14, fontWeight: 700 }}>
            RCS.dev
          </span>
        </div>
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {[["Home","about"],["Projects","projects"],["Skills","skills"],["Certificates","certificates"],["Contact","contact"]].map(([l,id]) => (
          <button key={l} onClick={() => document.getElementById(id)?.scrollIntoView({behavior:"smooth"})}
            style={{
              background:"transparent", border:"none", cursor:"pointer",
              padding:"8px 14px", borderRadius:999, fontSize:13,
              color:"rgba(200,220,255,0.6)", fontFamily:"inherit",
            }}>{l}</button>
        ))}
        </div>
        <button onClick={() => document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})}
          style={{
            padding:"10px 18px", borderRadius:12,
            background:"transparent", border:"1px solid rgba(55,138,221,0.45)",
            color:"#61afff", fontSize:13, fontWeight:600,
            cursor:"pointer", fontFamily:"inherit",
            whiteSpace: "nowrap",
          }}>Hire me</button>
      </div>
    </nav>
  );
}
