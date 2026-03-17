import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: "Learn about yuQ Blog and the content-first approach behind this project.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <p className="text-slate-700 dark:text-slate-300">
        This blog is built with a content-first approach and a simple architecture for safe iteration.
      </p>
    </section>
  );
}
