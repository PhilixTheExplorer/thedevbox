export type RegexResult = {
  output: string;
  error: string | null;
  count: number;
  matches: RegexMatch[];
};

export type RegexMatch = {
  id: string;
  value: string;
  index: number;
  groups: RegexGroup[];
};

export type RegexGroup = {
  id: string;
  label: number;
  value: string;
};

function normalizeFlags(flags: string) {
  return [...new Set(flags.replace(/\s/g, "").split(""))].join("");
}

export function testRegex(
  pattern: string,
  flags: string,
  sample: string,
): RegexResult {
  if (!pattern) {
    return { output: "", error: null, count: 0, matches: [] };
  }

  try {
    const normalizedFlags = normalizeFlags(flags);
    const matcher = new RegExp(pattern, normalizedFlags);
    const globalMatcher = matcher.global
      ? matcher
      : new RegExp(matcher.source, `${matcher.flags}g`);
    const matches = [...sample.matchAll(globalMatcher)];
    const parsedMatches = matches.map((match) => {
      const index = match.index ?? 0;
      const value = match[0];

      return {
        id: `${index}:${value}`,
        value,
        index,
        groups: match.slice(1).map((group, groupIndex) => ({
          id: `${index}:${value}:${groupIndex + 1}:${group ?? ""}`,
          label: groupIndex + 1,
          value: group ?? "",
        })),
      };
    });

    if (matches.length === 0) {
      return { output: "no matches", error: null, count: 0, matches: [] };
    }

    const output = matches
      .map((match, index) => {
        const groups = match
          .slice(1)
          .map(
            (group, groupIndex) => `  group ${groupIndex + 1}: ${group ?? ""}`,
          )
          .join("\n");

        return [
          `match ${index + 1}`,
          `  value: ${match[0]}`,
          `  index: ${match.index ?? 0}`,
          groups,
        ]
          .filter(Boolean)
          .join("\n");
      })
      .join("\n\n");

    return {
      output,
      error: null,
      count: parsedMatches.length,
      matches: parsedMatches,
    };
  } catch (error) {
    return {
      output: "",
      error: error instanceof Error ? error.message : "invalid regex",
      count: 0,
      matches: [],
    };
  }
}
