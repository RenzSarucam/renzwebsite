"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

export default function CaseImagePreview({
  image,
  title,
  children,
}: {
  image: string;
  title: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const previousOverflow = useRef<string | null>(null);

  function restoreScroll() {
    if (previousOverflow.current !== null) {
      document.body.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }

  useEffect(() => restoreScroll, []);

  function openPreview() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }

  return (
    <>
      <div className="case-image-preview">
        {children}
        <button
          type="button"
          className="case-image-trigger"
          onClick={openPreview}
          aria-label={`Enlarge screenshot: ${title}`}
          aria-haspopup="dialog"
        >
          <span className="case-image-hint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
              <path d="M9 4H4v5m11-5h5v5M4 15v5h5m11-5v5h-5" />
            </svg>
            Click or tap to enlarge
          </span>
        </button>
      </div>

      <dialog
        ref={dialogRef}
        className="case-image-dialog"
        aria-labelledby={titleId}
        onClose={restoreScroll}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="case-image-viewer">
          <div className="case-image-toolbar">
            <h2 id={titleId}>{title}</h2>
            <button type="button" className="btn" autoFocus onClick={() => dialogRef.current?.close()}>
              Close <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="case-image-full">
            <img src={image} alt={`${title} — full screenshot`} />
          </div>
          <p className="case-image-note">Press Escape or tap outside to close.</p>
        </div>
      </dialog>
    </>
  );
}
