import { defineConfig } from "drizzle-kit";

const connectionString = process.env.DB_CONNSTRING;
if (!connectionString) {
  throw new Error("DB_CONNSTRING is not defined");
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: connectionString
  }
});
