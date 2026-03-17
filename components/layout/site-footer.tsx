import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

export function SiteFooter() {
  return (
    <footer className="mt-12 border-t border-slate-200/80 pb-10 pt-7 dark:border-slate-800/80">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">yuQ Blog. Content-first notes for practical shipping.</p>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          {footerLinks.map((item) => (
            <Link key={item.href} className="no-underline transition hover:text-slate-900 hover:underline dark:hover:text-slate-100" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
