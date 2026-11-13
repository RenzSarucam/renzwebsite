"use client";

import { useEffect, type RefObject } from "react";

/** Replay entrances only after content has completely left the viewport. */
export function useScrollReveal(
  ref: RefObject<HTMLElement>,
  selector?: string,
  revision?: string,
) {
  useEffect(() => {
    const root = ref.current;
    if (!root || typeof IntersectionObserver === "undefined") return;

    const elements = selector ? Array.from(root.querySelectorAll<HTMLElement>(selector)) : [root];
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;

    const reset = () => {
      for (const el of elements) {
        el.classList.remove("is-pre");
        el.style.removeProperty("--reveal-offset");
      }
    };

    const hide = (el: HTMLElement, above: boolean) => {
      // Keyboard focus must never disappear with an entrance animation.
      if (el.contains(document.activeElement)) return;
      el.style.setProperty("--reveal-offset", above ? "-20px" : "20px");
      el.classList.add("is-pre");
    };

    const sync = () => {
      observer?.disconnect();
      reset();
      if (motion.matches) return;

      for (const el of elements) {
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) hide(el, rect.bottom <= 0);
      }

      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) el.classList.remove("is-pre");
          else hide(el, entry.boundingClientRect.bottom <= 0);
        }
      }, { threshold: 0 });
      elements.forEach((el) => observer!.observe(el));
    };

    sync();
    motion.addEventListener("change", sync);
    return () => {
      observer?.disconnect();
      motion.removeEventListener("change", sync);
      reset();
    };
  }, [ref, selector, revision]);
}
