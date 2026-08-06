import { NextResponse } from "next/server";
import { z } from "zod";
import { sendOrderRequestEmail } from "@/lib/email";

const cartItemSchema = z.object({
  productId: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().int().nonnegative(),
  image: z.string().min(1),
  quantity: z.number().int().positive().max(99),
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
  items: z.array(cartItemSchema).min(1),
});

export async function POST(request: Request) {
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

  try {
    await sendOrderRequestEmail(parsed.data.customer, parsed.data.items);
  } catch (err) {
    console.error("Failed to send order request email:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send order request" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
