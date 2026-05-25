"use client";

import { usePathname } from "next/navigation";
import { BrandLoader } from "@/components/brand-loader";

const PLACEHOLDER_SECTIONS = ["section-a", "section-b", "section-c"] as const;
const PLACEHOLDER_CARDS = [
  "card-a",
  "card-b",
  "card-c",
  "card-d",
  "card-e",
  "card-f",
  "card-g",
  "card-h",
] as const;

export default function Loading() {
  const pathname = usePathname();

  if (pathname && pathname !== "/" && pathname !== "/about") {
    return <BrandLoader />;
  }

  return (
    <div className="h-full overflow-auto px-page-x py-page-y">
      <header className="mb-12">
        <div className="mb-2.5 h-3 w-24 animate-pulse rounded-sm bg-border" />
        <div className="h-10 w-64 max-w-full animate-pulse rounded-sm bg-border" />
        <div className="mt-4 flex max-w-copy flex-col gap-2">
          <div className="h-3 w-full animate-pulse rounded-sm bg-border" />
          <div className="h-3 w-4/5 animate-pulse rounded-sm bg-border" />
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <div className="h-toolbar-button w-20 animate-pulse rounded-sm border border-border bg-surface" />
          <div className="h-toolbar-button w-24 animate-pulse rounded-sm border border-border bg-surface" />
          <div className="h-toolbar-button w-28 animate-pulse rounded-sm border border-border bg-surface" />
        </div>
      </header>

      {PLACEHOLDER_SECTIONS.map((section) => (
        <section key={section} className="mb-9">
          <div className="mb-2.5 flex items-center gap-3">
            <div className="h-3 w-28 animate-pulse rounded-sm bg-accent-dim" />
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-tool-cards gap-0.5">
            {PLACEHOLDER_CARDS.map((card) => (
              <div
                key={`${section}-${card}`}
                className="min-h-20 rounded-sm border border-border bg-surface px-4 py-3.5"
              >
                <div className="mb-3 h-3 w-1/2 animate-pulse rounded-sm bg-border" />
                <div className="h-3 w-full animate-pulse rounded-sm bg-border" />
                <div className="mt-2 h-3 w-2/3 animate-pulse rounded-sm bg-border" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
