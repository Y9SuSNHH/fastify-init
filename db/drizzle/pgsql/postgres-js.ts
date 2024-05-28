import "dotenv/config";
// import { drizzle } from "drizzle-orm/postgres-js";
// import postgres from "postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client, Pool } from "pg";

import * as schema from "./schema";
// const client = postgres(process.env.DATABASE_URL!, { max: 1 });
// client.connect();

// const client = new Client({
//     connectionString: process.env.DATABASE_URL as string,
// });
// client.connect();
const client = new Pool({
    connectionString: process.env.DATABASE_URL! as string,
});

export const db = drizzle(client, { schema });