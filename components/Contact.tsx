"use client";

import { useState } from "react";
import { contactEmail, githubUrl, linkedinUrl, profile } from "@/app/_lib/portfolio-data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(contactEmail);
      else throw new Error("no clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.open(`https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}`, "_blank", "noopener,noreferrer");
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const su = encodeURIComponent(form.subject || `Portfolio contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.open(
      `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(contactEmail)}&su=${su}&body=${body}`,
      "_blank",
      "noopener,noreferrer"
    );
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="cbox">
      <form className="cbox-left" onSubmit={submit}>
        <h3 className="cbox-title">Put it in writing</h3>
        <p className="cbox-intro">
          A project in mind, a role to fill, or just a good question — send it through and {profile.firstName} will get
          back to you.
        </p>

        <div className="cbox-row">
          <div className="cfield">
            <label htmlFor="c-name">Your name</label>
            <input id="c-name" required value={form.name} onChange={set("name")} placeholder="Jane Dela Cruz" autoComplete="name" />
          </div>
          <div className="cfield">
            <label htmlFor="c-email">Email</label>
            <input id="c-email" type="email" required value={form.email} onChange={set("email")} placeholder="jane@company.com" autoComplete="email" />
          </div>
        </div>
        <div className="cfield">
          <label htmlFor="c-subject">Subject</label>
          <input id="c-subject" value={form.subject} onChange={set("subject")} placeholder="A new product, a rebuild, a contract…" />
        </div>
        <div className="cfield">
          <label htmlFor="c-msg">The details</label>
          <textarea id="c-msg" required value={form.message} onChange={set("message")} placeholder={`Tell ${profile.firstName} what you're building.`} />
        </div>

        <div className="cbox-foot">
          {sent ? (
            <span className="cbox-note is-ok" role="status">Report drafted in a new tab — hit send there to file it.</span>
          ) : (
            <span className="cbox-note">Usually replies within 24 hours</span>
          )}
          <button type="submit" className="btn btn-solid cbox-send">
            File the report →
          </button>
        </div>
      </form>

      <aside className="cbox-right">
        <div className="cbox-blocks">
          <div className="cbox-block">
            <p className="cbox-label">Direct line</p>
            <button type="button" className="cbox-big cbox-mail" onClick={copyEmail} aria-label="Copy email address">
              {copied ? "Copied to clipboard ✓" : contactEmail}
            </button>
            <p className="cbox-sub">For projects, roles, and the occasional good argument about Docker.</p>
          </div>
          <div className="cbox-block">
            <p className="cbox-label">The desk</p>
            <p className="cbox-big">{profile.location}</p>
            <p className="cbox-sub">PHT (UTC+8) — working with teams worldwide, remote-first.</p>
          </div>
          <div className="cbox-block">
            <p className="cbox-label">Availability</p>
            <p className="cbox-big">
              <span className="dot" aria-hidden="true" />
              Freelance &amp; contract
            </p>
            <p className="cbox-sub">
              Working full-time at DSG Son&apos;s Group Inc., so {profile.firstName} takes on select freelance and contract
              projects on the side.
            </p>
          </div>
        </div>

        <div className="cbox-icons">
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
            </svg>
          </a>
          <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M8 11v5M8 8v.01M12 16v-5m0 2.5a2.5 2.5 0 0 1 5 0V16" />
            </svg>
          </a>
          <a href={`mailto:${contactEmail}`} aria-label="Email">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
          </a>
        </div>
      </aside>
    </div>
  );
}
