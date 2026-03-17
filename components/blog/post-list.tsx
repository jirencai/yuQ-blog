import type { PostMeta } from "@/lib/posts/types";
import { PostCard } from "@/components/blog/post-card";

type PostListProps = {
  posts: PostMeta[];
  emptyText?: string;
};

export function PostList({ posts, emptyText = "No posts yet." }: PostListProps) {
  if (posts.length === 0) {
    return <p className="rounded-xl border border-dashed border-slate-300 px-4 py-6 text-slate-600 dark:border-slate-700 dark:text-slate-300">{emptyText}</p>;
  }

  return (
    <ul className="grid gap-4 sm:gap-5 lg:grid-cols-2">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  );
}
