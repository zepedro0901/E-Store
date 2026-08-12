import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { orders, orderCounters } from "@/db/schema";
import type { CartItem } from "@/types/product";
import type { OrderRequestCustomer } from "@/lib/email";

export interface OrderRecord {
  orderNumber: string;
  createdAt: string;
  customer: OrderRequestCustomer;
  items: CartItem[];
  total: number;
}

export async function saveOrder(
  customer: OrderRequestCustomer,
  items: CartItem[],
): Promise<OrderRecord> {
  const db = getDb();
  const year = new Date().getFullYear();
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const [counter] = await db
    .insert(orderCounters)
    .values({ year, lastSeq: 1 })
    .onConflictDoUpdate({
      target: orderCounters.year,
      set: { lastSeq: sql`${orderCounters.lastSeq} + 1` },
    })
    .returning({ lastSeq: orderCounters.lastSeq });

  const orderNumber = `#${year}-${String(counter.lastSeq).padStart(6, "0")}`;

  const [record] = await db
    .insert(orders)
    .values({ orderNumber, customer, items, total })
    .returning();

  return {
    orderNumber: record.orderNumber,
    createdAt: record.createdAt.toISOString(),
    customer: record.customer,
    items: record.items,
    total: record.total,
  };
}
