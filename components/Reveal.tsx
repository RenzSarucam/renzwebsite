"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/app/_lib/use-scroll-reveal";

export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollReveal(ref);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
