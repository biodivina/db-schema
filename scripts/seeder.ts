import csv from "csv-parser";
import { createReadStream } from "node:fs";
import { Countries, Institutions } from "../schema";
import { db } from "./db";

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

export async function runSeeder() {
  // seed countries
  const countries = await parseCsv<{ name: string, code: string, id: bigint }>("./raw/countries.csv");
  await db.insert(Countries).values(countries).onConflictDoNothing();
  console.log("countries seeded");

  // seed institutions
  const institutions = await parseCsv<{ id: bigint, name: string, city: string, countryId: bigint, code: string, synonym: string }>("./raw/institutions.csv");
  await db.insert(Institutions).values(institutions).onConflictDoNothing();
  console.log("institutions seeded");
}
