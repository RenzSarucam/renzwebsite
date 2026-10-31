"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { caseFiles } from "@/app/_lib/case-files";
import CaseArt, { isConfidentialProject } from "@/components/CaseArt";
import TypeFade from "@/components/TypeFade";
import { useCollapseScroll } from "@/app/_lib/use-collapse-scroll";

const FILTERS = ["All", "Full Stack", "Docker", "Mobile", "Figma"] as const;
const INITIAL = 9;

export default function Works({ images }: { images: Record<string, string> }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [expanded, setExpanded] = useState(false);
  useCollapseScroll(expanded, "work");

  const counts = useMemo(
    () =>
      Object.fromEntries(
        FILTERS.map((f) => [f, f === "All" ? caseFiles.length : caseFiles.filter((c) => c.types.includes(f)).length])
      ) as Record<(typeof FILTERS)[number], number>,
    []
  );

  const filtered = useMemo(
    () => (filter === "All" ? caseFiles : caseFiles.filter((c) => c.types.includes(filter))),
    [filter]
  );
  const shown = expanded ? filtered : filtered.slice(0, INITIAL);

  return (
    <div>
      <div className="filters" role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <button
            key={f}
            className="chip"
            aria-pressed={filter === f}
            onClick={() => {
              setFilter(f);
              setExpanded(false);
            }}
          >
            {f}
            <small>{counts[f]}</small>
          </button>
        ))}
      </div>

      <div className="works-grid">
        {shown.map((c) => (
          <article className={`exhibit is-linked${images[c.slug] || isConfidentialProject(c.slug) ? "" : " exhibit--text"}`} key={c.slug}>
            <p className="exhibit-letter">Project {c.letter}</p>
            <p className="exhibit-client">{c.place?.split(" · ")[0] ?? "Personal Project"}</p>
            <h3 className="exhibit-title">
              <Link href={`/case-files/${c.slug}`}><TypeFade>{c.headline}</TypeFade></Link>
            </h3>
            {(images[c.slug] || isConfidentialProject(c.slug)) && <Link href={`/case-files/${c.slug}`} className="exhibit-hit" aria-label={`View project: ${c.headline}`} tabIndex={-1}>
              <CaseArt c={c} image={images[c.slug]} />
            </Link>}
            <div className="exhibit-body">
              <p className="exhibit-desc">{c.desc}</p>
              <div className="tags">
                {c.tags.slice(0, 5).map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <div className="exhibit-foot">
                <span className="exhibit-where">{c.types.join(" · ")}</span>
                <Link className="exhibit-link" href={`/case-files/${c.slug}`}>
                  View project <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {filtered.length > INITIAL && (
        <div className="more-row">
          <button className="btn" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Show fewer projects" : `Show ${filtered.length - INITIAL} more projects`}
          </button>
        </div>
      )}
    </div>
  );
}
