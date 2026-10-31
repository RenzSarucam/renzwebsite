"use client";

import { useId, useState } from "react";
import { workExperiences } from "@/app/_lib/portfolio-data";
import { useCollapseScroll } from "@/app/_lib/use-collapse-scroll";
import TypeFade from "@/components/TypeFade";

const LIMIT = 6;
const CLAMP = 220;

function Entry({ w }: { w: (typeof workExperiences)[number] }) {
  const [open, setOpen] = useState(false);
  const descriptionId = useId();
  const long = w.description.length > CLAMP;
  const text = long && !open ? w.description.slice(0, CLAMP).replace(/\s+\S*$/, "") + "…" : w.description;

  return (
    <li className="t-item">
      <div className="t-meta">
        <h3 className="t-role"><TypeFade>{w.role}</TypeFade></h3>
        <p className="t-org">
          {w.company} · {w.location}
        </p>
      </div>
      <div className="t-body">
        <p id={descriptionId} className="t-desc">{text}</p>
        {long && (
          <button className="t-more" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-controls={descriptionId}>
            {open ? "Read less" : "Read more"}
          </button>
        )}
        {w.tools.length > 0 && (
          <div className="tags" style={{ marginTop: 0 }}>
            {w.tools.map((t) => (
              <span className="tag" key={t}>
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}

export default function Career() {
  const [all, setAll] = useState(false);
  useCollapseScroll(all, "career");
  const list = all ? workExperiences : workExperiences.slice(0, LIMIT);

  return (
    <div>
      <ol className="timeline">
        {list.map((w) => (
          <Entry key={`${w.company}-${w.period}`} w={w} />
        ))}
      </ol>
      {workExperiences.length > LIMIT && (
        <div className="more-row">
          <button className="btn" onClick={() => setAll((v) => !v)}>
            {all ? "Show fewer roles" : `Show ${workExperiences.length - LIMIT} earlier roles`}
          </button>
        </div>
      )}
    </div>
  );
}
