import { projects, type Project } from "@/app/_lib/portfolio-data";

export type CaseFile = Project & {
  slug: string;
  index: number;
  letter: string;
  headline: string;
  fullName?: string;
  deck: string;
  types: string[];
  /** Where it runs today (shown as "Deployment" on the case file page). */
  deploy: string;
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/\s*\(.*\)\s*$/, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const exhibitLetter = (i: number) =>
  i < 26 ? String.fromCharCode(65 + i) : String.fromCharCode(64 + Math.floor(i / 26)) + String.fromCharCode(65 + (i % 26));

/**
 * Per-project deployment status, keyed by slug. Anything listed here wins over the defaults below.
 * e.g.  "crisismesh": "Live on Vercel",
 */
export const DEPLOY_OVERRIDES: Record<string, string> = {};

const defaultDeploy = (types: string[]) =>
  types.includes("Docker")
    ? "In production · Docker server"
    : types.includes("Figma")
      ? "Design delivered"
      : types.includes("Mobile") && !types.includes("Full Stack")
        ? "Completed · mobile app"
        : "Planned · Vercel deploy";

const firstSentence = (s: string) => s.match(/^.*?[.!?](?=\s|$)/)?.[0] ?? s;

export const caseFiles: CaseFile[] = projects.map((p, index) => {
  const slug = slugify(p.title);
  const types = Array.isArray(p.type) ? p.type : [p.type];
  return {
  ...p,
  index,
  slug,
  letter: exhibitLetter(index),
  headline: p.title.replace(/\s*\(.*\)\s*$/, ""),
  fullName: p.title.match(/\(([^)]+)\)/)?.[1],
  deck: firstSentence(p.desc),
  types,
  deploy: DEPLOY_OVERRIDES[slug] ?? defaultDeploy(types),
  };
});

export const getCase = (slug: string) => caseFiles.find((c) => c.slug === slug);

/** Image convention: drop a screenshot at public/images/projects/<slug>.(png|jpg|jpeg|webp) */
export const IMAGE_EXTS = ["png", "jpg", "jpeg", "webp"] as const;
