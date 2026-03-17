import Link from "next/link";
import Image from "next/image";
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
  const latest = recentPosts[0];

  return (
    <section className="space-y-10 sm:space-y-12">
      <div className="hero-panel space-y-6">
        <p className="kicker">Personal Writing Log</p>
        <h1 className="section-title max-w-2xl">yuQ Blog</h1>
        <p className="section-subtitle">
          Notes on building, writing, and shipping. This blog keeps practical detail and personal point of view in the same place.
        </p>
        <Image
          alt="Editorial style hero visual"
          className="h-auto w-full rounded-2xl border border-slate-200/80 object-cover shadow-sm dark:border-slate-700/80"
          height={720}
          src="/images/cover-writing-flow.svg"
          width={1280}
        />
        <div className="ink-divider" />
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <Link className="brand-button" href="/blog">
            Browse all posts
          </Link>
          <Link className="brand-button" href="/about">
            About this site
          </Link>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/65 p-4 text-sm leading-7 text-slate-700 dark:border-slate-700/80 dark:bg-slate-900/55 dark:text-slate-300">
          {latest ? (
            <p>
              Latest update: <strong className="font-semibold text-slate-900 dark:text-slate-100">{latest.title}</strong> ({latest.date})
            </p>
          ) : (
            <p>Latest update will appear here after the first post is published.</p>
          )}
        </div>
      </div>

      <div className="space-y-4 sm:space-y-5">
        <p className="kicker">Fresh Reads</p>
        <h2 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-slate-100">Latest posts</h2>
        <PostList posts={recentPosts} emptyText="Posts are being prepared." />
      </div>
    </section>
  );
}
