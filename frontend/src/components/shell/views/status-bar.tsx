"use client";

import { StarIcon } from "@/components/icons";
import { OSS_LINKS } from "@/config/site";
import { TOOLS } from "@/tools";

const AVAILABLE_TOOL_COUNT = TOOLS.filter(
  (tool) => !("soon" in tool && tool.soon),
).length;

export function DevboxStatusBar() {
  return (
    <footer className="flex items-center shrink-0 min-w-0 h-status-bar lg:h-status-bar-compact px-3.5 gap-2 lg:gap-4 border-t border-border bg-surface text-2xs text-muted">
      <span className="font-medium text-accent">thedevbox v0.1</span>
      <span className="hidden lg:inline">•</span>
      <span className="hidden lg:inline">⌘K search</span>
      <span>•</span>
      <span>MIT License</span>
      <span className="hidden lg:inline">•</span>

      <a
        href={OSS_LINKS.repo}
        target="_blank"
        rel="noreferrer"
        className="hidden lg:inline-flex items-center gap-1 text-accent no-underline transition-colors hover:opacity-80"
      >
        <StarIcon size={10} />
        <span>star on github ↗</span>
      </a>

      <span className="ml-auto">
        <span className="lg:hidden">{AVAILABLE_TOOL_COUNT} tools</span>
        <span className="hidden lg:inline">
          {AVAILABLE_TOOL_COUNT} tools available
        </span>
      </span>
    </footer>
  );
}
