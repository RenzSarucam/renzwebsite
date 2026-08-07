export const CONTRIB_TAG = "github-contributions";

export const memCache = new Map<number, { data: { total: number; dayMap: Record<string, number> }; at: number }>();
export const MEM_TTL = 60_000; // 1 minute
