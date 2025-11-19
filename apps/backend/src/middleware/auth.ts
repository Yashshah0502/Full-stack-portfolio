import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string };
    if (payload.role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
