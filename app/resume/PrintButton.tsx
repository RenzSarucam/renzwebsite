"use client";
import { useState } from "react";

export default function PrintButton() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);

  const handlePrint = () => {
    setShowModal(false);
    setTimeout(() => window.print(), 200);
  };

  return (
    <>
      {/* ── Instruction Modal ── */}
      {showModal && (
        <div
          className="no-print"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#0f1a2e",
              border: "1px solid rgba(96,165,250,0.25)",
              borderRadius: 16,
              padding: "32px 36px",
              width: 400,
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              color: "#fff",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: "#60a5fa" }}>
              📄 Save as PDF — Instructions
            </div>

            <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 14, fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6 }}>
              <li>
                Sa <strong style={{ color: "#fff" }}>Destination</strong> dropdown — piliin ang{" "}
                <strong style={{ color: "#60a5fa" }}>Save as PDF</strong>
              </li>
              <li>
                I-click ang <strong style={{ color: "#fff" }}>More settings</strong> — i-uncheck ang{" "}
                <strong style={{ color: "#60a5fa" }}>Headers and footers</strong>
              </li>
              <li>
                I-click ang <strong style={{ color: "#fff" }}>Save</strong> button
              </li>
            </ol>

            <div style={{ display: "flex", gap: 10, marginTop: 28 }}>
              <button
                onClick={handlePrint}
                style={{
                  flex: 1,
                  padding: "12px 0",
                  background: "#1a73e8",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Open Print Dialog →
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  padding: "12px 18px",
                  background: "rgba(255,255,255,0.07)",
                  color: "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Trigger Button ── */}
      <button
        className="no-print"
        onClick={openModal}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          background: "#1a73e8",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          padding: "12px 24px",
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
          boxShadow: "0 4px 16px rgba(26,115,232,0.35)",
          zIndex: 999,
        }}
      >
        ⬇ Save as PDF
      </button>
    </>
  );
}
