import Link from "next/link";
import { BlogPost } from "@/types/post";

interface Props {
  post: BlogPost;
}

export default function BlogCard({
  post,
}: Props) {

  const formattedDate = post.date
    ? new Intl.DateTimeFormat("en", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date(post.date))
    : "";


  return (

    <article className="blog-card">

      {/* =========================================
          IMAGE
      ========================================= */}

      <Link
        href={`/blog/${post.slug}`}
        className="blog-card-image"
        aria-label={post.title}
      >

        {post.image?.url ? (

          <img
            src={post.image.url}
            alt={
              post.image.alt ||
              post.title
            }
          />

        ) : (

          <div className="blog-card-no-image">
            No Image
          </div>

        )}


        {/* HOVER OVERLAY */}

        <span className="blog-card-image-overlay">

          <span>
            Read Article

            <i className="fa-solid fa-arrow-right"></i>
          </span>

        </span>

      </Link>


      {/* =========================================
          CONTENT
      ========================================= */}

      <div className="blog-card-content">

        {/* META */}

        <div className="blog-card-meta">

          {post.categories[0] && (

            <span className="blog-card-category">
              {post.categories[0].name}
            </span>

          )}


          {post.categories[0] &&
            formattedDate && (

              <span className="blog-meta-divider">
                /
              </span>

            )}


          {formattedDate && (

            <time
              className="blog-card-date"
              dateTime={post.date}
            >
              {formattedDate}
            </time>

          )}

        </div>


        {/* TITLE */}

        <h2 className="blog-card-title">

          <Link
            href={`/blog/${post.slug}`}
          >
            {post.title}
          </Link>

        </h2>


        {/* EXCERPT */}

        {post.excerpt && (

          <div
            className="blog-card-excerpt"
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
          />

        )}


        {/* READ MORE */}

        <div className="blog-card-footer">

          <Link
            href={`/blog/${post.slug}`}
            className="blog-read-more"
          >
            Read More

            <i className="fa-solid fa-arrow-right"></i>
          </Link>

        </div>

      </div>

    </article>

  );
}