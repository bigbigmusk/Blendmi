import { getProduct } from "./products";

export type IncomingItem = { slug: string; color?: string; qty: number };

const SANDBOX = "https://api-m.sandbox.paypal.com";
const LIVE = "https://api-m.paypal.com";

export function paypalConfigured() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_CLIENT_SECRET);
}

function base() {
  return (process.env.PAYPAL_ENV || "sandbox").toLowerCase() === "live" ? LIVE : SANDBOX;
}

async function accessToken(): Promise<string> {
  const id = process.env.PAYPAL_CLIENT_ID!;
  const secret = process.env.PAYPAL_CLIENT_SECRET!;
  const res = await fetch(`${base()}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error("PayPal auth failed");
  const data = await res.json();
  return data.access_token as string;
}

/** Re-derive the order total from the catalogue — never trust client amounts. */
export function priceCart(items: IncomingItem[]) {
  let subtotal = 0;
  const lineItems = [];
  for (const i of items) {
    const product = getProduct(i.slug);
    const qty = Math.max(1, Math.min(99, Math.floor(Number(i.qty) || 1)));
    if (!product) continue;
    subtotal += product.price * qty;
    lineItems.push({
      name: (i.color ? `${product.name} — ${i.color}` : product.name).slice(0, 127),
      quantity: String(qty),
      unit_amount: { currency_code: "USD", value: product.price.toFixed(2) },
    });
  }
  const shipping = subtotal >= 50 ? 0 : 4.95;
  return { subtotal, shipping, total: subtotal + shipping, lineItems };
}

export async function createOrder(items: IncomingItem[]) {
  const { subtotal, shipping, total, lineItems } = priceCart(items);
  if (lineItems.length === 0) throw new Error("No valid items");

  const token = await accessToken();
  const res = await fetch(`${base()}/v2/checkout/orders`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "USD", value: subtotal.toFixed(2) },
              shipping: { currency_code: "USD", value: shipping.toFixed(2) },
            },
          },
          items: lineItems,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error("PayPal create order failed");
  return res.json();
}

export async function captureOrder(orderId: string) {
  const token = await accessToken();
  const res = await fetch(`${base()}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("PayPal capture failed");
  return res.json();
}
