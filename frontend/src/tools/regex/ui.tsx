"use client";

import { useMemo, useState } from "react";
import { Btn, CopyBtn, SectionLabel, ToolTextarea } from "@/components/ui";
import { testRegex } from "./logic";

const sampleText = "GET /api/users/42\nPOST /api/projects/7";
const samplePattern = "(GET|POST)\\s+([^\\s]+)";

export default function RegexTool() {
  const [input, setInput] = useState(sampleText);
  const [pattern, setPattern] = useState(samplePattern);
  const [flags, setFlags] = useState("g");
  const result = useMemo(
    () => testRegex(pattern, flags, input),
    [flags, input, pattern],
  );

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            regex tester
          </h1>

          <div className="flex flex-wrap items-center gap-2">
            <Btn size="sm" variant="ghost" onClick={() => setInput(sampleText)}>
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

        <section className="grid gap-4 xl:grid-cols-[minmax(18rem,0.85fr)_minmax(0,1.15fr)]">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_6rem]">
              <label className="min-w-0">
                <SectionLabel>pattern</SectionLabel>
                <input
                  value={pattern}
                  onChange={(event) => setPattern(event.target.value)}
                  placeholder="pattern"
                  className="min-h-10 w-full rounded-sm border border-border bg-bg px-3 py-2 font-mono text-xs text-text outline-none focus:border-accent"
                />
              </label>
              <label className="min-w-0">
                <SectionLabel>flags</SectionLabel>
                <input
                  value={flags}
                  onChange={(event) => setFlags(event.target.value)}
                  placeholder="gim"
                  className="min-h-10 w-full rounded-sm border border-border bg-bg px-3 py-2 font-mono text-xs text-text outline-none focus:border-accent"
                />
              </label>
            </div>

            <div className="min-w-0">
              <SectionLabel>sample text</SectionLabel>
              <ToolTextarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="text to test"
                rows={14}
                className="min-h-72 resize-y text-xs"
              />
            </div>
          </div>

          <div className="min-w-0">
            <div className="mb-1.5 flex min-h-status-bar-compact items-center justify-between gap-3">
              <SectionLabel>matches</SectionLabel>
              <CopyBtn text={result.output} disabled={!result.output} />
            </div>

            {result.error ? (
              <div className="rounded-sm border border-red bg-bg px-3 py-2 text-xs text-red">
                {result.error}
              </div>
            ) : result.matches.length > 0 ? (
              <div className="flex flex-col gap-2">
                {result.matches.map((match, index) => (
                  <div
                    key={match.id}
                    className="rounded-sm border border-border bg-surface px-3 py-2"
                  >
                    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                      <span className="text-2xs text-muted">
                        match {index + 1} at {match.index}
                      </span>
                      <CopyBtn text={match.value} />
                    </div>
                    <code className="block break-all text-xs text-green">
                      {match.value}
                    </code>
                    {match.groups.length > 0 && (
                      <div className="mt-2 grid gap-1 sm:grid-cols-2">
                        {match.groups.map((group) => (
                          <div
                            key={group.id}
                            className="min-w-0 rounded-sm border border-border bg-bg px-2 py-1"
                          >
                            <span className="mr-2 text-2xs text-muted">
                              group {group.label}
                            </span>
                            <code className="break-all text-xs">
                              {group.value}
                            </code>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-sm border border-border bg-surface px-3 py-8 text-center text-xs text-muted">
                {pattern ? "no matches" : "enter a pattern"}
              </div>
            )}
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{result.matches.length} matches</span>
          <span>{flags || "no flags"}</span>
          <span>{result.error ? "invalid regex" : "ready"}</span>
        </footer>
      </div>
    </div>
  );
}
