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
      <header className="page-panel space-y-3">
        <p className="kicker">Archive</p>
        <h1 className="section-title">Blog</h1>
        <p className="section-subtitle">All posts are written locally with a content-first workflow.</p>
      </header>
      <PostList posts={posts} />
    </section>
  );
}
