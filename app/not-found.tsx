import Link from "next/link";
import type { Metadata } from "next";
import { SignedText } from "@/components/signed-text";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Page not found | ${site.name}_`,
};

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col pt-bar">
      <h1 className="hero-title px-gutter py-[clamp(2rem,6svh,4rem)]">
        <SignedText text="Page not found" />
      </h1>
      <div className="flex flex-1 flex-col items-start gap-8 border-t border-navy p-gutter">
        <p className="max-w-[34rem]">The page you’re looking for doesn’t exist or has moved.</p>
        <Link className="action" href="/">
          Back to home
        </Link>
      </div>
    </main>
  );
}
