/**
 * The Prisma Postgres Management API publishes its OpenAPI spec at
 * `https://api.prisma.io/v1/doc`. Scanners, agents, and API tooling look for it
 * at the conventional root filenames `/openapi.json` and `/swagger.json`, so we
 * re-serve the same document at those paths on www.prisma.io.
 *
 * The upstream document omits a top-level `servers` entry; we inject
 * `https://api.prisma.io` so a tool that reads the served copy knows where the
 * API actually lives (this mirrors what apps/docs does in src/lib/openapi.ts).
 */
const SPEC_URL = "https://api.prisma.io/v1/doc";
const API_SERVER = "https://api.prisma.io";

export async function getOpenApiSpec(): Promise<Record<string, unknown>> {
  const res = await fetch(SPEC_URL, {
    headers: { "User-Agent": "prisma-www" },
    // Revalidate hourly: the spec changes only when the API does.
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch OpenAPI spec: HTTP ${res.status}`);
  }

  const doc = (await res.json()) as Record<string, unknown>;
  doc.servers = [{ url: API_SERVER }];
  return doc;
}

/**
 * Shared response builder for the /openapi.json and /swagger.json route
 * handlers: returns the spec as JSON, or a 502 if the upstream API is
 * unreachable (rather than a confusing 500 or an empty body).
 */
export async function openApiSpecResponse(): Promise<Response> {
  try {
    const spec = await getOpenApiSpec();
    return new Response(JSON.stringify(spec), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: "OpenAPI spec temporarily unavailable" }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}
