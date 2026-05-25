export type DiffMode = "lines" | "words";
export type DiffPartType = "same" | "add" | "remove";

export type DiffPart = {
  id: string;
  type: DiffPartType;
  value: string;
};

export type DiffStats = {
  added: number;
  removed: number;
  unchanged: number;
};

export type DiffResult = {
  parts: DiffPart[];
  stats: DiffStats;
  patch: string;
};

function tokenize(value: string, mode: DiffMode) {
  if (!value) {
    return [];
  }

  return mode === "words" ? (value.match(/\S+|\s+/g) ?? []) : value.split("\n");
}

function formatPatch(parts: DiffPart[], mode: DiffMode) {
  if (mode === "words") {
    return parts
      .filter((part) => part.type !== "same")
      .map((part) => `${part.type === "add" ? "+" : "-"} ${part.value}`)
      .join("\n");
  }

  return parts
    .map((part) => {
      const prefix =
        part.type === "add" ? "+ " : part.type === "remove" ? "- " : "  ";
      return `${prefix}${part.value}`;
    })
    .join("\n");
}

export function compareText(
  before: string,
  after: string,
  mode: DiffMode = "lines",
  ignoreWhitespace = false,
): DiffResult {
  const left = tokenize(before, mode);
  const right = tokenize(after, mode);
  const normalize = (value: string) =>
    ignoreWhitespace ? value.trim().replace(/\s+/g, " ") : value;

  const table = Array.from({ length: left.length + 1 }, () =>
    Array<number>(right.length + 1).fill(0),
  );

  for (let i = left.length - 1; i >= 0; i -= 1) {
    for (let j = right.length - 1; j >= 0; j -= 1) {
      table[i][j] =
        normalize(left[i]) === normalize(right[j])
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const parts: DiffPart[] = [];
  const nextPart = (type: DiffPartType, value: string) => ({
    id: `${parts.length}:${type}:${value}`,
    type,
    value,
  });
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (normalize(left[i]) === normalize(right[j])) {
      parts.push(nextPart("same", right[j]));
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      parts.push(nextPart("remove", left[i]));
      i += 1;
    } else {
      parts.push(nextPart("add", right[j]));
      j += 1;
    }
  }

  while (i < left.length) {
    parts.push(nextPart("remove", left[i]));
    i += 1;
  }

  while (j < right.length) {
    parts.push(nextPart("add", right[j]));
    j += 1;
  }

  const stats = parts.reduce<DiffStats>(
    (next, part) => {
      if (part.type === "add") next.added += 1;
      if (part.type === "remove") next.removed += 1;
      if (part.type === "same") next.unchanged += 1;
      return next;
    },
    { added: 0, removed: 0, unchanged: 0 },
  );

  return {
    parts,
    stats,
    patch: formatPatch(parts, mode),
  };
}
