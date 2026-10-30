"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Intro.module.css";

// Replay on a full refresh, but not when returning from a project.
let played = false;
const PRINT_MS = 1520; // 2 seconds total, including the 480ms exit.
const EXIT_MS = 480;

export default function Intro() {
  // Include the intro in the server HTML so it covers the portfolio before hydration.
  const [visible, setVisible] = useState(() => !played);
  const [leaving, setLeaving] = useState(false);
  const skipButton = useRef<HTMLButtonElement>(null);
  const leave = useRef<() => void>(() => {});
  const skip = useCallback(() => leave.current(), []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (played || motion.matches) {
      setVisible(false);
      return;
    }

    const html = document.documentElement;
    const page = document.querySelector<HTMLElement>(".page");
    const previousOverflow = html.style.overflow;
    const previousInert = page?.inert ?? false;
    let exiting = false;
    let finished = false;
    let exitTimer: ReturnType<typeof setTimeout> | undefined;

    html.style.overflow = "hidden";
    if (page) page.inert = true;
    setVisible(true);
    setLeaving(false);

    const restorePage = () => {
      html.style.overflow = previousOverflow;
      if (page) page.inert = previousInert;
    };
    const finish = () => {
      if (finished) return;
      finished = true;
      played = true;
      const hadFocus = document.activeElement === skipButton.current;
      restorePage();
      setVisible(false);
      if (hadFocus) page?.querySelector<HTMLElement>("a[href], button")?.focus({ preventScroll: true });
    };
    const startLeave = () => {
      if (exiting || finished) return;
      exiting = true;
      setLeaving(true);
      exitTimer = setTimeout(finish, EXIT_MS);
    };

    leave.current = startLeave;
    const printTimer = setTimeout(startLeave, PRINT_MS);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") startLeave();
      if (event.key === "Tab" && !finished) {
        event.preventDefault();
        skipButton.current?.focus();
      }
    };
    const onMotionChange = () => {
      if (motion.matches) finish();
    };
    window.addEventListener("keydown", onKey);
    motion.addEventListener("change", onMotionChange);

    return () => {
      clearTimeout(printTimer);
      clearTimeout(exitTimer);
      leave.current = () => {};
      window.removeEventListener("keydown", onKey);
      motion.removeEventListener("change", onMotionChange);
      restorePage();
    };
  }, []);

  if (!visible) return null;

  return (
    <div id="portfolio-intro" className={`${styles.press}${leaving ? ` ${styles.leaving}` : ""}`} role="region" aria-label="Portfolio introduction">
      <noscript>
        <style>{"#portfolio-intro { display: none !important; }"}</style>
      </noscript>
      <header className={styles.header}>
        <span className={styles.imprint}>An independent portfolio</span>
        <button ref={skipButton} className={styles.skip} onClick={skip}>
          Skip intro
        </button>
      </header>

      <div className={styles.sheet}>
        <div className={styles.edition}>
          <span>Davao City, Philippines</span>
          <span>Personal edition</span>
        </div>
        <div className={styles.nameplate}>
          <p className={styles.the}>The</p>
          <h2 className={styles.title}>
            <span className={styles.firstLine}>Renz</span>
            <span className={styles.printLine}>
              <span className={styles.unprinted}>Report.</span>
              <span className={styles.printed} aria-hidden="true">Report.</span>
              <span className={styles.roller} aria-hidden="true" />
            </span>
          </h2>
          <span className={styles.proof} aria-hidden="true">Fresh<br />off the press.</span>
        </div>
        <div className={styles.byline}>
          <p>Renz Carljansen Sarucam</p>
          <p>Development, design &amp; the work in between.</p>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.status} role="status">
          <img className={styles.statusIcon} src="/cursors/fountain-pen.svg" width="22" height="22" alt="" aria-hidden="true" draggable={false} />
          {leaving ? "Ready to read" : "Putting ink to paper"}
        </p>
        <span className={styles.turn}>A few things I’ve made</span>
      </footer>
    </div>
  );
}
