import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseFiles, getCase } from "@/app/_lib/case-files";
import { getCaseImages } from "@/app/_lib/case-images";
import { contactEmail, profile } from "@/app/_lib/portfolio-data";
import CaseArt from "@/components/CaseArt";
import CaseImagePreview from "@/components/CaseImagePreview";
import TypeFade from "@/components/TypeFade";

type Props = { params: { slug: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseFiles.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const c = getCase(params.slug);
  if (!c) return {};
  return {
    title: `${c.headline} — Project | ${profile.fullName}`,
    description: c.deck,
  };
}

export default function CaseFilePage({ params }: Props) {
  const c = getCase(params.slug);
  if (!c) notFound();

  const image = getCaseImages()[c.slug];
  const prev = caseFiles[c.index - 1];
  const next = caseFiles[c.index + 1];
  const place = c.place ?? "Personal Project";
  const others = caseFiles.filter((o) => o.slug !== c.slug);
  const related = [
    ...others.filter((o) => o.place === c.place),
    ...others.filter((o) => o.place !== c.place && o.types.some((t) => c.types.includes(t))),
  ].slice(0, 3);
  const linkLabel = c.link.includes("figma.com") ? "View the design" : c.link.includes("github.com") ? "Read the source" : "Visit the site";

  return (
    <div className="page">
      <div className="wrap case">
        <div className="case-bar label">
          <Link href="/#work" className="back-link"><span>← Back to the case</span></Link>
          <span className="hide-sm">{profile.fullName} · Projects</span>
          <span>Filed from Davao City</span>
        </div>

        <p className="kicker" style={{ marginTop: 40 }}>
          {place}
        </p>
        <h1 className="case-title">{c.headline}</h1>
        <blockquote className="case-deck">{c.deck}</blockquote>
        <p className="byline" style={{ borderBottom: 0, paddingBottom: 0 }}>
          By <b style={{ color: "var(--ink)" }}>{profile.fullName}</b> · {c.types.join(" / ")} · Status: {c.status}
        </p>

        {image && !["jit-jairo-institute-of-technology-design", "jairosoft-elms-designer"].includes(c.slug) ? (
          <CaseImagePreview image={image} title={c.headline}>
            <CaseArt c={c} image={image} large />
          </CaseImagePreview>
        ) : (
          <CaseArt c={c} image={image} large />
        )}

        <div className="case-grid">
          <div className="case-main">
            <h2 className="case-h"><TypeFade>The Brief</TypeFade></h2>
            <p className="case-body">{c.desc}</p>

            <h2 className="case-h"><TypeFade>Tools Recovered at the Scene</TypeFade></h2>
            <div className="tags" style={{ marginTop: 0 }}>
              {c.tags.map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <aside className="case-side">
            <div className="built">
              <h3>How it was built</h3>
              <dl>
                <div><dt>Stack</dt><dd>{c.tags.slice(0, 3).join(" · ")}</dd></div>
                <div><dt>Type</dt><dd>{c.types.join(" · ")}</dd></div>
                <div><dt>Client</dt><dd>{place}</dd></div>
                <div><dt>Project</dt><dd>{c.letter}</dd></div>
                <div><dt>Status</dt><dd>{c.status}</dd></div>
                <div><dt>Deployment</dt><dd>{c.deploy}</dd></div>
              </dl>
              {related.length > 0 && (
                <div className="built-related">
                  <h4>Related exhibits</h4>
                  {related.map((r) => (
                    <Link key={r.slug} href={`/case-files/${r.slug}`}>
                      Project {r.letter} — {r.headline}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {c.link ? (
              <a className="btn btn-solid" href={c.link} target="_blank" rel="noopener noreferrer">
                {linkLabel} →
              </a>
            ) : (
              <p className="form-note">
                This project is used internally, so I can’t share its source code or live system. Contact me to learn more:{" "}
                <a href={`mailto:${contactEmail}?subject=${encodeURIComponent(`About ${c.headline}`)}`}>{contactEmail}</a>
              </p>
            )}
          </aside>
        </div>

        <nav className="case-pager" aria-label="More projects">
          {prev ? (
            <Link href={`/case-files/${prev.slug}`}>
              <span className="label">← Previous project · {prev.letter}</span>
              <b>{prev.headline}</b>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/case-files/${next.slug}`} style={{ textAlign: "right" }}>
              <span className="label">Next project · {next.letter} →</span>
              <b>{next.headline}</b>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </div>
  );
}
