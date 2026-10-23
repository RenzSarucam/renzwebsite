"use client";
import { useState, useEffect } from "react";

const steps: [string, string][] = [
  ["Sa", "Destination dropdown — piliin ang Save as PDF."],
  ["I-click ang", "More settings, tapos i-uncheck ang Headers and footers."],
  ["I-click ang", "Save button."],
];

export default function PrintButton() {
  const [showModal, setShowModal] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (showModal) {
      requestAnimationFrame(() => setAnimate(true));
    } else {
      setAnimate(false);
    }
  }, [showModal]);

  // Esc closes the dialog
  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeModal();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  const openModal = () => setShowModal(true);

  const closeModal = () => {
    setAnimate(false);
    setTimeout(() => setShowModal(false), 220);
  };

  const handlePrint = () => {
    setAnimate(false);
    setTimeout(() => {
      setShowModal(false);
      setTimeout(() => window.print(), 200);
    }, 220);
  };

  return (
    <>
      <style>{`
        @keyframes pb-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes pb-rise { from { opacity: 0; transform: translateY(14px) } to { opacity: 1; transform: none } }
        @keyframes pb-sink { from { opacity: 1; transform: none } to { opacity: 0; transform: translateY(10px) } }

        .pb-backdrop {
          position: fixed; inset: 0; z-index: 2000;
          background: rgba(21, 18, 15, 0.62);
          display: flex; align-items: center; justify-content: center; padding: 16px;
          animation: pb-fade 0.2s ease forwards;
        }

        .pb-modal {
          width: 460px; max-width: 100%;
          background: #f1ecdf; color: #15120f;
          border: 2px solid #15120f;
          box-shadow: 8px 8px 0 #15120f;
          padding: 30px 32px 28px;
          animation: pb-rise 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          font-family: var(--serif-body), Georgia, serif;
        }
        .pb-modal.pb-out { animation: pb-sink 0.22s ease forwards; }

        .pb-kicker {
          margin: 0 0 8px;
          font-family: var(--sans), Arial, sans-serif; font-size: 11px; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase; color: #b3261e;
        }
        .pb-title {
          margin: 0 0 14px; padding-bottom: 12px; border-bottom: 3px double #15120f;
          font-family: var(--serif-display), Georgia, serif; font-weight: 400;
          font-size: 34px; line-height: 1.05; letter-spacing: -0.01em;
        }
        .pb-sub { margin: 0 0 20px; font-size: 15.5px; font-style: italic; color: #3d372f; line-height: 1.5; }

        .pb-steps { list-style: none; margin: 0 0 24px; padding: 0; border-top: 1px solid #6b6458; }
        .pb-step {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 13px 0; border-bottom: 1px solid #6b6458;
          font-size: 15.5px; line-height: 1.5; color: #3d372f;
        }
        .pb-num {
          flex-shrink: 0; width: 26px; height: 26px; margin-top: 1px;
          display: flex; align-items: center; justify-content: center;
          background: #15120f; color: #f1ecdf;
          font-family: var(--sans), Arial, sans-serif; font-size: 12px; font-weight: 700;
        }
        .pb-step b { color: #15120f; }

        .pb-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .pb-btn {
          font-family: var(--sans), Arial, sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 14px 22px; border: 2px solid #15120f; cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .pb-btn-primary { flex: 1; background: #15120f; color: #f1ecdf; }
        .pb-btn-primary:hover { background: transparent; color: #15120f; }
        .pb-btn-cancel { background: transparent; color: #15120f; }
        .pb-btn-cancel:hover { background: #15120f; color: #f1ecdf; }

        .pb-trigger {
          position: fixed; bottom: 24px; right: 24px; z-index: 999;
          display: inline-flex; align-items: center; gap: 10px;
          padding: 13px 20px;
          background: #f1ecdf; color: #15120f;
          border: 2px solid #15120f; box-shadow: 4px 4px 0 #15120f;
          font-family: var(--sans), Arial, sans-serif; font-size: 12px; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase; cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .pb-trigger:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0 #15120f; }
        .pb-trigger:active { transform: translate(4px, 4px); box-shadow: 0 0 0 #15120f; }

        @media (max-width: 480px) {
          .pb-modal { padding: 24px 20px 22px; box-shadow: 5px 5px 0 #15120f; }
          .pb-title { font-size: 28px; }
          .pb-trigger { bottom: 14px; right: 14px; padding: 11px 14px; }
        }
      `}</style>

      {showModal && (
        <div className="pb-backdrop no-print" onClick={closeModal}>
          <div
            className={`pb-modal${animate ? "" : " pb-out"}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pb-title"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="pb-kicker">Print desk</p>
            <h2 className="pb-title" id="pb-title">Save as PDF</h2>
            <p className="pb-sub">Sundin ang tatlong hakbang para sa malinis na PDF copy.</p>

            <ol className="pb-steps">
              {steps.map(([lead, rest], i) => {
                const [bold, ...tail] = rest.split(/(?<=Destination dropdown|More settings|Save button)/);
                return (
                  <li className="pb-step" key={i}>
                    <span className="pb-num">{i + 1}</span>
                    <span>
                      {lead} <b>{bold}</b>
                      {tail.join("")}
                    </span>
                  </li>
                );
              })}
            </ol>

            <div className="pb-actions">
              <button className="pb-btn pb-btn-primary" onClick={handlePrint}>
                Open print dialog →
              </button>
              <button className="pb-btn pb-btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="pb-trigger no-print" onClick={openModal}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 13h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        Save as PDF
      </button>
    </>
  );
}
