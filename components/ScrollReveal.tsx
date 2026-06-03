"use client";

import { useEffect, useRef, ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "fade";
  className?: string;
};

export default function ScrollReveal({ children, delay = 0, direction = "up", className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add("sr-visible"), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`sr-hidden sr-${direction} ${className}`}>
      {children}
      <style suppressHydrationWarning>{`
        .sr-hidden { opacity: 0; transition: opacity 0.6s ease, transform 0.6s ease; }
        .sr-up    { transform: translateY(28px); }
        .sr-left  { transform: translateX(-28px); }
        .sr-right { transform: translateX(28px); }
        .sr-fade  { transform: none; }
        .sr-visible { opacity: 1 !important; transform: none !important; }
      `}</style>
    </div>
  );
}
