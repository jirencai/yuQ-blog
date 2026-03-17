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
    return value;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return "1970-01-01";
}

function toPostMeta(fileName: string): PostMeta {
  const slug = toSlug(fileName);
  const fullPath = path.join(POSTS_DIRECTORY, fileName);
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(raw);

  return {
    slug,
    title: typeof data.title === "string" ? data.title : slug,
    date: normalizeDate(data.date),
    summary: typeof data.summary === "string" ? data.summary : undefined
  };
}

export function getAllPostsMeta(): PostMeta[] {
  const posts = getPostFilePaths().map(toPostMeta);

  return posts.sort((a, b) => {
    if (a.date === b.date) {
      return a.slug.localeCompare(b.slug);
    }

    return a.date < b.date ? 1 : -1;
  });
}

export function getRecentPostsMeta(limit = 3): PostMeta[] {
  return getAllPostsMeta().slice(0, limit);
}

export function getAllPostSlugs(): string[] {
  return getAllPostsMeta().map((post) => post.slug);
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
    meta: {
      slug,
      title: typeof data.title === "string" ? data.title : slug,
      date: normalizeDate(data.date),
      summary: typeof data.summary === "string" ? data.summary : undefined
    },
    content
  };
}