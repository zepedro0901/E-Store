import { NextResponse } from "next/server";
import { z } from "zod";
import { sendOrderRequestEmail } from "@/lib/email";
import { saveOrder } from "@/lib/orders";
import { checkRateLimit } from "@/lib/rate-limit";

const cartItemSchema = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  image: z.string().min(1),
  quantity: z.number().int().positive().max(99),
  variationId: z.string().optional(),
  variationLabel: z.string().optional(),
});

const requestSchema = z.object({
  customer: z.object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(320),
    phone: z.string().trim().max(50).optional(),
    address: z.string().trim().min(1).max(300),
    city: z.string().trim().min(1).max(150),
    postalCode: z.string().trim().min(1).max(20),
    country: z.string().trim().min(1).max(150),
    notes: z.string().trim().max(1000).optional(),
  }),
  items: z.array(cartItemSchema).min(1).max(50),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many order requests. Please try again in a few minutes." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid order request", issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const order = await saveOrder(parsed.data.customer, parsed.data.items);

  try {
    await sendOrderRequestEmail(parsed.data.customer, parsed.data.items, order.orderNumber);
  } catch (err) {
    console.error("Failed to send order request email:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send order request" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, orderNumber: order.orderNumber });
}
