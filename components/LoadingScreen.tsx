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

// Pre-generated stable binary grid (no Math.random in render)
const BINARY = "10110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010110100101101001011010010";
const BINARY_GRID = BINARY.slice(0, 120).split("");

export default function LoadingScreen() {
  const [mounted, setMounted]   = useState(false);
  const [visible, setVisible]   = useState(true);
  const [fading, setFading]     = useState(false);
  const [progress, setProgress] = useState(0);
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

    const t1 = setTimeout(() => setFading(true),   totalDuration + 200);
    const t2 = setTimeout(() => setVisible(false),  totalDuration + 800);
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
        transition: "opacity 0.6s ease",
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
          opacity: 0.06,
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

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(55,138,221,0.015) 2px, rgba(55,138,221,0.015) 4px)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 480, padding: "0 24px" }}>

        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <div className="rs-logo">
            <span className="rs-r">R</span>
            <span className="rs-s">S</span>
          </div>
        </div>

        {/* Terminal */}
        <div
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(55,138,221,0.2)",
            borderRadius: 12,
            padding: "16px 20px",
            fontFamily: "'Courier New', monospace",
            fontSize: 12,
            marginBottom: 24,
            minHeight: 160,
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
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <span style={{ color: "#5dcaa5", flexShrink: 0 }}>{">"}</span>
                <span
                  style={{
                    color: i === lineCount - 1 ? "#e8f4ff" : "rgba(200,220,255,0.55)",
                  }}
                >
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
            <span style={{ fontSize: 11, color: "rgba(200,220,255,0.35)", fontFamily: "'Courier New', monospace" }}>
              LOADING PORTFOLIO
            </span>
            <span style={{ fontSize: 11, color: "#378add", fontFamily: "'Courier New', monospace" }}>
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
                boxShadow: "0 0 10px rgba(55,138,221,0.6)",
              }}
            />
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .rs-logo {
          width: 72px; height: 72px; border-radius: 18px;
          background: linear-gradient(135deg, #378add, #5dcaa5);
          display: flex; align-items: center; justify-content: center;
          font-size: 26px; font-weight: 900; color: #fff;
          letter-spacing: -1px; gap: 1px;
          animation: logoPulse 2s infinite ease-in-out;
        }
        .rs-r {
          display: inline-block;
          animation: letterBounce 1.2s infinite ease-in-out;
        }
        .rs-s {
          display: inline-block;
          animation: letterBounce 1.2s infinite ease-in-out 0.3s;
        }
        @keyframes letterBounce {
          0%, 100% { transform: translateY(0px); opacity: 1; }
          30%       { transform: translateY(-6px); opacity: 0.7; }
          60%       { transform: translateY(2px); opacity: 1; }
        }
        .blink { animation: blink 1s infinite; }
        .bin-cell { animation: blink 2s infinite; }
        .bin-0 { animation-delay: 0s; }
        .bin-1 { animation-delay: 0.4s; }
        .bin-2 { animation-delay: 0.8s; }
        .bin-3 { animation-delay: 1.2s; }
        .bin-4 { animation-delay: 1.6s; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes logoPulse {
          0%,100% { box-shadow: 0 0 40px rgba(55,138,221,0.4), 0 0 80px rgba(55,138,221,0.15); }
          50%      { box-shadow: 0 0 60px rgba(55,138,221,0.7), 0 0 120px rgba(55,138,221,0.3); }
        }
      `}</style>
    </div>
  );
}
