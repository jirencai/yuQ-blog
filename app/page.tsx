import Link from "next/link";
import type { Metadata } from "next";
import { PostList } from "@/components/blog/post-list";
import { getRecentPostsMeta } from "@/lib/posts/repository";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  description: "Read the latest notes, ideas, and practical writing updates from yuQ Blog.",
  path: "/"
});

export default function HomePage() {
  const recentPosts = getRecentPostsMeta(3);

  return (
    <section className="space-y-8 sm:space-y-10">
      <div className="page-panel space-y-5">
        <p className="kicker">Personal Writing Log</p>
        <h1 className="section-title">yuQ Blog</h1>
        <p className="section-subtitle">
          A personal writing space focused on clear notes, practical ideas, and maintainable content publishing.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link className="brand-button" href="/blog">
            Browse all posts
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <p className="kicker">Fresh Reads</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">Latest posts</h2>
        <PostList posts={recentPosts} emptyText="Posts are being prepared." />
      </div>
    </section>
  );
}
