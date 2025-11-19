<<<<<<< Updated upstream
import pool from "../config/db";
import { Card } from "@isu/common-types";
=======
import pool from "../config/db.js";
import type { Card } from "@isu/common-types";
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

export async function getCards(): Promise<Card[]> {
  const res = await pool.query(
    `SELECT id, title, "column"::text AS "column", node_id AS "nodeId", position
     FROM cards ORDER BY "column", position`
  );
  return res.rows;
}

export async function createCard(data: Omit<Card, "id">): Promise<Card> {
  const res = await pool.query(
    `INSERT INTO cards (title, "column", node_id, position)
     VALUES ($1, $2::card_column, $3, $4)
     RETURNING id, title, "column"::text AS "column", node_id AS "nodeId", position`,
    [data.title, data.column, data.nodeId ?? null, data.position]
  );
  return res.rows[0];
}

export async function updateCard(id: number, data: Partial<Card>): Promise<Card | null> {
  const res = await pool.query(
    `UPDATE cards
     SET title = COALESCE($2, title),
         "column" = COALESCE($3::card_column, "column"),
         node_id = COALESCE($4, node_id),
         position = COALESCE($5, position)
     WHERE id = $1
     RETURNING id, title, "column"::text AS "column", node_id AS "nodeId", position`,
    [id, data.title, data.column, data.nodeId ?? null, data.position]
  );
  return res.rows[0] ?? null;
}

export async function deleteCard(id: number): Promise<void> {
  await pool.query(`DELETE FROM cards WHERE id = $1`, [id]);
}
