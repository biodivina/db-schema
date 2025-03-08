import csv from "csv-parser";
import { createReadStream } from "node:fs";
import { runMigrations } from "./scripts/migrator";
import { runSeeder } from "./scripts/seeder";

const parseCsv = async <T>(path: string) => {
  return new Promise<T[]>((resolve, reject) => {
    const results: T[] = [];
    createReadStream(path)
      .pipe(csv())
      .on("data", (data: T) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function main() {
  await runMigrations();
  await runSeeder()
  process.exit(0)
}

main()
