import Link from "next/link";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/post-content";
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts/repository";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-8">
      <header className="space-y-3 border-b border-slate-200 pb-5 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">{post.meta.date}</p>
        <h1 className="text-3xl font-bold tracking-tight">{post.meta.title}</h1>
        {post.meta.summary ? <p className="text-slate-700 dark:text-slate-300">{post.meta.summary}</p> : null}
      </header>

      <PostContent content={post.content} />

      <footer>
        <Link href="/blog">Back to blog list</Link>
      </footer>
    </article>
  );
}