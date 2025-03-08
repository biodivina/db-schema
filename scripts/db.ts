import { drizzle } from "drizzle-orm/node-postgres";

const connectionString = process.env.DB_CONNSTRING;
if (!connectionString) {
  throw new Error("DB_CONNSTRING is not defined");
}

export const db = drizzle(connectionString)
