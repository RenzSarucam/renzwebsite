import type { CaseFile } from "@/app/_lib/case-files";

export const isConfidentialProject = (slug: string) =>
  ["jit-jairo-institute-of-technology-design", "jairosoft-elms-designer"].includes(slug);

/** Project screenshots treated as printed illustrations throughout the portfolio. */
export default function CaseArt({ c, image, large = false }: { c: CaseFile; image?: string; large?: boolean }) {
  const confidential = isConfidentialProject(c.slug);
  if (!image && !confidential) return null;

  return (
    <figure className={`polaroid${large ? " polaroid-lg" : ""}`}>
      <div className="polaroid-shot">
        {confidential ? (
          <div className="polaroid-confidential" role="img" aria-label={`${c.headline}: confidential design preview`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
            </svg>
            <strong>Confidential</strong>
            <small>Design preview withheld</small>
          </div>
        ) : (
          <img className="project-print" src={image} alt={`${c.headline} — project screenshot`} loading="lazy" />
        )}
      </div>
    </figure>
  );
}
