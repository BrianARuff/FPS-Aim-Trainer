import pg from "pg";

const db = new pg.Pool({
  connectionString:
    "postgresql://brianruff:1366@localhost:5432/fps-aim-trainer",
  ssl: {
    rejectUnauthorized: false,
  },
});

await db.connect();

export { db };
