import csv from "csv-parser";
import { createReadStream, createWriteStream } from "node:fs";
import { Snowflake } from "nodejs-snowflake";

const uid = new Snowflake();
const results: { id: string, name: string, city: string, country_id: string, code: string, synonym: string }[] = [];

const docs = createReadStream("./institutions-raw.csv")
  .pipe(csv())
  .on("data", (data: { name: string, city: string, country_id: string, code: string, synonym: string }) => {
    const id = uid.getUniqueID().toString();
    results.push({
      id: id,
      name: data.name,
      city: data.city,
      country_id: data.country_id,
      code: data.code,
      synonym: data.synonym
    })
  })
  .on("end", () => {
    // write to csv
    const stream = createWriteStream("./institutions.csv");
    stream.write("id,name,city,countryId,code,synonym\n");
    results.forEach((result) => {
      stream.write(`"${result.id}","${result.name}","${result.city}","${result.country_id}","${result.code}","${result.synonym}"\n`);
    });
    stream.end();
  });
