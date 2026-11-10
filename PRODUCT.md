# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, with equal weight:

- Peers in the tech community, following how Jonathan thinks.
- Recruiters and hiring managers, deciding whether to reach out.

## Product Purpose

jhony.dev is Jonathan Ortega's professional profile. It makes his work and his reasoning legible enough that either audience can understand who he is and contact him with context. The digital garden is the evidence behind that profile. Success means a peer or a hiring visitor can leave knowing how he works, and with a clear way to reach him.

## Positioning

The profile is backed by a living garden: essays, notes, and snippets marked Seedling, Budding, or Evergreen, and dated by last edit. The writing shows work in progress. A static résumé or a finished-essay archive cannot make that claim.

## Operating Context

Visitors use Home, the garden at `/garden`, About at `/about`, and the contact block at `/#contact`. Garden entries are filtered by type, maturity stage, and tags, and they paginate. Individual entries resolve at `/[slug]`.

Jonathan publishes in Sanity. The running garden still renders from local fixture data in `src/components/home/home-data.ts` and `src/components/garden/garden-post-data.ts`. The Sanity `post` schema does not yet store type, stage, or last edited.

## Capabilities and Constraints

- Content types are Essay, Note, and Snippet. Each entry carries a maturity stage and a last-edited date.
- Sanity is the publishing path. Shipping an entry does not require a code change. The schema still has to grow into the garden model above.
- Voice is direct and first person. Marketing copy, skill bars, and invented proof stay out.
- The employers, story, and photos currently on About are placeholders. They are not biography.
- A downloadable CV and testimonials stay absent until Jonathan supplies them.
- Full-text search is out of scope.
- The site is an Astro app with React islands, Tailwind, Sanity, and the Netlify adapter. The shipped UI includes a light theme, a dark theme, and a manual toggle.
- Real roles, dates, and the professional story are unsupplied.
- LinkedIn is linked twice in the current UI: `https://www.linkedin.com/in/jmoj/` on About and `https://www.linkedin.com/in/jonathanortega` in the footer. The canonical URL is undecided.

## Brand Commitments

- Name: Jonathan Ortega. Wordmark and site: jhony.dev.
- Voice: direct, first person, no corporate fluff.
- Email: hi@jhony.dev.
- GitHub: https://github.com/Jhony0311
- X: https://twitter.com/jhony0311
- Bluesky: https://bsky.app/profile/jhony.dev

## Evidence on Hand

- `BRIEF.md` (May 2025) is the original design brief. Where it frames the site as a learning journal first, this record wins: the site is a professional profile, and the garden supports it. The garden model in the brief remains in force.
- `DESIGN.md` records the incumbent visual system. This file does not replace it.
- Garden titles and summaries in the repo are fixtures until Sanity holds the real entries.
- About's employers, narrative, and photos are placeholders.
- No testimonials, CV, case studies, or press are on hand. Future work must not invent them.

## Product Principles

- Serve peers and hiring visitors with equal weight.
- Lead with the professional profile. Use the garden as evidence of how Jonathan thinks and works.
- Keep every entry visibly in progress: type, maturity stage, and last-edited date.
- Publish from Sanity. Code is the site, not the publishing step.
- Write in a direct first person, and only from facts Jonathan has supplied.
