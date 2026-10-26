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
  return (
    <figure className={`polaroid${large ? " polaroid-lg" : ""}`}>
      <span className="tape" aria-hidden="true" />
      <div className="polaroid-shot">
        {image ? (
          <DeviceMockup slug={c.slug} title={c.headline} image={image} />
        ) : (
          <div className="polaroid-blank" aria-hidden="true">
            <span>{markOf(c)}</span>
          </div>
        )}
        <span className="stamp-confirmed" aria-hidden="true">Confirmed</span>
      </div>
      <figcaption className="polaroid-cap">
        <ExhibitCircle letter={c.letter} />
        <span className="recovered">recovered from {place}</span>
      </figcaption>
    </figure>
  );
}
