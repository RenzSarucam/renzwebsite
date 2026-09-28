"use client";

const services = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Full Stack Development",
    desc: "End-to-end web apps with React / Next.js on the frontend and Laravel or Node.js on the backend.",
    color: "#378add",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
    title: "DevOps & Infrastructure",
    desc: "Docker, GitHub Actions CI/CD, Nginx, Linux server administration, and multi-environment deployments.",
    color: "#5dcaa5",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
      </svg>
    ),
    title: "R&D Engineering",
    desc: "Designing and prototyping internal systems, researching emerging tech, and solving complex business problems.",
    color: "#e5a44b",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    ),
    title: "UI / UX Design",
    desc: "Wireframes, prototypes, and high-fidelity designs in Figma for web and mobile platforms.",
    color: "#c678dd",
  },
];

const facts = [
  { label: "Based in",      value: "Davao City, PH" },
  { label: "Degree",        value: "BSIT — Holy Cross of Davao College" },
  { label: "Experience",    value: "2+ years professional" },
  { label: "Availability",  value: "Open to opportunities" },
  { label: "Languages",     value: "Filipino · English" },
];

export default function About() {
  return (
    <section id="about-section" className="about-section" style={{ position: "relative", zIndex: 1 }}>

      {/* Subtle top divider gradient */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(55,138,221,0.25), transparent)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: 56 }}>
          <p style={{ fontSize: 14, color: "#378add", fontFamily: "'Courier New', monospace", margin: "0 0 8px", letterSpacing: "0.05em" }}>
            00. About
          </p>
          <h2 style={{ fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, color: "#e8f4ff", margin: "0 0 12px" }}>
            Who I Am
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.5)", margin: 0 }}>
            A little bit about me, what I do, and how I work.
          </p>
        </div>

        {/* Main two-column */}
        <div className="about-grid">

          {/* ── Left: Avatar + quick facts ── */}
          <div className="about-left">

            {/* Avatar card */}
            <div className="about-avatar-card">
              {/* Glow ring */}
              <div className="about-avatar-ring" />
              {/* Photo */}
              <div className="about-avatar">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/renz-profile.png"
                  alt="Renz Carljansen Sarucam"
                  className="about-avatar-img"
                />
                {/* Orbiting dot */}
                <div className="about-orbit">
                  <div className="about-orbit-dot" />
                </div>
              </div>
              <h3 className="about-avatar-name">Renz Carljansen Sarucam</h3>
              <p className="about-avatar-role">Full Stack · DevOps · R&D Engineer</p>

              {/* Status */}
              <div className="about-status">
                <span className="about-status-dot" />
                Open to opportunities
              </div>
            </div>

            {/* Quick facts */}
            <div className="about-facts">
              {facts.map(f => (
                <div key={f.label} className="about-fact-row">
                  <span className="about-fact-label">{f.label}</span>
                  <span className="about-fact-value">{f.value}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Bio + services ── */}
          <div className="about-right">

            <div className="about-bio-block">
              <p className="about-bio-text">
                I&apos;m a <strong style={{ color: "#e8f4ff" }}>Full Stack Developer and R&D Engineer</strong> based in Davao City, Philippines, passionate about building efficient, scalable software systems from the ground up.
              </p>
              <p className="about-bio-text">
                My work spans the full development lifecycle — from designing clean user interfaces and building robust APIs, to configuring server infrastructure, automating deployments, and researching new technologies for internal systems.
              </p>
              <p className="about-bio-text">
                Currently working at <strong style={{ color: "#5dcaa5" }}>DSG Son&apos;s Group Inc.</strong> as an R&D Engineer, where I design and manage multi-project Docker infrastructure, CI/CD pipelines, and internal web applications across multiple business units.
              </p>
            </div>

            {/* Services */}
            <div className="about-services-label">What I do</div>
            <div className="about-services">
              {services.map(s => (
                <div key={s.title} className="about-service-card">
                  <div className="about-service-icon" style={{ background: `${s.color}14`, color: s.color, border: `1px solid ${s.color}28` }}>
                    {s.icon}
                  </div>
                  <div>
                    <p className="about-service-title" style={{ color: s.color }}>{s.title}</p>
                    <p className="about-service-desc">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .about-section { padding: 80px 32px 100px; position: relative; overflow: hidden; }

        .about-grid {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 56px;
          align-items: start;
        }

        /* ── Avatar card ── */
        .about-left { display: flex; flex-direction: column; gap: 20px; }

        .about-avatar-card {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.14);
          border-radius: 20px;
          padding: 32px 24px 24px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; position: relative;
          box-shadow: 0 8px 32px rgba(0,0,0,0.2);
        }

        .about-avatar-ring {
          position: absolute; top: 24px; left: 50%; transform: translateX(-50%);
          width: 92px; height: 92px; border-radius: 50%;
          border: 1px solid rgba(55,138,221,0.25);
          animation: ringPulse 3s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%,100% { transform: translateX(-50%) scale(1); opacity: 0.6; }
          50%      { transform: translateX(-50%) scale(1.12); opacity: 0.2; }
        }

        .about-avatar {
          width: 80px; height: 80px; border-radius: 50%;
          background: linear-gradient(135deg, #0d2040, #050e1c);
          border: 2px solid rgba(55,138,221,0.4);
          display: flex; align-items: center; justify-content: center;
          position: relative; margin-bottom: 16px;
          box-shadow: 0 0 0 4px rgba(55,138,221,0.08), 0 0 28px rgba(55,138,221,0.25);
        }
        .about-avatar-img {
          width: 100%; height: 100%;
          border-radius: 50%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }
        .about-orbit {
          position: absolute; width: 100%; height: 100%;
          border-radius: 50%;
          animation: orbitSpin 4s linear infinite;
        }
        @keyframes orbitSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .about-orbit-dot {
          position: absolute; top: -4px; left: 50%; transform: translateX(-50%);
          width: 8px; height: 8px; border-radius: 50%;
          background: #5dcaa5;
          box-shadow: 0 0 8px #5dcaa5;
        }

        .about-avatar-name {
          font-size: 15px; font-weight: 700; color: #e8f4ff;
          margin: 0 0 4px; line-height: 1.3;
        }
        .about-avatar-role {
          font-size: 12px; color: rgba(200,220,255,0.45);
          font-family: 'Courier New', monospace; margin: 0 0 16px;
        }
        .about-status {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 13px; border-radius: 100px;
          background: rgba(93,202,165,0.1);
          border: 1px solid rgba(93,202,165,0.25);
          color: #5dcaa5; font-size: 12px; font-weight: 500;
        }
        .about-status-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #5dcaa5;
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%,100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }

        /* Facts */
        .about-facts {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(55,138,221,0.1);
          border-radius: 14px;
          overflow: hidden;
        }
        .about-fact-row {
          display: flex; justify-content: space-between; align-items: center;
          padding: 11px 16px; gap: 12px;
          border-bottom: 1px solid rgba(55,138,221,0.07);
        }
        .about-fact-row:last-child { border-bottom: none; }
        .about-fact-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: rgba(200,220,255,0.35);
          font-family: 'Courier New', monospace; flex-shrink: 0;
        }
        .about-fact-value {
          font-size: 12.5px; color: #e8f4ff; text-align: right;
          font-weight: 500;
        }

        /* ── Bio + services ── */
        .about-right { display: flex; flex-direction: column; gap: 28px; }

        .about-bio-block { display: flex; flex-direction: column; gap: 14px; }
        .about-bio-text {
          font-size: 16px; color: rgba(200,220,255,0.62);
          line-height: 1.8; margin: 0;
        }

        .about-services-label {
          font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
          text-transform: uppercase; color: rgba(55,138,221,0.6);
          font-family: 'Courier New', monospace;
        }
        .about-services {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .about-service-card {
          display: flex; gap: 14px; align-items: flex-start;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.1);
          border-radius: 12px; padding: 16px;
          transition: border-color 0.2s, transform 0.2s;
        }
        .about-service-card:hover {
          border-color: rgba(55,138,221,0.28);
          transform: translateY(-2px);
        }
        .about-service-icon {
          width: 40px; height: 40px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .about-service-title {
          font-size: 13px; font-weight: 700; margin: 0 0 4px;
        }
        .about-service-desc {
          font-size: 12.5px; color: rgba(200,220,255,0.45);
          line-height: 1.6; margin: 0;
        }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 36px; }
          .about-left { flex-direction: row; flex-wrap: wrap; }
          .about-avatar-card { flex: 1; min-width: 240px; }
          .about-facts { flex: 1; min-width: 240px; }
        }
        @media (max-width: 640px) {
          .about-section { padding: 64px 16px 80px; }
          .about-left { flex-direction: column; }
          .about-services { grid-template-columns: 1fr; }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .about-section { padding: 80px 24px; }
          .about-services { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </section>
  );
}
