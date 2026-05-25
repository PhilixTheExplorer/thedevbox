"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { ToolSegmentedControl } from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { type CsvDelimiter, convertJsonCsv, type JsonCsvMode } from "./logic";

const jsonSample = `[
  { "tool": "json formatter", "category": "format", "ready": true },
  { "tool": "regex tester", "category": "inspect", "ready": true }
]`;

const csvSample = `tool,category,ready
json formatter,format,true
regex tester,inspect,true`;

export default function JsonCsvTool() {
  const [mode, setMode] = useState<JsonCsvMode>("json-to-csv");
  const [input, setInput] = useState(jsonSample);
  const [delimiter, setDelimiter] = useState<CsvDelimiter>(",");
  const [customDelimiter, setCustomDelimiter] = useState("");
  const activeDelimiter = customDelimiter || delimiter;
  const result = useMemo(
    () => convertJsonCsv(input, mode, activeDelimiter),
    [activeDelimiter, input, mode],
  );

  const changeMode = (nextMode: JsonCsvMode) => {
    setMode(nextMode);
    setInput(nextMode === "json-to-csv" ? jsonSample : csvSample);
  };

  return (
    <TextToolLayout
      title="json ↔ csv"
      input={input}
      output={result.output}
      error={result.error}
      placeholder={
        mode === "json-to-csv" ? '[{"id":1}]' : "id,name\n1,thedevbox"
      }
      onInputChange={setInput}
      controls={
        <>
          <ToolSegmentedControl
            value={mode}
            options={[
              { value: "json-to-csv", label: "json → csv" },
              { value: "csv-to-json", label: "csv → json" },
            ]}
            onChange={changeMode}
          />
          <ToolSegmentedControl
            value={delimiter}
            options={[
              { value: ",", label: "," },
              { value: ";", label: ";" },
              { value: "\t", label: "tab" },
              { value: "|", label: "|" },
            ]}
            onChange={(nextDelimiter) => {
              setDelimiter(nextDelimiter);
              setCustomDelimiter("");
            }}
          />
          <input
            value={customDelimiter}
            onChange={(event) =>
              setCustomDelimiter(event.target.value.slice(0, 1))
            }
            placeholder="custom"
            className="min-h-status-bar-compact w-20 rounded-sm border border-border bg-bg px-2.5 py-1 text-ui-xs text-text focus:border-accent focus:outline-none"
            aria-label="custom delimiter"
          />
          <Btn
            size="sm"
            variant="ghost"
            onClick={() =>
              setInput(mode === "json-to-csv" ? jsonSample : csvSample)
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
          <span>
            {activeDelimiter === "\t"
              ? "tab delimiter"
              : `${activeDelimiter} delimiter`}
          </span>
          <span>{result.rows} rows</span>
          <span>{result.columns} columns</span>
          <span>{result.error ? "invalid input" : "ready"}</span>
        </>
      }
    />
  );
}
