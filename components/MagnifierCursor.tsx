"use client";

import { useEffect, useRef } from "react";

/** Anything clickable: a small magnifier tags along beside the normal pointer. */
const TARGETS = "a[href], button:not(:disabled), summary, [role='button'], label[for], .exhibit.is-linked";

const SIZE = 24;
// offset from the pointer tip: the icon sits at the lower right of the pointer, like a cursor badge
const OFFSET_X = 14;
const OFFSET_Y = 12;

export default function MagnifierCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let on = false;
    let tx = -100, ty = -100, x = -100, y = -100, raf = 0;

    const setOn = (next: boolean) => {
      if (next === on) return;
      on = next;
      el.classList.toggle("is-on", next);
    };

    const tick = () => {
      const k = reduce ? 1 : 0.35;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(tick) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const hit = e.target instanceof Element && e.target.closest(TARGETS);
      tx = e.clientX + OFFSET_X;
      ty = e.clientY + OFFSET_Y;
      if (hit && !on) {
        x = tx;
        y = ty;
      }
      setOn(!!hit);
      if (hit) kick();
    };
    const onLeave = () => setOn(false);
    const onDown = () => el.classList.add("is-down");
    const onUp = () => el.classList.remove("is-down");

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} className="magnifier-cursor" aria-hidden="true">
      <svg viewBox="0 0 48 48" width={SIZE} height={SIZE}>
        {/* paper halo keeps it legible over black buttons and photos */}
        <circle cx="20" cy="20" r="12" fill="none" stroke="#f1ecdf" strokeWidth="8" />
        <line x1="29" y1="29" x2="43" y2="43" stroke="#f1ecdf" strokeWidth="9" strokeLinecap="round" />
        <circle cx="20" cy="20" r="12" fill="rgba(251,249,243,0.28)" stroke="#15120f" strokeWidth="4" />
        <line x1="29" y1="29" x2="43" y2="43" stroke="#15120f" strokeWidth="5" strokeLinecap="round" />
      </svg>
    </div>
  );
}
