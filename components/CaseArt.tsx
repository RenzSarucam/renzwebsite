import type { CaseFile } from "@/app/_lib/case-files";
import ExhibitCircle from "@/components/ExhibitCircle";
import DeviceMockup from "@/components/DeviceMockup";

const markOf = (c: CaseFile) => {
  const acr = c.headline.match(/^([A-Z0-9&-]{2,6})\b/);
  if (acr) return acr[1];
  return c.headline
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
};

/** Taped "polaroid" with CONFIRMED stamp, circled exhibit label and a typewriter caption. */
export default function CaseArt({ c, image, large = false }: { c: CaseFile; image?: string; large?: boolean }) {
  const place = c.place?.split(" · ")[0] ?? "the archive";
  const confidential = ["jit-jairo-institute-of-technology-design", "jairosoft-elms-designer"].includes(c.slug);
  return (
    <figure className={`polaroid${large ? " polaroid-lg" : ""}`}>
      <span className="tape" aria-hidden="true" />
      <div className="polaroid-shot">
        {confidential ? (
          <div className="polaroid-blank polaroid-confidential" role="img" aria-label={`${c.headline}: confidential design preview`}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <rect x="5" y="10" width="14" height="11" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
            </svg>
            <strong>Confidential</strong>
            <small>Design preview withheld</small>
          </div>
        ) : image ? (
          <DeviceMockup slug={c.slug} title={c.headline} image={image} />
        ) : (
          <div className="polaroid-blank" aria-hidden="true">
            <span>{markOf(c)}</span>
          </div>
        )}
        {!confidential && <span className="stamp-confirmed" aria-hidden="true">Confirmed</span>}
      </div>
      <figcaption className="polaroid-cap">
        <ExhibitCircle letter={c.letter} />
        <span className="recovered">recovered from {place}</span>
      </figcaption>
    </figure>
  );
}
