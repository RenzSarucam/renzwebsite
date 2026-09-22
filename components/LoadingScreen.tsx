"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  "Initializing system...",
  "Loading modules: React · Next.js · TypeScript",
  "Connecting to DevOps pipeline...",
  "Mounting Docker containers...",
  "Syncing GitHub repository...",
  "Configuring Nginx proxy...",
  "Building portfolio assets...",
  "Launch sequence complete.",
];

const BINARY = "10110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010";
const BINARY_GRID = BINARY.slice(0, 120).split("");

export default function LoadingScreen() {
  const [mounted, setMounted]     = useState(false);
  const [visible, setVisible]     = useState(true);
  const [fading, setFading]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);

    const totalDuration = 2800;
    const lineInterval  = totalDuration / BOOT_LINES.length;

    BOOT_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setLineCount(i + 1);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, i * lineInterval);
      timerRef.current.push(t);
    });

    const t1 = setTimeout(() => setFading(true),  totalDuration + 200);
    const t2 = setTimeout(() => setVisible(false), totalDuration + 800);
    timerRef.current.push(t1, t2);

    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      suppressHydrationWarning
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#020a14",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.7s ease",
        overflow: "hidden",
      }}
    >
      {/* Binary grid background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "repeat(20, 1fr)",
          opacity: 0.05,
          pointerEvents: "none",
          fontFamily: "'Courier New', monospace",
          fontSize: 11,
          color: "#378add",
          padding: 8,
          gap: 2,
        }}
      >
        {BINARY_GRID.map((bit, i) => (
          <span key={i} className={`bin-cell bin-${i % 5}`}>{bit}</span>
        ))}
      </div>

      {/* Scanline overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(55,138,221,0.012) 2px, rgba(55,138,221,0.012) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* Ambient glow blobs */}
      <div className="glow-blob glow-1" />
      <div className="glow-blob glow-2" />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, padding: "0 24px" }}>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div className="logo-wrap">
            {/* Outer orbit ring */}
            <div className="orbit-ring orbit-outer">
              <div className="orbit-dot" />
            </div>
            {/* Inner orbit ring */}
            <div className="orbit-ring orbit-inner">
              <div className="orbit-dot orbit-dot-small" />
            </div>
            {/* Core badge */}
            <div className="logo-core">
              <span className="logo-tag logo-open">&lt;</span>
              <span className="logo-initials">RCS</span>
              <span className="logo-tag logo-close">/&gt;</span>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(55,138,221,0.18)",
            borderRadius: 12,
            padding: "16px 20px",
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            marginBottom: 24,
            minHeight: 160,
            boxShadow: "0 0 24px rgba(55,138,221,0.06)",
          }}
        >
          {/* Terminal dots */}
          <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
            <span style={{ marginLeft: 8, fontSize: 10, color: "rgba(200,220,255,0.3)" }}>renz@portfolio ~ boot</span>
          </div>

          {/* Lines */}
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }} className={i === lineCount - 1 ? "line-enter" : ""}>
                <span style={{ color: "#5dcaa5", flexShrink: 0 }}>{">"}</span>
                <span style={{ color: i === lineCount - 1 ? "#e8f4ff" : "rgba(200,220,255,0.5)" }}>
                  {line}
                </span>
                {i === lineCount - 1 && progress < 100 && (
                  <span className="blink" style={{ color: "#378add" }}>▋</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
            <span style={{ fontSize: 11, color: "rgba(200,220,255,0.35)", fontFamily: "'Courier New', monospace", letterSpacing: "0.08em" }}>
              LOADING PORTFOLIO
            </span>
            <span style={{ fontSize: 11, color: "#5dcaa5", fontFamily: "'Courier New', monospace", fontWeight: 700 }}>
              {progress}%
            </span>
          </div>
          <div style={{ height: 3, background: "rgba(55,138,221,0.1)", borderRadius: 99, overflow: "hidden" }}>
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background: "linear-gradient(90deg, #378add, #5dcaa5)",
                borderRadius: 99,
                transition: "width 0.35s ease",
                boxShadow: "0 0 12px rgba(93,202,165,0.7)",
              }}
            />
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        /* ── Ambient glow ── */
        .glow-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(80px);
        }
        .glow-1 {
          width: 400px; height: 400px;
          background: rgba(55,138,221,0.12);
          top: -100px; left: -100px;
          animation: blobDrift 6s ease-in-out infinite alternate;
        }
        .glow-2 {
          width: 300px; height: 300px;
          background: rgba(93,202,165,0.1);
          bottom: -80px; right: -80px;
          animation: blobDrift 8s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.1); }
        }

        /* ── Logo ── */
        .logo-wrap {
          position: relative;
          width: 110px; height: 110px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Orbit rings */
        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid transparent;
        }
        .orbit-outer {
          width: 110px; height: 110px;
          border-color: rgba(55,138,221,0.3);
          animation: orbitSpin 4s linear infinite;
        }
        .orbit-inner {
          width: 84px; height: 84px;
          border-color: rgba(93,202,165,0.25);
          animation: orbitSpin 3s linear infinite reverse;
        }
        .orbit-dot {
          position: absolute;
          top: -4px; left: 50%;
          transform: translateX(-50%);
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #378add;
          box-shadow: 0 0 10px #378add, 0 0 20px rgba(55,138,221,0.6);
        }
        .orbit-dot-small {
          width: 6px; height: 6px;
          background: #5dcaa5;
          box-shadow: 0 0 8px #5dcaa5, 0 0 16px rgba(93,202,165,0.6);
        }
        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Core badge */
        .logo-core {
          position: relative;
          width: 72px; height: 72px;
          border-radius: 16px;
          background: linear-gradient(135deg, #0d1f35, #112840);
          border: 1px solid rgba(55,138,221,0.35);
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0;
          animation: corePulse 2.5s ease-in-out infinite;
          box-shadow: 0 0 0 1px rgba(55,138,221,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        @keyframes corePulse {
          0%,100% { box-shadow: 0 0 20px rgba(55,138,221,0.3), 0 0 50px rgba(55,138,221,0.1), inset 0 1px 0 rgba(255,255,255,0.06); }
          50%      { box-shadow: 0 0 35px rgba(55,138,221,0.55), 0 0 80px rgba(55,138,221,0.2), inset 0 1px 0 rgba(255,255,255,0.06); }
        }

        .logo-tag {
          font-family: 'Courier New', monospace;
          font-size: 9px;
          font-weight: 600;
          line-height: 1;
          color: #5dcaa5;
          opacity: 0.8;
          animation: tagFade 2.5s ease-in-out infinite;
        }
        .logo-open  { align-self: flex-start; padding-left: 10px; }
        .logo-close { align-self: flex-end; padding-right: 8px; }
        @keyframes tagFade {
          0%,100% { opacity: 0.6; }
          50%      { opacity: 1; }
        }

        .logo-initials {
          font-size: 20px;
          font-weight: 900;
          font-family: 'Segoe UI', system-ui, sans-serif;
          background: linear-gradient(135deg, #61afff, #5dcaa5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 1px;
          line-height: 1;
          animation: initialsShimmer 2.5s ease-in-out infinite;
        }
        @keyframes initialsShimmer {
          0%,100% { filter: brightness(1); }
          50%      { filter: brightness(1.3); }
        }

        /* ── Terminal line enter ── */
        .line-enter { animation: lineSlide 0.25s ease-out; }
        @keyframes lineSlide {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        /* ── Binary bg ── */
        .bin-cell { animation: blink 2s infinite; }
        .bin-0 { animation-delay: 0s; }
        .bin-1 { animation-delay: 0.4s; }
        .bin-2 { animation-delay: 0.8s; }
        .bin-3 { animation-delay: 1.2s; }
        .bin-4 { animation-delay: 1.6s; }

        /* ── Blink cursor ── */
        .blink { animation: blink 1s step-end infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
