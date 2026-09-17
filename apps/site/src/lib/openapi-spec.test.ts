import assert from "node:assert/strict";
import test, { afterEach, mock } from "node:test";
import { getOpenApiSpec, openApiSpecResponse } from "./openapi-spec";

// A trimmed stand-in for what api.prisma.io/v1/doc returns: a valid OpenAPI 3.1
// document that, like the real upstream, has no top-level `servers` entry.
const upstream = {
  openapi: "3.1.0",
  info: { title: "Prisma Postgres Management API", version: "v1" },
  paths: { "/v1/projects": {} },
};

function stubFetch(status: number, body: unknown) {
  mock.method(
    globalThis,
    "fetch",
    async () =>
      new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
      }),
  );
}

afterEach(() => mock.restoreAll());

test("injects the api.prisma.io servers entry the upstream spec omits", async () => {
  stubFetch(200, upstream);
  const doc = await getOpenApiSpec();
  assert.deepEqual(doc.servers, [{ url: "https://api.prisma.io" }]);
  assert.equal((doc.info as { title?: string }).title, "Prisma Postgres Management API");
});

test("serves the spec as JSON with a cache header", async () => {
  stubFetch(200, upstream);
  const res = await openApiSpecResponse();
  assert.equal(res.status, 200);
  assert.match(res.headers.get("content-type") ?? "", /application\/json/);
  assert.ok(res.headers.get("cache-control")?.includes("max-age"));
  const json = (await res.json()) as { servers?: unknown };
  assert.deepEqual(json.servers, [{ url: "https://api.prisma.io" }]);
});

test("returns 502 when the upstream API is unreachable", async () => {
  stubFetch(500, { error: "boom" });
  const res = await openApiSpecResponse();
  assert.equal(res.status, 502);
});
