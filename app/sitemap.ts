import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts/repository";
import { buildAbsoluteUrl } from "@/lib/seo/metadata";

function toLastModified(date: string): Date {
  const parsed = Date.parse(date);
  return Number.isNaN(parsed) ? new Date() : new Date(parsed);
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: buildAbsoluteUrl("/"),
      lastModified: now
    },
    {
      url: buildAbsoluteUrl("/blog"),
      lastModified: now
    },
    {
      url: buildAbsoluteUrl("/about"),
      lastModified: now
    }
  ];

  const postPages: MetadataRoute.Sitemap = getAllPostsMeta().map((post) => ({
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: toLastModified(post.date)
  }));

  return [...staticPages, ...postPages];
}
