"use client";

import { useState } from "react";
import { contactEmail } from "@/app/_lib/portfolio-data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

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
          <p style={{ fontSize: 17, color: "rgba(200,220,255,0.55)", lineHeight: 1.7, margin: 0 }}>
            Whether you have a project, collaboration, or just want to say hi -
            my inbox is always open.
          </p>
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

        <p
          style={{
            textAlign: "center",
            marginTop: 24,
            fontSize: 15,
            color: "rgba(200,220,255,0.3)",
            fontFamily: "'Courier New', monospace",
          }}
        >
          Built by Renz Carljansen Sarucam © 2026
        </p>
      </div>

      <style suppressHydrationWarning>{`
        .contact-section {
          padding: 40px 32px 40px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 80px;
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
            padding: 80px 24px 100px;
          }
        }
      `}</style>
    </section>
  );
}
