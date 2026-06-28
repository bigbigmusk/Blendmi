"use client";

import Link from "next/link";
import { useCart } from "./CartProvider";

export function CartDrawer() {
  const { items, isOpen, setOpen, setQty, remove, subtotal, count } = useCart();
  const freeShipThreshold = 50;
  const remaining = Math.max(0, freeShipThreshold - subtotal);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 bg-ink/40 transition-opacity ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b-2 border-ink/10 px-5 py-4">
          <h2 className="wordmark text-2xl">YOUR BAG ({count})</h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart" className="text-2xl leading-none">
            ✕
          </button>
        </div>

        {subtotal > 0 && (
          <div className="border-b-2 border-ink/10 bg-pink-pale px-5 py-3 text-sm font-semibold">
            {remaining > 0 ? (
              <>You&apos;re ${remaining.toFixed(0)} away from free shipping ✦</>
            ) : (
              <>You unlocked free shipping! 🎉</>
            )}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="grid h-full place-items-center text-center">
              <div>
                <p className="wordmark text-3xl">Your bag is odd-ly empty.</p>
                <Link href="/shop" onClick={() => setOpen(false)} className="btn-pink mt-5">
                  Start blending
                </Link>
              </div>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((i) => (
                <li key={`${i.slug}-${i.color}`} className="flex gap-4">
                  <div
                    className="grid h-20 w-20 flex-none place-items-center rounded-2xl"
                    style={{ background: i.accent + "22" }}
                  >
                    <div className="h-12 w-12 rounded-full" style={{ background: i.accent }} />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <Link href={`/product/${i.slug}`} onClick={() => setOpen(false)} className="font-bold">
                        {i.name}
                      </Link>
                      <span className="font-bold">${(i.price * i.qty).toFixed(2)}</span>
                    </div>
                    <span className="text-sm text-ink/50">{i.color}</span>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center rounded-full border-2 border-ink/15">
                        <button
                          onClick={() => setQty(i.slug, i.color, i.qty - 1)}
                          className="px-3 py-1 text-lg leading-none"
                          aria-label="Decrease"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm tabular-nums">{i.qty}</span>
                        <button
                          onClick={() => setQty(i.slug, i.color, i.qty + 1)}
                          className="px-3 py-1 text-lg leading-none"
                          aria-label="Increase"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => remove(i.slug, i.color)}
                        className="text-sm text-ink/50 underline hover:text-pink"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t-2 border-ink/10 px-5 py-4">
            <div className="mb-3 flex justify-between text-lg font-bold">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <p className="mb-3 text-xs text-ink/50">Shipping &amp; taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={() => setOpen(false)} className="btn-ink w-full">
              Checkout
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
