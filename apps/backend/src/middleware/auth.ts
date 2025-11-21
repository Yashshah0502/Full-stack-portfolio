import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.warn("JWT_SECRET not set, using dev-secret");
    return "dev-secret";
  }
  return secret;
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const token = auth.slice(7);
  const JWT_SECRET = getJwtSecret();

  try {
    const payload = jwt.verify(token, JWT_SECRET) as { role?: string };
    if (payload.role !== "admin") {
      res.status(403).json({ error: "Forbidden" });
      return;
    }
    (req as any).user = payload;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    res.status(401).json({ error: "Invalid token" });
  }
}


