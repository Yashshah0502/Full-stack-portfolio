import { Redis } from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  lazyConnect: true,
  retryStrategy: () => null
});

redis.on("error", (err) => {
  console.warn("Redis connection error (non-fatal):", err.message);
});

export default redis;
