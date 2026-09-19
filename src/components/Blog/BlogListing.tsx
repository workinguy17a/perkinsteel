import { BlogPost } from "@/types/post";
import BlogCard from "./BlogCard";

interface Props {
  posts: BlogPost[];
}

export default function BlogListing({
  posts,
}: Props) {

  if (!posts.length) {

    return (

      <div className="blog-empty">

        <h2>
          No posts found
        </h2>

        <p>
          There are no blog posts available at the moment.
        </p>

      </div>

    );

  }


  return (

    <div className="blog-listing-grid">

      {posts.map((post, index) => (

        <div
          key={post.id}
          className="blog-listing-item reveal fade-up"
          style={
            {
              "--delay":
                `${(index % 3) * 80}ms`,
            } as React.CSSProperties
          }
        >

          <BlogCard post={post} />

        </div>

      ))}

    </div>

  );
}