"use client";

import { useEffect, useState } from "react";
import { Btn, CopyBtn, SectionLabel, ToolTextarea } from "@/components/ui";
import { digestAllText } from "./logic";

const sampleInput = "thedevbox";

type HashRows = Awaited<ReturnType<typeof digestAllText>>;

export default function HashTool() {
  const [input, setInput] = useState(sampleInput);
  const [rows, setRows] = useState<HashRows>([]);

  useEffect(() => {
    let active = true;

    digestAllText(input).then((result) => {
      if (active) {
        setRows(result);
      }
    });

    return () => {
      active = false;
    };
  }, [input]);

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-7 sm:py-7">
      <div className="mx-auto flex max-w-tool flex-col gap-4">
        <header className="flex flex-col gap-3 border-b border-border pb-4 md:flex-row md:items-end md:justify-between">
          <h1 className="m-0 text-2xl font-normal leading-tight text-text">
            hash generator
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

        <section className="grid gap-4 lg:grid-cols-[minmax(18rem,0.7fr)_minmax(0,1.3fr)]">
          <div className="min-w-0">
            <SectionLabel>message</SectionLabel>
            <ToolTextarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="text to hash"
              rows={10}
              className="min-h-52 resize-y text-xs lg:h-72"
            />
          </div>

          <div className="min-w-0">
            <SectionLabel>digests</SectionLabel>
            <div className="flex flex-col gap-1">
              {rows.map(({ algorithm, result }) => (
                <div
                  key={algorithm}
                  className="grid gap-2 rounded-sm border border-border bg-surface px-3 py-2 sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-center"
                >
                  <span className="text-2xs text-muted">{algorithm}</span>
                  <code
                    title={result.output || result.error || ""}
                    className={`min-w-0 break-all text-xs sm:truncate ${
                      result.error ? "text-red" : "text-green"
                    }`}
                  >
                    {result.error || result.output || "empty input"}
                  </code>
                  <CopyBtn text={result.output} disabled={!result.output} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-wrap gap-2 border-t border-border pt-3 text-ui-xs text-muted">
          <span>{input.length} message chars</span>
          <span>{rows.length} algorithms</span>
          <span>
            {rows.some((row) => row.result.error) ? "has errors" : "ready"}
          </span>
        </footer>
      </div>
    </div>
  );
}
