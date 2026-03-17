import Link from "next/link";
import type { TocEntry } from "@/lib/posts/markdown";

type PostTocProps = {
  entries: TocEntry[];
};

function TocList({ entries }: { entries: TocEntry[] }) {
  if (entries.length === 0) {
    return <p className="text-sm text-slate-500 dark:text-slate-400">No headings in this article.</p>;
  }

  return (
    <ul className="space-y-2">
      {entries.map((entry) => (
        <li key={entry.id} className={entry.level === 3 ? "pl-4" : ""}>
          <Link className="text-sm no-underline hover:underline" href={`#${entry.id}`}>
            {entry.text}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function PostToc({ entries }: PostTocProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <>
      <details className="rounded-xl border border-slate-200 bg-slate-50 p-4 lg:hidden dark:border-slate-800 dark:bg-slate-900">
        <summary className="cursor-pointer text-sm font-semibold text-slate-800 dark:text-slate-200">On this page</summary>
        <div className="mt-3">
          <TocList entries={entries} />
        </div>
      </details>

      <aside className="sticky top-24 hidden rounded-xl border border-slate-200 bg-slate-50 p-4 lg:block dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">On this page</h2>
        <TocList entries={entries} />
      </aside>
    </>
  );
}
