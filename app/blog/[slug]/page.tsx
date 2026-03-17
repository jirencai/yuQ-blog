import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts/repository";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{post.meta.title}</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">{post.meta.date}</p>
      </header>
      <pre className="overflow-x-auto rounded bg-slate-100 p-4 text-sm dark:bg-slate-900">
        <code>{post.content.trim()}</code>
      </pre>
    </article>
  );
}