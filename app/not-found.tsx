import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100svh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      background: "#0c0b14", padding: "24px",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#ede8fd", textAlign: "center", position: "relative", overflow: "hidden",
    }}>
      {/* Glow orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(139,124,248,0.1) 0%, transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

      {/* 404 number */}
      <div style={{
        fontSize: "clamp(80px, 18vw, 160px)", fontWeight: 900, lineHeight: 1,
        background: "linear-gradient(135deg, rgba(139,124,248,0.25), rgba(45,212,191,0.15))",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        fontFamily: "'Courier New', monospace", letterSpacing: "-0.04em",
        marginBottom: 8, position: "relative",
      }}>
        404
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, #b09ffc, #2dd4bf)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          opacity: 0.18,
        }}>404</div>
      </div>

      {/* Code comment style label */}
      <p style={{ fontSize: 14, color: "#8b7cf8", fontFamily: "'Courier New', monospace", margin: "0 0 16px", letterSpacing: "0.05em" }}>
        // page_not_found
      </p>

      <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 700, color: "#ede8fd", margin: "0 0 12px" }}>
        This page doesn&apos;t exist
      </h1>
      <p style={{ fontSize: 16, color: "rgba(200,195,240,0.5)", margin: "0 0 40px", maxWidth: 380, lineHeight: 1.7 }}>
        Looks like this route got lost in the pipeline. Let&apos;s get you back to something that works.
      </p>

      {/* CTA */}
      <Link
        href="/"
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "13px 28px", borderRadius: 10,
          background: "linear-gradient(135deg, #8b7cf8, #6d5ef0)",
          color: "#fff", fontSize: 15, fontWeight: 600,
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(139,124,248,0.35)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back to Portfolio
      </Link>

      {/* Brand */}
      <p style={{ position: "absolute", bottom: 24, fontSize: 12, color: "rgba(200,195,240,0.2)", fontFamily: "'Courier New', monospace" }}>
        RCS.dev
      </p>
    </main>
  );
}
