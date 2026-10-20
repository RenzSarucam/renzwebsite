"use client";

import { useEffect, useRef, useState } from "react";

const BOOT_LINES = [
  { text: "Initializing system...",                    color: "#A3A3A3" },
  { text: "Loading modules: React · Next.js · TypeScript", color: "#A3A3A3" },
  { text: "Connecting to DevOps pipeline...",          color: "#A3A3A3" },
  { text: "Mounting Docker containers...",             color: "#FFFFFF" },
  { text: "Syncing GitHub repository...",              color: "#A3A3A3" },
  { text: "Configuring Nginx proxy...",                color: "#A3A3A3" },
  { text: "Building portfolio assets...",              color: "#FFFFFF" },
  { text: "Launch sequence complete.",                 color: "#FFFFFF" },
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
    // Remove the instant HTML pre-loader now that the animated screen is taking over
    const preLoader = document.getElementById("pre-loader");
    if (preLoader) preLoader.style.display = "none";

    const t0 = setTimeout(() => setNameIn(true), 200);
    timerRef.current.push(t0);

    const totalDuration = 1600;
    const lineInterval  = totalDuration / BOOT_LINES.length;

    BOOT_LINES.forEach((_, i) => {
      const t = setTimeout(() => {
        setLineCount(i + 1);
        setProgress(Math.round(((i + 1) / BOOT_LINES.length) * 100));
      }, 200 + i * lineInterval);
      timerRef.current.push(t);
    });

    const t1 = setTimeout(() => setFading(true),  totalDuration + 300);
    const t2 = setTimeout(() => setVisible(false), totalDuration + 900);
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
          <div className="ls-rings" aria-hidden="true">
            <div className="ls-plane ls-plane-1"><div className="ls-spin ls-spin-1"><i className="ls-dot ls-dot-1" /></div></div>
            <div className="ls-plane ls-plane-2"><div className="ls-spin ls-spin-2"><i className="ls-dot ls-dot-2" /></div></div>
            <div className="ls-plane ls-plane-3"><div className="ls-spin ls-spin-3"><i className="ls-dot ls-dot-3" /></div></div>
            <div className="ls-core ls-core-base">
              <span className="ls-core-lt">&lt;</span>
              <span className="ls-core-sl">/</span>
              <span className="ls-core-gt">&gt;</span>
            </div>
          </div>
        </div>

        {/* Name block */}
        <div className={`ls-name-block${nameIn ? " ls-name-in" : ""}`}>
          <h1 className="ls-name">Renz Carljansen Sarucam</h1>
          <p className="ls-role">
            <span className="ls-role-chip">Full-Stack Web Developer</span>
            <span className="ls-role-dot">·</span>
            <span className="ls-role-chip">Docker &amp; CI/CD</span>
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
                <span style={{ color: i === lineCount - 1 ? line.color : "#A3A3A3" }}>
                  {line.text}
                </span>
                {i === lineCount - 1 && progress < 100 && (
                  <span className="ls-cursor">▋</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Progress — arc ring */}
        <div className="ls-ring-wrap">
          <div className="ls-ring-area">
            <svg width="68" height="68" viewBox="0 0 68 68" style={{ transform: "rotate(-90deg)" }}>
              <defs>
                <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#F5F5F5" />
                  <stop offset="50%"  stopColor="#F5F5F5" />
                  <stop offset="100%" stopColor="#F5F5F5" />
                </linearGradient>
                <filter id="arcGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>
              <circle cx="34" cy="34" r="28" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="3.5" />
              <circle
                cx="34" cy="34" r="28" fill="none"
                stroke="url(#arcGrad)" strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 28}`}
                strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                filter="url(#arcGlow)"
                style={{ transition: "stroke-dashoffset 0.45s ease" }}
              />
            </svg>
            <div className="ls-ring-center">
              <span className="ls-ring-pct" style={{ color: progress === 100 ? "#F5F5F5" : "#F5F5F5" }}>{progress}</span>
            </div>
          </div>

          <div className="ls-ring-info">
            <span className="ls-ring-label">INITIALIZING PORTFOLIO</span>
            <span className="ls-ring-status">
              {progress === 100
                ? <span style={{ color: "#FFFFFF" }}>✓ Launch sequence complete</span>
                : BOOT_LINES[lineCount - 1]?.text ?? "Starting..."}
            </span>
          </div>
        </div>

      </div>

      <style suppressHydrationWarning>{`
        /* ── Root ── */
        .ls-root {
          position: fixed; inset: 0; z-index: 99999;
          background: #0D0D0D;
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
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 48px 48px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
          pointer-events: none;
        }
        .ls-bg-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(100px);
        }
        .ls-orb-1 { width: 600px; height: 600px; background: rgba(255,255,255,0.05);  top: -150px; left: -150px; animation: orbDrift 8s ease-in-out infinite alternate; }
        .ls-orb-2 { width: 500px; height: 500px; background: rgba(255,255,255,0.04); bottom: -120px; right: -120px; animation: orbDrift 10s ease-in-out infinite alternate-reverse; }
        .ls-orb-3 { width: 300px; height: 300px; background: rgba(255,255,255,0.03); top: 40%; left: 60%; animation: orbDrift 7s ease-in-out infinite alternate; }
        @keyframes orbDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.08); }
        }
        .ls-scanlines {
          position: absolute; inset: 0; pointer-events: none;
          background: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.004) 3px, rgba(255,255,255,0.004) 4px);
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
          border-color: rgba(255,255,255,0.072);
          animation: grPulse 3s ease-in-out infinite;
        }
        .ls-gr-2 {
          width: 200px; height: 200px;
          border-color: rgba(255,255,255,0.048);
          animation: grPulse 3s ease-in-out infinite 1.5s;
        }
        @keyframes grPulse {
          0%,100% { opacity: 0.5; transform: translate(-50%,-50%) scale(1); }
          50%      { opacity: 1;   transform: translate(-50%,-50%) scale(1.06); }
        }

        /* Three real 3D orbits tumbling around a glossy core */
        .ls-atom-wrap { perspective: 520px; }
        .ls-rings {
          position: absolute; inset: 0;
          transform-style: preserve-3d;
          animation: lsTumble 12s linear infinite;
        }
        @keyframes lsTumble {
          from { transform: rotateX(-22deg) rotateY(0deg); }
          to   { transform: rotateX(-22deg) rotateY(360deg); }
        }
        .ls-plane {
          position: absolute; left: 50%; top: 50%;
          width: 156px; height: 156px; margin: -78px 0 0 -78px;
          border: 1.5px solid rgba(255,255,255,0.3);
          border-radius: 50%;
          transform-style: preserve-3d;
        }
        .ls-plane-1 { transform: rotateX(78deg) rotateZ(0deg); }
        .ls-plane-2 { transform: rotateX(78deg) rotateZ(60deg); }
        .ls-plane-3 { transform: rotateX(78deg) rotateZ(120deg); }
        .ls-spin { position: absolute; inset: -1.5px; border-radius: 50%; }
        .ls-spin-1 { animation: lsSpin 3.2s linear infinite; }
        .ls-spin-2 { animation: lsSpin 2.4s linear infinite reverse; }
        .ls-spin-3 { animation: lsSpin 4.2s linear infinite; }
        @keyframes lsSpin { to { transform: rotateZ(360deg); } }

        /* Dots */
        .ls-dot {
          position: absolute; display: block; border-radius: 50%;
          top: -5px; left: 50%; margin-left: -5px;
          background: radial-gradient(circle at 35% 30%, #FFFFFF, #A3A3A3 60%, #525252);
          box-shadow: 0 0 12px rgba(255,255,255,0.3);
        }
        .ls-dot-1 { width: 10px; height: 10px; }
        .ls-dot-2 { width: 9px;  height: 9px;  margin-left: -4.5px; top: -4.5px; }
        .ls-dot-3 { width: 8px;  height: 8px;  margin-left: -4px;   top: -4px; }

        /* Glossy sphere core */
        .ls-core {
          left: 50%; top: 50%; margin: -38px 0 0 -38px;
          animation: lsFace 12s linear infinite;
        }
        @keyframes lsFace {
          from { transform: rotateY(0deg) rotateX(22deg); }
          to   { transform: rotateY(-360deg) rotateX(22deg); }
        }
        .ls-core, .ls-core-base {
          position: absolute;
          width: 76px; height: 76px; border-radius: 50%;
          background: radial-gradient(circle at 32% 26%, #6b6b6b 0%, #2a2a2a 48%, #0b0b0b 100%);
          display: flex; align-items: center; justify-content: center; gap: 1px;
          font-family: 'Courier New', monospace; font-weight: 900;
          box-shadow: inset -8px -10px 18px rgba(0,0,0,0.85), inset 3px 3px 8px rgba(255,255,255,0.22), 0 14px 30px rgba(0,0,0,0.7);
        }
        .ls-core-lt, .ls-core-gt {
          font-size: 22px; line-height: 1;
          background: linear-gradient(160deg, #F5F5F5, #F5F5F5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ls-core-sl { font-size: 17px; color: #A3A3A3; line-height: 1; }

        /* ── Name block ── */
        .ls-name-block {
          text-align: center;
          opacity: 0; transform: translateY(16px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .ls-name-in { opacity: 1; transform: translateY(0); }

        .ls-name {
          font-size: clamp(20px,4vw,26px); font-weight: 800;
          color: #F5F5F5; margin: 0 0 10px; letter-spacing: -0.01em;
          line-height: 1.2;
        }
        .ls-role {
          display: flex; align-items: center; justify-content: center;
          gap: 8px; flex-wrap: wrap;
          margin: 0;
        }
        .ls-role-chip {
          font-size: 12px; font-weight: 600;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.132);
          border-radius: 100px; padding: 3px 11px;
          color: #FFFFFF; font-family: 'Courier New', monospace;
        }
        .ls-role-dot { color: #A3A3A3; font-size: 14px; }

        /* ── Terminal ── */
        .ls-terminal {
          width: 100%;
          background: rgba(13,13,13,0.85);
          border: 1px solid rgba(255,255,255,0.108);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,0,0,0.06);
        }
        .ls-term-chrome {
          display: flex; align-items: center; gap: 6px;
          padding: 10px 14px;
          background: #1A1A1A;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .ls-term-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .ls-term-title {
          margin-left: 8px; font-size: 11px;
          color: #A3A3A3;
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
        .ls-term-prompt { color: #FFFFFF; flex-shrink: 0; font-weight: 700; }
        .ls-cursor {
          color: #FFFFFF;
          animation: lsBlink 0.9s step-end infinite;
        }
        @keyframes lsBlink { 0%,100%{opacity:1} 50%{opacity:0} }

        /* ── Ring progress ── */
        .ls-ring-wrap {
          width: 100%; display: flex; align-items: center; gap: 20px;
          background: rgba(13,13,13,0.55);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px; padding: 16px 22px;
        }
        .ls-ring-area {
          flex-shrink: 0;
          width: 68px; height: 68px;
          display: grid;
          place-items: center;
        }
        .ls-ring-area > * { grid-area: 1 / 1; }
        .ls-ring-center {
          display: flex; align-items: center; justify-content: center;
          width: 68px; height: 68px;
          pointer-events: none;
        }
        .ls-ring-pct {
          font-size: 18px; font-weight: 900;
          font-family: 'Courier New', monospace;
          transition: color 0.4s; line-height: 1;
        }
        .ls-ring-sym {
          font-size: 9px; font-weight: 700;
          color: #A3A3A3;
          font-family: 'Courier New', monospace;
          margin-top: 1px;
        }

        .ls-ring-info {
          flex: 1; min-width: 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .ls-ring-label {
          font-size: 10px; font-weight: 700; letter-spacing: 0.14em;
          color: #A3A3A3; font-family: 'Courier New', monospace;
        }
        .ls-ring-status {
          font-size: 12px; color: #A3A3A3;
          font-family: 'Courier New', monospace;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
      `}</style>
    </div>
  );
}
