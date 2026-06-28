"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { products, categories } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function ShopGrid() {
  const params = useSearchParams();
  const initial = params.get("c") ?? "All";
  const [active, setActive] = useState(initial);
  const [sort, setSort] = useState("featured");

  let list = active === "All" ? [...products] : products.filter((p) => p.category === active);
  if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
  if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);

  return (
    <>
      <header className="bg-pink py-12 text-center text-white">
        <h1 className="wordmark text-5xl sm:text-6xl">SHOP THE TOOLS</h1>
        <p className="mt-2 text-white/85">Be odd. Blend your way. Latex-free &amp; 100% vegan.</p>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`chip ${active === c ? "bg-ink text-cream" : "bg-transparent hover:bg-ink/5"}`}
              >
                {c}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-full border-2 border-ink/15 bg-white px-4 py-2 text-sm font-semibold"
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

        <p className="mb-6 text-sm text-ink/50">{list.length} odd tools</p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </>
  );
}
