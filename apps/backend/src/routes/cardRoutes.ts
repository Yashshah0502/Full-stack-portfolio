import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { getCards, createCard, updateCard, deleteCard } from "../db/cardRepo.js";

const router = Router();

router.get("/", async (_req, res) => {
  const cards = await getCards();
  res.json(cards);
});

router.post("/", requireAdmin, async (req, res) => {
  const { title, column, nodeId, position } = req.body;
  if (!title || !column) {
    res.status(400).json({ error: "title & column required" });
    return;
  }
  const card = await createCard({
    title,
    column,
    nodeId: nodeId ?? null,
    position: position ?? 0
  });
  res.status(201).json(card);
});

router.put("/:id", requireAdmin, async (req, res) => {
  const card = await updateCard(Number(req.params.id), req.body);
  if (!card) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(card);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  await deleteCard(Number(req.params.id));
  res.status(204).send();
});

export default router;