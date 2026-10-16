# Coding guidelines

These are the judgments a tool cannot make yet. Bugbot and review cite this file. It is not a checklist. Visual language, tokens, accessibility, Sanity schema, and product intent live in the files linked below.

## Scaffold

A URL lives in `src/pages`. A complex feature that only one page mounts lives in `src/components/<feature>`. The site has two wrappers, the page wrapper and the garden note wrapper. A new wrapper is added only when a document type needs it. Wrappers live in `src/layouts`.

## Documents

A page document and a post document are different Sanity documents. The document type selects the wrapper. The wrapper is where they differ. Content is the ordered set of components inside the wrapper, and the Sanity document sets that order.

## Component groups

A component may be shared by both wrappers. Most stay exclusive to one.

- Shared React components live in `src/components/ui`.
- Page-only content components live in `src/components/page`.
- Post-only content components live in `src/components/post`.
- `src/components/<feature>` stays for a component that only one page mounts directly.

## Extraction

Extract a component when a second file needs the markup, when a React island has its own state, or when a Sanity document can place it. Two copies in the same file stay inline. A page may be long. There is no line cap. Markup that appears once, and that Sanity cannot place, stays in the page.

## Astro and React

Astro is for pages, wrappers, and the layout frames: `Layout`, `SiteHeader`, `SiteFooter`, `SiteNavigation`, and `SiteContent`. Any other shared UI is React, including static primitives. A page or wrapper that renders a shared React component mounts it with `client:load`.

## Content source

New visitor-facing material belongs in Sanity. Do not add a new TypeScript module of visitor-facing copy. The hardcoded modules that exist today stay until a migration ticket moves them.

## Naming

PascalCase components. Astro route filenames match the routes already in `src/pages`. Kebab-case is for data modules that are code rather than content.

## Other sources

- Visual language, tokens, and accessibility: [DESIGN.md](../DESIGN.md)
- Product intent: [BRIEF.md](../BRIEF.md)
- Sanity schema types: [studio/schemaTypes](../studio/schemaTypes)
