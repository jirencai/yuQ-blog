import Link from "next/link";
import type { PostMeta } from "@/lib/posts/types";

type PostCardProps = {
  post: PostMeta;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <li className="rounded-lg border border-slate-200 p-5 dark:border-slate-800">
      <h2 className="text-xl font-semibold tracking-tight">
        <Link className="no-underline hover:underline" href={`/blog/${post.slug}`}>
          {post.title}
        </Link>
      </h2>
      {post.summary ? <p className="mt-2 text-slate-700 dark:text-slate-300">{post.summary}</p> : null}
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
    </li>
  );
}