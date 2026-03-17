# Release Checklist

## 1) Release Gate
- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` passes
- [ ] No unresolved runtime errors in local preview (`npm run dev`)

## 2) Environment & Domain
- [ ] `NEXT_PUBLIC_SITE_URL` is set to the final production domain (for example `https://blog.example.com`)
- [ ] Custom domain is configured in Vercel (if not using `*.vercel.app`)
- [ ] HTTPS is active on the production domain

## 3) SEO & Metadata
- [ ] Global metadata (`title`, `description`, `canonical`) is correct
- [ ] Post detail pages generate article metadata correctly
- [ ] `/robots.txt` is reachable and points to `/sitemap.xml`
- [ ] `/sitemap.xml` includes key static pages and all post detail pages
- [ ] Open Graph image is configured (recommended: `public/og-image.png`)
- [ ] Favicon and touch icons exist (recommended: `app/icon.png`, `app/apple-icon.png`)

## 4) Content Readiness
- [ ] Remove/replace milestone-style demo posts if they are not intended for public readers
- [ ] Remove/replace placeholder wording (for example "sample post")
- [ ] Check all post dates (avoid future publication dates unless intentional)
- [ ] Verify post summaries/tags are meaningful for SEO and sharing

## 5) Vercel Minimal Deploy Steps
1. Push current branch to remote repository.
2. Import or select the project in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` in Project Settings -> Environment Variables.
4. Trigger a production deployment.
5. Bind custom domain (optional) and wait for DNS/SSL readiness.

## 6) Post-Deploy Smoke Check
- [ ] Home, blog index, blog detail, and about pages load without console/runtime errors
- [ ] Dark mode and mobile layout are usable on core pages
- [ ] Shared links show expected title/description (and OG image if configured)
- [ ] `robots.txt` and `sitemap.xml` return production URLs
