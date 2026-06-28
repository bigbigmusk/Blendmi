"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { ProductArt } from "./BrandArt";

export function ProductGallery({ product }: { product: Product }) {
  const photos = [product.image, ...(product.gallery ?? [])].filter(Boolean) as string[];
  const [active, setActive] = useState(0);

  // No real photos yet → fall back to the on-brand SVG illustration.
  if (photos.length === 0) {
    return (
      <div
        className="card grid place-items-center overflow-hidden p-6"
        style={{ background: `linear-gradient(160deg, ${product.accent}1a, ${product.accent}33)` }}
      >
        <ProductArt product={product} className="w-full max-w-md animate-float" />
      </div>
    );
  }

  return (
    <div>
      <div className="card overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photos[active]} alt={product.name} className="aspect-square w-full object-cover" />
      </div>
      {photos.length > 1 && (
        <div className="mt-3 flex gap-3">
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              className={`h-20 w-20 overflow-hidden rounded-2xl border-2 transition-colors ${
                i === active ? "border-ink" : "border-ink/10"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
