# kyleshepherd.co.uk

Personal site and portfolio. Astro 6 + Tailwind 4, deployed to Vercel.

Projects live as markdown in `src/content/projects/`, validated by the schema in
`src/content.config.ts` (`name`, `slug`, `image`, `techTags`, `order`, optional `projectUrl`).
`order` is a manual sequence starting at 1 with no gaps; adding an entry means renumbering the
ones below it. Run `pnpm build` after touching content, since a bad image path or a duplicate
`order` only fails at build time.

## Writing rules

Every word on this site is written as Kyle, in the first person. It has to read like a person
wrote it, not a model. These rules apply to project entries, component copy, meta descriptions
and anything else user-facing.

### Never use

- **Em dashes (—) and en dashes (–).** Use a comma, a full stop, a colon, or brackets.
  This is the single most obvious tell. There should be zero in the repo.
- **Stock AI vocabulary:** delve, seamless, leverage, robust, cutting-edge, game-changing,
  testament, landscape, realm, tapestry, underscore, pivotal, crucial, vital, dive into,
  unlock, empower, elevate, boasts, harness, navigate (figuratively), foster, streamline,
  spearhead, showcase (overused here already, use sparingly).
- **"Not just X, but Y"** and its variants. Just say Y.
- **Rule-of-three lists** used for rhythm rather than because there happen to be three things.
- **Empty closing summaries.** "This allowed me to learn more about X." "Putting control fully
  in the client's hands." If the sentence only exists to round off the paragraph, cut it.
- **Doublets** where one word does the job: "structure and streamline", "cohesive and flexible".
- **Corporate abstractions:** "support team growth", "drive impact", "align stakeholders".

### Always

- **British spelling.** organise, customise, specialise, colour, licence (noun), whilst is fine.
  Kyle writes British English everywhere, so American spellings are a bug.
- **Active voice and concrete detail.** "I built X using Y" beats "X was built with Y".
  Name the actual technology, the actual constraint, the actual outcome.
- **Plain words.** "a lot of product data", not "a significant amount of product data".
  "the trickiest part", not "one of the more interesting challenges".
- **Honesty about scope.** Say what he did, not what the team did, unless it was the team.
  Where a project is dead or handed over, say so plainly.

### Facts are never invented

Dates, job titles, team sizes, award names and client names get confirmed with Kyle before they
go in. The existing entries cite real dates, so a vague or guessed one stands out and is worse
than no date at all. Same for anything from a private repo: ask before publishing stack detail.

### Checking

```bash
grep -rn "—\|–" src/          # must return nothing
grep -rniE "organiz|customiz|specializ|optimiz|analyz|behavior|color[^:s-]" src/ --include="*.md"
```
