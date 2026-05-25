"use client";

import { useMemo, useState } from "react";
import {
  ToolCheckbox,
  ToolSegmentedControl,
} from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { CopyBtn } from "@/components/ui/copy-button";
import { ToolTextarea } from "@/components/ui/textarea";
import { compareText, type DiffMode } from "./logic";

const sampleBefore = `export function total(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}`;
const sampleAfter = `export function total(items) {
  return items.reduce((sum, item) => sum + item.price * item.qty, 0);
}`;

export default function DiffViewerTool() {
  const [before, setBefore] = useState(sampleBefore);
  const [after, setAfter] = useState(sampleAfter);
  const [mode, setMode] = useState<DiffMode>("lines");
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const diff = useMemo(
    () => compareText(before, after, mode, ignoreWhitespace),
    [before, after, mode, ignoreWhitespace],
  );

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            diff viewer
          </h1>
          <div className="flex flex-wrap items-center gap-2">
            <ToolSegmentedControl
              value={mode}
              options={[
                { value: "lines", label: "lines" },
                { value: "words", label: "words" },
              ]}
              onChange={setMode}
            />
            <ToolCheckbox
              checked={ignoreWhitespace}
              label="ignore whitespace"
              onChange={setIgnoreWhitespace}
            />
            <Btn
              size="sm"
              variant="ghost"
              onClick={() => {
                setBefore(sampleBefore);
                setAfter(sampleAfter);
              }}
            >
              sample
            </Btn>
            <Btn
              size="sm"
              variant="danger"
              onClick={() => {
                setBefore("");
                setAfter("");
              }}
              disabled={!before && !after}
            >
              clear
            </Btn>
          </div>
        </header>

        <section className="grid gap-4 lg:grid-cols-2">
          <div>
            <PaneLabel label="before" />
            <ToolTextarea
              value={before}
              onChange={(event) => setBefore(event.target.value)}
              className="h-64 resize-none text-xs"
            />
          </div>
          <div>
            <PaneLabel label="after" />
            <ToolTextarea
              value={after}
              onChange={(event) => setAfter(event.target.value)}
              className="h-64 resize-none text-xs"
            />
          </div>
        </section>

        <section>
          <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
            <div className="text-2xs text-muted tracking-widest uppercase">
              diff
            </div>
            <CopyBtn text={diff.patch} disabled={!diff.patch} />
          </div>
          <div className="h-tool-editor overflow-auto rounded-sm border border-border bg-bg text-xs">
            {diff.parts.map((part) => (
              <div
                key={part.id}
                className={`px-3 py-1 font-mono ${
                  part.type === "add"
                    ? "bg-green/10 text-green"
                    : part.type === "remove"
                      ? "bg-red/10 text-red"
                      : "text-muted"
                }`}
              >
                <span className="mr-2 select-none">
                  {part.type === "add"
                    ? "+"
                    : part.type === "remove"
                      ? "-"
                      : " "}
                </span>
                {part.value || " "}
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{diff.stats.added} added</span>
          <span>{diff.stats.removed} removed</span>
          <span>{diff.stats.unchanged} unchanged</span>
        </footer>
      </div>
    </div>
  );
}

function PaneLabel({ label }: { label: string }) {
  return (
    <div className="mb-1.5 text-2xs text-muted tracking-widest uppercase">
      {label}
    </div>
  );
}
