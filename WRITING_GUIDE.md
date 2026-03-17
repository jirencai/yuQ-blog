# Writing Guide

This project uses local MDX/Markdown files in `content/posts` as the source of truth.

## 1) New Post Template

```md
---
title: Your Post Title
date: 2026-03-17
summary: One-sentence summary for list pages and social preview.
tags:
  - tag-a
  - tag-b
coverImage: /images/your-cover.svg
coverAlt: Short description of the cover image
---

# Heading

Your content.
```

## 2) Image Rules

- Store local images in `public/images/...`.
- Use lowercase, kebab-case names, for example `release-checklist-2026-03.svg`.
- Prefer widths around `1200px` for cover images.
- Provide meaningful `alt` text for all important images.

### Inline Image Syntax

```md
![Image alt text](/images/example.svg "Optional caption")
```

## 3) Link Rules

- Internal links: use relative paths, for example `/blog/publishing-checklist`.
- External links: use full URLs (`https://...`).
- Keep anchor labels specific (avoid generic text like "click here").

## 4) Date and Publishing

- Use `YYYY-MM-DD`.
- Avoid future dates unless intentionally scheduling a post.
- Validate before push:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
