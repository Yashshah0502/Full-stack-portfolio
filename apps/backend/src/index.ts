import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from "http";
import { Server } from "socket.io";
import { initDb } from "./db/init";
import { logAnalyticsEvent } from "./db/analyticsRepo";
import nodeRoutes from "./routes/nodeRoutes";
import cardRoutes from "./routes/cardRoutes";
import analyticsRoutes from "./routes/analyticsRoutes";

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "backend",
    timestamp: new Date().toISOString()
  });
});

app.use("/api/analytics", analyticsRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/nodes", nodeRoutes);

io.on("connection", (socket) => {
  const sessionId = socket.handshake.query.sessionId as string | undefined;

  console.log("Client connected", sessionId);

  socket.on("card:moved", async (payload) => {
    // payload: { id, column, position }
    io.emit("card:update", payload);

    await logAnalyticsEvent("cardMove", sessionId ?? null, payload);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected", sessionId);
  });
});

async function start() {
  await initDb();
  httpServer.listen(PORT, () => {
    console.log(`Backend (HTTP+WS) running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
