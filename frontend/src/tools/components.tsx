"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { BrandLoader } from "@/components/brand-loader";
import type { AvailableToolId } from "./index";

const ToolLoading = () => <BrandLoader />;

const Base64Tool = dynamic(() => import("./base64/ui"), {
  loading: ToolLoading,
});
const CaseConverterTool = dynamic(() => import("./case-converter/ui"), {
  loading: ToolLoading,
});
const ColorConverterTool = dynamic(() => import("./color-converter/ui"), {
  loading: ToolLoading,
});
const CronParserTool = dynamic(() => import("./cron-parser/ui"), {
  loading: ToolLoading,
});
const CurlConverterTool = dynamic(() => import("./curl-converter/ui"), {
  loading: ToolLoading,
});
const DiffViewerTool = dynamic(() => import("./diff-viewer/ui"), {
  loading: ToolLoading,
});
const DocxHtmlTool = dynamic(() => import("./docx-html/ui"), {
  loading: ToolLoading,
});
const DocxMarkdownTool = dynamic(() => import("./docx-markdown/ui"), {
  loading: ToolLoading,
});
const EnvFileTool = dynamic(() => import("./env-file/ui"), {
  loading: ToolLoading,
});
const HashTool = dynamic(() => import("./hash/ui"), { loading: ToolLoading });
const HtmlMarkdownTool = dynamic(() => import("./html-markdown/ui"), {
  loading: ToolLoading,
});
const HttpStatusTool = dynamic(() => import("./http-status/ui"), {
  loading: ToolLoading,
});
const JsonTool = dynamic(() => import("./json/ui"), { loading: ToolLoading });
const JsonCsvTool = dynamic(() => import("./json-csv/ui"), {
  loading: ToolLoading,
});
const JsonPathTool = dynamic(() => import("./json-path/ui"), {
  loading: ToolLoading,
});
const JsonTypescriptTool = dynamic(() => import("./json-typescript/ui"), {
  loading: ToolLoading,
});
const JsonYamlTool = dynamic(() => import("./json-yaml/ui"), {
  loading: ToolLoading,
});
const JwtTool = dynamic(() => import("./jwt/ui"), { loading: ToolLoading });
const MarkdownPreviewTool = dynamic(() => import("./markdown-preview/ui"), {
  loading: ToolLoading,
});
const MimeTypeTool = dynamic(() => import("./mime-type/ui"), {
  loading: ToolLoading,
});
const QrCodeTool = dynamic(() => import("./qr-code/ui"), {
  loading: ToolLoading,
});
const RegexTool = dynamic(() => import("./regex/ui"), { loading: ToolLoading });
const SqlTool = dynamic(() => import("./sql/ui"), { loading: ToolLoading });
const TimestampTool = dynamic(() => import("./timestamp/ui"), {
  loading: ToolLoading,
});
const UrlTool = dynamic(() => import("./url/ui"), { loading: ToolLoading });
const UserAgentTool = dynamic(() => import("./user-agent/ui"), {
  loading: ToolLoading,
});
const UuidTool = dynamic(() => import("./uuid/ui"), { loading: ToolLoading });

export const TOOL_COMPONENTS = {
  base64: Base64Tool,
  "case-converter": CaseConverterTool,
  "color-converter": ColorConverterTool,
  "cron-parser": CronParserTool,
  "curl-converter": CurlConverterTool,
  "diff-viewer": DiffViewerTool,
  "docx-html": DocxHtmlTool,
  "docx-markdown": DocxMarkdownTool,
  "env-file": EnvFileTool,
  hash: HashTool,
  "html-markdown": HtmlMarkdownTool,
  "http-status": HttpStatusTool,
  json: JsonTool,
  "json-csv": JsonCsvTool,
  "json-path": JsonPathTool,
  "json-typescript": JsonTypescriptTool,
  "json-yaml": JsonYamlTool,
  jwt: JwtTool,
  "markdown-preview": MarkdownPreviewTool,
  "mime-type": MimeTypeTool,
  "qr-code": QrCodeTool,
  regex: RegexTool,
  sql: SqlTool,
  timestamp: TimestampTool,
  url: UrlTool,
  "user-agent": UserAgentTool,
  uuid: UuidTool,
} satisfies Record<AvailableToolId, ComponentType>;
