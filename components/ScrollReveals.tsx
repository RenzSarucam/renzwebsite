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
  { selector: ".page main .cbox-title", kind: "heading" },
  { selector: ".page main .cbox-intro", kind: "fade" },
  { selector: ".page main .cfield, .page main .cbox-foot, .page main .cbox-block, .page main .cbox-icons", kind: "rise" },
  { selector: ".page .ft-name", kind: "heading" },
  { selector: ".page .ft-grid > *, .page .ft-bottom", kind: "fade" },
  { selector: ".case .case-image-preview, .case > .polaroid-lg", kind: "card" },
  { selector: ".case .case-h, .case .case-body, .case .case-side > *, .case .case-pager", kind: "rise" },
] as const;

export default function ScrollReveals() {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer: IntersectionObserver | undefined;
    let mutations: MutationObserver | undefined;
    const decorated = new Map<HTMLElement, string>();
    const typing = new Map<Element, ReturnType<typeof setTimeout>>();

    const stop = () => {
      observer?.disconnect();
      mutations?.disconnect();
      typing.forEach(clearTimeout);
      typing.clear();
    };

    const completeType = (element: Element) => {
      element.classList.add("scroll-type-complete");
      clearTimeout(typing.get(element));
      typing.delete(element);
    };

    const reveal = (element: Element, complete = false) => {
      element.classList.remove("scroll-pending", "scroll-away");
      if (!element.querySelector(".type-fade") || element.classList.contains("scroll-type-complete")) {
        return;
      } else if (complete) {
        completeType(element);
      } else if (!typing.has(element)) {
        typing.set(element, setTimeout(() => completeType(element), 600));
      }
    };

    const conceal = (element: Element, fullyOutside: boolean, above = false) => {
      clearTimeout(typing.get(element));
      typing.delete(element);
      if (fullyOutside) {
        // Move away from the viewport so resetting the entrance cannot trigger itself again.
        element.classList.toggle("scroll-above", above);
        element.classList.add("scroll-pending");
        element.classList.remove("scroll-away", "scroll-type-complete");
      } else {
        completeType(element);
        element.classList.add("scroll-away");
      }
    };

    // Keyboard users can focus a field before its scroll entrance has fired.
    const onFocus = (event: FocusEvent) => {
      let pending = event.target instanceof Element ? event.target.closest(".scroll-reveal") : null;
      while (pending) {
        reveal(pending, true);
        pending = pending.parentElement?.closest(".scroll-reveal") ?? null;
      }
    };

    const start = () => {
      stop();
      decorated.forEach((_, el) => el.classList.remove("scroll-pending", "scroll-away", "scroll-above"));
      if (reduceMotion.matches) return;

      const seen = new WeakSet<Element>();
      const ratios = new WeakMap<Element, number>();
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const previousRatio = ratios.get(entry.target) ?? 0;
            ratios.set(entry.target, entry.intersectionRatio);
            if (!entry.isIntersecting || entry.intersectionRatio === 0) {
              conceal(entry.target, true, entry.boundingClientRect.bottom <= 0);
            } else if (entry.intersectionRatio < 0.18 && entry.intersectionRatio < previousRatio) {
              // Start fading while the last part is still visible, in either scroll direction.
              conceal(entry.target, false);
            } else {
              reveal(entry.target, entry.intersectionRatio >= 0.99);
            }
          }
        },
        { threshold: [0, 0.01, 0.18, 0.99] },
      );

      const prepare = (el: HTMLElement, kind: string) => {
        if (seen.has(el) || el.closest('.collapse[aria-hidden="true"]')) return;
        seen.add(el);
        const rect = el.getBoundingClientRect();
        decorated.set(el, kind);
        el.classList.add("scroll-reveal", `scroll-reveal--${kind}`);
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          reveal(el, true);
        } else {
          conceal(el, true, rect.bottom <= 0);
        }
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
        for (const el of decorated.keys()) {
          if (!el.isConnected) {
            observer?.unobserve(el);
            clearTimeout(typing.get(el));
            typing.delete(el);
            decorated.delete(el);
          }
        }
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
    document.addEventListener("focusin", onFocus);
    reduceMotion.addEventListener("change", start);
    return () => {
      stop();
      document.removeEventListener("focusin", onFocus);
      reduceMotion.removeEventListener("change", start);
      // Remove our preparation too, so a Strict Mode remount can register unseen elements again.
      decorated.forEach((kind, el) => el.classList.remove("scroll-pending", "scroll-away", "scroll-above", "scroll-reveal", `scroll-reveal--${kind}`, "scroll-type-complete"));
    };
  }, []);

  return null;
}
