import Link from "next/link";
import { notFound } from "next/navigation";
import { PostContent } from "@/components/blog/post-content";
import { PostPagination } from "@/components/blog/post-pagination";
import { PostToc } from "@/components/blog/post-toc";
import { estimateReadingTimeMinutes, extractTocEntries } from "@/lib/posts/markdown";
import { getAdjacentPostsMeta, getAllPostSlugs, getPostBySlug } from "@/lib/posts/repository";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00Z`);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC"
  }).format(parsed);
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTimeMinutes = estimateReadingTimeMinutes(post.content);
  const tocEntries = extractTocEntries(post.content);
  const { newer, older } = getAdjacentPostsMeta(post.meta.slug);

  return (
    <article className="space-y-8">
      <header className="space-y-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <p>{formatPostDate(post.meta.date)}</p>
          <span aria-hidden>|</span>
          <p>{readingTimeMinutes} min read</p>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">{post.meta.title}</h1>
        {post.meta.summary ? <p className="max-w-2xl text-base leading-8 text-slate-700 dark:text-slate-300">{post.meta.summary}</p> : null}
        {post.meta.tags.length > 0 ? (
          <ul className="flex flex-wrap gap-2">
            {post.meta.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-slate-300 px-2.5 py-1 text-xs text-slate-700 dark:border-slate-700 dark:text-slate-300">
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-8 lg:space-y-0">
        <div className="min-w-0">
          <PostContent content={post.content} />
        </div>
        <PostToc entries={tocEntries} />
      </div>

      <PostPagination newer={newer} older={older} />

      <footer>
        <Link href="/blog">Back to blog list</Link>
      </footer>
    </article>
  );
}

