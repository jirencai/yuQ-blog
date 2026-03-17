export type ArticleBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string; id: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; lines: string[] }
  | { type: "image"; src: string; alt: string; title?: string }
  | { type: "code"; language: string; code: string };

export type TocEntry = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[`~!@#$%^&*()+=\[\]{}|\\:;"'<>,.?/]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function isOrderedListLine(line: string): boolean {
  return /^\d+\.\s+/.test(line);
}

function isUnorderedListLine(line: string): boolean {
  return /^-\s+/.test(line);
}

function stripListPrefix(line: string): string {
  return line.replace(/^(-|\d+\.)\s+/, "").trim();
}

function extractWords(text: string): string[] {
  return text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[#>*_\-\[\]\(\)]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function parseImageLine(line: string): { src: string; alt: string; title?: string } | null {
  const match = line.match(/^!\[([^\]]*)\]\((.+?)\)$/);

  if (!match) {
    return null;
  }

  const alt = match[1].trim();
  const payload = match[2].trim();
  const titleMatch = payload.match(/^(\S+)\s+"([^"]+)"$/);

  if (titleMatch) {
    return {
      src: titleMatch[1].trim(),
      alt,
      title: titleMatch[2].trim()
    };
  }

  return {
    src: payload,
    alt
  };
}

export function parseArticleBlocks(content: string): ArticleBlock[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const blocks: ArticleBlock[] = [];
  const headingCountById = new Map<string, number>();
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index] ?? "";
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (line.startsWith("```")) {
      const language = line.slice(3).trim().toLowerCase();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      if (index < lines.length) {
        index += 1;
      }

      blocks.push({
        type: "code",
        language: language || "text",
        code: codeLines.join("\n").trimEnd()
      });
      continue;
    }

    const image = parseImageLine(line);
    if (image) {
      blocks.push({
        type: "image",
        src: image.src,
        alt: image.alt,
        title: image.title
      });
      index += 1;
      continue;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length as 1 | 2 | 3;
      const text = headingMatch[2].trim();
      const baseId = slugifyHeading(text) || "section";
      const count = (headingCountById.get(baseId) ?? 0) + 1;
      headingCountById.set(baseId, count);
      const id = count === 1 ? baseId : `${baseId}-${count}`;

      blocks.push({
        type: "heading",
        level,
        text,
        id
      });
      index += 1;
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines: string[] = [];

      while (index < lines.length && lines[index].trim().startsWith(">")) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({
        type: "blockquote",
        lines: quoteLines.filter(Boolean)
      });
      continue;
    }

    if (isUnorderedListLine(line)) {
      const items: string[] = [];

      while (index < lines.length && isUnorderedListLine(lines[index].trim())) {
        items.push(stripListPrefix(lines[index].trim()));
        index += 1;
      }

      blocks.push({
        type: "unordered-list",
        items
      });
      continue;
    }

    if (isOrderedListLine(line)) {
      const items: string[] = [];

      while (index < lines.length && isOrderedListLine(lines[index].trim())) {
        items.push(stripListPrefix(lines[index].trim()));
        index += 1;
      }

      blocks.push({
        type: "ordered-list",
        items
      });
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length) {
      const paragraphLine = lines[index].trim();
      if (
        !paragraphLine ||
        paragraphLine.startsWith("```") ||
        parseImageLine(paragraphLine) !== null ||
        paragraphLine.startsWith(">") ||
        isUnorderedListLine(paragraphLine) ||
        isOrderedListLine(paragraphLine) ||
        /^(#{1,3})\s+/.test(paragraphLine)
      ) {
        break;
      }

      paragraphLines.push(paragraphLine);
      index += 1;
    }

    if (paragraphLines.length > 0) {
      blocks.push({
        type: "paragraph",
        text: paragraphLines.join(" ")
      });
      continue;
    }

    index += 1;
  }

  return blocks;
}

export function extractTocEntries(content: string): TocEntry[] {
  const entries: TocEntry[] = [];

  for (const block of parseArticleBlocks(content)) {
    if (block.type === "heading" && (block.level === 2 || block.level === 3)) {
      entries.push({
        id: block.id,
        text: block.text,
        level: block.level
      });
    }
  }

  return entries;
}

export function estimateReadingTimeMinutes(content: string): number {
  const words = extractWords(content).length;
  return Math.max(1, Math.ceil(words / 220));
}
