import * as schema from "./schema";

import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { config } from "dotenv";

config({ path: ".env" });

export const client = createClient({
    url: process.env.DATABASE_URL!,
});

export const db = drizzle(client, { schema });