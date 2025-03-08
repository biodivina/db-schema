import { runMigrations } from "./scripts/migrator";
import { runSeeder } from "./scripts/seeder";

async function main() {
  await runMigrations();
  await runSeeder()
  process.exit(0)
}

main()
