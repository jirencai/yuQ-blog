# Vercel Deployment Notes

## 1) Required Environment Variables
- `NEXT_PUBLIC_SITE_URL`: production site URL, for example `https://blog.example.com`
  - must be absolute (`https://...`)
  - do not include trailing slash
  - this value is used for canonical links, `robots.txt`, `sitemap.xml`, and social metadata

## 2) Local Pre-Deploy Checks
Run the following commands before deploying:

```bash
npm run lint
npm run typecheck
npm run build
```

## 3) Expected SEO Endpoints After Deploy
- `/robots.txt`
- `/sitemap.xml`

## 4) Quick Post-Deploy Verification
- Home page has title/description metadata.
- Blog index and post detail pages have canonical and Open Graph metadata (including image).
- `robots.txt` points to `sitemap.xml`.
- `sitemap.xml` includes `/`, `/blog`, `/about`, and all `/blog/[slug]` pages.
- Social share preview shows correct title/description/image on at least one post page.
