export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#050d1a",
        color: "#e8f4ff",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        textAlign: "center",
        padding: "32px",
      }}
    >
      <p
        style={{
          fontSize: 13,
          color: "#378add",
          fontFamily: "'Courier New', monospace",
          margin: "0 0 16px",
          letterSpacing: "0.15em",
        }}
      >
        404 — PAGE NOT FOUND
      </p>
      <h1
        style={{
          fontSize: "clamp(36px, 6vw, 64px)",
          fontWeight: 800,
          margin: "0 0 16px",
          color: "#e8f4ff",
          fontFamily: "'Courier New', monospace",
        }}
      >
        Lost in the void.
      </h1>
      <p
        style={{
          fontSize: 17,
          color: "rgba(200,220,255,0.5)",
          maxWidth: 400,
          lineHeight: 1.65,
          margin: "0 0 36px",
        }}
      >
        This page doesn&apos;t exist. Let&apos;s get you back to somewhere real.
      </p>
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "12px 28px",
          borderRadius: 12,
          background: "rgba(55,138,221,0.08)",
          border: "1px solid rgba(55,138,221,0.35)",
          color: "#378add",
          fontSize: 16,
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        ← Back to Home
      </a>
    </div>
  );
}