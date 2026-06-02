"use client";

import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const starterPrompts = [
  "What are Renz's strongest skills?",
  "May alam ba si Renz sa Docker?",
  "Tell me about TrackGuard Admin Panel.",
  "How can I contact Renz?",
];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello. I can answer questions about Renz's skills, projects, certificates, education, and contact details based on his portfolio data.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
        body: JSON.stringify({
          messages: newMessages.map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      if (!res.body) {
        throw new Error("No stream");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: updated[updated.length - 1].content + chunk,
          };
          return updated;
        });
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content: "Sorry, something went wrong while generating the reply.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((current) => !current)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #378add, #5dcaa5)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 900,
          boxShadow: "0 8px 28px rgba(55,138,221,0.4)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(event) => {
          event.currentTarget.style.transform = "scale(1.06)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.transform = "scale(1)";
        }}
        aria-label="Open portfolio assistant"
        type="button"
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 4L16 16M16 4L4 16" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.477 2 2 6.253 2 11.5c0 2.304.846 4.41 2.237 6.032L3 21l3.674-1.154A10.116 10.116 0 0012 21c5.523 0 10-4.253 10-9.5S17.523 2 12 2z"
              fill="white"
              opacity=".92"
            />
            <path
              d="M8 11h8M8 14h5"
              stroke="rgba(55,138,221,0.85)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 94,
            right: 28,
            width: 360,
            maxWidth: "calc(100vw - 24px)",
            maxHeight: 520,
            background: "rgba(8,15,28,0.98)",
            border: "1px solid rgba(55,138,221,0.18)",
            borderRadius: 20,
            boxShadow: "0 24px 64px rgba(0,0,0,0.55)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 900,
            animation: "chatSlideUp 0.2s ease",
          }}
        >
          <div
            style={{
              padding: "16px 18px 14px",
              borderBottom: "1px solid rgba(55,138,221,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #378add22, #5dcaa522)",
                border: "1px solid rgba(55,138,221,0.28)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              AI
            </div>
            <div>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "#e8f4ff" }}>
                Ask about Renz
              </p>
              <p style={{ margin: 0, fontSize: 11, color: "rgba(200,220,255,0.48)" }}>
                Portfolio assistant grounded in portfolio data
              </p>
            </div>
          </div>

          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid rgba(55,138,221,0.08)",
              display: "flex",
              gap: 8,
              overflowX: "auto",
            }}
          >
            {starterPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                type="button"
                disabled={loading}
                style={{
                  flex: "0 0 auto",
                  padding: "8px 12px",
                  borderRadius: 999,
                  border: "1px solid rgba(55,138,221,0.18)",
                  background: "rgba(255,255,255,0.04)",
                  color: "rgba(220,235,255,0.78)",
                  fontSize: 12,
                  cursor: loading ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "14px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "84%",
                    padding: "10px 13px",
                    borderRadius:
                      msg.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                    background:
                      msg.role === "user"
                        ? "linear-gradient(135deg, #378add, #2d6fb5)"
                        : "rgba(255,255,255,0.05)",
                    border:
                      msg.role === "user" ? "none" : "1px solid rgba(55,138,221,0.12)",
                    fontSize: 13.5,
                    lineHeight: 1.6,
                    color: msg.role === "user" ? "#fff" : "rgba(220,235,255,0.9)",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content || (loading && index === messages.length - 1 ? <span style={{ opacity: 0.5 }}>...</span> : "")}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div
            style={{
              padding: "10px 12px 12px",
              borderTop: "1px solid rgba(55,138,221,0.08)",
            }}
          >
            <p
              style={{
                margin: "0 0 8px",
                fontSize: 11,
                color: "rgba(200,220,255,0.42)",
              }}
            >
              Best for questions about skills, projects, education, certificates, and contact details.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send();
                  }
                }}
                placeholder="Ask about Renz's work or background..."
                style={{
                  flex: 1,
                  padding: "10px 13px",
                  borderRadius: 12,
                  border: "1px solid rgba(55,138,221,0.2)",
                  background: "rgba(255,255,255,0.04)",
                  color: "#e8f4ff",
                  fontSize: 13.5,
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                onClick={() => send()}
                disabled={loading || !input.trim()}
                type="button"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background:
                    loading || !input.trim() ? "rgba(55,138,221,0.2)" : "#378add",
                  border: "none",
                  cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      <style suppressHydrationWarning>{`
        @keyframes chatSlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </>
  );
}
