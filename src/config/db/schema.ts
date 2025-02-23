import {
  boolean,
  float,
  int,
  json,
  mysqlTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: int("age"),
  password: varchar("password", { length: 255 }).notNull(),
  address: text("address"),
  avatar: varchar("avatar", { length: 255 }),
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

export const cart = mysqlTable("cart", {
  id: serial("id").primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => users.id),
  productId: int("product_id")
    .notNull()
    .references(() => product.id),
  quantity: int("quantity").notNull().default(1),
  totalPrice: float("total_price").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
});

export type Product = typeof product.$inferSelect;
