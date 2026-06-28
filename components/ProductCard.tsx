"use client";

import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductArt } from "./BrandArt";
import { useCart } from "./CartProvider";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <div className="group card overflow-hidden transition-transform hover:-translate-y-1">
      <Link href={`/product/${product.slug}`} className="block">
        <div
          className="relative aspect-square overflow-hidden"
          style={{ background: `linear-gradient(160deg, ${product.accent}1a, ${product.accent}33)` }}
        >
          {(product.bestseller || product.isNew) && (
            <span className="absolute left-3 top-3 z-10 chip border-ink bg-cream text-xs">
              {product.isNew ? "NEW" : "BESTSELLER"}
            </span>
          )}
          {product.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <ProductArt
              product={product}
              className="h-full w-full p-8 transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div>
            <Link href={`/product/${product.slug}`}>
              <h3 className="wordmark text-xl leading-tight">{product.name}</h3>
            </Link>
            <p className="text-sm text-ink/55">{product.tagline}</p>
          </div>
          <span className="wordmark text-xl">${product.price}</span>
        </div>
        <button
          onClick={() =>
            add({
              slug: product.slug,
              name: product.name,
              price: product.price,
              color: product.colors[0].name,
              accent: product.accent,
              art: product.art,
            })
          }
          className="btn-pink mt-4 w-full"
        >
          Add to bag
        </button>
      </div>
    </div>
  );
}
