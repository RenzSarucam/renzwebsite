"use client";

import { useEffect, useId, useState } from "react";
import Reveal from "@/components/Reveal";

type Props = {
  id: string;
  kicker: string;
  title: string;
  sub?: string;
  file: string;
  children: React.ReactNode;
};

/** A section that starts closed; the toggle on the right of the header reveals the details. */
export default function CollapsibleSection({ id, kicker, title, sub, file, children }: Props) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  // deep links (e.g. a footer link to #career) open the file
  useEffect(() => {
    const sync = () => {
      if (window.location.hash === `#${id}`) setOpen(true);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [id]);

  return (
    <section id={id} className={`section${open ? "" : " is-collapsed"}`}>
      <div className="wrap">
        <Reveal>
          <div className={`section-head${open ? "" : " is-closed"}`}>
            <div>
              <p className="kicker">{kicker}</p>
              <h2 className="section-title">{title}</h2>
              {sub && <p className="section-sub">{sub}</p>}
            </div>
            <div className="file-side">
              <span className="section-no">{file}</span>
              <button
                type="button"
                className="file-toggle"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpen((v) => !v)}
              >
                {open ? "Close file" : "Open file"}
                <span aria-hidden="true" className="file-toggle-icon">{open ? "−" : "+"}</span>
              </button>
            </div>
          </div>

          <div id={panelId} className={`collapse${open ? " is-open" : ""}`} aria-hidden={!open}>
            <div className="collapse-inner">{children}</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
