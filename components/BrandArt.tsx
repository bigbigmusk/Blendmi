import type { Product } from "@/lib/products";

/** The signature BLENDMI eye. */
export function Eye({ className, light = false }: { className?: string; light?: boolean }) {
  return (
    <svg viewBox="0 0 100 64" className={className} aria-hidden>
      <path
        d="M4 32C18 8 40 4 50 4s32 4 46 28c-14 24-36 28-46 28S18 56 4 32Z"
        fill={light ? "#FFF0E6" : "#FFFFFF"}
      />
      <g className="origin-center animate-blink">
        <circle cx="50" cy="32" r="15" fill="#0D0D0D" />
      </g>
    </svg>
  );
}

/** Black blob with a peeking eye — used as a brand mark. */
export function BlobEye({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 110" className={className} aria-hidden>
      <path
        fill="#0D0D0D"
        d="M62 4c22-2 42 12 50 30 9 20 2 44-16 56-16 11-42 12-58 1C22 80 8 62 10 42 12 20 36 6 62 4Z"
      />
      <ellipse cx="70" cy="52" rx="22" ry="15" fill="#FFF0E6" />
      <circle cx="70" cy="52" r="9" fill="#0D0D0D" />
    </svg>
  );
}

/**
 * Per-product illustration. Recreates the brand's odd sponge / tool shapes
 * with an eye, in the product's accent colour. Fully vector — no image files.
 */
export function ProductArt({ product, className }: { product: Product; className?: string }) {
  const c = product.accent;
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={product.name}>
      <defs>
        <radialGradient id={`g-${product.slug}`} cx="38%" cy="32%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="45%" stopColor={c} />
          <stop offset="100%" stopColor={c} />
        </radialGradient>
      </defs>
      {renderArt(product, `url(#g-${product.slug})`, c)}
    </svg>
  );
}

function eye(cx: number, cy: number, s = 1) {
  return (
    <g transform={`translate(${cx} ${cy}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="14" ry="9" fill="#FFF0E6" />
      <circle cx="0" cy="0" r="5.5" fill="#0D0D0D" />
    </g>
  );
}

function renderArt(product: Product, fill: string, c: string) {
  switch (product.art) {
    case "teardrop":
      return (
        <g>
          <path d="M100 28c26 34 40 52 40 78a40 40 0 0 1-80 0c0-26 14-44 40-78Z" fill={fill} />
          {eye(100, 96)}
        </g>
      );
    case "peanut":
      return (
        <g>
          <path
            d="M70 60a34 34 0 1 1 2 60 30 30 0 0 0 0 0 34 34 0 1 0 26-60c-10 0-19 6-24 14-6-8-15-14-26-14a0 0 0 0 0 22 0Z"
            fill={fill}
          />
          <ellipse cx="72" cy="92" rx="34" ry="36" fill={fill} />
          <ellipse cx="128" cy="108" rx="32" ry="34" fill={fill} />
          {eye(80, 96, 0.85)}
        </g>
      );
    case "round":
      return (
        <g>
          <circle cx="100" cy="104" r="62" fill={fill} />
          {eye(100, 104)}
        </g>
      );
    case "brushes":
      return (
        <g>
          {[
            { x: 70, w: 26, h: 38 },
            { x: 100, w: 20, h: 30 },
            { x: 126, w: 16, h: 26 },
          ].map((b, i) => (
            <g key={i}>
              <ellipse cx={b.x} cy={40 + (38 - b.h)} rx={b.w / 2} ry={b.h / 2} fill="#0D0D0D" />
              <rect x={b.x - 4} y={58} width="8" height="6" rx="2" fill={c} />
              <rect x={b.x - 5} y={64} width="10" height="96" rx="5" fill="#FFF0E6" stroke="#0D0D0D" strokeWidth="2" />
            </g>
          ))}
          {eye(100, 178, 0.6)}
        </g>
      );
    case "puff":
      return (
        <g>
          <ellipse cx="100" cy="104" rx="66" ry="56" fill="#FFF0E6" stroke={c} strokeWidth="3" />
          <rect x="34" y="92" width="132" height="22" rx="11" fill={c} />
          {eye(100, 150, 0.55)}
          <ellipse cx="100" cy="64" rx="40" ry="10" fill="#fff" opacity="0.5" />
        </g>
      );
    case "tote":
      return (
        <g>
          <path d="M52 70h96v90a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8Z" fill="#FFF0E6" stroke="#0D0D0D" strokeWidth="3" />
          <path d="M74 70c0-20 8-30 26-30s26 10 26 30" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="106" cy="120" rx="30" ry="22" fill={c} />
          {eye(112, 120, 0.8)}
        </g>
      );
    case "set":
      return (
        <g>
          <rect x="34" y="58" width="132" height="96" rx="8" fill="#FFF0E6" stroke="#0D0D0D" strokeWidth="3" />
          <rect x="34" y="58" width="132" height="22" rx="8" fill={c} />
          <ellipse cx="118" cy="118" rx="26" ry="20" fill={c} />
          {eye(124, 118, 0.7)}
          {[58, 72, 86].map((x) => (
            <rect key={x} x={x} y={96} width="6" height="48" rx="3" fill="#0D0D0D" />
          ))}
        </g>
      );
    case "sticker":
      return (
        <g>
          <rect x="42" y="46" width="116" height="116" rx="10" fill="#FFF0E6" stroke="#0D0D0D" strokeWidth="3" transform="rotate(-6 100 104)" />
          <ellipse cx="100" cy="104" rx="46" ry="34" fill={c} transform="rotate(-6 100 104)" />
          {eye(104, 100)}
        </g>
      );
    default:
      return null;
  }
}
