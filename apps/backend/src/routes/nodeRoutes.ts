import { Router } from "express";
import { requireAdmin } from "../middleware/auth.js";
import { getNodes, getNode, createNode, updateNode, deleteNode } from "../db/nodeRepo.js";

const router = Router();

router.get("/", async (_req, res) => {
  const nodes = await getNodes();
  res.json(nodes);
});

router.get("/:id", async (req, res) => {
  const node = await getNode(Number(req.params.id));
  if (!node) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(node);
});

router.post("/", requireAdmin, async (req, res) => {
  const { title, description, technologies, demoURL } = req.body;
  if (!title) {
    res.status(400).json({ error: "title required" });
    return;
  }
  const node = await createNode({ title, description, technologies: technologies ?? [], demoURL });
  res.status(201).json(node);
});

router.put("/:id", requireAdmin, async (req, res) => {
  const node = await updateNode(Number(req.params.id), req.body);
  if (!node) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(node);
});

router.delete("/:id", requireAdmin, async (req, res) => {
  await deleteNode(Number(req.params.id));
  res.status(204).send();
});

export default router;
