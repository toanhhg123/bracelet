import {
  boolean,
  float,
  int,
  json,
  mysqlTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: int("age"),
});

export const product = mysqlTable("product", {
  id: int("id").primaryKey().autoincrement(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  coverImage: varchar("cover_image", { length: 500 }).notNull(),
  currentPrice: float("current_price").notNull(),
  previousPrice: float("previous_price"),
  category: varchar("category", { length: 255 }),
  rating: float("rating").notNull(),
  reviews: int("reviews").notNull(),
  piecesSold: int("pieces_sold").notNull(),
  justIn: boolean("just_in").default(false),
  shots: json("shots"),
  overview: text("overview"),
  shipmentDetails: json("shipment_details"),
});

export type Product = typeof product.$inferSelect;
