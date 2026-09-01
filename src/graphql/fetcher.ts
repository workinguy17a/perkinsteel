export async function graphqlFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  console.log("GraphQL variables:", variables);
  const response = await fetch(
    process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT!,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      // Good default for Next.js App Router
      next: {
        revalidate: 300,
      },
    }
  );

  const json = await response.json();

  if (json.errors) {
    throw new Error(json.errors[0].message);
  }

  return json.data;
}