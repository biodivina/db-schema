import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { Client } from "pg";
import * as schema from "../schema";

export async function runMigrations() {
  // run migrations
  const connectionString = process.env.DB_CONNSTRING;
  if (!connectionString) {
    throw new Error("DB_CONNSTRING is not defined");
  }
  const client = new Client({
    connectionString: connectionString,
  });
  await client.connect();

  const db = drizzle(client, { schema });

  try {
    await migrate(db, { migrationsFolder: "./drizzle" }); // Path to your migration files
    console.log("migrations applied successfully");
  } catch (error) {
    console.error("error applying migrations:", error);
  }
}
