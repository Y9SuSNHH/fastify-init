import { defineConfig } from "drizzle-kit";

export default defineConfig({
    schema: "./db/drizzle/pgsql/schema.ts",
    out: "./db/drizzle/pgsql/drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
});