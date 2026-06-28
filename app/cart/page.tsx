"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="mx-auto grid max-w-3xl place-items-center px-6 py-28 text-center">
        <h1 className="wordmark text-5xl">Your bag is odd-ly empty.</h1>
        <p className="mt-3 text-ink/60">Nothing odd in here yet. Let&apos;s fix that.</p>
        <Link href="/shop" className="btn-pink mt-6">
          Shop the tools
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="wordmark mb-8 text-5xl">YOUR BAG</h1>
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <ul className="divide-y-2 divide-ink/10">
          {items.map((i) => (
            <li key={`${i.slug}-${i.color}`} className="flex gap-4 py-5">
              <div className="grid h-24 w-24 flex-none place-items-center rounded-2xl" style={{ background: i.accent + "22" }}>
                <div className="h-14 w-14 rounded-full" style={{ background: i.accent }} />
              </div>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                  <Link href={`/product/${i.slug}`} className="wordmark text-xl">
                    {i.name}
                  </Link>
                  <span className="font-bold">${(i.price * i.qty).toFixed(2)}</span>
                </div>
                <span className="text-sm text-ink/50">{i.color}</span>
                <div className="mt-auto flex items-center justify-between pt-3">
                  <div className="flex items-center rounded-full border-2 border-ink/15">
                    <button onClick={() => setQty(i.slug, i.color, i.qty - 1)} className="px-3 py-1 text-lg" aria-label="Decrease">−</button>
                    <span className="w-7 text-center tabular-nums">{i.qty}</span>
                    <button onClick={() => setQty(i.slug, i.color, i.qty + 1)} className="px-3 py-1 text-lg" aria-label="Increase">+</button>
                  </div>
                  <button onClick={() => remove(i.slug, i.color)} className="text-sm text-ink/50 underline hover:text-pink">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit rounded-[28px] border-2 border-ink/10 bg-white p-6">
          <h2 className="wordmark text-2xl">Summary</h2>
          <div className="mt-4 space-y-2 text-ink/70">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{subtotal >= 50 ? "Free" : "$4.95"}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t-2 border-ink/10 pt-4 text-lg font-bold">
            <span>Total</span>
            <span>${(subtotal + (subtotal >= 50 || subtotal === 0 ? 0 : 4.95)).toFixed(2)}</span>
          </div>
          <Link href="/checkout" className="btn-ink mt-6 w-full">
            Checkout
          </Link>
          <Link href="/shop" className="mt-3 block text-center text-sm font-semibold underline">
            Continue shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
