"use client";

import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted:", form);
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
        <div style={{ textAlign: "center", marginBottom: 52 }}>
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

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 14,
            marginBottom: 44,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "GitHub",
              href: "https://github.com/RenzSarucam",
              icon: "GitHub",
            },
            {
              label: "Facebook",
              href: "https://facebook.com/renz134542770",
              icon: "Facebook",
            },
            {
              label: "Email",
              href: "mailto:renz@example.com",
              icon: "Email",
            },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "9px 18px",
                borderRadius: 8,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(55,138,221,0.2)",
                color: "rgba(200,220,255,0.7)",
                fontSize: 15,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
              onMouseEnter={(event) => {
                event.currentTarget.style.borderColor = "rgba(55,138,221,0.5)";
                event.currentTarget.style.color = "#378add";
              }}
              onMouseLeave={(event) => {
                event.currentTarget.style.borderColor = "rgba(55,138,221,0.2)";
                event.currentTarget.style.color = "rgba(200,220,255,0.7)";
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(55,138,221,0.15)",
            borderRadius: 16,
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: 18,
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
              rows={5}
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
              alignSelf: "flex-start",
            }}
          >
            {sent ? "Message Sent!" : "Send Message ->"}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            marginTop: 60,
            fontSize: 15,
            color: "rgba(200,220,255,0.3)",
            fontFamily: "'Courier New', monospace",
          }}
        >
          Designed by Renz Carljansen Sarucam - 2026
        </p>
      </div>

      <style>{`
        .contact-section {
          padding: 100px 32px 120px;
        }
        .contact-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
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
