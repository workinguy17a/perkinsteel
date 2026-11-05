const contentHosts = new Set([
  "admin.perkinssteel.com",
  "localhost",
  "127.0.0.1",
  "::1",
]);

export function getFrontendUrl(url?: string): string {
  if (!url) return "#";

  try {
    const parsedUrl = new URL(
      url,
      "https://perkinssteel.com"
    );

    if (contentHosts.has(parsedUrl.hostname.toLowerCase())) {
      return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
    }

    return url;
  } catch {
    return url;
  }
}
