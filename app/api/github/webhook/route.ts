import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { createHmac, timingSafeEqual } from "crypto";
import { CONTRIB_TAG, memCache } from "../route";

export async function POST(req: Request) {
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (secret) {
    const sig = req.headers.get("x-hub-signature-256") ?? "";
    const body = await req.text();
    const expected = "sha256=" + createHmac("sha256", secret).update(body).digest("hex");
    const match = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    if (!match) return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // Clear in-memory cache for all years
  memCache.clear();

  // Purge Next.js fetch cache so next request fetches fresh from GitHub
  revalidateTag(CONTRIB_TAG);

  console.log("[webhook] GitHub push received — contributions cache cleared");
  return NextResponse.json({ ok: true });
}
