import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: "Learn about yuQ Blog and the content-first approach behind this project.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <section className="page-panel space-y-4">
      <p className="kicker">About This Project</p>
      <h1 className="section-title">About</h1>
      <p className="section-subtitle">
        This blog is built with a content-first approach and a simple architecture for safe iteration.
      </p>
    </section>
  );
}
