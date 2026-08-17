import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { rateLimits } from "@/db/schema";

const WINDOW_SECONDS = 10 * 60;
const MAX_REQUESTS = 5;

export async function checkRateLimit(key: string): Promise<boolean> {
  const db = getDb();

  const [row] = await db
    .insert(rateLimits)
    .values({ key, windowStart: sql`now()`, count: 1 })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`CASE WHEN ${rateLimits.windowStart} < now() - (interval '1 second' * ${WINDOW_SECONDS}) THEN 1 ELSE ${rateLimits.count} + 1 END`,
        windowStart: sql`CASE WHEN ${rateLimits.windowStart} < now() - (interval '1 second' * ${WINDOW_SECONDS}) THEN now() ELSE ${rateLimits.windowStart} END`,
      },
    })
    .returning({ count: rateLimits.count });

  return row.count <= MAX_REQUESTS;
}
