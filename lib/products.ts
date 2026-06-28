export type ProductColor = {
  name: string;
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  category: "Sponges" | "Brushes" | "Puffs" | "Sets" | "Merch";
  bestseller?: boolean;
  isNew?: boolean;
  shortDescription: string;
  description: string;
  details: string[];
  colors: ProductColor[];
  /** Visual style used by the SVG illustrator (fallback when no photo is set). */
  art: "teardrop" | "peanut" | "round" | "brushes" | "puff" | "tote" | "set" | "sticker";
  accent: string; // primary illustration color
  /** Optional real product photo, e.g. "/products/the-blender.jpg". Overrides the SVG art. */
  image?: string;
  /** Optional extra photos for the product detail gallery. */
  gallery?: string[];
};

export const products: Product[] = [
  {
    slug: "the-blender",
    name: "The Blender",
    tagline: "Makeup Sponge · Latex Free",
    price: 14,
    category: "Sponges",
    bestseller: true,
    shortDescription:
      "Our cult teardrop sponge for a seamless, airbrushed finish — wet, squeeze, bounce.",
    description:
      "The one that started it all. A latex-free teardrop sponge engineered to double in size when wet, so it drinks less product and leaves more on your skin. The rounded base presses foundation flat; the precision tip gets into the corners a brush can't reach.",
    details: [
      "Latex-free, vegan & cruelty-free foam",
      "Expands up to 2x when wet",
      "Flat edge for cheeks, tip for under-eyes",
      "Use wet for dewy, dry for full coverage",
    ],
    colors: [
      { name: "Hot Pink", hex: "#FF28BA" },
      { name: "Bubblegum", hex: "#FF7AC4" },
      { name: "Ballet", hex: "#FFD6E4" },
    ],
    art: "teardrop",
    accent: "#FF28BA",
  },
  {
    slug: "the-double",
    name: "The Double",
    tagline: "Dual-Zone Peanut Sponge",
    price: 16,
    category: "Sponges",
    isNew: true,
    shortDescription:
      "A pinched peanut shape with two blending zones — big base for coverage, snug waist for contour.",
    description:
      "Two sponges in one odd little body. The full lobe blends foundation across big areas fast, while the cinched waist hugs the curve of your nose and jaw for contour and concealer. Be odd, blend weird.",
    details: [
      "Dual-density peanut shape",
      "Waist fits nose, jaw & cupid's bow",
      "Latex-free & ultra-soft",
      "Machine-bounce-tested for durability",
    ],
    colors: [
      { name: "Ballet", hex: "#FFD6E4" },
      { name: "Hot Pink", hex: "#FF28BA" },
    ],
    art: "peanut",
    accent: "#FF7AC4",
  },
  {
    slug: "the-orb",
    name: "The Orb",
    tagline: "Round Powder Sponge",
    price: 13,
    category: "Sponges",
    shortDescription:
      "A perfectly round bounce for pressing in powder and setting your look without disturbing it.",
    description:
      "Round, plush, and made for pressing. The Orb sets powder and cream in one motion without dragging — ideal for baking under the eyes or locking a full face in place.",
    details: [
      "Velvet-soft round form",
      "Press-and-roll for flawless setting",
      "Latex-free foam",
      "Pairs with The Blender for a full routine",
    ],
    colors: [
      { name: "Hot Pink", hex: "#FF28BA" },
      { name: "Ballet", hex: "#FFD6E4" },
    ],
    art: "round",
    accent: "#FF28BA",
  },
  {
    slug: "the-brush-trio",
    name: "The Brush Trio",
    tagline: "Blend. Build. Blur.",
    price: 38,
    category: "Brushes",
    bestseller: true,
    shortDescription:
      "Three vegan brushes — buff, build and blur — with our signature cream handles.",
    description:
      "Everything you need to paint a face that doesn't follow rules. A fluffy powder buffer, a dense build brush for foundation, and a tapered blur brush for shadow and concealer. Soft synthetic bristles that don't shed and wash clean.",
    details: [
      "3 vegan synthetic brushes",
      "Powder · Foundation · Blend & blur",
      "Cream resin handles, latex-free",
      "Wash with mild soap, reshape, air-dry",
    ],
    colors: [{ name: "Cream / Black", hex: "#0D0D0D" }],
    art: "brushes",
    accent: "#0D0D0D",
  },
  {
    slug: "the-puff-pouch",
    name: "The Puff Pouch",
    tagline: "Makeup Puff Set",
    price: 24,
    category: "Puffs",
    shortDescription:
      "Three plush velour puffs in a zip pouch for pressing powder anywhere.",
    description:
      "Soft velour puffs with a satin strap, tucked inside a canvas zip pouch with our eye motif. Press, roll, and go — the pouch keeps them lint-free in your bag.",
    details: [
      "3 reusable velour puffs",
      "Satin finger strap",
      "Canvas zip pouch included",
      "Hand-wash & air-dry",
    ],
    colors: [{ name: "Natural / Pink", hex: "#FF28BA" }],
    art: "puff",
    accent: "#FF28BA",
  },
  {
    slug: "brush-and-puff-set",
    name: "The Full Kit",
    tagline: "Brush & Puff Set",
    price: 52,
    category: "Sets",
    bestseller: true,
    shortDescription:
      "The whole ritual in one box — brushes, puffs and a mini blender. Tools for a face that doesn't follow rules.",
    description:
      "Our complete blending wardrobe in a magnetic keepsake box. Five brushes, three puffs and a mini blender — plus stickers and a keychain, because being odd should come with souvenirs.",
    details: [
      "5 vegan brushes + 3 velour puffs",
      "1 mini teardrop blender",
      "Magnetic gift box + sticker sheet + keychain",
      "The cleanest way to gift a whole routine",
    ],
    colors: [{ name: "Cream / Pink", hex: "#FF28BA" }],
    art: "set",
    accent: "#FF28BA",
  },
  {
    slug: "the-tote",
    name: "The Tote",
    tagline: "Canvas Carry-All",
    price: 28,
    category: "Merch",
    isNew: true,
    shortDescription:
      "Heavyweight canvas tote with the BLENDMI eye — for tools, towels and everything odd.",
    description:
      "A sturdy natural-canvas tote screen-printed with our blob-and-eye. Pink web handles, roomy enough for the gym, the beach or a full glam kit. Be odd in public.",
    details: [
      "12oz natural cotton canvas",
      "Pink woven handles",
      "Screen-printed eye motif",
      "Roomy interior, flat base",
    ],
    colors: [{ name: "Natural", hex: "#FFF0E6" }],
    art: "tote",
    accent: "#FF28BA",
  },
  {
    slug: "the-sticker-pack",
    name: "The Sticker Pack",
    tagline: "Be Odd Everywhere",
    price: 8,
    category: "Merch",
    shortDescription:
      "A sheet of weatherproof BLENDMI eyes and blobs for laptops, mirrors and water bottles.",
    description:
      "Slap an eye on it. A sheet of die-cut, weatherproof vinyl stickers featuring our blobs, eyes and slogans. The cheapest way to be odd.",
    details: [
      "Weatherproof die-cut vinyl",
      "8 stickers per sheet",
      "Residue-free removal",
      "Free with orders over $50",
    ],
    colors: [{ name: "Pink / Black", hex: "#FF28BA" }],
    art: "sticker",
    accent: "#FF28BA",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const categories = [
  "All",
  "Sponges",
  "Brushes",
  "Puffs",
  "Sets",
  "Merch",
] as const;
