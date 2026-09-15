export function getHeadlessAuthSecret() {
  const secret =
    process.env.PERKINS_HEADLESS_SECRET;

  if (!secret) {
    throw new Error(
      "PERKINS_HEADLESS_SECRET is not configured."
    );
  }

  return secret;
}