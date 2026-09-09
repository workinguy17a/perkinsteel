export function getFrontendUrl(url?: string): string {
  if (!url) return "#";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname === "admin.perkinssteel.com") {
      return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
    }

    return url;
  } catch {
    return url;
  }
}