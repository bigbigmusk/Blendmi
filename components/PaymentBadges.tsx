/** Accepted-payment-method badges (inline SVG, no external assets). */

function Badge({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      className="inline-flex h-7 w-11 items-center justify-center rounded-md border border-ink/10 bg-white"
    >
      {children}
    </span>
  );
}

function Visa() {
  return (
    <svg viewBox="0 0 40 16" className="h-3.5" aria-hidden>
      <text x="20" y="13" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="14" fill="#1A1F71">
        VISA
      </text>
    </svg>
  );
}

function Mastercard() {
  return (
    <svg viewBox="0 0 36 22" className="h-4" aria-hidden>
      <circle cx="14" cy="11" r="9" fill="#EB001B" />
      <circle cx="22" cy="11" r="9" fill="#F79E1B" />
      <path d="M18 4a9 9 0 0 1 0 14 9 9 0 0 1 0-14Z" fill="#FF5F00" />
    </svg>
  );
}

function Amex() {
  return (
    <svg viewBox="0 0 44 16" className="h-3.5" aria-hidden>
      <rect width="44" height="16" rx="2" fill="#2E77BC" />
      <text x="22" y="12" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="9" fill="#fff">
        AMEX
      </text>
    </svg>
  );
}

function PayPal() {
  return (
    <svg viewBox="0 0 50 16" className="h-3.5" aria-hidden>
      <text x="2" y="13" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#003087">
        Pay
      </text>
      <text x="25" y="13" fontFamily="Arial, sans-serif" fontWeight="700" fontStyle="italic" fontSize="13" fill="#009CDE">
        Pal
      </text>
    </svg>
  );
}

function ApplePay() {
  return (
    <svg viewBox="0 0 44 18" className="h-4" aria-hidden fill="#000">
      <path d="M9.6 5.3c.5-.6.8-1.4.7-2.3-.7 0-1.6.5-2.1 1.1-.5.5-.9 1.4-.8 2.2.8.1 1.6-.4 2.2-1Zm.7 1.2c-1.2-.1-2.2.7-2.8.7-.6 0-1.4-.6-2.4-.6-1.2 0-2.4.7-3 1.8-1.3 2.2-.3 5.5.9 7.3.6.9 1.3 1.9 2.3 1.8.9 0 1.3-.6 2.4-.6 1.1 0 1.4.6 2.4.6 1 0 1.6-.9 2.2-1.8.7-1 1-2 1-2.1 0 0-1.9-.8-1.9-2.9 0-1.8 1.5-2.7 1.5-2.7-.8-1.2-2.1-1.3-2.5-1.4Z" />
      <text x="17" y="14" fontFamily="Arial, sans-serif" fontWeight="600" fontSize="11">
        Pay
      </text>
    </svg>
  );
}

function GooglePay() {
  return (
    <svg viewBox="0 0 48 18" className="h-4" aria-hidden>
      <text x="2" y="14" fontFamily="Arial, sans-serif" fontWeight="700" fontSize="13" fill="#5F6368">
        G
      </text>
      <text x="13" y="14" fontFamily="Arial, sans-serif" fontWeight="500" fontSize="11" fill="#5F6368">
        Pay
      </text>
    </svg>
  );
}

export function PaymentBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <Badge label="Visa"><Visa /></Badge>
      <Badge label="Mastercard"><Mastercard /></Badge>
      <Badge label="American Express"><Amex /></Badge>
      <Badge label="PayPal"><PayPal /></Badge>
      <Badge label="Apple Pay"><ApplePay /></Badge>
      <Badge label="Google Pay"><GooglePay /></Badge>
    </div>
  );
}
