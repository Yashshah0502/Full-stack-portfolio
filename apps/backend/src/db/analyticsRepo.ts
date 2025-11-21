import pool from "../config/db";
import { AnalyticsEventType } from "@isu/common-types";

export async function logAnalyticsEvent(
  eventType: AnalyticsEventType | string,
  userSessionId: string | null,
  details: Record<string, unknown> = {}
) {
  await pool.query(
    `INSERT INTO analytics_events (event_type, user_session_id, details)
     VALUES ($1, $2, $3)`,
    [eventType, userSessionId, details]
  );
}
