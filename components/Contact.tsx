"use client";

import { useState } from "react";
import { contactEmail } from "@/app/_lib/portfolio-data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactEmail).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
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
    border: `1px solid ${focused === field ? "rgba(55,138,221,0.55)" : "rgba(55,138,221,0.14)"}`,
    background: focused === field ? "rgba(55,138,221,0.06)" : "rgba(255,255,255,0.03)",
    color: "#e8f4ff",
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box" as const,
    transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    boxShadow: focused === field ? "0 0 0 3px rgba(55,138,221,0.1), 0 0 18px rgba(55,138,221,0.12)" : "none",
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
            <p style={{ fontSize: 13, color: "#378add", fontFamily: "'Courier New', monospace", margin: "0 0 14px", letterSpacing: "0.06em" }}>
              05. Contact
            </p>

            <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, color: "#e8f4ff", margin: "0 0 14px", lineHeight: 1.2 }}>
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
              <button className="contact-info-card" onClick={copyEmail}>
                <div className="cic-icon" style={{ background: "rgba(55,138,221,0.12)", color: "#61afff", border: "1px solid rgba(55,138,221,0.2)" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div className="cic-body">
                  <span className="cic-label">Email</span>
                  <span className="cic-value">{copied ? "Copied!" : contactEmail}</span>
                </div>
                <div className="cic-action" style={{ color: copied ? "#5dcaa5" : "rgba(55,138,221,0.5)" }}>
                  {copied ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  )}
                </div>
              </button>

              {/* Location */}
              <div className="contact-info-card" style={{ cursor: "default" }}>
                <div className="cic-icon" style={{ background: "rgba(93,202,165,0.1)", color: "#5dcaa5", border: "1px solid rgba(93,202,165,0.2)" }}>
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
                <div className="cic-icon" style={{ background: "rgba(229,164,75,0.1)", color: "#e5a44b", border: "1px solid rgba(229,164,75,0.2)" }}>
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
          <div className="footer-brand">
            <span className="footer-brand-code">&lt;/&gt;</span>
            <span className="footer-brand-name">RCS.dev</span>
          </div>
          <p className="footer-tagline">Full Stack Developer &amp; DevOps Engineer · Davao City, PH</p>
          <div className="footer-socials">
            <a href="https://github.com/RenzSarucam" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/renz-carljansen-sarucam-195897314/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://www.facebook.com/renz134542770" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Email">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              Email
            </a>
          </div>
          <div className="footer-divider" />
          <p className="footer-copy">© 2026 Renz Carljansen Sarucam · Built with Next.js &amp; deployed on Vercel</p>
        </div>
      </footer>

      <style suppressHydrationWarning>{`
        .contact-section {
          padding: 100px 32px 0;
          position: relative;
          overflow: hidden;
        }
        .contact-inner { max-width: 1100px; margin: 0 auto; }

        /* Background orbs */
        .contact-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(90px); opacity: 0.22; z-index: 0;
        }
        .contact-orb-1 {
          width: 480px; height: 480px;
          background: radial-gradient(circle, #378add 0%, transparent 70%);
          top: -100px; left: -160px;
        }
        .contact-orb-2 {
          width: 360px; height: 360px;
          background: radial-gradient(circle, #5dcaa5 0%, transparent 70%);
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
          background: rgba(93,202,165,0.1);
          border: 1px solid rgba(93,202,165,0.25);
          color: #5dcaa5; font-size: 13px; font-weight: 500;
          width: fit-content; margin-bottom: 20px; margin-top: 20px;
        }
        .avail-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5dcaa5;
          box-shadow: 0 0 0 2px rgba(93,202,165,0.25);
          animation: availPulse 2s ease-in-out infinite;
        }
        @keyframes availPulse {
          0%, 100% { box-shadow: 0 0 0 2px rgba(93,202,165,0.25); }
          50% { box-shadow: 0 0 0 5px rgba(93,202,165,0.1); }
        }

        .contact-left-sub {
          font-size: 15px; color: rgba(200,220,255,0.5);
          line-height: 1.75; margin: 0 0 28px;
        }

        /* Info cards */
        .contact-info-list { display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
        .contact-info-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; border-radius: 12px;
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(55,138,221,0.1);
          text-align: left; width: 100%;
          box-sizing: border-box;
          -webkit-appearance: none; appearance: none;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .contact-info-card:hover {
          border-color: rgba(55,138,221,0.28);
          background: rgba(55,138,221,0.04);
        }
        .cic-icon {
          width: 38px; height: 38px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .cic-body { flex: 1; min-width: 0; }
        .cic-label { display: block; font-size: 11px; color: rgba(200,220,255,0.4); font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 2px; }
        .cic-value { display: block; font-size: 14px; color: #e8f4ff; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .cic-action { flex-shrink: 0; }

        /* Social row */
        .contact-socials { display: flex; gap: 10px; flex-wrap: wrap; }
        .cs-link {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 12px 22px; border-radius: 10px;
          border: 1px solid rgba(55,138,221,0.2);
          color: rgba(200,220,255,0.65);
          font-size: 15px; font-weight: 600;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s, transform 0.2s;
        }
        .cs-link:hover {
          color: #61afff;
          border-color: rgba(55,138,221,0.5);
          background: rgba(55,138,221,0.09);
          transform: translateY(-2px);
        }

        /* ── Form card ── */
        .contact-form-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(55,138,221,0.18);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 24px 64px rgba(0,0,0,0.3), 0 0 0 1px rgba(55,138,221,0.06) inset;
        }
        .form-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #378add, #5dcaa5, #c678dd);
        }
        .form-eyebrow {
          font-size: 12px; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: rgba(55,138,221,0.6);
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
          text-transform: uppercase; color: rgba(200,220,255,0.45);
        }

        .contact-submit {
          width: 100%; padding: 14px;
          border-radius: 10px; border: none;
          background: linear-gradient(135deg, #378add, #2d6fb5);
          color: #fff; font-size: 16px; font-weight: 600;
          cursor: pointer; font-family: inherit;
          box-shadow: 0 4px 18px rgba(55,138,221,0.3);
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .contact-submit:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(55,138,221,0.45);
          background: linear-gradient(135deg, #4a9ae8, #378add);
        }
        .contact-submit:active { transform: translateY(0); }
        .contact-submit-sent {
          background: rgba(93,202,165,0.15) !important;
          border: 1px solid rgba(93,202,165,0.35) !important;
          color: #5dcaa5 !important;
          box-shadow: none !important;
          transform: none !important;
        }

        /* ── Footer ── */
        .site-footer {
          background: rgba(2,10,20,0.7);
          border-top: 1px solid rgba(55,138,221,0.1);
          padding: 40px 32px 32px;
          margin-top: 72px;
          position: relative; z-index: 1;
        }
        .footer-inner {
          max-width: 700px; margin: 0 auto;
          display: flex; flex-direction: column; align-items: center;
          gap: 16px; text-align: center;
        }
        .footer-brand { display: flex; align-items: center; gap: 8px; }
        .footer-brand-code {
          font-family: 'Courier New', monospace; font-size: 15px; font-weight: 900;
          background: linear-gradient(135deg, #61afff, #5dcaa5);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .footer-brand-name { color: #e8f4ff; font-size: 16px; font-weight: 700; letter-spacing: 0.02em; }
        .footer-tagline { font-size: 13px; color: rgba(200,220,255,0.4); margin: 0; font-family: 'Courier New', monospace; letter-spacing: 0.03em; }
        .footer-socials { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; justify-content: center; }
        .footer-social-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 8px;
          border: 1px solid rgba(55,138,221,0.15);
          color: rgba(200,220,255,0.5); font-size: 13px; font-weight: 500;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .footer-social-link:hover { color: #61afff; border-color: rgba(55,138,221,0.45); background: rgba(55,138,221,0.08); }
        .footer-divider { width: 100%; height: 1px; background: rgba(55,138,221,0.09); margin: 4px 0; }
        .footer-copy { font-size: 12px; color: rgba(200,220,255,0.25); font-family: 'Courier New', monospace; margin: 0; letter-spacing: 0.03em; }

        @media (max-width: 860px) {
          .contact-grid { grid-template-columns: 1fr; gap: 36px; }
          .contact-section { padding: 80px 24px 0; }
        }
        @media (max-width: 640px) {
          .contact-section { padding: 64px 16px 0; }
          .contact-form-grid { grid-template-columns: 1fr; }
          .site-footer { padding: 32px 16px 24px; }
          .contact-orb-1 { width: 280px; height: 280px; }
          .contact-orb-2 { width: 220px; height: 220px; }
        }
      `}</style>
    </section>
  );
}
