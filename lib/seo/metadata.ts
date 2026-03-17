import type { Metadata } from "next";

const SITE_NAME = "yuQ Blog";
const DEFAULT_DESCRIPTION = "A personal blog focused on clear writing and simple delivery.";
const DEFAULT_SITE_URL = "https://yuq-blog.vercel.app";

function sanitizeUrl(raw: string): string {
  const prefixed = /^https?:\/\//.test(raw) ? raw : `https://${raw}`;
  return prefixed.replace(/\/+$/, "");
}

export function getSiteUrl(): string {
  return sanitizeUrl(process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL);
}

export function buildAbsoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

type PageMetadataInput = {
  title?: string;
  description?: string;
  path?: string;
};

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(getSiteUrl()),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`
    },
    description: DEFAULT_DESCRIPTION,
    alternates: {
      canonical: "/"
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION,
      url: "/"
    },
    twitter: {
      card: "summary",
      title: SITE_NAME,
      description: DEFAULT_DESCRIPTION
    }
  };
}

export function buildPageMetadata({ title, description, path = "/" }: PageMetadataInput): Metadata {
  const normalizedDescription = description ?? DEFAULT_DESCRIPTION;
  const resolvedTitle = title ?? SITE_NAME;

  return {
    title: resolvedTitle,
    description: normalizedDescription,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      title: resolvedTitle,
      description: normalizedDescription,
      url: path
    },
    twitter: {
      card: "summary",
      title: resolvedTitle,
      description: normalizedDescription
    }
  };
}

type ArticleMetadataInput = {
  title: string;
  description?: string;
  path: string;
  publishedTime?: string;
  tags?: string[];
};

export function buildArticleMetadata({ title, description, path, publishedTime, tags = [] }: ArticleMetadataInput): Metadata {
  const normalizedDescription = description ?? DEFAULT_DESCRIPTION;

  return {
    title,
    description: normalizedDescription,
    alternates: {
      canonical: path
    },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title,
      description: normalizedDescription,
      url: path,
      publishedTime,
      tags
    },
    twitter: {
      card: "summary",
      title,
      description: normalizedDescription
    }
  };
}
