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
          <div className="dev-wrap">
            {/* Orbit ring 1 — horizontal */}
            <div className="dev-ring dev-ring-1"><div className="dev-dot dd-1" /></div>
            {/* Orbit ring 2 — tilted 60° */}
            <div className="dev-ring dev-ring-2"><div className="dev-dot dd-2" /></div>
            {/* Orbit ring 3 — tilted -60° */}
            <div className="dev-ring dev-ring-3"><div className="dev-dot dd-3" /></div>
            {/* Outer pulse rings */}
            <div className="dev-pulse dev-pulse-1" />
            <div className="dev-pulse dev-pulse-2" />
            {/* Center badge */}
            <div className="dev-center">
              <span className="dev-bracket dev-lt">&lt;</span>
              <span className="dev-slash">/</span>
              <span className="dev-bracket dev-gt">&gt;</span>
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

        /* ── Developer atom logo ── */
        .dev-wrap {
          position: relative;
          width: 160px; height: 160px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Elliptical orbit rings */
        .dev-ring {
          position: absolute;
          width: 156px; height: 56px;
          border-radius: 50%;
          border: 1.5px solid rgba(55,138,221,0.35);
          top: 50%; left: 50%;
          margin: -28px 0 0 -78px;
        }
        .dev-ring-1 { transform: rotateZ(0deg);   animation: devSpin 3.2s linear infinite; }
        .dev-ring-2 { transform: rotateZ(60deg);  animation: devSpin 2.6s linear infinite reverse; border-color: rgba(93,202,165,0.35); }
        .dev-ring-3 { transform: rotateZ(-60deg); animation: devSpin 4s linear infinite; border-color: rgba(97,175,255,0.3); }
        @keyframes devSpin { from { transform: rotateZ(var(--rz,0deg)) rotateX(var(--rx,0deg)); } }

        /* Override with 3D tilt via individual ring keyframes */
        .dev-ring-1 { animation: ring1Spin 3.2s linear infinite; }
        .dev-ring-2 { animation: ring2Spin 2.6s linear infinite; }
        .dev-ring-3 { animation: ring3Spin 4s linear infinite; }
        @keyframes ring1Spin { from{transform:rotateZ(0deg)}   to{transform:rotateZ(360deg)} }
        @keyframes ring2Spin { from{transform:rotateZ(60deg)}  to{transform:rotateZ(420deg)} }
        @keyframes ring3Spin { from{transform:rotateZ(-60deg)} to{transform:rotateZ(300deg)} }

        /* Orbiting dots */
        .dev-dot {
          position: absolute;
          border-radius: 50%;
          top: -5px; left: 50%;
          transform: translateX(-50%);
        }
        .dd-1 { width: 9px; height: 9px; background: #378add; box-shadow: 0 0 10px #378add, 0 0 22px rgba(55,138,221,0.7); }
        .dd-2 { width: 8px; height: 8px; background: #5dcaa5; box-shadow: 0 0 10px #5dcaa5, 0 0 20px rgba(93,202,165,0.7); }
        .dd-3 { width: 7px; height: 7px; background: #61afff; box-shadow: 0 0 8px #61afff, 0 0 18px rgba(97,175,255,0.7); }

        /* Pulse ripples */
        .dev-pulse {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(55,138,221,0.4);
          top: 50%; left: 50%;
          transform: translate(-50%,-50%) scale(0.5);
          animation: devPulse 3s ease-out infinite;
        }
        .dev-pulse-1 { width: 80px; height: 80px; animation-delay: 0s; }
        .dev-pulse-2 { width: 80px; height: 80px; animation-delay: 1.5s; border-color: rgba(93,202,165,0.35); }
        @keyframes devPulse {
          0%   { transform: translate(-50%,-50%) scale(0.5); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(2.2); opacity: 0; }
        }

        /* Center badge */
        .dev-center {
          position: absolute;
          width: 64px; height: 64px;
          border-radius: 50%;
          background: radial-gradient(circle at 40% 35%, #0d2040, #050e1c);
          border: 1.5px solid rgba(55,138,221,0.4);
          display: flex; align-items: center; justify-content: center; gap: 0;
          box-shadow: 0 0 24px rgba(55,138,221,0.3), 0 0 60px rgba(55,138,221,0.1), inset 0 1px 0 rgba(255,255,255,0.06);
          animation: centerPulse 2.5s ease-in-out infinite;
          font-family: 'Courier New', monospace;
          font-weight: 900;
        }
        @keyframes centerPulse {
          0%,100% { box-shadow: 0 0 24px rgba(55,138,221,0.3), 0 0 60px rgba(55,138,221,0.1); }
          50%     { box-shadow: 0 0 36px rgba(93,202,165,0.45), 0 0 80px rgba(55,138,221,0.2); }
        }
        .dev-bracket {
          font-size: 18px; line-height: 1;
          background: linear-gradient(160deg, #61afff, #5dcaa5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: bracketGlow 2.5s ease-in-out infinite;
        }
        .dev-slash {
          font-size: 14px; line-height: 1;
          color: rgba(255,255,255,0.55);
          margin: 0 1px;
          animation: bracketGlow 2.5s ease-in-out infinite 0.5s;
        }
        @keyframes bracketGlow {
          0%,100% { filter: brightness(0.9) drop-shadow(0 0 3px rgba(55,138,221,0.5)); }
          50%     { filter: brightness(1.4) drop-shadow(0 0 8px rgba(93,202,165,0.8)); }
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
