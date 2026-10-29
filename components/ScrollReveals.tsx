"use client";

import { useEffect } from "react";

const targets = [
  { selector: ".page main .section-head > div:first-child", kind: "heading" },
  { selector: ".page main .section-head > .section-no, .page main .section-head > .file-side", kind: "fade" },
  { selector: ".page main .profile-cols p, .page main .pull", kind: "rise" },
  { selector: ".page main .filters", kind: "fade" },
  { selector: ".page main .works-grid > .exhibit", kind: "card" },
  { selector: ".page main .lab tbody tr", kind: "fade" },
  { selector: ".page main .timeline > .t-item", kind: "row" },
  { selector: ".page main .cred-h, .page main .edu, .page main .cert", kind: "row" },
  { selector: ".page main .cbox-left, .page main .cbox-right", kind: "rise" },
  { selector: ".page .ft-name, .page .ft-grid > *, .page .ft-stamp-row, .page .ft-bottom", kind: "fade" },
  { selector: ".case .case-image-preview, .case > .polaroid-lg", kind: "card" },
  { selector: ".case .case-h, .case .case-body, .case .case-side > *, .case .case-pager", kind: "rise" },
] as const;

export default function ScrollReveals() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;

    const stop = () => {
      observer?.disconnect();
      mutations?.disconnect();
    };

    const start = () => {
      stop();
      document.querySelectorAll<HTMLElement>(".scroll-pending").forEach((el) => el.classList.remove("scroll-pending"));
      if (reduceMotion.matches) return;

      const seen = new WeakSet<Element>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            entry.target.classList.remove("scroll-pending");
            observer?.unobserve(entry.target);
          }
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.01 },
      );

      const prepare = (el: HTMLElement, kind: string) => {
        if (seen.has(el) || el.closest('.collapse[aria-hidden="true"]')) return;
        if (el.classList.contains("scroll-reveal") && !el.classList.contains("scroll-pending")) return;
        seen.add(el);
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) return;
        el.classList.add("scroll-reveal", `scroll-reveal--${kind}`, "scroll-pending");
        observer?.observe(el);
      };

      const scan = (root: ParentNode) => {
        for (const { selector, kind } of targets) {
          if (root instanceof HTMLElement && root.matches(selector)) prepare(root, kind);
          root.querySelectorAll<HTMLElement>(selector).forEach((el) => prepare(el, kind));
        }
      };

      scan(document);
      mutations = new MutationObserver((records) => {
        for (const record of records) {
          if (record.type === "attributes") {
            scan(record.target as HTMLElement);
          } else {
            record.addedNodes.forEach((node) => {
              if (node instanceof HTMLElement) scan(node);
            });
          }
        }
      });
      mutations.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["aria-hidden"] });
    };

    start();
    reduceMotion.addEventListener("change", start);
    return () => {
      stop();
      reduceMotion.removeEventListener("change", start);
      document.querySelectorAll<HTMLElement>(".scroll-pending").forEach((el) => el.classList.remove("scroll-pending"));
    };
  }, []);

  return null;
}
