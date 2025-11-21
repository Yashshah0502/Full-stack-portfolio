import { Router } from "express";
import { logAnalyticsEvent } from "../db/analyticsRepo";

const router = Router();

router.post("/", async (req, res) => {
  const { eventType, userSessionId, details } = req.body;
  if (!eventType) return res.status(400).json({ error: "eventType required" });

  await logAnalyticsEvent(eventType, userSessionId ?? null, details ?? {});
  res.status(204).send();
});

export default router;
