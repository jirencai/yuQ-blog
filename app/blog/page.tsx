import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts/repository";

export default function BlogIndexPage() {
  const posts = getAllPostsMeta();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      {posts.length === 0 ? (
        <p className="text-slate-700 dark:text-slate-300">No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.slug} className="rounded border border-slate-200 p-4 dark:border-slate-800">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              {post.summary ? <p className="mt-2 text-slate-700 dark:text-slate-300">{post.summary}</p> : null}
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}