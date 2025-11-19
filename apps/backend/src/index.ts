import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDb } from "./db/init.js";
import nodeRoutes from "./routes/nodeRoutes.js";
import cardRoutes from "./routes/cardRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "backend",
    timestamp: new Date().toISOString()
  });
});


app.use("/api/cards", cardRoutes);
app.use("/api/nodes", nodeRoutes);

const PORT = Number(process.env.PORT) || 4000;

async function start() {
  await initDb();

  app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error("Failed to start server", err);
  process.exit(1);
});
