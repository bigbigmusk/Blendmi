import Link from "next/link";
import { BlobEye } from "@/components/BrandArt";

export default function NotFound() {
  return (
    <div className="mx-auto grid max-w-xl place-items-center px-6 py-28 text-center">
      <BlobEye className="w-28 animate-float" />
      <h1 className="wordmark mt-6 text-6xl">404</h1>
      <p className="mt-2 text-ink/70">This page is a little too odd to find. Let&apos;s get you back.</p>
      <Link href="/" className="btn-pink mt-6">
        Back home
      </Link>
    </div>
  );
}
