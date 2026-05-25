"use client";

import { useMemo, useState } from "react";
import { TextToolLayout } from "@/components/tool-kit/text-tool-layout";
import { ToolSegmentedControl } from "@/components/tool-kit/tool-controls";
import { Btn } from "@/components/ui/button";
import { convertJsonYaml, type JsonYamlMode } from "./logic";

const jsonSample = `{
  "name": "thedevbox",
  "private": true,
  "tools": ["json", "yaml", "markdown"],
  "server": {
    "port": 3000,
    "host": "localhost"
  }
}`;

const yamlSample = `name: thedevbox
private: true
tools: [json, yaml, markdown]
server:
  port: 3000
  host: localhost`;

export default function JsonYamlTool() {
  const [mode, setMode] = useState<JsonYamlMode>("json-to-yaml");
  const [input, setInput] = useState(jsonSample);
  const result = useMemo(() => convertJsonYaml(input, mode), [input, mode]);

  const changeMode = (nextMode: JsonYamlMode) => {
    setMode(nextMode);
    setInput(nextMode === "json-to-yaml" ? jsonSample : yamlSample);
  };

  return (
    <TextToolLayout
      title="json ↔ yaml"
      input={input}
      output={result.output}
      error={result.error}
      placeholder={mode === "json-to-yaml" ? '{"key":"value"}' : "key: value"}
      onInputChange={setInput}
      controls={
        <>
          <ToolSegmentedControl
            value={mode}
            options={[
              { value: "json-to-yaml", label: "json -> yaml" },
              { value: "yaml-to-json", label: "yaml -> json" },
            ]}
            onChange={changeMode}
          />
          <Btn
            size="sm"
            variant="ghost"
            onClick={() =>
              setInput(mode === "json-to-yaml" ? jsonSample : yamlSample)
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
