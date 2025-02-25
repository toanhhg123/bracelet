// db/index.ts
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const connection = await mysql.createConnection(process.env.DATABASE_URL!);
export const db = drizzle(connection, { schema, mode: "default" });
