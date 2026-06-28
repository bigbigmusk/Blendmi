import { NextResponse } from "next/server";
import { captureOrder, paypalConfigured } from "@/lib/paypal";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!paypalConfigured()) {
    return NextResponse.json({ error: "PayPal not configured" }, { status: 503 });
  }
  try {
    const body = await req.json();
    const orderId = String(body?.orderId || "");
    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }
    const result = await captureOrder(orderId);
    const ok = result?.status === "COMPLETED";
    return NextResponse.json({ ok, status: result?.status });
  } catch (err) {
    console.error("PayPal capture-order error:", err);
    return NextResponse.json({ error: "Could not capture PayPal order" }, { status: 500 });
  }
}
