import Link from "next/link";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-[color:var(--bg)]/90 backdrop-blur dark:border-slate-800/80">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link className="no-underline" href="/">
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">yuQ Blog</span>
        </Link>
        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-2 rounded-full border border-slate-200/90 bg-white/80 px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900/80">
            {navItems.map((item) => (
              <Link key={item.href} className="rounded-full px-3 py-1 no-underline transition hover:bg-slate-100 dark:hover:bg-slate-800" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
