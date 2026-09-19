export interface PostCategory {
  id: number;
  name: string;
  slug: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;

  image: {
    url: string;
    alt: string;
  } | null;

  author: string;

  categories: PostCategory[];
}