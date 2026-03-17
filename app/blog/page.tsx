import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { getAllPostsMeta } from "@/lib/posts/repository";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Blog",
  description: "Browse all published posts in yuQ Blog, including architecture notes and delivery updates.",
  path: "/blog"
});

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <section className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="text-slate-700 dark:text-slate-300">All posts are written locally with a content-first workflow.</p>
      </header>
      <PostList posts={posts} />
    </section>
  );
}
