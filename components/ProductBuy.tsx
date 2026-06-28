"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";

export function ProductBuy({ product }: { product: Product }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="mt-6">
      {product.colors.length > 1 && (
        <div className="mb-5">
          <p className="mb-2 text-sm font-semibold">
            Shade: <span className="text-ink/55">{color.name}</span>
          </p>
          <div className="flex gap-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                onClick={() => setColor(c)}
                aria-label={c.name}
                className={`h-10 w-10 rounded-full border-2 transition-transform ${
                  color.name === c.name ? "scale-110 border-ink" : "border-ink/15"
                }`}
                style={{ background: c.hex }}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-full border-2 border-ink/15">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-3 text-lg leading-none" aria-label="Decrease">
            −
          </button>
          <span className="w-8 text-center tabular-nums">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-4 py-3 text-lg leading-none" aria-label="Increase">
            +
          </button>
        </div>
        <button
          onClick={() =>
            add(
              {
                slug: product.slug,
                name: product.name,
                price: product.price,
                color: color.name,
                accent: product.accent,
                art: product.art,
              },
              qty
            )
          }
          className="btn-pink flex-1"
        >
          Add to bag · ${(product.price * qty).toFixed(2)}
        </button>
      </div>
    </div>
  );
}
