# Handover: Prisma ORM 8 docs audit and plain-language pass

Written 2026-09-12, updated 2026-09-14, by the previous agent for the next one. Read this first, then `changes.md` in this directory.

## Transcript of the previous session

`/Users/wmadden/.claude/projects/-Users-wmadden-Projects-prisma-web--claude-worktrees-error-reference-follow-ups-81a8e7/29b9a58b-bb9f-48f4-8639-597b84cf76f8.jsonl` (about 15 MB; 2026-09-13 to 2026-09-14, the orm/reference and contract-authoring passes). If your sandbox cannot read it, tell Will straight away and wait: he will copy it into your worktree. Do not continue without it. The session before that one is at `/Users/will/.claude/projects/-Users-will-Projects-prisma-web--claude-worktrees-prisma-orm-8-docs-audit-5bdfd9/7636eb55-44f8-408f-b81e-481bd0140ea6.jsonl` (the audit and the fundamentals pass).

Search the transcript for `C21`, `reader review`, `fact re-check`, `factcheck2`, `conventions.md`, or a page name. It was compacted once; the first user message after compaction carries a summary of everything before it.

## Absolute paths

The previous agent's worktree is `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7`. It still exists and holds everything below that is not in git:

- This file: `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/design/docs/orm-docs-audit/HANDOVER.md` (the design branch checked out at `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/design/`).
- The rc.10 source checkout: `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/prisma-src/` (a worktree of `/Users/wmadden/Projects/prisma/prisma` at `cfccb09be2`).
- The contract-authoring briefs: `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/ca/factcheck-brief.md`, `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/ca/factcheck2-brief.md`, `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/ca/fixer-brief.md`, and the PR body `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/ca/pr-body.md`. The reference-section briefs are beside them in `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/`.
- The report extractor: `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/extract.py`.
- The reports of every round, as files: `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/ca/r1/` to `r4/` and `fc2/` hold the page copies; the reader and checker reports are in git at commit 40c5394e3 of `docs/orm8-plain-language-contract-authoring` under `docs/orm-docs-audit/c21-contract-authoring/`, and at 13f900ad2 of `docs/orm8-plain-language-orm-reference` under `docs/orm-docs-audit/c21-orm-reference/`. Read them with `git show <commit>:<path>` from any worktree of prisma/web.
- The docs-reader-review skill: `.claude/skills/docs-reader-review/` at the root of any prisma/web checkout, on `main`.

## Where things are

- `prisma/web` on `main` has, merged this week: the three correction PRs (#8236, #8237, #8238), the naming pass (#8246), Release status and Coming from Prisma ORM 7 (#8245), the `docs-reader-review` skill (#8247), and the plain-language rewrite of the five `orm/fundamentals` pages (#8251).
- Draft PR #8243 (branch `docs/orm8-docs-audit-design`) holds the design docs in `docs/orm-docs-audit/`: `personas.md`, `journeys.md`, `mental-model.md`, `ia.md`, `naming.md`, `changes.md`, `plain-language.md`, the briefs, and this file. It is not meant to merge; it is the shared copy Will links people to. Other people edit this branch: always `git fetch bot` and start from the branch head, and merge your additions rather than copying files over.
- PR #8260 (branch `docs/orm8-plain-language-orm-client`) is C21 on `apps/docs/content/docs/orm/reference/orm-client.mdx`, merged 2026-09-12: two fact re-checks and four reader rounds. The reader and checker reports for that page are in the branch history at d104536a5 under `docs/orm-docs-audit/c21-orm-client/`.
- PR #8271 (branch `docs/orm8-plain-language-contract-authoring`) is C21 on `orm/contract-authoring/` (the data contract, PSL, TypeScript builder, the two emitted files, and the page now titled Supported database features), plus three things Will asked for while it ran: the Supported databases page at `/prisma-orm/supported-databases` (PostgreSQL release candidate, MongoDB early access, everything else coming soon; it replaces the database section of prisma/orm#25843), the upgrade guides linked from the ORM section's Introduction and the v7 guides nav, and a sidebar fix (folders in the version-filtered Guides tree never opened for their own page; they now match by id). It is approved on GitHub and green; the agent could not merge it because the tool refused a merge, so Will merges it. The reports are in the branch history at 40c5394e3. The plain-language checker (`check-plain.sh`) now skips link targets, pinned anchors, `href` attributes, and the front-matter `url` line.
- PR #8267 (branch `docs/orm8-plain-language-orm-reference`) is C21 on the rest of `orm/reference/` (`sql-query-builder`, `raw-queries`, `pipeline-builder`, `transactions-and-runtime`, `index`), merged 2026-09-13: a fact check against rc.10, four reader rounds, a final fact re-check, and CodeRabbit's six comments. The reports are in the branch history at 13f900ad2. The error reference page is generated from prisma/orm and out of scope.
- The Prisma ORM 8 source used for every fact check is `prisma/orm` at `8.0.0-rc.10` (`cfccb09be2`). In a fresh worktree: `git -C /Users/wmadden/Projects/prisma/prisma worktree add <path> cfccb09be2`. Tag `v8.0.0-rc.11` exists upstream as of 2026-09-14 (`git -C /Users/wmadden/Projects/prisma/prisma fetch origin --tags`; tags are `v8.0.0-rc.N`), and npm `latest` for the three ORM packages is rc.11; the docs still say rc.10. Ask Will whether to move the source to rc.11 before the next section.
- The published `prisma` package (8.0.0-rc.15 on 2026-09-14) exports `./config`, so the docs import `definePrismaConfig` from `prisma/config`. The rc.10 source tree only has `@prisma/cli-engine` and every fact checker "corrects" it; revert them. Check with `npm view prisma@latest exports`.
- The design branch is checked out in the previous worktree at `wip/design/` (a git worktree under the gitignored `wip/`). In a fresh worktree, `git worktree add wip/design docs/orm8-docs-audit-design` after `git fetch bot` and `git branch -f docs/orm8-docs-audit-design bot/docs/orm8-docs-audit-design`.

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
- Merging: when Will says "approved" in chat, squash-merge with `gh pr merge N --squash --delete-branch`. Auto-merge is off for the repo. On 2026-09-14 the tool refused a merge on a GitHub approval alone; ask Will.
- The dev server in a worktree needs `pnpm turbo run build --filter=@prisma/eclipse` first and `rm -rf apps/docs/.next`; the launch config is `docs` on port 3105. Verify nav changes by reading the sidebar without clicking anything open, and check the live site with the folder collapsed as a reader sees it. Do not report "it is in the nav" from the presence of text in the HTML.
- Resolving CodeRabbit threads: zsh does not word-split `$ids`, so loop with `while read -r id`, and keep the GraphQL query in a file under `wip/` and pass it with `-f query="$(cat file)"`.
- Do not paste the readers' reports into pages; extract each agent's final message from its task output with `/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/extract.py` (usage: `python3 extract.py <task .output file> <report.md>`; it prints the last assistant text block of a task JSONL).

## The C21 method (what worked on the fundamentals pages)

The skill is `.claude/skills/docs-reader-review/` on `main`. Per page:

1. Run `scripts/check-plain.sh` and fix hits.
2. Dispatch a fresh Opus reader with `references/reader-persona.md` verbatim and only the page (a long page in slices by `##` heading, 400 to 700 lines each). Save its report with the extract script.
3. Dispatch an Opus fixer per page or slice with: the skill's step 3 rules, `conventions.md` (shared verified facts and wording; the latest is `docs/orm-docs-audit/c21-contract-authoring/conventions.md` at commit 40c5394e3), the page's own conventions file if any, the report, and the source paths. Tell it which facts to look up before writing, a line budget, and to put `Q` markers in its report, not the page.
4. Repeat. Four rounds was the point of diminishing returns on the fundamentals pages; from round three on, give the fixer a "no longer than it is now" budget, because pages grow and readers then trip on the additions.
5. Fact re-check by a separate Opus agent against the source, claim by claim, before the PR. On the fundamentals pages this caught seven real errors that the wording rounds had introduced or left standing. Do not skip it.
6. Commit each round. Link check: `cd apps/docs && node_modules/.bin/fumadocs-mdx && node_modules/.bin/tsx ./scripts/lint-links.ts`. Spelling: `node_modules/.bin/cspell "content/docs/orm/**/*.mdx"` (random sample ids fail it; use `cuid2000...` style). Revert any `meta.json` the formatter touches.

Readers keep asking for MongoDB depth on every page (fewer examples, no `.aggregate`, no cursor). That is a content gap, not wording; it is logged as C24 in `changes.md` and is out of scope for C21.

## Current task: `orm/data-modeling/`

`orm/reference/` (#8260, #8267) and `orm/contract-authoring/` (#8271) are done. Next is item 1 below, one PR per section. The contract-authoring pass is the model for a section of explanation pages: `docs/orm-docs-audit/c21-contract-authoring/` at 40c5394e3 on the #8271 branch has its `conventions.md`, `page-conventions.md`, the checker brief (`/Users/wmadden/Projects/prisma/web/.claude/worktrees/error-reference-follow-ups-81a8e7/wip/c21/ca/factcheck-brief.md`), and every report. Copy `page-conventions.md` and adapt it: it bans commentary about the docs, interleaved PostgreSQL and MongoDB sentences, and the words capability, gate, codec, canonical, deterministic, pure, source of truth. Things learned on the reference pages that the fundamentals pages did not show:

- On a reference page, readers keep asking for getting-started material (installing, `prisma orm init`, creating tables). Answer with one sentence and a link; do not add it.
- From round three on, fixers add answers and readers then trip on the additions. Give every fixer from round three a "no longer than now" budget, and tell round four's fixers to prefer cutting. The final fact re-check found thirteen drifts on the orm-client page and twenty-six on the other reference pages after four wording rounds, so do not skip it.
- Fact checkers infer motives and defaults the source does not state (why a helper was renamed, what a driver returns). Trim to what a source line says.
- When a section's pages run in parallel, a `page-conventions.md` beside `conventions.md` keeps them agreeing on setup lines, the example schema, and phrasing such as "PostgreSQL only".

## After that, in order

1. `orm/data-modeling/` (the current task, 3 pages), then `orm/migrations/` (6 pages, where C25 fits), `orm/middleware/`, `orm/extensions/`, one PR per section.
2. C25, `brief-intermediate-contracts.md`: intermediate contracts in data transform migrations. Fits the `orm/migrations/` section pass.
3. C2, "Add Prisma ORM to an app you already started": scaffold a Prisma 7 app with an older `npm create prisma`, add ORM 8, write the page from what happens.
4. C22 (a database on your machine: `prisma dev` first, Composer, Docker Compose) and C23 (runnable example repositories), both from a Discord user's feedback; see `journeys.md` J11 and J12.
5. Briefs waiting for an ORM-side owner: `brief-skill-staleness.md` (D14), D17 in `changes.md`. Add to D14: the scorecard marks `contains`/`startsWith`/`endsWith` as reachable when they are not, and the skill still says N:M includes fail when they work.

## Open questions from the last session, for Will

- **SQLite.** `@prisma/orm-sqlite` is published at the same version as the PostgreSQL and MongoDB packages and the source has a SQLite target, but Will's brief for the Supported databases page said everything except PostgreSQL and MongoDB is coming soon, so the page lists SQLite as coming soon and the Release status page no longer names the SQLite library. Will decides whether SQLite gets a status.
- **A JavaScript `Date` codec.** Will and Serhii are discussing one beside the Temporal codecs. There is no real-user evidence logged anywhere in this project; the evidence is D10 in `changes.md` (inferred contracts throw at read time without a global `Temporal`, which Node.js 22 and 24 lack), the raw-queries readers stumbling on `Temporal.Instant` in four rounds, raw SQL rejecting a `Date` outright, MongoDB returning a `Date` while PostgreSQL returns Temporal, and the `DateString` family being the only escape hatch. Discord and GitHub issues were not searched.
- **Implicit many-to-many** is not supported at rc.10 or rc.11: two bare list fields raise `PSL_ORPHANED_BACKRELATION` and the message says to write a join model. The docs say so correctly. Serhii read the upgrade guide as saying many-to-many is unsupported; only the implicit form is.
- **Operating contexts.** The Supported databases page covers only the database section of prisma/orm#25843. Runtimes, frameworks, deployment platforms, and languages have no Prisma ORM 8 page.
- A team-facing summary of the whole project is published at https://claude.ai/code/artifact/3516e640-e939-4c4a-9db6-ff858027cf93 (Will's private artifact).

