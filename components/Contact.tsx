"use client";

import { useState } from "react";
import { contactEmail } from "@/app/_lib/portfolio-data";

const footerNav: [string, string][] = [
  ["About", "about-section"],
  ["Projects", "projects"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Credentials", "certificates"],
  ["Contact", "contact"],
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const copyEmail = async () => {
    // navigator.clipboard only exists on secure origins (https / localhost); fall back for plain http.
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(contactEmail);
      } else {
        const ta = document.createElement("textarea");
        ta.value = contactEmail;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        const ok = document.execCommand("copy");
        document.body.removeChild(ta);
        if (!ok) throw new Error("copy failed");
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Copy isn't available: open a compose window instead so the click still does something useful.
      window.open(`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}`, "_blank", "noopener,noreferrer");
    }
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}&su=${subject}&body=${body}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    setSent(true);
    window.setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  const inputStyle = (field: string) => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: 10,
    border: `1px solid ${focused === field ? "#A3A3A3" : "#3A3A3A"}`,
    background: "#1A1A1A",
    color: "#F5F5F5",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(255,255,255,0.05), 0 0 18px rgba(255,255,255,0.06)" : "none",
    fontFamily: "inherit",
  });

  return (
    <section id="contact" className="contact-section" style={{ position: "relative", zIndex: 1 }}>

      {/* Background glow orbs */}
      <div className="contact-orb contact-orb-1" />
      <div className="contact-orb contact-orb-2" />

      <div className="contact-inner">
        <div className="contact-grid">

          {/* ── Left panel ── */}
          <div className="contact-left">

            {/* Section label */}
            <p style={{ fontSize: 13, color: "#FFFFFF", fontFamily: "'Courier New', monospace", margin: "0 0 14px", letterSpacing: "0.06em" }}>
              05. Contact
            </p>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "#F5F5F5", margin: "0 0 14px", lineHeight: 1.2 }}>
              Let&apos;s Work<br />Together
            </h2>

            <p className="contact-left-sub">
              Whether you have a project, a collaboration idea, or just want to say hi — my inbox is always open. I&apos;ll get back to you within 24 hours.
            </p>

            {/* Availability badge */}
            <div className="avail-badge">
              <span className="avail-dot" />
              <span>Available for new projects</span>
            </div>

            {/* Info cards */}
            <div className="contact-info-list">
              {/* Email */}
              <button
                className={`contact-info-card contact-copy${copied ? " is-copied" : ""}`}
                onClick={copyEmail}
                aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
              >
                <div className="cic-icon" style={copied ? undefined : { background: "rgba(255,255,255,0.06)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.12)" }}>
                  {copied ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  )}
                </div>
                <div className="cic-body">
                  <span className="cic-label">{copied ? "Copied to clipboard" : "Email"}</span>
                  <span className="cic-value">{contactEmail}</span>
                </div>
                <div className="cic-action">
                  {copied ? (
                    <span className="cic-pill cic-pill-done">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      Copied
                    </span>
                  ) : (
                    <span className="cic-pill cic-pill-idle">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      <span className="cic-pill-text">Copy</span>
                    </span>
                  )}
                </div>
              </button>

              {/* Location */}
              <div className="contact-info-card" style={{ cursor: "default" }}>
                <div className="cic-icon" style={{ background: "rgba(255,255,255,0.05)", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.12)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="cic-body">
                  <span className="cic-label">Location</span>
                  <span className="cic-value">Davao City, Philippines</span>
                </div>
              </div>

              {/* Response time */}
              <div className="contact-info-card" style={{ cursor: "default" }}>
                <div className="cic-icon" style={{ background: "rgba(163,163,163,0.1)", color: "#A3A3A3", border: "1px solid rgba(163,163,163,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div className="cic-body">
                  <span className="cic-label">Response Time</span>
                  <span className="cic-value">Within 24 hours</span>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right: Form + Socials ── */}
          <div className="contact-right">
            <form onSubmit={handleSubmit} className="contact-form-card">

              {/* Accent top bar */}
              <div className="form-accent-bar" />

              <div style={{ padding: "28px 28px 32px" }}>
                <p className="form-eyebrow">Send a message</p>

                <div className="contact-form-grid" style={{ marginBottom: 18 }}>
                  <div className="cf-field">
                    <label className="cf-label">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      placeholder="Your name"
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={() => setFocused("name")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("name")}
                    />
                  </div>
                  <div className="cf-field">
                    <label className="cf-label">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      placeholder="your@email.com"
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={() => setFocused("email")}
                      onBlur={() => setFocused(null)}
                      style={inputStyle("email")}
                    />
                  </div>
                </div>

                <div className="cf-field" style={{ marginBottom: 24 }}>
                  <label className="cf-label">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    placeholder="Tell me about your project, idea, or just say hi..."
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={() => setFocused("message")}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle("message"), resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  className={`contact-submit${sent ? " contact-submit-sent" : ""}`}
                >
                  {sent ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Message Sent!
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                      </svg>
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Social row — below the card */}
            <div className="contact-socials" style={{ marginTop: 16 }}>
              <a href="https://github.com/RenzSarucam" target="_blank" rel="noopener noreferrer" className="cs-link" aria-label="GitHub">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/renz-carljansen-sarucam-195897314/" target="_blank" rel="noopener noreferrer" className="cs-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://www.facebook.com/renz134542770" target="_blank" rel="noopener noreferrer" className="cs-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </a>
              <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}`} target="_blank" rel="noopener noreferrer" className="cs-link" aria-label="Email">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
                Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-top">
            <div className="footer-about">
              <p className="footer-wordmark">Renz<span>.dev</span></p>
              <p className="footer-tagline">Full-Stack Web Developer · Docker &amp; CI/CD · R&amp;D Engineer, building internal systems from interface to server.</p>
              <p className="footer-place">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 13-8 13s-8-7-8-13a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                Davao City, Philippines
              </p>
            </div>

            <div className="footer-col" role="navigation" aria-label="Footer navigation">
              <p className="footer-label">Navigate</p>
              <ul>
                {footerNav.map(([label, id]) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="footer-link"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                      }}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-label">Connect</p>
              <ul>
                <li><a className="footer-link footer-ext" href="https://github.com/RenzSarucam" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>GitHub<span aria-hidden="true">↗</span></a></li>
                <li><a className="footer-link footer-ext" href="https://www.linkedin.com/in/renz-carljansen-sarucam-195897314/" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>LinkedIn<span aria-hidden="true">↗</span></a></li>
                <li><a className="footer-link footer-ext" href="https://www.facebook.com/renz134542770" target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>Facebook<span aria-hidden="true">↗</span></a></li>
                <li><a className="footer-link footer-ext" href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}`} target="_blank" rel="noopener noreferrer"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>Email<span aria-hidden="true">↗</span></a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Renz Carljansen Sarucam</p>
            <p className="footer-built">Built with Next.js &amp; deployed on Vercel</p>
            <a
              href="#about"
              className="footer-link footer-top-link"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            >
              Back to top <span aria-hidden="true">↑</span>
            </a>
          </div>
        </div>
      </footer>

      <style suppressHydrationWarning>{`
        .contact-section {
          padding: 100px 32px 0;
          position: relative;
          overflow: hidden;
        }
        /* Fills the screen when you jump here, so the footer stays below the fold */
        .contact-inner { max-width: 1100px; margin: 0 auto; min-height: calc(100svh - 100px); }

        /* Background orbs */
        .contact-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(90px); opacity: 0.22; z-index: 0;
        }
        .contact-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #F5F5F5 0%, transparent 70%);
          top: -100px; left: -160px;
        }
        .contact-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, #F5F5F5 0%, transparent 70%);
          bottom: 80px; right: -120px;
        }

        /* Two-column layout */
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 56px;
          align-items: start;
          position: relative; z-index: 1;
        }

        /* ── Left panel ── */
        .contact-left { display: flex; flex-direction: column; gap: 0; }

        .avail-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 6px 14px; border-radius: 100px;
          background: rgba(34,197,94,0.1);
          border: 1px solid rgba(34,197,94,0.35);
          color: #4ADE80; font-size: 13px; font-weight: 500;
          width: fit-content; margin-bottom: 20px; margin-top: 20px;
        }
        .avail-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 0 2px rgba(34,197,94,0.25);
          animation: availPulse 2s ease-in-out infinite;
        }
        @keyframes availPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.25); }
          50% { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
        }

        .contact-left-sub {
          font-size: 15px; color: #A3A3A3;
          line-height: 1.75; margin: 0 0 28px;
        }

        /* Info cards */
        .contact-info-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .contact-info-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 12px;
          background: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.06);
          text-align: left; width: 100%;
          box-sizing: border-box;
          -webkit-appearance: none; appearance: none;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .contact-info-card:hover {
          border-color: rgba(255,255,255,0.168);
          background: rgba(255,255,255,0.02);
        }
        .cic-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cic-body { flex: 1; min-width: 0; }
        .cic-label { display: block; font-size: 11px; color: #A3A3A3; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2px; }
        .cic-value { display: block; font-size: 14px; color: #F5F5F5; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cic-action { flex-shrink: 0; }
        .cic-pill {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 11px; border-radius: 999px; font-size: 12px; font-weight: 600;
        }
        .cic-pill-idle { color: rgba(255,255,255,0.3); border: 1px solid transparent; transition: color 0.2s, border-color 0.2s; }
        .cic-pill-idle .cic-pill-text { display: none; }
        .contact-copy:hover .cic-pill-idle, .contact-copy:focus-visible .cic-pill-idle { color: #FFFFFF; border-color: rgba(255,255,255,0.18); }
        .contact-copy:hover .cic-pill-idle .cic-pill-text, .contact-copy:focus-visible .cic-pill-idle .cic-pill-text { display: inline; }
        .cic-pill-done { color: #4ADE80; background: rgba(34,197,94,0.12); border: 1px solid rgba(34,197,94,0.35); animation: copiedPop 0.28s cubic-bezier(.34,1.56,.64,1); }
        @keyframes copiedPop { from { transform: scale(0.85); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .contact-copy.is-copied { border-color: rgba(34,197,94,0.45); background: rgba(34,197,94,0.06); }
        .contact-copy.is-copied .cic-icon { background: rgba(34,197,94,0.15); color: #4ADE80; border: 1px solid rgba(34,197,94,0.4); }
        .contact-copy.is-copied .cic-label { color: #4ADE80; }
        @media (prefers-reduced-motion: reduce) { .cic-pill-done { animation: none; } }

        /* Social row */
        .contact-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .cs-link {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 12px 22px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.12);
          color: #A3A3A3;
          font-size: 15px; font-weight: 600;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .cs-link:hover {
          color: #FFFFFF;
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.045);
          transform: translateY(-2px);
        }

        /* ── Form card ── */
        .contact-form-card {
          background: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.108);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.06) inset;
        }
        .form-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #F5F5F5, #F5F5F5, #2A2A2A);
        }
        .form-eyebrow {
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(255,255,255,0.3);
          font-family: 'Courier New', monospace;
          margin: 0 0 20px;
        }

        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .cf-field { display: flex; flex-direction: column; gap: 6px; }
        .cf-label {
          font-size: 12px; font-weight: 600; letter-spacing: 0.08em;
          text-transform: uppercase; color: #A3A3A3;
        }

        .contact-submit {
          width: 100%; padding: 14px;
          border-radius: 10px; border: none;
          background: linear-gradient(135deg, #F5F5F5, #F5F5F5);
          color: #111111; font-size: 16px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 18px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .contact-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.45);
          background: linear-gradient(135deg, #F5F5F5, #F5F5F5);
        }
        .contact-submit:active { transform: translateY(0); }
        .contact-submit-sent {
          background: rgba(255,255,255,0.075) !important;
          border: 1px solid rgba(255,255,255,0.21) !important;
          color: #FFFFFF !important;
          box-shadow: none !important;
          transform: none !important;
        }

        /* ── Footer ── */
        .site-footer {
          background: #0D0D0D;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding: 40px 32px 28px;
          margin-top: 48px;
          position: relative; z-index: 1;
        }
        .footer-inner { max-width: 1100px; margin: 0 auto; }
        .footer-top {
          display: grid; grid-template-columns: 1.6fr 1fr 1fr; gap: 48px;
          padding-bottom: 28px;
        }
        .footer-wordmark { margin: 0 0 10px; font-size: 26px; font-weight: 800; letter-spacing: -0.03em; color: #F5F5F5; line-height: 1; }
        .footer-wordmark span { color: #737373; }
        .footer-tagline { margin: 0 0 12px; max-width: 360px; font-size: 13.5px; line-height: 1.65; color: #A3A3A3; }
        .footer-place { margin: 0; font-size: 13px; color: #737373; display: flex; align-items: center; gap: 8px; }
        .footer-label {
          margin: 0 0 14px; font-size: 11px; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; color: #737373;
        }
        .footer-col ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 9px; }
        .footer-col[role="navigation"] ul { display: grid; grid-template-columns: repeat(2, auto); justify-content: start; gap: 9px 36px; }
        .footer-link {
          color: #A3A3A3; font-size: 14px; text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-link:hover, .footer-link:focus-visible { color: #FFFFFF; }
        .footer-ext { display: inline-flex; align-items: center; gap: 9px; }
        .footer-ext svg { flex-shrink: 0; opacity: 0.8; }
        .footer-ext span { font-size: 12px; opacity: 0; transform: translate(-3px, 3px); transition: opacity 0.2s ease, transform 0.2s ease; }
        .footer-ext:hover span, .footer-ext:focus-visible span { opacity: 1; transform: none; }
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px 24px;
          padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.08);
        }
        .footer-bottom p { margin: 0; font-size: 12.5px; color: #737373; }
        .footer-built { flex: 1; text-align: center; }
        .footer-top-link { font-size: 12.5px; }

        @media (max-width: 1300px) { .site-footer { padding-bottom: 96px; } }
        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 36px; }
          .contact-section { padding: 80px 24px 0; }
        }
        @media (max-width: 640px) {
          .contact-section { padding: 64px 16px 0; }
          .contact-form-grid { grid-template-columns: 1fr; }
          .site-footer { padding: 32px 16px 96px; }
          .footer-top { grid-template-columns: 1fr 1fr; gap: 36px 24px; }
          .footer-about { grid-column: 1 / -1; }
          .footer-built { flex-basis: 100%; order: 3; text-align: left; }
          .contact-orb-1 { width: 280px; height: 280px; }
          .contact-orb-2 { width: 220px; height: 220px; }
        }
      `}</style>
    </section>
  );
}
