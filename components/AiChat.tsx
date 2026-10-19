"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  { icon: "💼", label: "Work experience",      text: "What is Renz's work experience?" },
  { icon: "🛠️", label: "Skills & tech stack",  text: "What are Renz's skills and tech stack?" },
  { icon: "🚀", label: "Current role",          text: "What is Renz's current role?" },
  { icon: "🆕", label: "Recent projects",       text: "What are Renz's most recent projects?" },
  { icon: "🎓", label: "Education",             text: "What is Renz's educational background?" },
  { icon: "📞", label: "Contact Renz",          text: "How can I contact Renz?" },
  { icon: "💡", label: "Best skill",            text: "What is Renz's strongest skill?" },
  { icon: "🐳", label: "Docker projects",       text: "What are Renz's Docker projects?" },
  { icon: "📱", label: "Mobile projects",       text: "What are Renz's mobile projects?" },
  { icon: "🤝", label: "Open to hire?",         text: "Is Renz open to work or freelance?" },
];

function renderMessage(content: string) {
  const lines = content.split("\n");
  return (
    <span style={{ display: "block" }}>
      {lines.map((line, i) => {
        if (line.startsWith("• ")) {
          return (
            <span key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginTop: i === 0 ? 0 : 10 }}>
              <span style={{ color: "#FFFFFF", flexShrink: 0, marginTop: 2, fontSize: 16 }}>•</span>
              <span style={{ fontWeight: 600, color: "#F5F5F5" }}>{line.slice(2)}</span>
            </span>
          );
        }
        if (line.startsWith("  ")) {
          return (
            <span key={i} style={{ display: "block", paddingLeft: 23, fontSize: 13, color: "#A3A3A3", marginTop: 2 }}>
              {line.trim()}
            </span>
          );
        }
        return <span key={i} style={{ display: "block", marginBottom: line === "" ? 6 : 0 }}>{line}</span>;
      })}
    </span>
  );
}

export default function AiChat() {
  const [open, setOpen]       = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput]     = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef  = useRef<HTMLDivElement>(null);
  const inputRef   = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const send = async (preset?: string) => {
    const text = (preset ?? input).trim();
    if (!text || loading) return;

    setInput("");
    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages([...newMessages, { role: "assistant", content: "" }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages.map((m) => ({ role: m.role, content: m.content })) }),
      });
      if (!res.body) throw new Error("No stream");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: updated[updated.length - 1].content + chunk };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: "assistant", content: "Sorry, something went wrong. Please try again." };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <>
      {/* ── Trigger button ── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Ask RenzAI"
        type="button"
        className="ai-fab"
      >
        <span className="ai-fab-face">
          <span className="ai-bot">
            <img src="/images/renz-bot-body.png" alt="" />
            <img className="ai-bot-arm" src="/images/renz-bot-arm.png" alt="" />
            <span className="ai-bot-eye ai-bot-eye-l" aria-hidden="true" />
            <span className="ai-bot-eye ai-bot-eye-r" aria-hidden="true" />
          </span>
        </span>
        <span className="ai-fab-label">Ask RenzAI</span>
        <span className="ai-fab-dot" aria-hidden="true" />
      </button>

      {/* ── Modal overlay ── */}
      {open && (
        <div className="ai-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="ai-modal">

            {/* Gradient top accent bar */}
            <div className="ai-accent-bar" />

            {/* Background orbs */}
            <div className="ai-orb ai-orb-1" />
            <div className="ai-orb ai-orb-2" />

            {/* Header */}
            <div className="ai-header">
              <div className="ai-header-left">
                <div className="ai-avatar">
                  <img src="/images/renz-bot-head.png" alt="" className="ai-face" />
                </div>
                <div>
                  <p className="ai-header-name">Ask RenzAI</p>
                  <p className="ai-header-status">
                    <span className="ai-status-dot" />
                    Online · Ready to help
                  </p>
                </div>
              </div>
              <button className="ai-close" onClick={() => setOpen(false)}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>

            {/* Body */}
            {isEmpty ? (
              <div className="ai-welcome">
                <div className="ai-welcome-icon">
                  <img src="/images/renz-bot-head.png" alt="" className="ai-face" />
                </div>
                <p className="ai-welcome-title">How can I help you?</p>
                <p className="ai-welcome-sub">Ask a question or pick a suggestion below.</p>
              </div>
            ) : (
              <div className="ai-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`ai-msg-row ${msg.role === "user" ? "user" : "bot"}`}>
                    {msg.role === "assistant" && (
                      <div className="ai-bot-avatar">
                        <img src="/images/renz-bot-head.png" alt="" className="ai-face" />
                      </div>
                    )}
                    <div className={`ai-bubble ${msg.role}`}>
                      {msg.content
                        ? renderMessage(msg.content)
                        : loading && i === messages.length - 1
                          ? <span className="ai-typing"><span/><span/><span/></span>
                          : ""}
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
            )}

            {/* Quick prompts */}
            <div className="ai-prompts">
              <p className="ai-prompts-label">Quick Prompts</p>
              <div className="ai-prompts-grid">
                {quickPrompts.map((p) => (
                  <button key={p.text} className="ai-prompt-btn" onClick={() => send(p.text)} disabled={loading}>
                    <span className="ai-prompt-icon">{p.icon}</span>
                    <span className="ai-prompt-label">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="ai-input-row">
              <div className="ai-input-wrap">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                  placeholder="Ask anything about Renz..."
                  className="ai-input"
                />
                <button
                  onClick={() => send()}
                  disabled={loading || !input.trim()}
                  className="ai-send"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
              <p className="ai-disclaimer">Responses are based on Renz&apos;s portfolio data only.</p>
            </div>
          </div>
        </div>
      )}

      <style suppressHydrationWarning>{`
        /* ── FAB ── */
        .ai-fab {
          position: fixed; bottom: 14px; right: 20px;
          background: transparent; border: none; padding: 0; cursor: pointer;
          display: flex; flex-direction: row-reverse; align-items: center; gap: 0;
          color: #F5F5F5; font-family: inherit; font-size: 14px; font-weight: 600;
          z-index: 900;
          transition: gap 0.25s ease;
        }
        .ai-fab:hover, .ai-fab:focus-visible { gap: 8px; }
        .ai-fab-face { display: block; width: 64px; height: 98px; flex: 0 0 64px; animation: botBob 3.2s ease-in-out infinite; }
        .ai-fab-face { position: relative; }
        /* Soft ground shadow that breathes with the bob */
        .ai-fab::before {
          content: ""; position: absolute; right: 10px; bottom: -3px; width: 44px; height: 9px;
          background: radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent 70%);
          animation: botShadow 3.2s ease-in-out infinite; pointer-events: none;
        }
        @keyframes botShadow { 0%, 100% { transform: scaleX(1); opacity: 0.9; } 50% { transform: scaleX(0.8); opacity: 0.55; } }
        .ai-bot { position: absolute; inset: 0; filter: drop-shadow(0 8px 10px rgba(0,0,0,0.55)); }
        .ai-bot img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; display: block; }
        /* Blink: a visor-colored lid sweeps down over each glowing eye */
        .ai-bot-eye {
          position: absolute; transform-origin: 50% 0; transform: scaleY(0);
          background: radial-gradient(ellipse at center, #15121f 62%, rgba(21,18,31,0) 74%);
          animation: botBlink 3.6s ease-in-out infinite;
        }
        .ai-bot-eye-l { left: 29.6%; top: 20.3%; width: 9.2%; height: 6.1%; }
        .ai-bot-eye-r { left: 60%; top: 21.7%; width: 10.2%; height: 6.7%; }
        /* Livelier when the mouse is on it */
        .ai-fab:hover .ai-bot-eye, .ai-fab:focus-visible .ai-bot-eye { animation-duration: 1.3s; }
        .ai-fab:hover .ai-fab-face, .ai-fab:focus-visible .ai-fab-face { animation-duration: 1.6s; }
        @keyframes botBlink {
          0%, 84%, 100% { transform: scaleY(0); }
          88%, 92% { transform: scaleY(1); }
        }
        @keyframes botBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
        .ai-fab-label {
          flex: 0 0 auto; max-width: 0; padding: 0; overflow: hidden; white-space: nowrap; opacity: 0;
          background: #141414; border: 1px solid rgba(255,255,255,0.16); border-radius: 999px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
          transition: max-width 0.25s ease, padding 0.25s ease, opacity 0.2s ease;
        }
        .ai-fab:hover .ai-fab-label, .ai-fab:focus-visible .ai-fab-label { max-width: 130px; padding: 9px 16px; opacity: 1; }
        .ai-face { width: 100%; height: 100%; object-fit: contain; object-position: 50% 60%; display: block; padding: 3px; }
        .ai-avatar, .ai-bot-avatar, .ai-welcome-icon { overflow: hidden; }
        .ai-fab-dot {
          position: absolute; top: 6px; right: 4px;
          width: 10px; height: 10px; border-radius: 50%;
          background: #22C55E; border: 2px solid #0D0D0D;
        }
        .ai-fab-dot::after {
          content: ""; position: absolute; inset: -2px; border-radius: 50%;
          border: 1px solid #22C55E; animation: fabPulse 2.4s ease-out infinite;
        }
        @keyframes fabPulse {
          0% { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) { .ai-fab-dot::after, .ai-fab::before, .ai-fab-face, .ai-bot-eye { animation: none; } }


        /* ── Overlay ── */
        .ai-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }

        /* ── Modal ── */
        .ai-modal {
          position: relative;
          width: 100%; max-width: 470px;
          height: min(700px, 92vh);
          background: linear-gradient(160deg, #1A1A1A 0%, #1A1A1A 100%);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(0,0,0,0.06) inset;
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: aiIn 0.24s cubic-bezier(.22,.68,0,1.2);
        }
        @keyframes aiIn {
          from { opacity: 0; transform: scale(0.93) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Accent bar */
        .ai-accent-bar {
          height: 3px;
          background: linear-gradient(90deg, #F5F5F5 0%, #F5F5F5 50%, #2A2A2A 100%);
          flex-shrink: 0;
        }

        /* Background orbs */
        .ai-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; filter: blur(70px); z-index: 0;
        }
        .ai-orb-1 {
          width: 220px; height: 220px;
          background: rgba(255,255,255,0.06);
          top: -60px; right: -50px;
        }
        .ai-orb-2 {
          width: 180px; height: 180px;
          background: rgba(255,255,255,0.045);
          bottom: 120px; left: -50px;
        }

        /* ── Header ── */
        .ai-header {
          position: relative; z-index: 1;
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px;
          background: #1A1A1A;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(4px);
        }
        .ai-header-left { display: flex; align-items: center; gap: 13px; }
        .ai-avatar {
          width: 44px; height: 44px; border-radius: 13px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 16px rgba(0,0,0,0.35);
        }
        .ai-header-name { margin: 0; font-size: 15px; font-weight: 700; color: #F5F5F5; letter-spacing: 0.01em; }
        .ai-header-status {
          margin: 0; margin-top: 3px; font-size: 11px;
          color: #A3A3A3;
          display: flex; align-items: center; gap: 5px;
        }
        .ai-status-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #22C55E; display: inline-block;
          box-shadow: 0 0 8px rgba(34,197,94,0.6);
          animation: statusPulse 2s ease-in-out infinite;
        }
        @keyframes statusPulse {
          0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.5); }
          50% { box-shadow: 0 0 14px rgba(34,197,94,0.8); }
        }
        .ai-close {
          background: #1A1A1A;
          border: 1px solid #2A2A2A;
          border-radius: 9px; color: #A3A3A3;
          width: 32px; height: 32px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s, color 0.2s;
        }
        .ai-close:hover { background: #1A1A1A; color: #F5F5F5; }

        /* ── Welcome ── */
        .ai-welcome {
          position: relative; z-index: 1;
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; padding: 28px 24px 16px;
        }
        .ai-welcome-icon {
          width: 82px; height: 82px; border-radius: 22px;
          background: linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.07));
          border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 10px;
          box-shadow: 0 0 40px rgba(0,0,0,0.15), 0 0 80px rgba(0,0,0,0.08);
          animation: iconFloat 3.5s ease-in-out infinite;
        }
        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); box-shadow: 0 0 40px rgba(0,0,0,0.15); }
          50% { transform: translateY(-5px); box-shadow: 0 10px 48px rgba(0,0,0,0.28); }
        }
        .ai-welcome-title {
          margin: 0; font-size: 21px; font-weight: 800;
          color: #F5F5F5; letter-spacing: -0.3px;
        }
        .ai-welcome-sub {
          margin: 0; font-size: 13px;
          color: #A3A3A3; text-align: center;
          max-width: 280px; line-height: 1.6;
        }

        /* ── Messages ── */
        .ai-messages {
          position: relative; z-index: 1;
          flex: 1; overflow-y: auto; padding: 18px 20px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 99px; }
        .ai-msg-row { display: flex; gap: 8px; align-items: flex-end; }
        .ai-msg-row.user { justify-content: flex-end; }
        .ai-bot-avatar {
          width: 28px; height: 28px; border-radius: 9px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.15);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        }
        .ai-bubble {
          max-width: 78%; padding: 11px 15px;
          font-size: 14px; line-height: 1.68;
          white-space: pre-wrap;
        }
        .ai-bubble.user {
          background: linear-gradient(135deg, #F5F5F5, #F5F5F5 60%, #F5F5F5);
          color: #111111; border-radius: 18px 18px 4px 18px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.25);
        }
        .ai-bubble.assistant {
          background: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.084);
          border-left: 2px solid rgba(255,255,255,0.21);
          color: #A3A3A3;
          border-radius: 18px 18px 18px 4px;
        }
        .ai-typing { display: flex; gap: 4px; padding: 4px 0; }
        .ai-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: #737373;
          animation: aiDot 1.2s infinite ease-in-out;
        }
        .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes aiDot {
          0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1.1); opacity: 1; }
        }

        /* ── Quick prompts ── */
        .ai-prompts {
          position: relative; z-index: 1;
          padding: 10px 20px 8px;
          border-top: 1px solid rgba(255,255,255,0.054);
          background: rgba(0,0,0,0.12);
        }
        .ai-prompts-label {
          margin: 0 0 9px; font-size: 9.5px; font-weight: 700;
          color: #A3A3A3; letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .ai-prompts-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .ai-prompt-btn {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 11px;
          background: #1A1A1A;
          border: 1px solid rgba(255,255,255,0.078);
          color: #A3A3A3; font-size: 12px;
          cursor: pointer; font-family: inherit;
          transition: background 0.15s, border-color 0.15s, transform 0.15s, color 0.15s;
          text-align: left;
        }
        .ai-prompt-icon {
          width: 24px; height: 24px; border-radius: 7px;
          background: rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; flex-shrink: 0;
        }
        .ai-prompt-label { flex: 1; line-height: 1.3; }
        .ai-prompt-btn:hover:not(:disabled) {
          background: rgba(255,255,255,0.05);
          border-color: rgba(255,255,255,0.18);
          color: #F5F5F5;
          transform: translateY(-1px);
        }
        .ai-prompt-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        /* ── Input row ── */
        .ai-input-row {
          position: relative; z-index: 1;
          padding: 10px 20px 4px;
          border-top: 1px solid rgba(255,255,255,0.054);
          background: rgba(0,0,0,0.15);
        }
        .ai-input-wrap {
          display: flex; gap: 8px;
        }
        .ai-input {
          flex: 1; padding: 12px 16px;
          border-radius: 13px;
          border: 1px solid rgba(255,255,255,0.12);
          background: #1A1A1A;
          color: #F5F5F5; font-size: 13.5px;
          outline: none; font-family: inherit;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .ai-input::placeholder { color: #A3A3A3; }
        .ai-input:focus {
          border-color: rgba(255,255,255,0.3);
          box-shadow: 0 0 0 3px rgba(0,0,0,0.1);
        }
        .ai-send {
          width: 44px; height: 44px; border-radius: 13px;
          background: linear-gradient(135deg, #F5F5F5, #F5F5F5 60%, #F5F5F5);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 14px rgba(0,0,0,0.3);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ai-send:disabled { background: rgba(255,255,255,0.09); box-shadow: none; cursor: not-allowed; }
        .ai-send:not(:disabled):hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(0,0,0,0.45);
        }

        /* Disclaimer */
        .ai-disclaimer {
          margin: 7px 0 10px; font-size: 10px;
          color: #A3A3A3; text-align: center;
        }
      `}</style>
    </>
  );
}
