import Link from "next/link";
import { Eye, BlobEye } from "@/components/BrandArt";
import { SocialIcon } from "@/components/Icons";
import { socialLinks } from "@/lib/social";

export const metadata = {
  title: "Be Odd — The BLENDMI Story",
  description: "Why we make tools for a face that doesn't follow rules. Latex-free, vegan, cruelty-free and proudly odd.",
};

const faqs = [
  {
    q: "Are your tools really latex-free?",
    a: "Yes — every sponge is made from latex-free, vegan foam that's kind to sensitive and acne-prone skin.",
  },
  {
    q: "How do I clean my Blender?",
    a: "Wet it, lather with a mild soap or our sponge cleanser, squeeze until the water runs clear, and air-dry. Replace every 1–3 months.",
  },
  {
    q: "When will my order ship?",
    a: "Orders ship within 1–2 business days. Free shipping over $50. You'll get tracking by email the moment it leaves us.",
  },
  {
    q: "What's your return policy?",
    a: "30-day happy returns on unused tools, no drama. Email hello@blendmi.com and we'll sort you out.",
  },
  {
    q: "Are you cruelty-free?",
    a: "Always. We never test on animals and everything we make is 100% vegan.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-pink py-20 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mx-auto mb-6 w-40">
            <Eye />
          </div>
          <h1 className="wordmark text-6xl sm:text-7xl">BE ODD.</h1>
          <p className="mt-4 text-lg text-white/90">
            Beauty tools took themselves too seriously. So we made the opposite.
          </p>
        </div>
      </section>

      <section id="story" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="wordmark text-4xl">OUR STORY</h2>
        <div className="mt-5 space-y-4 text-lg text-ink/80">
          <p>
            BLENDMI started with a simple, slightly weird idea: the tools you blend with should be as fun
            as the face you&apos;re creating. No clinical packaging, no impossible rules — just soft,
            high-performing sponges, brushes and puffs with an eye that&apos;s always watching your blend.
          </p>
          <p>
            Every tool is latex-free, vegan and cruelty-free, engineered to drink less product and give
            more coverage. Whether you blend dewy or full-glam, fast or fussy — there&apos;s no wrong way.
            Blend your way.
          </p>
        </div>
      </section>

      <section id="values" className="bg-ink py-16 text-cream">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 sm:grid-cols-3">
          {[
            ["LATEX-FREE", "Soft, vegan foam that's kind to sensitive skin."],
            ["CRUELTY-FREE", "Never tested on animals. Ever."],
            ["MADE TO LAST", "Durable tools designed to bounce back, wash after wash."],
          ].map(([t, s]) => (
            <div key={t} className="rounded-[28px] border border-cream/15 p-7">
              <h3 className="wordmark text-2xl text-pink">{t}</h3>
              <p className="mt-2 text-cream/70">{s}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="wordmark text-4xl">FAQ</h2>
        <div className="mt-6 divide-y-2 divide-ink/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {f.q}
                <span className="text-pink transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-ink/70">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-pink-pale py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <BlobEye className="mx-auto w-24 animate-float" />
          <h2 className="wordmark mt-4 text-4xl">FOLLOW THE ODD ONES</h2>
          <div className="mt-6 flex justify-center gap-4">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-12 w-12 place-items-center rounded-full bg-white transition-transform hover:-translate-y-1"
              >
                <SocialIcon icon={s.icon} className="h-6 w-6" />
              </a>
            ))}
          </div>
          <Link href="/shop" className="btn-ink mt-8">
            Shop the tools
          </Link>
        </div>
      </section>
    </>
  );
}
