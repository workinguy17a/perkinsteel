import { BlogPost } from "@/types/post";

export function mapPost(node: any): BlogPost {
  return {
    id: node.databaseId,
    slug: node.slug ?? "",
    title: node.title ?? "",
    date: node.date ?? "",
    excerpt: node.excerpt ?? "",
    content: node.content ?? "",

    image: node.featuredImage?.node
      ? {
          url: node.featuredImage.node.sourceUrl ?? "",
          alt:
            node.featuredImage.node.altText ||
            node.title ||
            "",
        }
      : null,

    author: node.author?.node?.name ?? "",

    categories:
      node.categories?.nodes?.map((category: any) => ({
        id: category.databaseId,
        name: category.name ?? "",
        slug: category.slug ?? "",
      })) ?? [],
  };
}