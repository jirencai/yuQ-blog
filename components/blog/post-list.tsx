import type { PostMeta } from "@/lib/posts/types";
import { PostCard } from "@/components/blog/post-card";

type PostListProps = {
  posts: PostMeta[];
  emptyText?: string;
};

export function PostList({ posts, emptyText = "No posts yet." }: PostListProps) {
  if (posts.length === 0) {
    return <p className="text-slate-700 dark:text-slate-300">{emptyText}</p>;
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </ul>
  );
}