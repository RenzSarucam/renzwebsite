"use client";

import { useState } from "react";
import { workExperiences } from "@/app/_lib/portfolio-data";

const LIMIT = 6;
const CLAMP = 220;

function Entry({ w, current }: { w: (typeof workExperiences)[number]; current: boolean }) {
  const [open, setOpen] = useState(false);
  const long = w.description.length > CLAMP;
  const text = long && !open ? w.description.slice(0, CLAMP).replace(/\s+\S*$/, "") + "…" : w.description;

  return (
    <li className="t-item">
      <div className="t-date">{w.period.replace(/\s*–\s*/g, " – ")}{current && " ●"}</div>
      <div className="t-body">
        <h3 className="t-role">{w.role}</h3>
        <p className="t-org">
          {w.company} · {w.location}
        </p>
        <p className="t-desc">{text}</p>
        {long && (
          <button className="t-more" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
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
  const list = all ? workExperiences : workExperiences.slice(0, LIMIT);

  return (
    <div>
      <ol className="timeline">
        {list.map((w, i) => (
          <Entry key={`${w.company}-${w.period}`} w={w} current={i === 0 && /present/i.test(w.period)} />
        ))}
      </ol>
      {workExperiences.length > LIMIT && (
        <div className="more-row">
          <button className="btn" onClick={() => setAll((v) => !v)}>
            {all ? "Show fewer entries" : `Reopen cold cases (${workExperiences.length - LIMIT} earlier entries)`}
          </button>
        </div>
      )}
    </div>
  );
}
