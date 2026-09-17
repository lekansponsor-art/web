import { openApiSpecResponse } from "@/lib/openapi-spec";

export const revalidate = 3600;

// Alias of /openapi.json at the legacy `/swagger.json` filename, which many
// scanners and API tools still probe. Serves the identical OpenAPI document.
export async function GET() {
  return openApiSpecResponse();
}
