"use client";

import { useEffect } from "react";

/** Elements that type themselves out once the intro hands over, in reading order. */
const TARGETS = [
  ".mast-top",
  ".mast-name",
  ".mast-tag",
  ".mast-dateline",
  ".hero-strip",
  ".hero-kicker",
  ".hero-title",
  ".hero-deck",
  ".hero-byline",
];

const MS_PER_CHAR = 24;
const MAX_MS = 1100; // one element never takes longer than this, however long its text
const OVERLAP = 0.5; // the next element starts when this one is this far along

type Part = { node: Text; full: string; rest: HTMLSpanElement };

function prepare(el: HTMLElement): { parts: Part[]; total: number } {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if ((n.nodeValue ?? "").trim() || /\S/.test(n.nodeValue ?? "")) nodes.push(n as Text);
  }
  const parts: Part[] = nodes.map((node) => {
    const full = node.nodeValue ?? "";
    // everything not typed yet stays in the layout but is invisible, so nothing jumps around
    const rest = document.createElement("span");
    rest.className = "tt-rest";
    rest.textContent = full;
    node.nodeValue = "";
    node.after(rest);
    return { node, full, rest };
  });
  return { parts, total: parts.reduce((n, p) => n + p.full.length, 0) };
}

function restore(parts: Part[]) {
  for (const p of parts) {
    p.node.nodeValue = p.full;
    p.rest.remove();
  }
}

export default function TypeIn() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const html = document.documentElement;
    const cleanups: Array<() => void> = [];
    let started = false;

    const run = () => {
      if (started) return;
      started = true;

      const els = TARGETS.map((s) => document.querySelector<HTMLElement>(s)).filter((e): e is HTMLElement => !!e);
      const jobs = els.map((el) => ({ el, ...prepare(el) }));
      jobs.forEach((j) => j.el.setAttribute("data-typing", ""));

      const t0 = performance.now();
      let at = 0;
      const plan = jobs.map((j) => {
        const dur = Math.min(MAX_MS, Math.max(260, j.total * MS_PER_CHAR));
        const start = at;
        at += dur * OVERLAP;
        return { ...j, start, dur };
      });
      const end = Math.max(...plan.map((p) => p.start + p.dur));

      let raf = 0;
      const tick = (now: number) => {
        const t = now - t0;
        for (const p of plan) {
          const k = Math.min(1, Math.max(0, (t - p.start) / p.dur));
          let left = Math.round(k * p.total);
          for (const part of p.parts) {
            const n = Math.min(part.full.length, left);
            left -= n;
            part.node.nodeValue = part.full.slice(0, n);
            part.rest.textContent = part.full.slice(n);
          }
          p.el.classList.toggle("is-typing", k > 0 && k < 1);
        }
        if (t < end) raf = requestAnimationFrame(tick);
        else finish();
      };

      const finish = () => {
        jobs.forEach((j) => {
          restore(j.parts);
          j.el.classList.remove("is-typing");
          j.el.removeAttribute("data-typing");
        });
      };

      raf = requestAnimationFrame(tick);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        finish();
      });
    };

    // the intro adds this class the moment the subject is found (or the intro is skipped)
    if (html.classList.contains("intro-enter")) run();
    const mo = new MutationObserver(() => html.classList.contains("intro-enter") && run());
    mo.observe(html, { attributes: true, attributeFilter: ["class"] });

    return () => {
      mo.disconnect();
      cleanups.forEach((c) => c());
    };
  }, []);

  return null;
}
