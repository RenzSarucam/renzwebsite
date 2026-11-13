<<<<<<< HEAD
"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/app/_lib/use-scroll-reveal";

export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useScrollReveal(ref);

=======
export default function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
>>>>>>> 71e37e9277966704943729a342b36013b4d9d884
  return (
    <div className={className}>
      {children}
    </div>
  );
}
