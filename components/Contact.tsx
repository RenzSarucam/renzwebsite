"use client";

import { useState } from "react";
import { contactEmail } from "@/app/_lib/portfolio-data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

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

  return (
    <section
      id="contact"
      className="contact-section"
      style={{
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p
            style={{
              fontSize: 14,
              color: "#378add",
              fontFamily: "'Courier New', monospace",
              margin: "0 0 8px",
              letterSpacing: "0.05em",
            }}
          >
            05. Contact
          </p>
          <h2
            style={{
              fontSize: "clamp(32px, 4vw, 44px)",
              fontWeight: 700,
              color: "#e8f4ff",
              margin: "0 0 14px",
            }}
          >
            Get In Touch
          </h2>
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.55)", lineHeight: 1.7, margin: "0 0 16px" }}>
            Whether you have a project, collaboration, or just want to say hi -
            my inbox is always open.
          </p>
          <button
            onClick={copyEmail}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "9px 20px",
              borderRadius: 8,
              background: copied ? "rgba(29,158,117,0.12)" : "rgba(55,138,221,0.08)",
              border: `1px solid ${copied ? "rgba(29,158,117,0.35)" : "rgba(55,138,221,0.25)"}`,
              color: copied ? "#5dcaa5" : "#378add",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.2s",
              fontFamily: "'Courier New', monospace",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {copied
                ? <polyline points="20 6 9 17 4 12" />
                : <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></>
              }
            </svg>
            {copied ? "Copied!" : contactEmail}
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(55,138,221,0.28)",
            borderRadius: 16,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            boxShadow: "0 0 28px rgba(55,138,221,0.13), 0 0 8px rgba(55,138,221,0.07) inset",
          }}
        >
          <div className="contact-form-grid">
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "rgba(200,220,255,0.5)",
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                NAME
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Your name"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(55,138,221,0.2)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e8f4ff",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 14,
                  color: "rgba(200,220,255,0.5)",
                  marginBottom: 6,
                  letterSpacing: "0.05em",
                }}
              >
                EMAIL
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="your@email.com"
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(55,138,221,0.2)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e8f4ff",
                  fontSize: 16,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: 14,
                color: "rgba(200,220,255,0.5)",
                marginBottom: 6,
                letterSpacing: "0.05em",
              }}
            >
              MESSAGE
            </label>
            <textarea
              required
              rows={3}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="What's on your mind?"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid rgba(55,138,221,0.2)",
                background: "rgba(255,255,255,0.04)",
                color: "#e8f4ff",
                fontSize: 16,
                outline: "none",
                resize: "vertical",
                boxSizing: "border-box",
                fontFamily: "inherit",
              }}
            />
          </div>

          <button
            type="submit"
            onMouseEnter={e => { if (!sent) { (e.currentTarget as HTMLButtonElement).style.background = "#2d6fb5"; (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(55,138,221,0.35)"; } }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = sent ? "rgba(29,158,117,0.2)" : "#378add"; (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              background: sent ? "rgba(29,158,117,0.2)" : "#378add",
              border: sent ? "1px solid rgba(29,158,117,0.4)" : "none",
              color: sent ? "#5dcaa5" : "#fff",
              fontSize: 16,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.25s",
              alignSelf: "stretch",
              width: "100%",
            }}
          >
            {sent ? (
              <>Message Sent! ✓</>
            ) : (
              <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                Send Message
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13" />
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" />
                </svg>
              </span>
            )}
          </button>
        </form>

      </div>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <span className="footer-brand-code">&lt;/&gt;</span>
            <span className="footer-brand-name">RCS.dev</span>
          </div>

          {/* Tagline */}
          <p className="footer-tagline">
            Full Stack Developer &amp; DevOps Engineer · Davao City, PH
          </p>

          {/* Social links */}
          <div className="footer-socials">
            <a href="https://github.com/RenzSarucam" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/renz-carljansen-sarucam-195897314/" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://www.facebook.com/renz134542770" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>
            <a href={`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}`} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Email">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
              Email
            </a>
          </div>

          {/* Divider */}
          <div className="footer-divider" />

          {/* Copyright */}
          <p className="footer-copy">
            © 2026 Renz Carljansen Sarucam · Built with Next.js &amp; deployed on Vercel
          </p>
        </div>
      </footer>

      <style suppressHydrationWarning>{`
        .contact-section {
          padding: 20px 32px 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .contact-section input:focus,
        .contact-section textarea:focus {
          border-color: rgba(55,138,221,0.6) !important;
          box-shadow: 0 0 12px rgba(55,138,221,0.25) !important;
        }
        @media (max-width: 640px) {
          .contact-section {
            padding: 64px 16px 80px;
          }
          .contact-form-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 820px) and (min-width: 641px) {
          .contact-section {
            padding: 80px 24px 0;
          }
        }

        /* ── Footer ── */
        .site-footer {
          background: rgba(2,10,20,0.7);
          border-top: 1px solid rgba(55,138,221,0.12);
          padding: 40px 32px 32px;
          margin-top: 60px;
        }
        .footer-inner {
          max-width: 700px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
          text-align: center;
        }
        .footer-brand {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .footer-brand-code {
          font-family: 'Courier New', monospace;
          font-size: 15px;
          font-weight: 900;
          background: linear-gradient(135deg, #61afff, #5dcaa5);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-brand-name {
          color: #e8f4ff;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .footer-tagline {
          font-size: 13px;
          color: rgba(200,220,255,0.4);
          margin: 0;
          font-family: 'Courier New', monospace;
          letter-spacing: 0.03em;
        }
        .footer-socials {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .footer-social-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 8px;
          border: 1px solid rgba(55,138,221,0.18);
          color: rgba(200,220,255,0.55);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          font-family: inherit;
        }
        .footer-social-link:hover {
          color: #61afff;
          border-color: rgba(55,138,221,0.5);
          background: rgba(55,138,221,0.08);
        }
        .footer-divider {
          width: 100%;
          height: 1px;
          background: rgba(55,138,221,0.1);
          margin: 4px 0;
        }
        .footer-copy {
          font-size: 12px;
          color: rgba(200,220,255,0.25);
          font-family: 'Courier New', monospace;
          margin: 0;
          letter-spacing: 0.03em;
        }
        @media (max-width: 640px) {
          .site-footer { padding: 32px 16px 24px; }
          .footer-social-link { font-size: 12px; padding: 6px 10px; }
        }
      `}</style>
    </section>
  );
}
