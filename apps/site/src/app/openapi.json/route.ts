import { openApiSpecResponse } from "@/lib/openapi-spec";

export const revalidate = 3600;

// Serves the Prisma Postgres Management API OpenAPI spec at
// https://www.prisma.io/openapi.json — the conventional path scanners, agents,
// and API tooling probe. The document is proxied from api.prisma.io/v1/doc.
export async function GET() {
  return openApiSpecResponse();
}
