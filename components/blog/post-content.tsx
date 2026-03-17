import Image from "next/image";
import type { ReactNode } from "react";
import { parseArticleBlocks } from "@/lib/posts/markdown";

type PostContentProps = {
  content: string;
};

function renderInlineText(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const inlinePattern = /(`[^`]+`)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null = inlinePattern.exec(text);

  while (match) {
    if (match.index > lastIndex) {
      nodes.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
    }

    if (match[1]) {
      nodes.push(
        <code key={`code-${match.index}`} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.95em] dark:bg-slate-800">
          {match[1].slice(1, -1)}
        </code>
      );
    } else if (match[2]) {
      const label = match[3];
      const href = match[4];
      const isExternal = /^https?:\/\//.test(href);

      nodes.push(
        <a
          className="font-medium text-sky-700 underline-offset-4 hover:underline dark:text-sky-400"
          href={href}
          key={`link-${match.index}`}
          rel={isExternal ? "noreferrer noopener" : undefined}
          target={isExternal ? "_blank" : undefined}
        >
          {label}
        </a>
      );
    } else if (match[5]) {
      nodes.push(
        <strong key={`strong-${match.index}`} className="font-semibold text-slate-900 dark:text-slate-100">
          {match[6]}
        </strong>
      );
    } else if (match[7]) {
      nodes.push(
        <em key={`em-${match.index}`} className="italic">
          {match[8]}
        </em>
      );
    }

    lastIndex = inlinePattern.lastIndex;
    match = inlinePattern.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
  }

  return nodes.length > 0 ? nodes : [<span key="text-full">{text}</span>];
}

export function PostContent({ content }: PostContentProps) {
  const blocks = parseArticleBlocks(content);

  return (
    <section className="space-y-6 text-[15px] leading-8 text-slate-800 sm:text-[1.03rem] dark:text-slate-200">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          if (block.level === 1) {
            return (
              <h1 id={block.id} key={`${block.id}-${index}`} className="scroll-mt-24 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                {block.text}
              </h1>
            );
          }

          if (block.level === 2) {
            return (
              <h2 id={block.id} key={`${block.id}-${index}`} className="scroll-mt-24 border-t border-slate-200 pt-4 text-2xl font-semibold tracking-tight text-slate-900 dark:border-slate-800 dark:text-slate-100">
                {block.text}
              </h2>
            );
          }

          return (
            <h3 id={block.id} key={`${block.id}-${index}`} className="scroll-mt-24 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {block.text}
            </h3>
          );
        }

        if (block.type === "paragraph") {
          return (
            <p key={`paragraph-${index}`} className="leading-8 text-slate-700 dark:text-slate-300">
              {renderInlineText(block.text)}
            </p>
          );
        }

        if (block.type === "unordered-list") {
          return (
            <ul key={`ul-${index}`} className="list-disc space-y-2 pl-6 marker:text-slate-400">
              {block.items.map((item, itemIndex) => (
                <li key={`ul-item-${index}-${itemIndex}`} className="leading-8 text-slate-700 dark:text-slate-300">
                  {renderInlineText(item)}
                </li>
              ))}
            </ul>
          );
        }

        if (block.type === "ordered-list") {
          return (
            <ol key={`ol-${index}`} className="list-decimal space-y-2 pl-6 marker:text-slate-400">
              {block.items.map((item, itemIndex) => (
                <li key={`ol-item-${index}-${itemIndex}`} className="leading-8 text-slate-700 dark:text-slate-300">
                  {renderInlineText(item)}
                </li>
              ))}
            </ol>
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote key={`quote-${index}`} className="rounded-xl border border-sky-200 bg-sky-50/80 px-4 py-3 text-slate-700 dark:border-sky-900 dark:bg-slate-900 dark:text-slate-200">
              {block.lines.map((line, lineIndex) => (
                <p key={`quote-line-${index}-${lineIndex}`} className="leading-8">
                  {renderInlineText(line)}
                </p>
              ))}
            </blockquote>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={`image-${index}`} className="space-y-3">
              <Image
                alt={block.alt || "Article image"}
                className="w-full rounded-2xl border border-slate-200 bg-white object-cover shadow-sm dark:border-slate-700 dark:bg-slate-900"
                height={720}
                loading="lazy"
                src={block.src}
                unoptimized
                width={1280}
              />
              {block.title ? <figcaption className="text-sm leading-7 text-slate-500 dark:text-slate-400">{block.title}</figcaption> : null}
            </figure>
          );
        }

        return (
          <pre
            key={`code-${index}`}
            className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-950 p-4 text-sm leading-7 text-slate-100 dark:border-slate-700 dark:bg-slate-950"
          >
            <code>{block.code}</code>
          </pre>
        );
      })}
    </section>
  );
}
