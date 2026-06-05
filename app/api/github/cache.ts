export const CONTRIB_TAG = "github-contributions";

export const memCache = new Map<number, { data: { total: number; dayMap: Record<string, number> }; at: number }>();
export const MEM_TTL = 300_000; // 5 minutes
