import InnerBanner from "@/components/Common/InnerBanner/InnerBanner";
import BlogListing from "@/components/Blog/BlogListing";
import PostService from "@/services/post.service";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await PostService.getPosts(12);

  return (
    <main>
      <InnerBanner
        title="Blog"
        description="Latest news, guides and insights from Perkin."
        breadcrumbs={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Blog",
          },
        ]}
      />

      <section className="bg-white px-4 py-12 sm:px-6 md:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-9 max-w-2xl md:mb-12">
            <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.12em] text-[var(--red)]">
              Perkin Journal
            </span>

            <h1
              className="text-3xl font-bold leading-tight text-[#111] md:text-4xl"
              style={{
                fontFamily: "var(--font-play)",
              }}
            >
              Latest From Our Blog
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#666] md:text-base">
              Discover product insights, kitchen inspiration,
              industry news and practical guides.
            </p>
          </div>

          <BlogListing posts={posts} />
        </div>
      </section>
    </main>
  );
}