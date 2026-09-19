import { graphqlFetch } from "@/graphql/fetcher";
import {
  GET_POSTS,
  GET_POST_BY_SLUG,
} from "@/graphql/queries/posts";
import { mapPost } from "@/mappers/post.mapper";
import { BlogPost } from "@/types/post";

export default class PostService {
  static async getPosts(
    first = 12
  ): Promise<BlogPost[]> {
    const data = await graphqlFetch<{
      posts: {
        nodes: any[];
      };
    }>(GET_POSTS, {
      first,
    });

    return data.posts?.nodes?.map(mapPost) ?? [];
  }

  static async getPostBySlug(
    slug: string
  ): Promise<BlogPost | null> {
    const data = await graphqlFetch<{
      post: any | null;
    }>(GET_POST_BY_SLUG, {
      slug,
    });

    if (!data.post) {
      return null;
    }

    return mapPost(data.post);
  }
}