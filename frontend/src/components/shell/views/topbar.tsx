"use client";

import Link from "next/link";
import { TuneIcon } from "@/components/icons";
import { useShellStore } from "@/components/shell/state/shell-store";
import { SupportLinks } from "@/components/support-link";

export function DevboxTopbar() {
  const mobileSidebarOpen = useShellStore((state) => state.mobileSidebarOpen);
  const toggleMobileSidebar = useShellStore(
    (state) => state.toggleMobileSidebar,
  );
  const theme = useShellStore((state) => state.theme);
  const toggleTheme = useShellStore((state) => state.toggleTheme);
  const mounted = useShellStore((state) => state.mounted);
  const tweaks = useShellStore((state) => state.tweaks);
  const toggleTweaks = useShellStore((state) => state.toggleTweaks);

  const menuLabel = mobileSidebarOpen ? "close navigation" : "open navigation";
  const themeLabel =
    theme === "dark" ? "switch to light theme" : "switch to dark theme";
  const topbarActionClass =
    "h-toolbar-button justify-center rounded-sm border border-border bg-surface text-ui text-muted2 transition-all duration-150 w-icon-button p-0 lg:px-2.5 lg:py-1 lg:text-2xs lg:w-auto lg:leading-none lg:gap-1 hover:border-accent hover:bg-accent-dim hover:text-accent";

  return (
    <header className="flex items-center border-b border-border shrink-0 bg-surface h-topbar gap-2 px-2.5 lg:gap-2.5 lg:px-4">
      <button
        type="button"
        aria-label={menuLabel}
        title={menuLabel}
        onClick={toggleMobileSidebar}
        className={`bg-transparent border rounded-sm cursor-pointer font-inherit text-ui w-icon-button h-toolbar-button p-0 shrink-0 hidden max-lg:inline-flex items-center justify-center transition-colors duration-100 ${
          mobileSidebarOpen
            ? "border-accent text-accent"
            : "border-border text-muted hover:border-accent hover:text-accent"
        }`}
      >
        {mobileSidebarOpen ? "x" : "☰"}
      </button>

      <Link
        href="/"
        className="text-ui-xs text-muted whitespace-nowrap overflow-hidden text-ellipsis flex-1 lg:flex-initial"
      >
        <span className="text-accent">[</span>thedevbox
        <span className="text-accent">]</span>
      </Link>

      <div className="ml-auto flex items-center gap-1.5 lg:gap-2">
        <SupportLinks variant="topbar" />
        <button
          type="button"
          aria-label="toggle tweaks panel"
          title="toggle tweaks panel"
          onClick={toggleTweaks}
          className={`inline-flex cursor-pointer items-center font-inherit ${
            tweaks
              ? "h-toolbar-button justify-center rounded-sm border border-accent bg-accent-dim text-ui text-accent transition-all duration-150 w-icon-button p-0 lg:px-2.5 lg:py-1 lg:text-2xs lg:w-auto lg:leading-none lg:gap-1"
              : topbarActionClass
          }`}
        >
          <TuneIcon size={11} />
          <span className="hidden lg:inline">tweaks</span>
        </button>
        {mounted ? (
          <button
            type="button"
            aria-label={themeLabel}
            title={themeLabel}
            onClick={toggleTheme}
            className={`inline-flex cursor-pointer items-center font-inherit ${topbarActionClass}`}
          >
            <span>{theme === "dark" ? "☀" : "☾"}</span>
            <span className="hidden lg:inline">
              {theme === "dark" ? "light" : "dark"}
            </span>
          </button>
        ) : (
          <div className="w-icon-button h-toolbar-button lg:w-12 border border-border rounded-sm bg-transparent" />
        )}
      </div>
    </header>
  );
}
