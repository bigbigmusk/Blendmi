import type { Metadata } from "next";
import { Baloo_2, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";

const display = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLENDMI — Tools for a face that doesn't follow rules",
  description:
    "BLENDMI makes latex-free blending sponges, vegan brushes and puffs for a flawless, odd finish. Shop the cult tools. Be odd. Blend your way.",
  keywords: ["makeup sponge", "beauty blender", "vegan brushes", "blendmi", "latex free sponge"],
  openGraph: {
    title: "BLENDMI — Be Odd. Blend Your Way.",
    description: "Latex-free blending tools for a face that doesn't follow rules.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <CartProvider>
          <Header />
          <CartDrawer />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
