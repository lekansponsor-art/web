# Handover: Prisma ORM 8 docs audit and plain-language pass

Written 2026-09-12, updated 2026-09-13, by the previous agent for the next one. Read this first, then `changes.md` in this directory.

## Transcript of the previous session

`/Users/will/.claude/projects/-Users-will-Projects-prisma-web--claude-worktrees-prisma-orm-8-docs-audit-5bdfd9/7636eb55-44f8-408f-b81e-481bd0140ea6.jsonl`

Search it for `C21`, `reader review`, `fact re-check`, `conventions.md`, or a page name. The session was compacted once; the first user message after compaction carries a summary of everything before it.

## Where things are

- `prisma/web` on `main` has, merged this week: the three correction PRs (#8236, #8237, #8238), the naming pass (#8246), Release status and Coming from Prisma ORM 7 (#8245), the `docs-reader-review` skill (#8247), and the plain-language rewrite of the five `orm/fundamentals` pages (#8251).
- Draft PR #8243 (branch `docs/orm8-docs-audit-design`) holds the design docs in `docs/orm-docs-audit/`: `personas.md`, `journeys.md`, `mental-model.md`, `ia.md`, `naming.md`, `changes.md`, `plain-language.md`, the briefs, and this file. It is not meant to merge; it is the shared copy Will links people to. Other people edit this branch: always `git fetch bot` and start from the branch head, and merge your additions rather than copying files over.
- PR #8260 (branch `docs/orm8-plain-language-orm-client`) is C21 on `apps/docs/content/docs/orm/reference/orm-client.mdx`, merged 2026-09-12: two fact re-checks and four reader rounds. The reader and checker reports for that page are in the branch history at d104536a5.
- PR #8267 (branch `docs/orm8-plain-language-orm-reference`) is C21 on the rest of `orm/reference/` (`sql-query-builder`, `raw-queries`, `pipeline-builder`, `transactions-and-runtime`, `index`), merged 2026-09-13: a fact check against rc.10, four reader rounds, a final fact re-check, and CodeRabbit's six comments. The reports are in the branch history at 13f900ad2. The error reference page is generated from prisma/orm and out of scope.
- The Prisma ORM 8 source used for every fact check is `prisma/orm` at `8.0.0-rc.10` (`cfccb09be2`), since #8261 moved the docs to rc.10. The previous worktree had it at `wip/prisma-src/`; in a fresh worktree, `git -C /Users/wmadden/Projects/prisma/prisma worktree add <path> cfccb09be2`. Check whether a newer rc has landed before starting a section.

## How to work (rules Will has given, in his words where possible)

- Act as the `wmadden-electric` bot: commit with `git commit -s --trailer "Signed-off-by: Will Madden <madden@prisma.io>"`, end the message with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`, push only through the `bot` remote.
- "NOT EVERY FUCKING CHANGE NEEDS A SEPARATE PR": follow-ups go on the open PR.
- Address every review comment and every CI failure without being asked. Resolve CodeRabbit threads via GraphQL `resolveReviewThread` after replying. CodeRabbit's "changes requested" verdict blocks the merge even when all threads are resolved; dismissing it is blocked for the agent, so Will dismisses it or merges with `--admin`.
- PR descriptions: a grounding before/after example first, then the decision, then how it was checked, then what a reviewer should know, alternatives considered last.
- Plain English, no invented jargon, short sentences. Never use the question UI.
- The design docs carry no status ("they are not a fucking to do list"). Progress lives in PRs.
- The product is "Prisma ORM"; a version number only when contrasting ("Prisma ORM 7 to 8"). The reason is separating the Prisma brand from the ORM.
- Use Opus for implementer and reviewer subagents.
- Never fix one sentence Will points at in isolation. Reread the whole page and check the claims around it; a bad sentence has always meant more was wrong nearby ("NEVER REWRITE SENTENCES IN ISOLATION. REREAD THE WHOLE DOCUMENT").
- No commentary about the docs inside the docs: no "this page documents", no "each method has a Remarks list", no "examples carry over between pages". Write the reference itself.
- Never interleave PostgreSQL and MongoDB sentence by sentence. Give each database its own example and its own paragraph.
- Resolving CodeRabbit threads: zsh does not word-split `$ids`, so loop with `while read -r id`, and keep the GraphQL query in a file under `wip/` and pass it with `-f query="$(cat file)"`.
- Do not paste the readers' reports into pages; extract each agent's final message from its task output with the small script in `c21-orm-client/` (`extract.py` in the previous scratchpad; it prints the last assistant text block of a task JSONL).

## The C21 method (what worked on the fundamentals pages)

The skill is `.claude/skills/docs-reader-review/` on `main`. Per page:

1. Run `scripts/check-plain.sh` and fix hits.
2. Dispatch a fresh Opus reader with `references/reader-persona.md` verbatim and only the page (a long page in slices by `##` heading, 400 to 700 lines each). Save its report with the extract script.
3. Dispatch an Opus fixer per page or slice with: the skill's step 3 rules, `conventions.md` (shared verified facts and wording; in `c21-orm-client/` on #8260), the page's own conventions file if any, the report, and the source paths. Tell it which facts to look up before writing, a line budget, and to put `Q` markers in its report, not the page.
4. Repeat. Four rounds was the point of diminishing returns on the fundamentals pages; from round three on, give the fixer a "no longer than it is now" budget, because pages grow and readers then trip on the additions.
5. Fact re-check by a separate Opus agent against the source, claim by claim, before the PR. On the fundamentals pages this caught seven real errors that the wording rounds had introduced or left standing. Do not skip it.
6. Commit each round. Link check: `cd apps/docs && node_modules/.bin/fumadocs-mdx && node_modules/.bin/tsx ./scripts/lint-links.ts`. Spelling: `node_modules/.bin/cspell "content/docs/orm/**/*.mdx"` (random sample ids fail it; use `cuid2000...` style). Revert any `meta.json` the formatter touches.

Readers keep asking for MongoDB depth on every page (fewer examples, no `.aggregate`, no cursor). That is a content gap, not wording; it is logged as C24 in `changes.md` and is out of scope for C21.

## Current task: `orm/contract-authoring/`

`orm/reference/` is done (#8260, #8267). Next is item 1 below, one PR per section. Things learned on the reference pages that the fundamentals pages did not show:

- On a reference page, readers keep asking for getting-started material (installing, `prisma orm init`, creating tables). Answer with one sentence and a link; do not add it.
- From round three on, fixers add answers and readers then trip on the additions. Give every fixer from round three a "no longer than now" budget, and tell round four's fixers to prefer cutting. The final fact re-check found thirteen drifts on the orm-client page and twenty-six on the other reference pages after four wording rounds, so do not skip it.
- Fact checkers infer motives and defaults the source does not state (why a helper was renamed, what a driver returns). Trim to what a source line says.
- When a section's pages run in parallel, a `page-conventions.md` beside `conventions.md` keeps them agreeing on setup lines, the example schema, and phrasing such as "PostgreSQL only".

## After that, in order

1. `orm/contract-authoring/` (the current task), then `orm/data-modeling/`, `orm/migrations/`, `orm/middleware/`, `orm/extensions/` (20 pages in all), one PR per section.
2. C25, `brief-intermediate-contracts.md`: intermediate contracts in data transform migrations. Fits the `orm/migrations/` section pass.
3. C2, "Add Prisma ORM to an app you already started": scaffold a Prisma 7 app with an older `npm create prisma`, add ORM 8, write the page from what happens.
4. C22 (a database on your machine: `prisma dev` first, Composer, Docker Compose) and C23 (runnable example repositories), both from a Discord user's feedback; see `journeys.md` J11 and J12.
5. Briefs waiting for an ORM-side owner: `brief-skill-staleness.md` (D14), D17 in `changes.md`. Add to D14: the scorecard marks `contains`/`startsWith`/`endsWith` as reachable when they are not, and the skill still says N:M includes fail when they work.
