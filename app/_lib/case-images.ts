import fs from "node:fs";
import path from "node:path";
import { caseFiles, IMAGE_EXTS } from "@/app/_lib/case-files";

/** Server-only: maps slug -> public image URL for every project that has a screenshot on disk. */
export function getCaseImages(): Record<string, string> {
  const dir = path.join(process.cwd(), "public", "images", "projects");
  const out: Record<string, string> = {};
  for (const c of caseFiles) {
    const ext = IMAGE_EXTS.find((e) => fs.existsSync(path.join(dir, `${c.slug}.${e}`)));
    if (ext) out[c.slug] = `/images/projects/${c.slug}.${ext}`;
  }
  return out;
}
