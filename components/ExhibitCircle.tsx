"use client";

import { useEffect, useRef, useState } from "react";

/** Hand-drawn red circle that redraws itself every time it scrolls into view. */
export default function ExhibitCircle({ letter }: { letter: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [armed, setArmed] = useState(false);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    setArmed(true);
    const io = new IntersectionObserver(([entry]) => setDrawn(entry.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`exhibit-circle${armed ? " is-armed" : ""}${drawn ? " is-drawn" : ""}`}>
      <svg className="circle-svg" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength={1}
          d="M50 3 C80 2 98 10 97 21 C96 33 70 38 48 37 C22 36 3 30 4 19 C5 8 28 3 55 4 C62 4 68 5 73 7"
        />
      </svg>
      <span className="circle-text">Exhibit {letter}</span>
    </span>
  );
}
