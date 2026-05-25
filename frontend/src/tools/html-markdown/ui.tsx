"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { ToolSegmentedControl } from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { convertHtmlMarkdown, type HtmlMarkdownMode } from "./logic";

const htmlSample = `<h1>thedevbox</h1>
<p><strong>HTML</strong> converts to Markdown with GFM tables.</p>
<table>
  <tr><th>Tool</th><th>Status</th></tr>
  <tr><td>HTML ↔ Markdown</td><td>ready</td></tr>
</table>`;

const markdownSample = `# thedevbox

**Markdown** converts to HTML with GFM.

| Tool | Status |
| --- | --- |
| HTML ↔ Markdown | ready |`;

export default function HtmlMarkdownTool() {
  const [mode, setMode] = useState<HtmlMarkdownMode>("html-to-markdown");
  const [input, setInput] = useState(htmlSample);
  const result = useMemo(() => convertHtmlMarkdown(input, mode), [input, mode]);

  const changeMode = (nextMode: HtmlMarkdownMode) => {
    setMode(nextMode);
    setInput(nextMode === "html-to-markdown" ? htmlSample : markdownSample);
  };

  return (
    <TextToolLayout
      title="html ↔ markdown"
      input={input}
      output={result.output}
      error={result.error}
      placeholder={mode === "html-to-markdown" ? "<h1>Hello</h1>" : "# Hello"}
      onInputChange={setInput}
      controls={
        <>
          <ToolSegmentedControl
            value={mode}
            options={[
              { value: "html-to-markdown", label: "html → md" },
              { value: "markdown-to-html", label: "md → html" },
            ]}
            onChange={changeMode}
          />
          <Btn
            size="sm"
            variant="ghost"
            onClick={() =>
              setInput(
                mode === "html-to-markdown" ? htmlSample : markdownSample,
              )
            }
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
        </>
      }
      footer={
        <>
          <span>{mode}</span>
          <span>{result.error ? "invalid input" : "ready"}</span>
          <span>{result.output.length} output chars</span>
        </>
      }
    />
  );
}
