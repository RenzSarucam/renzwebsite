"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { text: "Initializing system...",                    color: "rgba(200,220,255,0.5)" },
  { text: "Loading modules: React · Next.js · TypeScript", color: "rgba(200,220,255,0.5)" },
  { text: "Connecting to DevOps pipeline...",          color: "rgba(200,220,255,0.5)" },
  { text: "Mounting Docker containers...",             color: "#5dcaa5" },
  { text: "Syncing GitHub repository...",              color: "rgba(200,220,255,0.5)" },
  { text: "Configuring Nginx proxy...",                color: "rgba(200,220,255,0.5)" },
  { text: "Building portfolio assets...",              color: "#378add" },
  { text: "Launch sequence complete.",                 color: "#5dcaa5" },
];

export default function LoadingScreen() {
  const [mounted, setMounted]     = useState(false);
  const [visible, setVisible]     = useState(true);
  const [fading, setFading]       = useState(false);
  const [progress, setProgress]   = useState(0);
  const [lineCount, setLineCount] = useState(0);
  const [nameIn, setNameIn]       = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    setMounted(true);

    const t0 = setTimeout(() => setNameIn(true), 300);
    timerRef.current.push(t0);

    const totalDuration = 3000;
    const lineInterval  = totalDuration / BOOT_LINES.length;

    BOOT_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setLineCount(i + 1);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, 400 + i * lineInterval);
      timerRef.current.push(t);
    });

    const t1 = setTimeout(() => setFading(true),  totalDuration + 600);
    const t2 = setTimeout(() => setVisible(false), totalDuration + 1400);
    timerRef.current.push(t0, t1, t2);

    return () => timerRef.current.forEach(clearTimeout);
  }, []);

  if (!mounted || !visible) return null;

  return (
    <div
      suppressHydrationWarning
      className={`ls-root${fading ? " ls-fading" : ""}`}
    >
      {/* ── Layered background ── */}
      <div className="ls-bg-grid" />
      <div className="ls-bg-orb ls-orb-1" />
      <div className="ls-bg-orb ls-orb-2" />
      <div className="ls-bg-orb ls-orb-3" />
      <div className="ls-scanlines" />

      {/* ── Content ── */}
      <div className="ls-content">

        {/* Atom */}
        <div className="ls-atom-wrap">
          {/* Outer glow rings */}
          <div className="ls-glow-ring ls-gr-1" />
          <div className="ls-glow-ring ls-gr-2" />

          {/* Orbit rings */}
          <div className="ls-orbit ls-orbit-1"><div className="ls-dot ls-dot-1" /></div>
          <div className="ls-orbit ls-orbit-2"><div className="ls-dot ls-dot-2" /></div>
          <div className="ls-orbit ls-orbit-3"><div className="ls-dot ls-dot-3" /></div>

          {/* Core */}
          <div className="ls-core">
            <span className="ls-core-lt">&lt;</span>
            <span className="ls-core-sl">/</span>
            <span className="ls-core-gt">&gt;</span>
          </div>
        </div>

        {/* Name block */}
        <div className={`ls-name-block${nameIn ? " ls-name-in" : ""}`}>
          <h1 className="ls-name">Renz Carljansen Sarucam</h1>
          <p className="ls-role">
            <span className="ls-role-chip">Full Stack</span>
            <span className="ls-role-dot">·</span>
            <span className="ls-role-chip">DevOps</span>
            <span className="ls-role-dot">·</span>
            <span className="ls-role-chip">R&amp;D Engineer</span>
          </p>
        </div>

        {/* Terminal */}
        <div className="ls-terminal">
          {/* Window chrome */}
          <div className="ls-term-chrome">
            <span className="ls-term-dot" style={{ background: "#ff5f57" }} />
            <span className="ls-term-dot" style={{ background: "#febc2e" }} />
            <span className="ls-term-dot" style={{ background: "#28c840" }} />
            <span className="ls-term-title">renz@portfolio ~ boot</span>
          </div>

          {/* Lines */}
          <div className="ls-term-body">
            {BOOT_LINES.slice(0, lineCount).map((line, i) => (
              <div
                key={i}
                className={`ls-term-line${i === lineCount - 1 ? " ls-term-line-enter" : ""}`}
              >
                <span className="ls-term-prompt">&gt;</span>
                <span style={{ color: i === lineCount - 1 ? line.color : "rgba(200,220,255,0.4)" }}>
                  {line.text}
                </span>
                {i === lineCount - 1 && progress < 100 && (
                  <span className="ls-cursor">▋</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress */}
        <div className="ls-progress-wrap">
          <div className="ls-progress-labels">
            <span className="ls-progress-label">INITIALIZING PORTFOLIO</span>
            <span className="ls-progress-pct" style={{ color: progress === 100 ? "#5dcaa5" : "#61afff" }}>{progress}%</span>
          </div>
          <div className="ls-progress-track">
            <div className="ls-progress-fill" style={{ width: `${progress}%` }}>
              <div className="ls-progress-shine" />
            </div>
          </div>
          {/* Step dots */}
          <div className="ls-progress-dots">
            {BOOT_LINES.map((_, i) => (
              <div
                key={i}
                className="ls-step-dot"
                style={{
                  background: i < lineCount ? (i === BOOT_LINES.length - 1 ? "#5dcaa5" : "#378add") : "rgba(55,138,221,0.15)",
                  boxShadow: i < lineCount ? `0 0 6px ${i === BOOT_LINES.length - 1 ? "#5dcaa5" : "#378add"}` : "none",
                  transform: i === lineCount - 1 ? "scale(1.4)" : "scale(1)",
                }}
              />
            ))}
          </div>
        </div>

      </div>

      <style suppressHydrationWarning>{`
        /* ── Root ── */
        .ls-root {
          position: fixed; inset: 0; z-index: 99999;
          background: #020c1b;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
        }
        .ls-fading {
          opacity: 0;
          transform: scale(1.03);
          filter: blur(4px);
          pointer-events: none;
        }

        /* ── Backgrounds ── */
        .ls-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(55,138,221,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(55,138,221,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ls-bg-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(100px);
        }
        .ls-orb-1 { width: 600px; height: 600px; background: rgba(55,138,221,0.1);  top: -150px; left: -150px; animation: orbDrift 8s ease-in-out infinite alternate; }
        .ls-orb-2 { width: 500px; height: 500px; background: rgba(93,202,165,0.08); bottom: -120px; right: -120px; animation: orbDrift 10s ease-in-out infinite alternate-reverse; }
        .ls-orb-3 { width: 300px; height: 300px; background: rgba(198,120,221,0.06); top: 40%; left: 60%; animation: orbDrift 7s ease-in-out infinite alternate; }
        @keyframes orbDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }
        .ls-scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(55,138,221,0.008) 3px, rgba(55,138,221,0.008) 4px);
        }

        /* ── Content ── */
        .ls-content {
          position: relative; z-index: 1;
          width: 100%; max-width: 520px;
          padding: 0 24px;
          display: flex; flex-direction: column;
          align-items: center; gap: 28px;
        }

        /* ── Atom ── */
        .ls-atom-wrap {
          position: relative;
          width: 180px; height: 180px;
          display: flex; align-items: center; justify-content: center;
        }

        /* Outer glow rings */
        .ls-glow-ring {
          position: absolute; border-radius: 50%; border: 1px solid;
          top: 50%; left: 50%; transform: translate(-50%,-50%);
        }
        .ls-gr-1 {
          width: 160px; height: 160px;
          border-color: rgba(55,138,221,0.12);
          animation: grPulse 3s ease-in-out infinite;
        }
        .ls-gr-2 {
          width: 200px; height: 200px;
          border-color: rgba(93,202,165,0.08);
          animation: grPulse 3s ease-in-out infinite 1.5s;
        }
        @keyframes grPulse {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.06); }
        }

        /* Orbit rings */
        .ls-orbit {
          position: absolute;
          width: 170px; height: 60px;
          border-radius: 50%;
          top: 50%; left: 50%;
          margin: -30px 0 0 -85px;
        }
        .ls-orbit-1 { border: 1.5px solid rgba(55,138,221,0.5);  animation: lsOrbit1 3.2s linear infinite; }
        .ls-orbit-2 { border: 1.5px solid rgba(93,202,165,0.45); animation: lsOrbit2 2.4s linear infinite; }
        .ls-orbit-3 { border: 1.5px solid rgba(97,175,255,0.35); animation: lsOrbit3 4.2s linear infinite; }
        @keyframes lsOrbit1 { from{transform:rotateZ(0deg)}   to{transform:rotateZ(360deg)} }
        @keyframes lsOrbit2 { from{transform:rotateZ(60deg)}  to{transform:rotateZ(420deg)} }
        @keyframes lsOrbit3 { from{transform:rotateZ(-60deg)} to{transform:rotateZ(300deg)} }

        /* Dots */
        .ls-dot {
          position: absolute; border-radius: 50%;
          top: -5px; left: 50%; transform: translateX(-50%);
        }
        .ls-dot-1 { width: 10px; height: 10px; background: #378add; box-shadow: 0 0 12px #378add, 0 0 28px rgba(55,138,221,0.7); }
        .ls-dot-2 { width: 9px;  height: 9px;  background: #5dcaa5; box-shadow: 0 0 12px #5dcaa5, 0 0 24px rgba(93,202,165,0.7); }
        .ls-dot-3 { width: 8px;  height: 8px;  background: #c678dd; box-shadow: 0 0 10px #c678dd, 0 0 20px rgba(198,120,221,0.7); }

        /* Core */
        .ls-core {
          position: absolute;
          width: 72px; height: 72px; border-radius: 50%;
          background: radial-gradient(circle at 38% 35%, #0d2040, #050e1c);
          border: 1.5px solid rgba(55,138,221,0.45);
          display: flex; align-items: center; justify-content: center; gap: 1px;
          font-family: 'Courier New', monospace; font-weight: 900;
          animation: coreGlow 2.8s ease-in-out infinite;
          box-shadow: 0 0 0 6px rgba(55,138,221,0.05), 0 0 40px rgba(55,138,221,0.2), inset 0 1px 0 rgba(255,255,255,0.07);
        }
        @keyframes coreGlow {
          0%,100% { box-shadow: 0 0 0 6px rgba(55,138,221,0.05), 0 0 40px rgba(55,138,221,0.2); border-color: rgba(55,138,221,0.45); }
          50%      { box-shadow: 0 0 0 8px rgba(93,202,165,0.08), 0 0 60px rgba(55,138,221,0.3); border-color: rgba(93,202,165,0.6); }
        }
        .ls-core-lt, .ls-core-gt {
          font-size: 22px; line-height: 1;
          background: linear-gradient(160deg, #61afff, #5dcaa5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ls-core-sl { font-size: 17px; color: rgba(255,255,255,0.5); line-height: 1; }

        /* ── Name block ── */
        .ls-name-block {
          text-align: center;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ls-name-in { opacity: 1; transform: translateY(0); }

        .ls-name {
          font-size: clamp(20px,4vw,26px); font-weight: 800;
          color: #e8f4ff; margin: 0 0 10px; letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .ls-role {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap;
          margin: 0;
        }
        .ls-role-chip {
          font-size: 12px; font-weight: 600;
          background: rgba(55,138,221,0.1);
          border: 1px solid rgba(55,138,221,0.22);
          border-radius: 100px; padding: 3px 11px;
          color: #61afff; font-family: 'Courier New', monospace;
        }
        .ls-role-dot { color: rgba(200,220,255,0.2); font-size: 14px; }

        /* ── Terminal ── */
        .ls-terminal {
          width: 100%;
          background: rgba(8,17,31,0.85);
          border: 1px solid rgba(55,138,221,0.18);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(55,138,221,0.06);
        }
        .ls-term-chrome {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.025);
          border-bottom: 1px solid rgba(55,138,221,0.1);
        }
        .ls-term-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .ls-term-title {
          margin-left: 8px; font-size: 11px;
          color: rgba(200,220,255,0.3);
          font-family: 'Courier New', monospace;
        }
        .ls-term-body {
          padding: 14px 16px;
          display: flex; flex-direction: column; gap: 6px;
          min-height: 140px;
        }
        .ls-term-line {
          display: flex; gap: 9px; align-items: flex-start;
          font-size: 12px; font-family: 'Courier New', monospace;
          line-height: 1.5;
        }
        .ls-term-line-enter { animation: termLineIn 0.22s ease-out; }
        @keyframes termLineIn {
          from { opacity: 0; transform: translateX(-6px); }
          to   { opacity: 1; transform: none; }
        }
        .ls-term-prompt { color: #5dcaa5; flex-shrink: 0; font-weight: 700; }
        .ls-cursor {
          color: #378add;
          animation: lsBlink 0.9s step-end infinite;
        }
        @keyframes lsBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Progress ── */
        .ls-progress-wrap { width: 100%; display: flex; flex-direction: column; gap: 8px; }
        .ls-progress-labels {
          display: flex; justify-content: space-between; align-items: center;
        }
        .ls-progress-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.12em;
          color: rgba(200,220,255,0.3); font-family: 'Courier New', monospace;
        }
        .ls-progress-pct {
          font-size: 12px; font-weight: 800;
          font-family: 'Courier New', monospace;
          transition: color 0.4s;
        }
        .ls-progress-track {
          height: 4px; border-radius: 99px;
          background: rgba(55,138,221,0.08);
          overflow: hidden;
        }
        .ls-progress-fill {
          height: 100%; border-radius: 99px;
          background: linear-gradient(90deg, #378add, #5dcaa5, #c678dd);
          background-size: 200% 100%;
          transition: width 0.4s ease;
          position: relative;
          box-shadow: 0 0 12px rgba(93,202,165,0.6);
          animation: shimmer 2s linear infinite;
        }
        @keyframes shimmer {
          from { background-position: 200% 0; }
          to   { background-position: -200% 0; }
        }
        .ls-progress-shine {
          position: absolute; top: 0; right: 0; bottom: 0;
          width: 40px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shineSlide 1.5s ease-in-out infinite;
        }
        @keyframes shineSlide {
          from { transform: translateX(40px); opacity: 0; }
          50%  { opacity: 1; }
          to   { transform: translateX(-120px); opacity: 0; }
        }

        /* Step dots */
        .ls-progress-dots {
          display: flex; justify-content: center; gap: 8px; padding-top: 2px;
        }
        .ls-step-dot {
          width: 5px; height: 5px; border-radius: 50%;
          transition: background 0.3s, box-shadow 0.3s, transform 0.3s;
        }
      `}</style>
    </div>
  );
}
