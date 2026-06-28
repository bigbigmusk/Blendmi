import { Suspense } from "react";
import { ShopGrid } from "@/components/ShopGrid";

export const metadata = {
  title: "Shop All Tools — BLENDMI",
  description: "Shop latex-free sponges, vegan brushes, puffs and sets. Be odd. Blend your way.",
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-6 py-20">Loading the odd ones…</div>}>
      <ShopGrid />
    </Suspense>
  );
}
