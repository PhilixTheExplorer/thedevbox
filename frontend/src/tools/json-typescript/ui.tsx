"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { Btn } from "@/components/ui/button";
import { jsonToTypescript } from "./logic";

const sampleInput = `{
  "id": 1,
  "name": "thedevbox",
  "private": true,
  "tools": [
    { "id": "json", "category": "format" },
    { "id": "uuid", "category": "generate" }
  ]
}`;

export default function JsonTypescriptTool() {
  const [input, setInput] = useState(sampleInput);
  const [rootName, setRootName] = useState("ThedevboxConfig");
  const result = useMemo(
    () => jsonToTypescript(input, rootName),
    [input, rootName],
  );

  return (
    <TextToolLayout
      title="json → typescript"
      input={input}
      output={result.output}
      error={result.error}
      placeholder='{"id": 1}'
      onInputChange={setInput}
      controls={
        <>
          <input
            value={rootName}
            onChange={(event) => setRootName(event.target.value)}
            className="min-h-status-bar-compact w-44 rounded-sm border border-border bg-bg px-2.5 py-1 text-ui-xs text-text focus:border-accent focus:outline-none"
            aria-label="root type name"
          />
          <Btn size="sm" variant="ghost" onClick={() => setInput(sampleInput)}>
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
        </>
      }
      footer={
        <>
          <span>{rootName || "Root"}</span>
          <span>{result.error ? "invalid json" : "ready"}</span>
          <span>{result.output.split("interface").length - 1} interfaces</span>
        </>
      }
    />
  );
}
