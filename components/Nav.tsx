"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const links: [label: string, id: string][] = [
  ["Work", "work"],
  ["Stack", "stack"],
  ["Contact", "contact"],
];

// the nav is ~62px tall; a section counts as "current" once its top has passed just under it
const OFFSET = 140;

export default function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [bar, setBar] = useState<{ x: number; w: number } | null>(null);
  const [animate, setAnimate] = useState(false);
  const wrap = useRef<HTMLElement>(null);
  const items = useRef<Record<string, HTMLAnchorElement | null>>({});
  // while the page smooth-scrolls after a click, keep the clicked link as current instead of
  // letting the sections it passes on the way steal the underline
  const lock = useRef<{ id: string; timer?: ReturnType<typeof setTimeout> } | null>(null);

  // which section is current
  useEffect(() => {
    const release = () => {
      if (lock.current?.timer) clearTimeout(lock.current.timer);
      lock.current = null;
    };
    const update = () => {
      if (lock.current) {
        setActive(lock.current.id);
        clearTimeout(lock.current.timer);
        lock.current.timer = setTimeout(release, 180); // scrolling has settled
        return;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current: string | null = null;
      for (const [, id] of links) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= OFFSET) current = id;
      }
      setActive(atBottom ? links[links.length - 1][1] : current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    // the user taking over the scroll ends the lock
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    window.addEventListener("keydown", release);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.removeEventListener("keydown", release);
      release();
    };
  }, []);

  // the single underline glides to the hovered link, or back to the current one
  const target = hover ?? active;

  const measure = useCallback(() => {
    const el = target ? items.current[target] : null;
    if (el) setBar({ x: el.offsetLeft, w: el.offsetWidth });
  }, [target]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    if (!wrap.current || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure); // fonts loading / breakpoint changes shift the widths
    ro.observe(wrap.current);
    return () => ro.disconnect();
  }, [measure]);

  // first placement should appear in place, not slide in from the left edge
  useEffect(() => {
    if (bar && !animate) {
      const t = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(t);
    }
  }, [bar, animate]);

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="nav-brand" href="#top" aria-label="Back to top">
          Renz S.
        </a>
        <nav className="nav-links" aria-label="Sections" ref={wrap} onMouseLeave={() => setHover(null)}>
          {links.map(([label, id]) => (
            <a
              key={id}
              ref={(el) => {
                items.current[id] = el;
              }}
              href={`#${id}`}
              className={active === id ? "is-active" : undefined}
              aria-current={active === id ? "location" : undefined}
              onClick={() => {
                lock.current = { id };
                setActive(id);
              }}
              onMouseEnter={() => setHover(id)}
              onFocus={() => setHover(id)}
              onBlur={() => setHover(null)}
            >
              {label}
            </a>
          ))}
          <span
            className={`nav-bar${animate ? " is-animated" : ""}${target && bar ? " is-on" : ""}`}
            style={bar ? { transform: `translateX(${bar.x}px)`, width: bar.w } : undefined}
            aria-hidden="true"
          />
        </nav>
        <a className="btn btn-solid nav-cta" href="#contact">
          Hire me
        </a>
      </div>
    </header>
  );
}
