import Link from "next/link";
import { BlogPost } from "@/types/post";

interface Props {
  post: BlogPost;
}

export default function BlogDetail({
  post,
}: Props) {

  const formattedDate = post.date
    ? new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(post.date))
    : "";

  return (

    <article className="blog-detail">

      <div className="mx-auto max-w-7xl px-4">

        {/* =========================================
            ARTICLE HEADER
        ========================================= */}

        <header className="blog-detail-header reveal fade-up">

          {/* CATEGORY */}

          {post.categories[0] && (

            <Link
              href={`/blog/category/${post.categories[0].slug}`}
              className="blog-detail-category"
            >
              {post.categories[0].name}
            </Link>

          )}


          {/* TITLE */}

          <h1>
            {post.title}
          </h1>


          {/* META */}

          {(formattedDate || post.author) && (

            <div className="blog-detail-meta">

              {formattedDate && (

                <time dateTime={post.date}>
                  <i className="fa-regular fa-calendar"></i>

                  {formattedDate}
                </time>

              )}


              {formattedDate && post.author && (

                <span className="blog-detail-meta-divider">
                  /
                </span>

              )}


              {post.author && (

                <span>
                  <i className="fa-regular fa-user"></i>

                  By {post.author}
                </span>

              )}

            </div>

          )}

        </header>


        {/* =========================================
            FEATURED IMAGE
        ========================================= */}

        {post.image?.url && (

          <div
            className="blog-detail-featured reveal soft-zoom"
            style={
              {
                "--delay": "100ms",
              } as React.CSSProperties
            }
          >

            <img
              src={post.image.url}
              alt={
                post.image.alt ||
                post.title
              }
            />

          </div>

        )}


        {/* =========================================
            ARTICLE CONTENT
        ========================================= */}

        <div className="blog-article-wrapper">

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />


          {/* =========================================
              ARTICLE FOOTER
          ========================================= */}

          <div className="blog-article-footer">

            <Link
              href="/blog"
              className="blog-back-link"
            >
              <i className="fa-solid fa-arrow-left"></i>

              Back to Blog
            </Link>

          </div>

        </div>

      </div>

    </article>

  );
}