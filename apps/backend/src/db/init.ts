import pool from "../config/db.js";

export async function initDb() {
  try {
    console.log("Initializing database schema...");

    // Create health_check table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS health_check (
        id SERIAL PRIMARY KEY,
        checked_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create nodes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS nodes (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        technologies TEXT[],
        demo_url TEXT,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `);

    // Create card_column enum type (skip if exists)
    try {
      await pool.query(`CREATE TYPE card_column AS ENUM ('Upcoming', 'In-Progress', 'Completed')`);
    } catch (err: any) {
      if (err.code !== '42710') { // duplicate_object error code
        throw err;
      }
      // Type already exists, ignore
    }

    // Create cards table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS cards (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        "column" card_column NOT NULL DEFAULT 'Upcoming',
        node_id INTEGER REFERENCES nodes(id) ON DELETE SET NULL,
        position INTEGER NOT NULL DEFAULT 0
      )
    `);

    // Create analytics_events table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS analytics_events (
        id SERIAL PRIMARY KEY,
        event_type TEXT NOT NULL,
        user_session_id TEXT,
        timestamp TIMESTAMP NOT NULL DEFAULT NOW(),
        details JSONB
      )
    `);

    console.log("✓ Database schema ensured.");
  } catch (error) {
    console.error("Failed to initialize database:", error);
    throw error;
  }
}
