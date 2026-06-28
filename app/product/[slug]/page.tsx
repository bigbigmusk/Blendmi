import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getProduct, products } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductBuy } from "@/components/ProductBuy";
import { ProductCard } from "@/components/ProductCard";
import { PaymentBadges } from "@/components/PaymentBadges";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getProduct(params.slug);
  if (!p) return { title: "Not found — BLENDMI" };
  return {
    title: `${p.name} — BLENDMI`,
    description: p.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const fallback = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const recs = (related.length ? related : fallback).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <nav className="mb-6 text-sm text-ink/50">
        <Link href="/shop" className="hover:text-pink">
          Shop
        </Link>{" "}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery product={product} />

        <div>
          {(product.bestseller || product.isNew) && (
            <span className="chip mb-3">{product.isNew ? "NEW" : "BESTSELLER"}</span>
          )}
          <h1 className="wordmark text-5xl leading-none">{product.name}</h1>
          <p className="mt-2 text-lg text-ink/55">{product.tagline}</p>
          <p className="wordmark mt-4 text-3xl">${product.price.toFixed(2)}</p>

          <p className="mt-5 text-ink/80">{product.description}</p>

          <ProductBuy product={product} />

          <div className="mt-8 border-t-2 border-ink/10 pt-6">
            <h3 className="wordmark text-xl">The details</h3>
            <ul className="mt-3 space-y-2">
              {product.details.map((d) => (
                <li key={d} className="flex gap-2 text-ink/80">
                  <span className="text-pink">✦</span> {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs font-semibold">
            {["Latex-Free", "Vegan", "Cruelty-Free"].map((t) => (
              <div key={t} className="rounded-2xl bg-pink-pale py-3">
                {t}
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-ink/50">
            <span>🔒 Secure checkout</span>
            <PaymentBadges />
          </div>
        </div>
      </div>

      {recs.length > 0 && (
        <section className="mt-20">
          <h2 className="wordmark mb-6 text-3xl">PAIR IT WITH</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recs.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
