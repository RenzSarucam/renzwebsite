"use client";

import { useEffect, useRef, useState } from "react";

// Module scope: survives client-side navigation (e.g. "Back to the case"), resets on a real page load.
let played = false;

const COLS = 5;
const MAGNIFY = 1.8; // how much the glass enlarges what is under it
const DWELL_MS = 650; // how long the glass must hold over the subject
const IDLE_MS = 4500; // no mouse/touch for this long → the glass drifts to the subject by itself
const HOLD_MS = 1300; // "subject found" stays this long before the sheet leaves
const SLIDE_MS = 750;

/** Deterministic pseudo-random so server and client render the very same "newspaper". */
function rng(seed: number) {
  let s = seed;
  return () => (s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296;
}

type Bar = { kind: "head" | "line"; w: number };
const COLUMNS: Bar[][] = (() => {
  const r = rng(7);
  return Array.from({ length: COLS }, () => {
    const bars: Bar[] = [];
    while (bars.length < 46) {
      bars.push({ kind: "head", w: 40 + Math.round(r() * 22) });
      const lines = 5 + Math.floor(r() * 5);
      for (let i = 0; i < lines; i++) bars.push({ kind: "line", w: i === lines - 1 ? 35 + Math.round(r() * 40) : 100 });
    }
    return bars;
  });
})();

/** A page of grey "text" columns with the wanted notice in the middle column. */
function Board() {
  return (
    <div className="gi-board">
      <div className="gi-cols">
        {COLUMNS.map((col, c) => (
          <div className="gi-col" key={c}>
            {col.map((b, i) => (
              <span key={i} className={`gi-bar gi-${b.kind}`} style={{ width: `${b.w}%` }} />
            ))}
          </div>
        ))}
      </div>
      <div className="gi-wanted">
        <span className="gi-w-title">Wanted</span>
        <b className="gi-w-name">Renz Carljansen Sarucam</b>
        <i className="gi-w-rule" />
        <span className="gi-w-sub">Full-stack · DevOps</span>
      </div>
    </div>
  );
}

export default function Intro() {
  const [hidden, setHidden] = useState(false);
  const [found, setFound] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [ready, setReady] = useState(false); // the glass only appears once it is positioned and live

  const root = useRef<HTMLDivElement>(null);
  const lens = useRef<HTMLDivElement>(null);
  const clone = useRef<HTMLDivElement>(null);
  const bg = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  // mark as played only once it has really finished (React Strict Mode runs effects twice in dev)
  const finish = () => {
    played = true;
    setHidden(true);
  };

  // the site underneath waits (hidden) while the intro plays, then its text enters one piece at a time
  const startLeave = () => {
    const h = document.documentElement;
    h.classList.remove("intro-on");
    h.classList.add("intro-enter");
    setTimeout(() => h.classList.remove("intro-enter"), 3200);
    setLeaving(true);
  };

  useEffect(() => {
    if (played) {
      setHidden(true);
      return;
    }
    const el = lens.current;
    const cl = clone.current;
    const bgEl = bg.current;
    if (!el || !cl || !bgEl) return;

    const html = document.documentElement;
    html.classList.add("intro-on");
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden"; // no page scroll behind the intro

    let vw = window.innerWidth;
    let vh = window.innerHeight;
    let r = el.offsetWidth / 2;
    let targetX = vw / 2;
    let targetY = vh / 2;

    // lens position (lx,ly) chases the pointer target (tx,ty)
    let tx = vw / 2;
    let ty = vh * 0.22;
    let lx = tx;
    let ly = ty;
    let lastMove = performance.now();
    let dwell = 0;
    let last = performance.now();
    let raf = 0;
    let foundNow = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const measure = () => {
      vw = window.innerWidth;
      vh = window.innerHeight;
      r = el.offsetWidth / 2;
      cl.style.width = `${vw}px`;
      cl.style.height = `${vh}px`;
      const w = bgEl.querySelector(".gi-wanted");
      if (w) {
        const b = w.getBoundingClientRect();
        targetX = b.left + b.width / 2;
        targetY = b.top + b.height / 2;
      }
    };
    measure();

    const onFound = () => {
      if (foundNow) return;
      foundNow = true;
      tx = targetX;
      ty = targetY;
      setFound(true);
      timers.push(setTimeout(startLeave, HOLD_MS));
      timers.push(setTimeout(finish, HOLD_MS + SLIDE_MS));
    };

    const tick = (now: number) => {
      if (done.current) return;
      const dt = now - last;
      last = now;

      // nobody is steering (touch / idle): the glass drifts to the subject on its own
      if (!foundNow && now - lastMove > IDLE_MS) {
        tx = targetX;
        ty = targetY;
      }

      lx += (tx - lx) * 0.16;
      ly += (ty - ly) * 0.16;
      el.style.transform = `translate3d(${lx - r}px, ${ly - r}px, 0)`;
      // the enlarged copy of the page, shifted so the point under the lens centre stays put
      cl.style.transform = `translate(${r - lx * MAGNIFY}px, ${r - ly * MAGNIFY}px) scale(${MAGNIFY})`;

      if (!foundNow) {
        const d = Math.hypot(lx - targetX, ly - targetY);
        dwell = d < r * 0.38 ? dwell + dt : 0;
        if (dwell > DWELL_MS) onFound();
      }
      raf = requestAnimationFrame(tick);
    };
    // place the glass (and its magnified copy) before showing it, so it never flashes in the wrong spot
    el.style.transform = `translate3d(${lx - r}px, ${ly - r}px, 0)`;
    cl.style.transform = `translate(${r - lx * MAGNIFY}px, ${r - ly * MAGNIFY}px) scale(${MAGNIFY})`;
    setReady(true);
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      if (foundNow) return;
      tx = e.clientX;
      ty = e.clientY;
      lastMove = performance.now();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") skip();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("resize", measure);
    window.addEventListener("keydown", onKey);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("resize", measure);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = prevOverflow;
      html.classList.remove("intro-on");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // give the page its scroll back as soon as the intro is gone
  useEffect(() => {
    if (hidden) document.documentElement.style.overflow = "";
  }, [hidden]);

  const skip = () => {
    done.current = true;
    startLeave();
    setTimeout(finish, SLIDE_MS);
  };

  return (
    <div
      ref={root}
      className={`gi${hidden ? " is-hidden" : ""}${leaving ? " is-leaving" : ""}${found ? " is-found" : ""}${ready ? " is-ready" : ""}`}
      role="presentation"
    >
      <div className="gi-bg" ref={bg} aria-hidden="true">
        <Board />
      </div>
      <div className="gi-dots" aria-hidden="true" />
      <div className="gi-vignette" aria-hidden="true" />

      <div className="gi-lens" ref={lens} aria-hidden="true">
        <div className="gi-glass">
          <div className="gi-clone" ref={clone}>
            <Board />
          </div>
        </div>
        <div className="gi-ring" />
        <div className="gi-handle" />
      </div>

      <span className={`gi-stamp${found ? " on" : ""}`} aria-hidden="true">
        Subject found
      </span>

      <p className="gi-caption">{found ? "Subject located — filing the case" : "Pick up the glass — find the subject"}</p>

      <button className="gi-skip" onClick={skip}>
        Skip intro →
      </button>
    </div>
  );
}
