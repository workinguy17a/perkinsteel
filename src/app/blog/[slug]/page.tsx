import { notFound } from "next/navigation";

import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import BlogDetail from "@/components/Blog/BlogDetail";
import PostService from "@/services/post.service";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogDetailPage({
  params,
}: Props) {
  const { slug } = await params;

  const post =
    await PostService.getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <InnerBanner
        title="Blog"
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Blog",
            href: "/blog",
          },
          {
            label: post.title,
          },
        ]}
      />

      <BlogDetail post={post} />
    </main>
  );
}