"use client";

import { useMemo, useState } from "react";
import { Btn, CopyBtn, SectionLabel, ToolTextarea } from "@/components/ui";
import { convertAllCases } from "./logic";

const sampleInput = "hello world from thedevbox";

export default function CaseConverterTool() {
  const [input, setInput] = useState(sampleInput);
  const cases = useMemo(() => convertAllCases(input), [input]);

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            case converter
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Btn
              size="sm"
              variant="ghost"
              onClick={() => setInput(sampleInput)}
            >
              sample
            </Btn>
            <Btn
              size="sm"
              variant="danger"
              onClick={() => setInput("")}
              disabled={!input}
            >
              clear
            </Btn>
          </div>
        </header>

        <section className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <SectionLabel>input</SectionLabel>
            <ToolTextarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="thedevbox topbar sponsor button"
              rows={3}
              className="min-h-24 resize-none text-xs"
            />
          </div>

          <div className="flex flex-col gap-1">
            {cases.map(({ label, result }) => (
              <div
                key={label}
                className="flex min-h-10 items-center gap-2.5 rounded-sm border border-border bg-surface px-3 py-2"
              >
                <span className="min-w-[130px] shrink-0 text-2xs text-muted">
                  {label}
                </span>
                <code
                  title={result.output}
                  className="min-w-0 flex-1 truncate text-xs text-green"
                >
                  {result.output}
                </code>
                <CopyBtn text={result.output} disabled={!result.output} />
              </div>
            ))}
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{input.length} input chars</span>
          <span>{cases.length} case formats</span>
          <span>{input.trim() ? "ready" : "empty input"}</span>
        </footer>
      </div>
    </div>
  );
}
