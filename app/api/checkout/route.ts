import { NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type IncomingItem = { slug: string; color?: string; qty: number };

export async function POST(req: Request) {
  let items: IncomingItem[] = [];
  try {
    const body = await req.json();
    items = Array.isArray(body?.items) ? body.items : [];
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (items.length === 0) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const key = process.env.STRIPE_SECRET_KEY;

  // No key configured yet → tell the client to run the free demo flow.
  if (!key) {
    return NextResponse.json({ demo: true });
  }

  // Re-derive prices from the catalogue — never trust client-sent amounts.
  let subtotal = 0;
  const line_items = [];
  for (const i of items) {
    const product = getProduct(i.slug);
    const qty = Math.max(1, Math.min(99, Math.floor(Number(i.qty) || 1)));
    if (!product) continue;
    subtotal += product.price * qty;
    line_items.push({
      quantity: qty,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: i.color ? `${product.name} — ${i.color}` : product.name,
          metadata: { slug: product.slug },
        },
      },
    });
  }

  if (line_items.length === 0) {
    return NextResponse.json({ error: "No valid items" }, { status: 400 });
  }

  const origin = req.headers.get("origin") || new URL(req.url).origin;
  const freeShipping = subtotal >= 50;

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(key);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      automatic_tax: { enabled: false },
      billing_address_collection: "auto",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "SG", "HK"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            display_name: freeShipping ? "Free shipping" : "Standard shipping",
            fixed_amount: { amount: freeShipping ? 0 : 495, currency: "usd" },
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=1`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json({ error: "Could not start checkout" }, { status: 500 });
  }
}
