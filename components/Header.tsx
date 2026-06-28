"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { CartIcon } from "./Icons";
import { SocialIcon } from "./Icons";
import { socialLinks } from "@/lib/social";

const nav = [
  { href: "/shop", label: "Shop" },
  { href: "/shop?c=Sponges", label: "Sponges" },
  { href: "/shop?c=Sets", label: "Sets" },
  { href: "/about", label: "Be Odd" },
];

export function Header() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);

  return (
    <>
      {/* Announcement marquee */}
      <div className="overflow-hidden bg-ink py-2 text-cream">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex">
              {[
                "FREE SHIPPING OVER $50",
                "BE ODD.",
                "LATEX-FREE & VEGAN",
                "BLEND YOUR WAY.",
                "30-DAY HAPPY RETURNS",
                "TOOLS FOR A FACE THAT DOESN'T FOLLOW RULES",
              ].map((t) => (
                <span key={t} className="mx-6 text-xs font-semibold tracking-widest">
                  {t} <span className="text-pink">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b-2 border-ink/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <button
            className="lg:hidden"
            aria-label="Menu"
            onClick={() => setMobile((m) => !m)}
          >
            <div className="space-y-1.5">
              <span className="block h-0.5 w-6 bg-ink" />
              <span className="block h-0.5 w-6 bg-ink" />
              <span className="block h-0.5 w-6 bg-ink" />
            </div>
          </button>

          <Link href="/" className="wordmark text-3xl sm:text-4xl">
            BLENDMI
            <sup className="ml-0.5 align-super text-xs">™</sup>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((n) => (
              <Link key={n.label} href={n.href} className="text-sm font-semibold hover:text-pink">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-3 sm:flex">
              {socialLinks.slice(0, 2).map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className="hover:text-pink">
                  <SocialIcon icon={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-cream"
              aria-label="Open cart"
            >
              <CartIcon className="h-5 w-5" />
              <span className="text-sm font-semibold tabular-nums">{count}</span>
            </button>
          </div>
        </div>

        {mobile && (
          <nav className="border-t-2 border-ink/10 bg-cream px-4 py-3 lg:hidden">
            {nav.map((n) => (
              <Link
                key={n.label}
                href={n.href}
                onClick={() => setMobile(false)}
                className="block py-2 text-lg font-semibold"
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex gap-4 border-t-2 border-ink/10 pt-3">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <SocialIcon icon={s.icon} className="h-6 w-6" />
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
