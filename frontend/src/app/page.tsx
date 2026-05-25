import type { Metadata } from "next";
import Link from "next/link";
import { SupportLinks } from "@/components/support-link";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/config/site";
import { TOOL_CATEGORIES, TOOLS, type ToolMeta } from "@/tools";

export const metadata: Metadata = {
  title: {
    absolute: SITE_TITLE,
  },
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  const categories = TOOL_CATEGORIES;

  return (
    <div className="py-page-y px-page-x overflow-auto h-full">
      <header className="mb-12">
        <div className="text-2xs text-muted tracking-widest mb-2.5">
          {"// welcome"}
        </div>
        <h1 className="text-4xl font-bold leading-none m-0">
          <span className="text-accent">[</span>thedevbox
          <span className="text-accent">]</span>
        </h1>
        <p className="text-muted2 mt-3 text-ui leading-relaxed max-w-copy mb-0">
          no ads. no accounts. no tracking.
          <br />
          tools that run in your browser, built by people who were tired of bad
          tooling.
        </p>

        <SupportLinks className="mt-5 flex flex-wrap gap-2" />
      </header>

      {categories.map((cat) => {
        const tools = TOOLS.filter((t) => t.category === cat);
        if (!tools.length) return null;
        return (
          <section key={cat} className="mb-9">
            <header className="text-2xs text-accent tracking-widest uppercase mb-2.5 flex items-center gap-3">
              {cat}
              <div className="flex-1 h-px bg-border" />
            </header>
            <div className="grid grid-tool-cards gap-0.5">
              {tools.map((tool) => (
                <HomeCard key={tool.id} tool={tool} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

type HomeCardProps = {
  tool: ToolMeta;
};

function HomeCard({ tool }: HomeCardProps) {
  const isSoon = "soon" in tool && tool.soon;

  const content = (
    <>
      <div className="text-ui text-text mb-1 flex items-center gap-2">
        {tool.name}
        {isSoon && (
          <span className="text-3xs text-muted border border-border px-1.5 py-0.5 rounded-sm">
            soon
          </span>
        )}
      </div>
      <div className="text-ui-xs text-muted">
        {tool.content?.overview ?? tool.description}
      </div>
    </>
  );

  if (isSoon) {
    return (
      <div className="text-left px-4 py-3.5 border rounded-sm font-inherit transition-all duration-150 bg-surface border-border cursor-default opacity-50">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/${tool.id}`}
      className="text-left px-4 py-3.5 border rounded-sm font-inherit transition-all duration-150 bg-surface border-border cursor-pointer hover:bg-accent-dim hover:border-accent no-underline"
    >
      {content}
    </Link>
  );
}
