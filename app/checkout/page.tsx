"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useCart } from "@/components/CartProvider";
import { BlobEye } from "@/components/BrandArt";
import { PayPalCheckout } from "@/components/PayPalCheckout";
import { PaymentBadges } from "@/components/PaymentBadges";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-6xl px-6 py-20">Loading…</div>}>
      <Checkout />
    </Suspense>
  );
}

function Checkout() {
  const { items, subtotal, clear } = useCart();
  const params = useSearchParams();
  const canceled = params.get("canceled");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  async function pay() {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ slug: i.slug, color: i.color, qty: i.qty })),
        }),
      });
      const data = await res.json();

      if (data.url) {
        // Real Stripe Checkout — hand off to the hosted, secure payment page.
        window.location.href = data.url;
        return;
      }
      if (data.demo) {
        // No payment key configured yet → free demo confirmation.
        setOrderId("BM-" + Math.floor(100000 + Math.random() * 900000));
        setPlaced(true);
        clear();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      setError(data.error || "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (placed) {
    return (
      <div className="mx-auto grid max-w-2xl place-items-center px-6 py-24 text-center">
        <BlobEye className="w-28 animate-float" />
        <h1 className="wordmark mt-6 text-5xl">ORDER PLACED!</h1>
        <p className="mt-3 text-ink/70">
          Thanks for being odd. We&apos;ve emailed your confirmation. Your tools are on the way.
        </p>
        <div className="mt-6 rounded-2xl bg-pink-pale px-6 py-4 font-semibold">
          Order number: <span className="text-pink-deep">{orderId}</span>
        </div>
        <div className="mt-8 flex gap-3">
          <Link href="/shop" className="btn-pink">
            Keep shopping
          </Link>
          <Link href="/" className="btn-outline">
            Back home
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto grid max-w-2xl place-items-center px-6 py-28 text-center">
        <h1 className="wordmark text-4xl">Nothing to check out.</h1>
        <Link href="/shop" className="btn-pink mt-6">
          Shop the tools
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="wordmark mb-2 text-5xl">CHECKOUT</h1>
      <p className="mb-8 text-ink/60">
        Secure payment powered by Stripe — card, Apple&nbsp;Pay &amp; Google&nbsp;Pay. Your shipping
        details are collected on the next step.
      </p>

      {canceled && (
        <div className="mb-6 rounded-2xl bg-pink-pale px-5 py-4 text-sm font-semibold">
          Payment canceled — your bag is still here whenever you&apos;re ready. ✦
        </div>
      )}

      <div className="rounded-[28px] border-2 border-ink/10 bg-white p-6">
        <h2 className="wordmark text-2xl">Your bag</h2>
        <ul className="mt-4 space-y-3">
          {items.map((i) => (
            <li key={`${i.slug}-${i.color}`} className="flex items-center gap-3">
              <div
                className="relative grid h-14 w-14 flex-none place-items-center rounded-xl"
                style={{ background: i.accent + "22" }}
              >
                <div className="h-8 w-8 rounded-full" style={{ background: i.accent }} />
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-ink text-xs text-cream">
                  {i.qty}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold leading-tight">{i.name}</p>
                <p className="text-xs text-ink/50">{i.color}</p>
              </div>
              <span className="text-sm font-semibold">${(i.price * i.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <div className="mt-5 space-y-1.5 border-t-2 border-ink/10 pt-4 text-sm text-ink/70">
          <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
          <Row label="Shipping" value={shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`} />
          <Row label="Tax (est.)" value={`$${tax.toFixed(2)}`} />
        </div>
        <div className="mt-3 flex justify-between border-t-2 border-ink/10 pt-3 text-lg font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {error && <p className="mt-4 text-sm font-semibold text-pink-deep">{error}</p>}

        <button onClick={pay} disabled={loading} className="btn-ink mt-6 w-full text-lg">
          {loading ? "Redirecting…" : `Pay by card · $${total.toFixed(2)}`}
        </button>

        <PayPalCheckout items={items} />

        <Link href="/cart" className="mt-4 block text-center text-sm font-semibold underline">
          Back to bag
        </Link>

        <div className="mt-6 flex flex-col items-center gap-3">
          <PaymentBadges />
          <div className="flex items-center gap-2 text-xs text-ink/50">
            <span>🔒 Encrypted checkout</span> · <span>Latex-free · Vegan</span> · <span>30-day returns</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
