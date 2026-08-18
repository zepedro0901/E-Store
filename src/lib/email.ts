import { Resend } from "resend";
import type { CartItem } from "@/types/product";
import { formatPrice } from "@/lib/format";
import { computeShippingCents } from "@/lib/shipping";

export interface OrderRequestCustomer {
  name: string;
  email: string;
  phone?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  notes?: string;
}

export async function sendOrderRequestEmail(
  customer: OrderRequestCustomer,
  items: CartItem[],
  orderNumber: string,
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    throw new Error(
      "Email is not configured: set RESEND_API_KEY and ORDER_NOTIFICATION_EMAIL in .env.local",
    );
  }

  const resend = new Resend(apiKey);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = computeShippingCents(subtotal, customer.country);
  const total = subtotal + shipping;

  const itemRows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;">${escapeHtml(i.name)}${
            i.variationLabel
              ? `<br/><span style="color:#666;font-size:0.85em;">${escapeHtml(i.variationLabel)}</span>`
              : ""
          }</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(i.price, "EUR", "en")}</td>
          <td style="padding:6px 12px;border-bottom:1px solid #eee;text-align:right;">${formatPrice(i.price * i.quantity, "EUR", "en")}</td>
        </tr>`,
    )
    .join("");

  const html = `
    <div style="font-family:sans-serif;max-width:600px;">
      <h2>New order request - ${escapeHtml(orderNumber)}</h2>
      <h3>Customer</h3>
      <table style="border-collapse:collapse;">
        <tr><td style="padding:2px 12px 2px 0;color:#666;">Name</td><td>${escapeHtml(customer.name)}</td></tr>
        <tr><td style="padding:2px 12px 2px 0;color:#666;">Email</td><td>${escapeHtml(customer.email)}</td></tr>
        ${customer.phone ? `<tr><td style="padding:2px 12px 2px 0;color:#666;">Phone</td><td>${escapeHtml(customer.phone)}</td></tr>` : ""}
        <tr><td style="padding:2px 12px 2px 0;color:#666;">Address</td><td>${escapeHtml(customer.address)}, ${escapeHtml(customer.city)} ${escapeHtml(customer.postalCode)}, ${escapeHtml(customer.country)}</td></tr>
        ${customer.notes ? `<tr><td style="padding:2px 12px 2px 0;color:#666;">Notes</td><td>${escapeHtml(customer.notes)}</td></tr>` : ""}
      </table>
      <h3>Items</h3>
      <table style="border-collapse:collapse;width:100%;">
        <thead>
          <tr>
            <th style="text-align:left;padding:6px 12px;border-bottom:2px solid #ccc;">Miniature</th>
            <th style="text-align:center;padding:6px 12px;border-bottom:2px solid #ccc;">Qty</th>
            <th style="text-align:right;padding:6px 12px;border-bottom:2px solid #ccc;">Unit</th>
            <th style="text-align:right;padding:6px 12px;border-bottom:2px solid #ccc;">Total</th>
          </tr>
        </thead>
        <tbody>${itemRows}</tbody>
      </table>
      <table style="border-collapse:collapse;width:100%;margin-top:8px;">
        <tr>
          <td style="padding:2px 12px 2px 0;text-align:right;color:#666;">Subtotal</td>
          <td style="padding:2px 0;text-align:right;width:120px;">${formatPrice(subtotal, "EUR", "en")}</td>
        </tr>
        <tr>
          <td style="padding:2px 12px 2px 0;text-align:right;color:#666;">Shipping</td>
          <td style="padding:2px 0;text-align:right;">${shipping === 0 ? "Free" : formatPrice(shipping, "EUR", "en")}</td>
        </tr>
        <tr>
          <td style="padding:6px 12px 0 0;text-align:right;font-size:1.1em;"><strong>Order total</strong></td>
          <td style="padding:6px 0 0;text-align:right;font-size:1.1em;"><strong>${formatPrice(total, "EUR", "en")}</strong></td>
        </tr>
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: process.env.ORDER_FROM_EMAIL || "Pangolin Resinworks <onboarding@resend.dev>",
    to,
    replyTo: customer.email,
    subject: `New order request ${orderNumber} from ${customer.name} - ${formatPrice(total, "EUR", "en")}`,
    html,
  });

  if (error) {
    throw new Error(`Resend failed to send order email: ${error.message}`);
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
