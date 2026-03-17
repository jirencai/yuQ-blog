export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags: string[];
  coverImage?: string;
  coverAlt?: string;
};

export type Post = {
  meta: PostMeta;
  content: string;
};
