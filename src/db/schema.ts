import { pgTable, serial, text, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import type { CartItem } from "@/types/product";
import type { OrderRequestCustomer } from "@/lib/email";

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  customer: jsonb("customer").$type<OrderRequestCustomer>().notNull(),
  items: jsonb("items").$type<CartItem[]>().notNull(),
  total: integer("total").notNull(),
});

export const orderCounters = pgTable("order_counters", {
  year: integer("year").primaryKey(),
  lastSeq: integer("last_seq").notNull().default(0),
});
