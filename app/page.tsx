import Link from "next/link";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Eye, BlobEye, ProductArt } from "@/components/BrandArt";
import { ArrowIcon, SocialIcon } from "@/components/Icons";
import { socialLinks } from "@/lib/social";

export default function HomePage() {
  const featured = products.filter((p) => p.bestseller).slice(0, 3);
  const hero = products[0];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-pink">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-blob bg-pink-soft/40 blur-2xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 py-16 md:grid-cols-2 md:py-24">
          <div className="relative z-10 text-white">
            <span className="chip border-white text-white">BE ODD. ✦ NEW SEASON</span>
            <h1 className="wordmark mt-5 text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
              BLEND<br />YOUR WAY.
            </h1>
            <p className="mt-6 max-w-md text-lg text-white/90">
              Latex-free sponges, vegan brushes and plush puffs — tools for a face that doesn&apos;t
              follow rules.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn bg-white text-ink hover:bg-cream">
                Shop the tools <ArrowIcon className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn border-2 border-white text-white hover:bg-white hover:text-ink">
                Why be odd?
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-5 text-sm text-white/90">
              <span>★★★★★ 12,000+ five-star blends</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 grid place-items-center">
              <Eye className="w-64 sm:w-80" />
            </div>
            <div className="relative animate-float">
              <ProductArt product={hero} className="mx-auto w-[78%] drop-shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUE STRIP */}
      <section className="border-y-2 border-ink/10 bg-cream">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x-2 divide-ink/10 md:grid-cols-4">
          {[
            ["Latex-Free", "Kind to sensitive skin"],
            ["100% Vegan", "Never tested on animals"],
            ["Free Shipping", "On orders over $50"],
            ["Happy Returns", "30 days, no drama"],
          ].map(([t, s]) => (
            <div key={t} className="px-5 py-6 text-center">
              <p className="wordmark text-lg">{t}</p>
              <p className="text-xs text-ink/55">{s}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-pink">The cult favourites</span>
            <h2 className="wordmark text-4xl sm:text-5xl">SHOP BESTSELLERS</h2>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 font-semibold hover:text-pink sm:flex">
            View all <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* BRAND BANNER */}
      <section className="bg-ink py-16 text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 md:grid-cols-[1fr_1.1fr]">
          <div className="flex justify-center">
            <BlobEye className="w-56 animate-float md:w-72" />
          </div>
          <div>
            <h2 className="wordmark text-4xl leading-tight sm:text-5xl">
              TOOLS FOR A FACE THAT DOESN&apos;T FOLLOW RULES.
            </h2>
            <p className="mt-5 max-w-lg text-cream/70">
              We started BLENDMI because beauty tools took themselves way too seriously. Ours don&apos;t.
              They&apos;re soft, they&apos;re weird, they work harder than anything in your kit — and they
              come with an eye that&apos;s always watching your blend.
            </p>
            <Link href="/about" className="btn bg-pink text-white hover:bg-pink-deep mt-7">
              Read our story
            </Link>
          </div>
        </div>
      </section>

      {/* SHOP THE LOOK / categories */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="wordmark mb-8 text-center text-4xl sm:text-5xl">FIND YOUR TOOL</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <Link
              key={p.slug}
              href={`/shop?c=${p.category}`}
              className="card group flex flex-col items-center overflow-hidden p-6 text-center transition-transform hover:-translate-y-1"
              style={{ background: `${p.accent}12` }}
            >
              <ProductArt product={p} className="h-40 w-40 transition-transform group-hover:scale-110" />
              <span className="wordmark mt-3 text-xl">{p.category}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SOCIAL */}
      <SocialSection />
    </>
  );
}

function SocialSection() {
  return (
    <section className="bg-pink-pale py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-pink-deep">@blendmi</span>
        <h2 className="wordmark mt-2 text-4xl sm:text-5xl">BLEND WITH US</h2>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          Tag <strong>#BeOdd</strong> and <strong>#BlendMi</strong> for a chance to be featured. Catch
          tutorials, drops and chaos across our socials.
        </p>

        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-4">
          {socialLinks.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="card flex flex-col items-center gap-2 bg-white p-6 transition-transform hover:-translate-y-1"
            >
              <SocialIcon icon={s.icon} className="h-8 w-8 text-ink" />
              <span className="wordmark text-lg">{s.label}</span>
              <span className="text-sm text-ink/50">{s.handle}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
