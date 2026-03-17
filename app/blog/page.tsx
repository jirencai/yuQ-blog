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
    <section className="space-y-7 sm:space-y-8">
      <header className="page-panel space-y-4">
        <p className="kicker">Archive</p>
        <h1 className="section-title">Blog</h1>
        <p className="section-subtitle">A timeline of experiments, workflow notes, and shipped updates. Built with local content and simple tooling.</p>
        <div className="ink-divider" />
        <p className="text-sm text-slate-500 dark:text-slate-400">{posts.length} posts published</p>
      </header>
      <PostList posts={posts} />
    </section>
  );
}
