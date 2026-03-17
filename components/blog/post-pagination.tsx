import Link from "next/link";
import type { PostMeta } from "@/lib/posts/types";

type PostPaginationProps = {
  newer: PostMeta | null;
  older: PostMeta | null;
};

type PostNavCardProps = {
  label: string;
  post: PostMeta;
  align: "left" | "right";
};

function PostNavCard({ label, post, align }: PostNavCardProps) {
  return (
    <Link
      className="rounded-2xl border border-slate-200/90 bg-white/95 p-4 no-underline shadow-sm transition hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/95 dark:hover:border-sky-600"
      href={`/blog/${post.slug}`}
    >
      <p className={`text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 ${align === "right" ? "text-right" : ""}`}>{label}</p>
      <p className={`mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100 ${align === "right" ? "text-right" : ""}`}>{post.title}</p>
    </Link>
  );
}

export function PostPagination({ newer, older }: PostPaginationProps) {
  if (!newer && !older) {
    return null;
  }

  return (
    <nav className="grid gap-3 sm:grid-cols-2">
      {newer ? <PostNavCard align="left" label="Newer post" post={newer} /> : <div />}
      {older ? <PostNavCard align="right" label="Older post" post={older} /> : <div />}
    </nav>
  );
}
