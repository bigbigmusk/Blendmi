"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/CartProvider";
import { BlobEye } from "@/components/BrandArt";

export default function SuccessPage() {
  return (
    <Suspense fallback={null}>
      <Success />
    </Suspense>
  );
}

function Success() {
  const { clear } = useCart();
  const params = useSearchParams();
  const reference = params.get("session_id") || params.get("ref");

  // Payment succeeded on Stripe → empty the bag.
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="mx-auto grid max-w-2xl place-items-center px-6 py-24 text-center">
      <BlobEye className="w-28 animate-float" />
      <h1 className="wordmark mt-6 text-5xl">THANK YOU FOR BEING ODD!</h1>
      <p className="mt-3 text-ink/70">
        Your payment went through and your order is confirmed. A receipt and tracking are on their way
        to your inbox.
      </p>
      {reference && (
        <div className="mt-6 break-all rounded-2xl bg-pink-pale px-6 py-4 text-sm font-semibold">
          Reference: <span className="text-pink-deep">{reference.slice(0, 24)}…</span>
        </div>
      )}
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
