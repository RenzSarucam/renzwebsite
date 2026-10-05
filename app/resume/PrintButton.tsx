"use client";
import { useState, useEffect } from "react";

export default function PrintButton() {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate]     = useState(false);

  useEffect(() => {
    if (showModal) {
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(false);
    }
  }, [showModal]);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setAnimate(false);
    setTimeout(() => setShowModal(false), 280);
  };

  const handlePrint = () => {
    setAnimate(false);
    setTimeout(() => {
      setShowModal(false);
      setTimeout(() => window.print(), 200);
    }, 280);
  };

  return (
    <>
      <style>{`
        @keyframes pb-backdrop-in  { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pb-modal-in     { from { opacity: 0; transform: translateY(18px) scale(0.96) } to { opacity: 1; transform: none } }
        @keyframes pb-modal-out    { from { opacity: 1; transform: none } to { opacity: 0; transform: translateY(12px) scale(0.97) } }
        @keyframes pb-btn-pulse    { 0%,100% { box-shadow: 0 0 0 0 rgba(55,138,221,0.45) } 60% { box-shadow: 0 0 0 10px rgba(55,138,221,0) } }

        .pb-backdrop {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(2,12,27,0.72);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: pb-backdrop-in 0.22s ease forwards;
        }

        .pb-modal {
          background: linear-gradient(145deg, #0d1b2e 0%, #091320 100%);
          border: 1px solid rgba(55,138,221,0.22);
          border-radius: 20px;
          padding: 36px 38px 32px;
          width: 420px;
          max-width: calc(100vw - 32px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(55,138,221,0.08), inset 0 1px 0 rgba(255,255,255,0.05);
          animation: pb-modal-in 0.32s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .pb-modal.pb-out {
          animation: pb-modal-out 0.26s cubic-bezier(0.4,0,1,1) forwards;
        }

        .pb-modal-icon {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg, rgba(55,138,221,0.18), rgba(93,202,165,0.1));
          border: 1px solid rgba(55,138,221,0.25);
          display: flex; align-items: center; justify-content: center;
          font-size: 22px; margin-bottom: 18px;
        }

        .pb-modal-title {
          font-size: 18px; font-weight: 800; color: #e8f4ff;
          margin-bottom: 6px; letter-spacing: -0.2px;
        }

        .pb-modal-sub {
          font-size: 12.5px; color: rgba(200,220,255,0.38);
          margin-bottom: 24px; line-height: 1.5;
        }

        .pb-steps {
          display: flex; flex-direction: column; gap: 12px;
          margin-bottom: 28px;
        }

        .pb-step {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 13px 15px;
          background: rgba(55,138,221,0.05);
          border: 1px solid rgba(55,138,221,0.1);
          border-radius: 12px;
        }

        .pb-step-num {
          flex-shrink: 0;
          width: 24px; height: 24px; border-radius: 8px;
          background: linear-gradient(135deg, #378add, #5dcaa5);
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 800; color: #fff;
          margin-top: 1px;
        }

        .pb-step-text {
          font-size: 13px; color: rgba(200,220,255,0.72); line-height: 1.55;
        }

        .pb-step-text strong { color: #e8f4ff; font-weight: 700; }
        .pb-step-text em { color: #5dcaa5; font-style: normal; font-weight: 600; }

        .pb-actions { display: flex; gap: 10px; }

        .pb-btn-primary {
          flex: 1; padding: 13px 0;
          background: linear-gradient(135deg, #378add, #5dcaa5);
          color: #fff; border: none; border-radius: 12px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          letter-spacing: 0.01em;
          box-shadow: 0 4px 20px rgba(55,138,221,0.35);
          transition: opacity 0.18s, transform 0.18s;
        }
        .pb-btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .pb-btn-primary:active { transform: scale(0.97); }

        .pb-btn-cancel {
          padding: 13px 18px;
          background: rgba(255,255,255,0.05);
          color: rgba(200,220,255,0.45);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; font-size: 14px; cursor: pointer;
          transition: background 0.18s, color 0.18s;
        }
        .pb-btn-cancel:hover { background: rgba(255,255,255,0.09); color: rgba(200,220,255,0.7); }

        .pb-trigger {
          position: fixed; bottom: 28px; right: 28px; z-index: 999;
          display: flex; align-items: center; gap: 9px;
          padding: 13px 22px;
          background: linear-gradient(135deg, #1a5fb0, #378add);
          color: #fff; border: none; border-radius: 14px;
          font-size: 14px; font-weight: 700; cursor: pointer;
          box-shadow: 0 6px 24px rgba(26,95,176,0.45);
          transition: transform 0.2s cubic-bezier(0.22,1,0.36,1), box-shadow 0.2s ease, opacity 0.2s;
          animation: pb-btn-pulse 2.8s ease-in-out infinite 1.5s;
        }
        .pb-trigger:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 32px rgba(55,138,221,0.5);
        }
        .pb-trigger:active { transform: scale(0.96); }

        .pb-trigger-icon {
          width: 18px; height: 18px;
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
      `}</style>

      {/* ── Modal ── */}
      {showModal && (
        <div className="pb-backdrop no-print" onClick={closeModal}>
          <div
            className={`pb-modal${animate ? "" : " pb-out"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pb-modal-icon">📄</div>
            <div className="pb-modal-title">Save as PDF</div>
            <div className="pb-modal-sub">Follow these steps to export a clean PDF copy.</div>

            <div className="pb-steps">
              <div className="pb-step">
                <div className="pb-step-num">1</div>
                <div className="pb-step-text">
                  Sa <strong>Destination</strong> dropdown — piliin ang <em>Save as PDF</em>
                </div>
              </div>
              <div className="pb-step">
                <div className="pb-step-num">2</div>
                <div className="pb-step-text">
                  I-click ang <strong>More settings</strong> — i-uncheck ang <em>Headers and footers</em>
                </div>
              </div>
              <div className="pb-step">
                <div className="pb-step-num">3</div>
                <div className="pb-step-text">
                  I-click ang <strong>Save</strong> button
                </div>
              </div>
            </div>

            <div className="pb-actions">
              <button className="pb-btn-primary" onClick={handlePrint}>
                Open Print Dialog →
              </button>
              <button className="pb-btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Trigger Button ── */}
      <button className="pb-trigger no-print" onClick={openModal}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 2v8M5 7l3 3 3-3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12h12" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
        Save as PDF
      </button>
    </>
  );
}
