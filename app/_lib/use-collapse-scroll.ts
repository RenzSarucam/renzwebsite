"use client";

import { useLayoutEffect, useRef } from "react";

/** Restore the section view after removing expanded content, before painting. */
export function useCollapseScroll(expanded: boolean, sectionId: string) {
  const wasExpanded = useRef(expanded);

  useLayoutEffect(() => {
    if (wasExpanded.current && !expanded) {
      document.getElementById(sectionId)?.scrollIntoView({
        block: "start",
        behavior: "instant",
      });
    }
    wasExpanded.current = expanded;
  }, [expanded, sectionId]);
}
