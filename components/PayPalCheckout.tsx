"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from "next/navigation";
import { useCart, type CartItem } from "./CartProvider";

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export function PayPalCheckout({ items }: { items: CartItem[] }) {
  const router = useRouter();
  const { clear } = useCart();

  // Hidden entirely until a PayPal client id is configured.
  if (!CLIENT_ID) return null;

  return (
    <div className="mt-5">
      <div className="mb-4 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-ink/40">
        <span className="h-px flex-1 bg-ink/15" /> or pay with <span className="h-px flex-1 bg-ink/15" />
      </div>
      <PayPalScriptProvider options={{ clientId: CLIENT_ID, currency: "USD" }}>
        <PayPalButtons
          style={{ shape: "pill", color: "gold", layout: "vertical", label: "paypal" }}
          createOrder={async () => {
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                items: items.map((i) => ({ slug: i.slug, color: i.color, qty: i.qty })),
              }),
            });
            const data = await res.json();
            if (!data.id) throw new Error(data.error || "Could not start PayPal");
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderId: data.orderID }),
            });
            const result = await res.json();
            if (result.ok) {
              clear();
              router.push(`/checkout/success?provider=paypal&ref=${data.orderID}`);
            } else {
              throw new Error("Payment not completed");
            }
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}
