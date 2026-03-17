# Vercel Deployment Notes

## 1) Required Environment Variables
- `NEXT_PUBLIC_SITE_URL`: production site URL, for example `https://your-domain.example`

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
- Blog index and post detail pages have canonical and Open Graph metadata.
- `robots.txt` points to `sitemap.xml`.
- `sitemap.xml` includes `/`, `/blog`, `/about`, and all `/blog/[slug]` pages.
