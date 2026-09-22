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
          <div className="bh-wrap">
            {/* Accretion disk rings */}
            <div className="bh-disk bh-disk-1"><div className="bh-particle p1" /></div>
            <div className="bh-disk bh-disk-2"><div className="bh-particle p2" /></div>
            <div className="bh-disk bh-disk-3"><div className="bh-particle p3" /></div>
            <div className="bh-disk bh-disk-4" />
            {/* Gravitational wave pulses */}
            <div className="bh-pulse bh-pulse-1" />
            <div className="bh-pulse bh-pulse-2" />
            <div className="bh-pulse bh-pulse-3" />
            {/* Photon ring */}
            <div className="bh-photon" />
            {/* Singularity */}
            <div className="bh-singularity">
              <div className="bh-inner-glow" />
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

        /* ── Black hole logo ── */
        .bh-wrap {
          position: relative;
          width: 160px; height: 160px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Tilted accretion disk rings */
        .bh-disk {
          position: absolute;
          border-radius: 50%;
          border: 1.5px solid transparent;
          top: 50%; left: 50%;
          transform-style: preserve-3d;
        }
        .bh-disk-1 {
          width: 158px; height: 158px;
          margin: -79px 0 0 -79px;
          border-color: rgba(55,138,221,0.45);
          transform: rotateX(72deg) rotateZ(0deg);
          animation: diskSpin1 3s linear infinite;
        }
        .bh-disk-2 {
          width: 124px; height: 124px;
          margin: -62px 0 0 -62px;
          border-color: rgba(93,202,165,0.4);
          transform: rotateX(72deg) rotateZ(60deg);
          animation: diskSpin2 2.2s linear infinite reverse;
        }
        .bh-disk-3 {
          width: 96px; height: 96px;
          margin: -48px 0 0 -48px;
          border-color: rgba(97,175,255,0.35);
          transform: rotateX(72deg) rotateZ(120deg);
          animation: diskSpin3 1.6s linear infinite;
        }
        .bh-disk-4 {
          width: 70px; height: 70px;
          margin: -35px 0 0 -35px;
          border: 1px solid rgba(55,138,221,0.2);
          transform: rotateX(72deg);
          animation: diskSpin1 4s linear infinite reverse;
        }

        @keyframes diskSpin1 { from{transform:rotateX(72deg) rotateZ(0deg)}   to{transform:rotateX(72deg) rotateZ(360deg)} }
        @keyframes diskSpin2 { from{transform:rotateX(72deg) rotateZ(60deg)}  to{transform:rotateX(72deg) rotateZ(420deg)} }
        @keyframes diskSpin3 { from{transform:rotateX(72deg) rotateZ(120deg)} to{transform:rotateX(72deg) rotateZ(480deg)} }

        /* Particles on rings */
        .bh-particle {
          position: absolute;
          border-radius: 50%;
          top: -5px; left: 50%;
          transform: translateX(-50%);
        }
        .p1 { width: 9px; height: 9px; background: #378add; box-shadow: 0 0 12px #378add, 0 0 24px rgba(55,138,221,0.8); }
        .p2 { width: 7px; height: 7px; background: #5dcaa5; box-shadow: 0 0 10px #5dcaa5, 0 0 20px rgba(93,202,165,0.8); }
        .p3 { width: 6px; height: 6px; background: #61afff; box-shadow: 0 0 8px #61afff, 0 0 16px rgba(97,175,255,0.8); }

        /* Gravitational wave pulses — ripple outward */
        .bh-pulse {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(55,138,221,0.5);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%) scale(0);
          animation: gravityPulse 3s ease-out infinite;
        }
        .bh-pulse-1 { width: 60px; height: 60px; animation-delay: 0s; }
        .bh-pulse-2 { width: 60px; height: 60px; animation-delay: 1s;  border-color: rgba(93,202,165,0.4); }
        .bh-pulse-3 { width: 60px; height: 60px; animation-delay: 2s;  border-color: rgba(97,175,255,0.3); }
        @keyframes gravityPulse {
          0%   { transform: translate(-50%,-50%) scale(0.4); opacity: 0.8; }
          100% { transform: translate(-50%,-50%) scale(3.2); opacity: 0; }
        }

        /* Photon ring — bright halo */
        .bh-photon {
          position: absolute;
          width: 52px; height: 52px;
          border-radius: 50%;
          background: transparent;
          border: 2px solid transparent;
          box-shadow:
            0 0 0 1px rgba(55,138,221,0.6),
            0 0 14px 4px rgba(55,138,221,0.5),
            0 0 30px 8px rgba(55,138,221,0.2),
            inset 0 0 12px rgba(93,202,165,0.15);
          animation: photonSpin 6s linear infinite, photonPulse 2s ease-in-out infinite;
        }
        @keyframes photonSpin  { to { transform: rotate(360deg); } }
        @keyframes photonPulse {
          0%,100% { box-shadow: 0 0 0 1px rgba(55,138,221,0.6), 0 0 14px 4px rgba(55,138,221,0.5), 0 0 30px 8px rgba(55,138,221,0.2); }
          50%     { box-shadow: 0 0 0 1px rgba(93,202,165,0.7), 0 0 20px 6px rgba(93,202,165,0.5), 0 0 45px 12px rgba(93,202,165,0.2); }
        }

        /* Singularity — pure dark center */
        .bh-singularity {
          position: absolute;
          width: 36px; height: 36px;
          border-radius: 50%;
          background: radial-gradient(circle, #010608 55%, #041420 100%);
          display: flex; align-items: center; justify-content: center;
        }
        .bh-inner-glow {
          width: 12px; height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(93,202,165,0.6) 0%, rgba(55,138,221,0.3) 60%, transparent 100%);
          animation: singularityBreath 2s ease-in-out infinite;
        }
        @keyframes singularityBreath {
          0%,100% { transform: scale(0.7); opacity: 0.5; }
          50%     { transform: scale(1.4); opacity: 1; }
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
