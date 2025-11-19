<<<<<<< Updated upstream
import pool from "../config/db";
import { Node } from "@isu/common-types";
=======
import pool from "../config/db.js";
import type { Node } from "@isu/common-types";
>>>>>>> Stashed changes

export async function getNodes(): Promise<Node[]> {
  const res = await pool.query(
    `SELECT id, title, description, technologies, demo_url AS "demoURL", created_at AS "createdAt" FROM nodes ORDER BY id`
  );
  return res.rows;
}

export async function getNode(id: number): Promise<Node | null> {
  const res = await pool.query(
    `SELECT id, title, description, technologies, demo_url AS "demoURL", created_at AS "createdAt" FROM nodes WHERE id = $1`,
    [id]
  );
  return res.rows[0] ?? null;
}

export async function createNode(data: Omit<Node, "id" | "createdAt">): Promise<Node> {
  const res = await pool.query(
    `INSERT INTO nodes (title, description, technologies, demo_url)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, description, technologies, demo_url AS "demoURL", created_at AS "createdAt"`,
    [data.title, data.description ?? null, data.technologies, data.demoURL ?? null]
  );
  return res.rows[0];
}

export async function updateNode(id: number, data: Partial<Node>): Promise<Node | null> {
  const res = await pool.query(
    `UPDATE nodes
     SET title = COALESCE($2, title),
         description = COALESCE($3, description),
         technologies = COALESCE($4, technologies),
         demo_url = COALESCE($5, demo_url)
     WHERE id = $1
     RETURNING id, title, description, technologies, demo_url AS "demoURL", created_at AS "createdAt"`,
    [id, data.title, data.description, data.technologies, data.demoURL]
  );
  return res.rows[0] ?? null;
}

export async function deleteNode(id: number): Promise<void> {
  await pool.query(`DELETE FROM nodes WHERE id = $1`, [id]);
}
