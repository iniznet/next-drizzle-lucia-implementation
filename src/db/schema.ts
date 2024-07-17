import { integer, text, sqliteTableCreator } from "drizzle-orm/sqlite-core";

const sqliteTable = sqliteTableCreator((name) => `app_${name}`);

export const users = sqliteTable("user", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    username: text("username").unique(),
    email: text("email").unique(),
    password: text("password").notNull(),
});

export const sessions = sqliteTable("session", {
    id: text("id").primaryKey(),
    userId: integer("user_id", { mode: "number" })
        .references(() => users.id, {
            onDelete: "cascade",
        })
        .notNull(),
    expiresAt: integer("expires_at").notNull(),
});

export const posts = sqliteTable("post", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    userId: integer("user_id", { mode: "number" })
        .references(() => users.id, {
            onDelete: "cascade",
        })
        .notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
});

export type User = typeof users.$inferSelect;