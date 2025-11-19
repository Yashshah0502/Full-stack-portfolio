import { Redis } from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  lazyConnect: true,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  retryStrategy: () => null
=======
  retryStrategy: () => null // Don't retry, fail silently
=======
  retryStrategy: () => null // Don't retry, fail silently
});

// Handle connection errors gracefully
redis.on("error", (err) => {
  console.warn("Redis connection error (non-fatal):", err.message);
>>>>>>> Stashed changes
});

// Handle connection errors gracefully
redis.on("error", (err) => {
  console.warn("Redis connection error (non-fatal):", err.message);
>>>>>>> Stashed changes
});

redis.on("error", (err) => {
  console.warn("Redis connection error (non-fatal):", err.message);
});

export default redis;
