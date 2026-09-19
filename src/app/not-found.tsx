import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">

      <div className="not-found-container">

        {/* 404 NUMBER */}
        <div className="not-found-code reveal soft-zoom">

          <span className="not-found-number">
            404
          </span>

          <span className="not-found-label">
            Page Not Found
          </span>

        </div>


        {/* CONTENT */}
        <div
          className="not-found-content reveal fade-up"
          style={
            {
              "--delay": "100ms",
            } as React.CSSProperties
          }
        >

          <h1>
            Looks Like You&apos;ve
            <br />
            Taken a Wrong Turn
          </h1>

          <p>
            The page you&apos;re looking for may have been
            moved, removed, or no longer exists. Explore our
            products or return to the homepage.
          </p>


          {/* ACTIONS */}
          <div className="not-found-actions">

            <Link
              href="/"
              className="not-found-btn not-found-btn-primary"
            >
              Back to Home

              <i className="fa-solid fa-arrow-right"></i>
            </Link>


            <Link
              href="/shop"
              className="not-found-btn not-found-btn-secondary"
            >
              Explore Products
            </Link>

          </div>

        </div>


        {/* DECORATIVE DIVIDER */}
        <div
          className="not-found-divider reveal fade-up"
          style={
            {
              "--delay": "180ms",
            } as React.CSSProperties
          }
        >

          <span></span>

          <i></i>

          <span></span>

        </div>

      </div>

    </main>
  );
}