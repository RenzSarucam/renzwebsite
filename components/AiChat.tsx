"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = [
  { icon: "💼", label: "Work experience",      text: "What is Renz's work experience?" },
  { icon: "🛠️", label: "Skills & tech stack",  text: "What are Renz's skills and tech stack?" },
  { icon: "🚀", label: "Current role",          text: "What is Renz's current role?" },
  { icon: "📁", label: "View projects",         text: "What projects has Renz built?" },
  { icon: "🎓", label: "Education",             text: "What is Renz's educational background?" },
  { icon: "📞", label: "Contact Renz",          text: "How can I contact Renz?" },
];

function renderMessage(content: string) {
  const lines = content.split("\n");
  return (
    <span style={{ display: "block" }}>
      {lines.map((line, i) => {
        if (line.startsWith("• ")) {
          return (
            <span key={i} style={{ display: "flex", gap: 7, alignItems: "flex-start", marginTop: i === 0 ? 0 : 10 }}>
              <span style={{ color: "#378add", flexShrink: 0, marginTop: 2, fontSize: 16 }}>•</span>
              <span style={{ fontWeight: 600, color: "#e8f4ff" }}>{line.slice(2)}</span>
            </span>
          );
        }
        if (line.startsWith("  ")) {
          return (
            <span key={i} style={{ display: "block", paddingLeft: 23, fontSize: 13, color: "rgba(200,220,255,0.7)", marginTop: 2 }}>
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
        aria-label="Open portfolio assistant"
        type="button"
        className="ai-fab"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="7" width="16" height="12" rx="3" fill="white" opacity=".92"/>
          <circle cx="9" cy="12" r="1.5" fill="rgba(55,138,221,0.9)"/>
          <circle cx="15" cy="12" r="1.5" fill="rgba(55,138,221,0.9)"/>
          <rect x="8.5" y="15" width="7" height="1.5" rx="0.75" fill="rgba(55,138,221,0.7)"/>
          <line x1="12" y1="7" x2="12" y2="4" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity=".9"/>
          <circle cx="12" cy="3.2" r="1" fill="white" opacity=".9"/>
          <rect x="2" y="10" width="2" height="4" rx="1" fill="white" opacity=".7"/>
          <rect x="20" y="10" width="2" height="4" rx="1" fill="white" opacity=".7"/>
        </svg>
      </button>

      {/* ── Modal overlay ── */}
      {open && (
        <div className="ai-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
          <div className="ai-modal">

            {/* Header */}
            <div className="ai-header">
              <div className="ai-header-left">
                <div className="ai-avatar">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <rect x="4" y="7" width="16" height="12" rx="3" fill="white" opacity=".9"/>
                    <circle cx="9" cy="12" r="1.4" fill="#378add"/>
                    <circle cx="15" cy="12" r="1.4" fill="#378add"/>
                    <rect x="8.5" y="15" width="7" height="1.4" rx="0.7" fill="#378add" opacity=".8"/>
                    <line x1="12" y1="7" x2="12" y2="4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="12" cy="3.5" r="1" fill="white"/>
                    <rect x="2.5" y="10" width="1.5" height="3.5" rx="0.75" fill="white" opacity=".7"/>
                    <rect x="20" y="10" width="1.5" height="3.5" rx="0.75" fill="white" opacity=".7"/>
                  </svg>
                </div>
                <div>
                  <p className="ai-header-name">Ask about Renz</p>
                  <p className="ai-header-status">
                    <span className="ai-status-dot" />
                    Online · Ready to help
                  </p>
                </div>
              </div>
              <button className="ai-close" onClick={() => setOpen(false)}>✕</button>
            </div>

            {/* Body */}
            {isEmpty ? (
              <div className="ai-welcome">
                <div className="ai-welcome-icon">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="6" width="18" height="14" rx="4" fill="url(#grad)"/>
                    <circle cx="8.5" cy="12" r="2" fill="white" opacity=".9"/>
                    <circle cx="15.5" cy="12" r="2" fill="white" opacity=".9"/>
                    <rect x="7.5" y="15.5" width="9" height="1.8" rx="0.9" fill="white" opacity=".7"/>
                    <line x1="12" y1="6" x2="12" y2="3" stroke="url(#grad)" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="2.2" r="1.2" fill="#5dcaa5"/>
                    <rect x="1" y="9.5" width="2" height="5" rx="1" fill="#378add" opacity=".5"/>
                    <rect x="21" y="9.5" width="2" height="5" rx="1" fill="#378add" opacity=".5"/>
                    <defs>
                      <linearGradient id="grad" x1="3" y1="6" x2="21" y2="20" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#378add"/>
                        <stop offset="1" stopColor="#5dcaa5"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <p className="ai-welcome-title">How can I help you?</p>
                <p className="ai-welcome-sub">Ask a question or pick a suggestion below.</p>
              </div>
            ) : (
              <div className="ai-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`ai-msg-row ${msg.role === "user" ? "user" : "bot"}`}>
                    {msg.role === "assistant" && (
                      <div className="ai-bot-avatar">AI</div>
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
              <p className="ai-prompts-label">QUICK PROMPTS <span>∧</span></p>
              <div className="ai-prompts-grid">
                {quickPrompts.map((p) => (
                  <button key={p.text} className="ai-prompt-btn" onClick={() => send(p.text)} disabled={loading}>
                    <span>{p.icon}</span> {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
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
                  <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <p className="ai-disclaimer">Responses are based on Renz's portfolio data only.</p>
          </div>
        </div>
      )}

      <style suppressHydrationWarning>{`
        /* FAB */
        .ai-fab {
          position: fixed; bottom: 28px; right: 28px;
          width: 56px; height: 56px; border-radius: 50%;
          background: linear-gradient(135deg, #378add, #5dcaa5);
          border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          z-index: 900; box-shadow: 0 8px 28px rgba(55,138,221,0.4);
          transition: transform 0.2s ease;
        }
        .ai-fab:hover { transform: scale(1.07); }

        /* Overlay */
        .ai-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(5px);
          z-index: 1000;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
        }

        /* Modal */
        .ai-modal {
          width: 100%; max-width: 460px;
          height: min(700px, 92vh);
          background: #0b1220;
          border: 1px solid rgba(55,138,221,0.18);
          border-radius: 22px;
          box-shadow: 0 32px 80px rgba(0,0,0,0.65);
          display: flex; flex-direction: column;
          overflow: hidden;
          animation: aiIn 0.22s ease;
        }
        @keyframes aiIn {
          from { opacity: 0; transform: scale(0.95) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* Header */
        .ai-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 18px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(55,138,221,0.1);
        }
        .ai-header-left { display: flex; align-items: center; gap: 12px; }
        .ai-avatar {
          width: 42px; height: 42px; border-radius: 12px;
          background: linear-gradient(135deg, #378add, #5dcaa5);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .ai-header-name { margin: 0; font-size: 15px; font-weight: 700; color: #e8f4ff; }
        .ai-header-status { margin: 0; font-size: 11px; color: rgba(200,220,255,0.5); display: flex; align-items: center; gap: 5px; margin-top: 2px; }
        .ai-status-dot { width: 7px; height: 7px; border-radius: 50%; background: #5dcaa5; display: inline-block; box-shadow: 0 0 6px #5dcaa5; }
        .ai-close {
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 8px; color: rgba(200,220,255,0.5);
          width: 30px; height: 30px; cursor: pointer;
          display: flex; align-items: center; justify-content: center; font-size: 14px;
        }
        .ai-close:hover { background: rgba(255,255,255,0.1); color: #e8f4ff; }

        /* Welcome */
        .ai-welcome {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 10px; padding: 24px;
        }
        .ai-welcome-icon {
          width: 72px; height: 72px; border-radius: 20px;
          background: linear-gradient(135deg, rgba(55,138,221,0.15), rgba(93,202,165,0.15));
          border: 1px solid rgba(55,138,221,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 8px;
        }
        .ai-welcome-title { margin: 0; font-size: 20px; font-weight: 700; color: #e8f4ff; }
        .ai-welcome-sub { margin: 0; font-size: 13px; color: rgba(200,220,255,0.45); text-align: center; }

        /* Messages */
        .ai-messages {
          flex: 1; overflow-y: auto; padding: 16px 18px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .ai-messages::-webkit-scrollbar { width: 4px; }
        .ai-messages::-webkit-scrollbar-track { background: transparent; }
        .ai-messages::-webkit-scrollbar-thumb { background: rgba(55,138,221,0.25); border-radius: 99px; }
        .ai-msg-row { display: flex; gap: 8px; align-items: flex-end; }
        .ai-msg-row.user { justify-content: flex-end; }
        .ai-bot-avatar {
          width: 28px; height: 28px; border-radius: 8px;
          background: linear-gradient(135deg, #378add, #5dcaa5);
          display: flex; align-items: center; justify-content: center;
          font-size: 10px; font-weight: 700; color: white; flex-shrink: 0;
        }
        .ai-bubble {
          max-width: 78%; padding: 10px 14px;
          font-size: 14px; line-height: 1.65;
          white-space: pre-wrap;
        }
        .ai-bubble.user {
          background: linear-gradient(135deg, #378add, #2d6fb5);
          color: #fff; border-radius: 16px 16px 4px 16px;
        }
        .ai-bubble.assistant {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(55,138,221,0.12);
          color: rgba(220,235,255,0.9);
          border-radius: 16px 16px 16px 4px;
        }
        .ai-typing { display: flex; gap: 4px; padding: 4px 0; }
        .ai-typing span {
          width: 6px; height: 6px; border-radius: 50%;
          background: rgba(200,220,255,0.4);
          animation: aiDot 1.2s infinite ease-in-out;
        }
        .ai-typing span:nth-child(2) { animation-delay: 0.2s; }
        .ai-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes aiDot {
          0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }

        /* Quick prompts */
        .ai-prompts {
          padding: 10px 18px 6px;
          border-top: 1px solid rgba(55,138,221,0.08);
        }
        .ai-prompts-label {
          margin: 0 0 8px; font-size: 10px; font-weight: 700;
          color: rgba(200,220,255,0.35); letter-spacing: 0.08em;
          display: flex; justify-content: space-between;
        }
        .ai-prompts-grid {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 6px;
        }
        .ai-prompt-btn {
          display: flex; align-items: center; gap: 7px;
          padding: 8px 12px; border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(55,138,221,0.14);
          color: rgba(220,235,255,0.75); font-size: 12.5px;
          cursor: pointer; font-family: inherit;
          transition: background 0.15s, border-color 0.15s;
          text-align: left;
        }
        .ai-prompt-btn:hover:not(:disabled) {
          background: rgba(55,138,221,0.1);
          border-color: rgba(55,138,221,0.3);
          color: #e8f4ff;
        }
        .ai-prompt-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        /* Input */
        .ai-input-wrap {
          display: flex; gap: 8px;
          padding: 10px 18px 8px;
          border-top: 1px solid rgba(55,138,221,0.08);
        }
        .ai-input {
          flex: 1; padding: 11px 14px;
          border-radius: 12px;
          border: 1px solid rgba(55,138,221,0.2);
          background: rgba(255,255,255,0.04);
          color: #e8f4ff; font-size: 13.5px;
          outline: none; font-family: inherit;
        }
        .ai-input::placeholder { color: rgba(200,220,255,0.35); }
        .ai-input:focus { border-color: rgba(55,138,221,0.45); }
        .ai-send {
          width: 42px; height: 42px; border-radius: 12px;
          background: #378add; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; transition: background 0.2s;
        }
        .ai-send:disabled { background: rgba(55,138,221,0.2); cursor: not-allowed; }
        .ai-send:not(:disabled):hover { background: #2d6fb5; }

        /* Disclaimer */
        .ai-disclaimer {
          margin: 0; padding: 0 18px 12px;
          font-size: 10.5px; color: rgba(200,220,255,0.28);
          text-align: center;
        }
      `}</style>
    </>
  );
}
