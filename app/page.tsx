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
    <section className="space-y-10">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">yuQ Blog</h1>
        <p className="text-slate-700 dark:text-slate-300">
          A personal writing space focused on clear notes, practical ideas, and maintainable content publishing.
        </p>
        <Link className="inline-flex rounded-md border border-slate-300 px-3 py-2 no-underline hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-900" href="/blog">
          Browse all posts
        </Link>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Latest posts</h2>
        <PostList posts={recentPosts} emptyText="Posts are being prepared." />
      </div>
    </section>
  );
}
