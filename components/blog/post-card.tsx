import Link from "next/link";
import type { PostMeta } from "@/lib/posts/types";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <li className="group rounded-2xl border border-slate-200/90 bg-white/95 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/95 dark:hover:border-sky-700 sm:p-6">
      <h2 className="text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        <Link className="no-underline" href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      {post.summary ? <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">{post.summary}</p> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <p className="font-medium">{post.date}</p>
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-300 bg-slate-50 px-2.5 py-0.5 text-xs dark:border-slate-700 dark:bg-slate-900">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}
