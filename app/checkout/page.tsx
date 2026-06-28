"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { BlobEye } from "@/components/BrandArt";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.95;
  const tax = +(subtotal * 0.08).toFixed(2);
  const total = subtotal + shipping + tax;

  function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    const id = "BM-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setPlaced(true);
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="wordmark mb-8 text-5xl">CHECKOUT</h1>
      <form onSubmit={placeOrder} className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          <Fieldset title="Contact">
            <Input name="email" type="email" label="Email" required full />
          </Fieldset>

          <Fieldset title="Shipping address">
            <Input name="firstName" label="First name" required />
            <Input name="lastName" label="Last name" required />
            <Input name="address" label="Address" required full />
            <Input name="city" label="City" required />
            <Input name="zip" label="ZIP / Postal code" required />
            <Input name="country" label="Country" required full defaultValue="United States" />
          </Fieldset>

          <Fieldset title="Payment">
            <p className="col-span-2 -mt-1 mb-1 text-sm text-ink/50">
              Demo checkout — no card is charged. Plug in Stripe or Shopify to go live.
            </p>
            <Input name="card" label="Card number" placeholder="4242 4242 4242 4242" required full />
            <Input name="exp" label="Expiry (MM/YY)" placeholder="12/28" required />
            <Input name="cvc" label="CVC" placeholder="123" required />
          </Fieldset>

          <button type="submit" className="btn-ink w-full text-lg">
            Place order · ${total.toFixed(2)}
          </button>
        </div>

        <aside className="h-fit rounded-[28px] border-2 border-ink/10 bg-white p-6">
          <h2 className="wordmark text-2xl">Your bag</h2>
          <ul className="mt-4 space-y-3">
            {items.map((i) => (
              <li key={`${i.slug}-${i.color}`} className="flex items-center gap-3">
                <div className="relative grid h-14 w-14 flex-none place-items-center rounded-xl" style={{ background: i.accent + "22" }}>
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
        </aside>
      </form>
    </div>
  );
}

function Fieldset({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset>
      <legend className="wordmark mb-4 text-2xl">{title}</legend>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </fieldset>
  );
}

function Input({
  label,
  full,
  ...props
}: { label: string; full?: boolean } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${full ? "col-span-2" : ""}`}>
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      <input
        {...props}
        className="w-full rounded-xl border-2 border-ink/15 bg-white px-4 py-3 focus:border-pink focus:outline-none"
      />
    </label>
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
