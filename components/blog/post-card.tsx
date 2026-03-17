import Link from "next/link";
import type { PostMeta } from "@/lib/posts/types";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <li className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <h2 className="text-xl font-semibold tracking-tight">
        <Link className="no-underline hover:underline" href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      {post.summary ? <p className="mt-2 text-slate-700 dark:text-slate-300">{post.summary}</p> : null}
      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <p>{post.date}</p>
        {post.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-slate-300 px-2 py-0.5 text-xs dark:border-slate-700">
            {tag}
          </span>
        ))}
      </div>
    </li>
  );
}
