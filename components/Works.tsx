"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { caseFiles } from "@/app/_lib/case-files";
import CaseArt from "@/components/CaseArt";
import { useCollapseScroll } from "@/app/_lib/use-collapse-scroll";
import { useScrollReveal } from "@/app/_lib/use-scroll-reveal";

const FILTERS = ["All", "Full Stack", "Docker", "Mobile", "Figma"] as const;
const INITIAL = 9;

export default function Works({ images }: { images: Record<string, string> }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [expanded, setExpanded] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  useScrollReveal(grid, ".exhibit", `${filter}:${expanded}`);
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
      <div className="filters" role="group" aria-label="Filter exhibits">
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

      <div className="works-grid" ref={grid}>
        {shown.map((c) => (
          <Link
            href={`/case-files/${c.slug}`}
            className="exhibit is-linked reveal"
            key={c.slug}
            aria-label={`Open case file: ${c.headline}`}
          >
            <p className="exhibit-letter">Exhibit {c.letter}</p>
            <p className="exhibit-client">{c.place?.split(" · ")[0] ?? "Personal Project"}</p>
            <h3 className="exhibit-title">
              {c.headline}
            </h3>
            <div className="exhibit-hit">
              <CaseArt c={c} image={images[c.slug]} />
            </div>
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
                <span className="exhibit-link">
                  Open case file <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length > INITIAL && (
        <div className="more-row">
          <button className="btn" onClick={() => setExpanded((v) => !v)}>
            {expanded ? "Seal the archive" : `Pull the archive (${filtered.length - INITIAL} more)`}
          </button>
        </div>
      )}
    </div>
  );
}
