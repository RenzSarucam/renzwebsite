"use client";
import { useEffect } from "react";

const GROUPS: { sel: string; type?: "left" | "right"; stagger?: boolean }[] = [
  // About
  { sel: ".about-avatar-card",    type: "left"  },
  { sel: ".about-facts",          type: "left"  },
  { sel: ".about-bio-block"                      },
  { sel: ".about-services-label"                 },
  { sel: ".about-service-card",   stagger: true  },
  // Experience
  { sel: ".exp-card",             stagger: true  },
  // Projects — handled by Projects component already, but add fade
  { sel: ".project-card",         stagger: true  },
  // Skills
  { sel: ".skill-group",          stagger: true  },
  // Certificates & Education
  { sel: ".cert-card",            stagger: true  },
  { sel: ".edu-timeline",                        },
  // Contact
  { sel: ".contact-left",         type: "left"  },
  { sel: ".contact-right",        type: "right" },
  // Section headings — only h2 inside named sections
  { sel: "#about-section h2"                     },
  { sel: "#experience h2"                        },
  { sel: "#projects h2"                          },
  { sel: "#skills h2"                            },
  { sel: "#certificates h2"                      },
  { sel: "#contact h2"                           },
];

export default function ScrollAnimations() {
  useEffect(() => {
    const observed: Element[] = [];

    GROUPS.forEach(({ sel, type, stagger }) => {
      const els = Array.from(document.querySelectorAll(sel));
      els.forEach((el, idx) => {
        const h = el as HTMLElement;
        const cls = type === "left" ? "sa-left" : type === "right" ? "sa-right" : "sa";
        h.classList.add(cls);
        // Stagger: cap at 4 to avoid very long delays
        h.style.transitionDelay = stagger ? `${Math.min(idx % 6, 4) * 80}ms` : "0ms";
        observed.push(el);
      });
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sa-in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
    );

    observed.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return null;
}
