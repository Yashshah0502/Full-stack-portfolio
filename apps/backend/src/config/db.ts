import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST || "localhost",
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER || "isu_user",
  password: process.env.PGPASSWORD || "isu_password",
  database: process.env.PGDATABASE || "isu_db"
});

export default pool;
