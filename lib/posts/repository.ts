import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostMeta } from "@/lib/posts/types";

const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");

function getPostFilePaths(): string[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  return fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((fileName) => fileName.endsWith(".md") || fileName.endsWith(".mdx"));
}

function toSlug(fileName: string): string {
  return fileName.replace(/\.mdx?$/, "");
}

function normalizeDate(value: unknown): string {
  if (typeof value === "string") {
    const trimmed = value.trim();
    const dateOnlyMatch = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

    if (dateOnlyMatch) {
      const year = Number(dateOnlyMatch[1]);
      const month = Number(dateOnlyMatch[2]);
      const day = Number(dateOnlyMatch[3]);
      const candidate = new Date(Date.UTC(year, month - 1, day));

      if (
        candidate.getUTCFullYear() === year &&
        candidate.getUTCMonth() === month - 1 &&
        candidate.getUTCDate() === day
      ) {
        return `${year.toString().padStart(4, "0")}-${month.toString().padStart(2, "0")}-${day
          .toString()
          .padStart(2, "0")}`;
      }
    }

    const parsed = new Date(trimmed);

    if (!Number.isNaN(parsed.getTime())) {
      return parsed.toISOString().slice(0, 10);
    }

    return trimmed || "1970-01-01";
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return "1970-01-01";
}

function dateToTimestamp(date: string): number {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .filter((tag): tag is string => typeof tag === "string")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeOptionalString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toPostMetaFromData(slug: string, data: Record<string, unknown>): PostMeta {
  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: normalizeDate(data.date),
    summary: typeof data.summary === "string" ? data.summary : undefined,
    tags: normalizeTags(data.tags),
    coverImage: normalizeOptionalString(data.coverImage),
    coverAlt: normalizeOptionalString(data.coverAlt)
  };
}

function toPostMeta(fileName: string): PostMeta {
  const slug = toSlug(fileName);
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  return toPostMetaFromData(slug, data as Record<string, unknown>);
}

export function getAllPostsMeta(): PostMeta[] {
  const posts = getPostFilePaths().map(toPostMeta);

  return posts.sort((a, b) => {
    const timeA = dateToTimestamp(a.date);
    const timeB = dateToTimestamp(b.date);

    if (timeA === timeB) {
      return a.slug.localeCompare(b.slug);
    }

    return timeB - timeA;
  });
}

export function getRecentPostsMeta(limit = 3): PostMeta[] {
  return getAllPostsMeta().slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return getAllPostsMeta().map((post) => post.slug);
}

export function getAdjacentPostsMeta(slug: string): { newer: PostMeta | null; older: PostMeta | null } {
  const posts = getAllPostsMeta();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { newer: null, older: null };
  }

  return {
    newer: currentIndex > 0 ? posts[currentIndex - 1] : null,
    older: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  };
}

export function getPostBySlug(slug: string): Post | null {
  const fileNames = [".mdx", ".md"].map((ext) => `${slug}${ext}`);
  const filePath = fileNames.map((name) => path.join(POSTS_DIRECTORY, name)).find((candidate) => fs.existsSync(candidate));

  if (!filePath) {
    return null;
  }

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: toPostMetaFromData(slug, data as Record<string, unknown>),
    content
  };
}
