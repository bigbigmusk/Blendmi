"use client";

import Link from "next/link";
import { useState } from "react";
import { socialLinks } from "@/lib/social";
import { SocialIcon } from "./Icons";
import { BlobEye } from "./BrandArt";

export function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer className="mt-20 bg-ink text-cream">
      {/* Newsletter */}
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="wordmark text-4xl sm:text-5xl">JOIN THE ODD ONES.</h2>
            <p className="mt-3 max-w-md text-cream/70">
              Sign up for 10% off your first blend, plus early drops, tutorials and the occasional weird email.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setDone(true);
            }}
            className="flex w-full flex-col gap-3 sm:flex-row"
          >
            {done ? (
              <p className="rounded-full bg-pink px-6 py-4 font-semibold text-white">
                You&apos;re in. Welcome to the odd ones. ✦
              </p>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-full border-2 border-cream/30 bg-transparent px-6 py-4 text-cream placeholder:text-cream/40 focus:border-pink focus:outline-none"
                />
                <button className="btn-pink whitespace-nowrap">Sign up</button>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BlobEye className="h-12 w-12" />
              <span className="wordmark text-3xl">BLENDMI</span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-cream/60">
              Tools for a face that doesn&apos;t follow rules. Latex-free, vegan and proudly odd.
            </p>
            <div className="mt-5 flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 transition-colors hover:border-pink hover:text-pink"
                >
                  <SocialIcon icon={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { href: "/shop", label: "All Tools" },
              { href: "/shop?c=Sponges", label: "Sponges" },
              { href: "/shop?c=Brushes", label: "Brushes" },
              { href: "/shop?c=Sets", label: "Sets" },
            ]}
          />
          <FooterCol
            title="The Brand"
            links={[
              { href: "/about", label: "Be Odd" },
              { href: "/about#story", label: "Our Story" },
              { href: "/about#values", label: "Vegan & Cruelty-Free" },
            ]}
          />
          <FooterCol
            title="Help"
            links={[
              { href: "/about#faq", label: "FAQ" },
              { href: "/about#faq", label: "Shipping & Returns" },
              { href: "mailto:hello@blendmi.com", label: "hello@blendmi.com" },
            ]}
          />
        </div>
      </div>

      <div className="border-t border-cream/15 py-6 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} BLENDMI™ · Be Odd. · Blend Your Way.
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-pink">{title}</h3>
      <ul className="space-y-2.5 text-sm text-cream/70">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="hover:text-cream">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
