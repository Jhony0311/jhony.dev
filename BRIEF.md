# Design Brief
## Personal Website · Software Engineer

| | |
|---|---|
| **Prepared by** | Creative Team |
| **Version** | 1.0 · May 2025 |
| **Project type** | Personal site with digital garden |
| **Primary audience** | Tech community + recruiters |

---

## 01. Client Context

This website is for a software engineer with a scattered digital presence (Medium, Twitter/X) who wants to centralize his thinking in a single space he owns. This is not a sales portfolio — it is a learning journal that, as a byproduct, builds credibility.

### Personality

- Analytical and precise — reasons with data, not vague intuitions
- A natural documenter — writes to think, not just to publish
- Direct voice, no ornament — zero corporate fluff
- Trusts the process more than the finished product

> **Tone key:** The site should feel like the workbook of a very organized person — not a CV dressed up as a blog.

---

## 02. Project Objective

Create a personal website that acts as the client's digital center of gravity: a space where his thinking lives, grows, and connects over time.

### Specific goals

- Centralize scattered content (notes, snippets, articles) in one place
- Project technical credibility organically, without sounding like marketing
- Make it easy for others to find his work and reach out with context
- Build a sustainable publishing habit — low friction, high reward

### What this site is NOT

- Not an agency portfolio or a services landing page
- Not a mass-publishing blog or an aggressive SEO play
- Not static — it must be able to grow and change without depending on a developer

---

## 03. Content Architecture

The site is organized into three main sections with a clear hierarchy. Navigation should be as invisible as possible.

---

### Section A · Home / Intro

**PURPOSE**
First impression. Answers in 10 seconds: *"Who are you and why should I stay?"* Also serves as a hub for recent activity.

**CONTENT COMPONENTS**

- Name + professional title (current role or self-defined label)
- Short bio — 3 to 5 lines, first person, conversational tone
- Stack or area of expertise — can be visual (tags, not a paragraph)
- Feed of latest digital garden posts — maximum 3 to 5 recent pieces
- Contact link or a single, clear CTA

**DESIGN CRITERIA**

- No mandatory profile photo — only if the client decides to include one
- No "welcome to my site" or any cliché opening lines
- The bio should end with something that invites exploration of the garden

> **Tone reference for the bio:** *"I write about what I'm learning. If I can't explain something clearly, it means I don't understand it yet."*

---

### Section B · Digital Garden

**PURPOSE**
The heart of the site. A living space of knowledge under construction — not an archive of finished publications. Direct reference: [maggieappleton.com/garden](https://maggieappleton.com/garden).

**KEY CONCEPT — Growth Stages**

Each piece of content carries a visible maturity status, following Maggie Appleton's model:

- 🌱 **Seedling** — initial idea, raw note, undeveloped observation
- 🌿 **Budding** — in progress, structured but not yet concluded
- 🌳 **Evergreen** — mature, reviewed; may evolve but is solid

**CONTENT TYPES**

| Type | Description | Example |
|---|---|---|
| **Essay / Post** | Long-form article with a personal argument | *"Why I prefer X over Y in production"* |
| **Note** | Short observation, quick reflection | *"Things I didn't know about async/await"* |
| **Snippet** | Functional code with minimal context | *React hook to detect scroll direction* |

**FILTERING SYSTEM**

- By content type (Essay, Note, Snippet)
- By maturity stage (Seedling, Budding, Evergreen)
- By topic tags — defined by the client, not by a fixed taxonomy
- Full-text search — optional in v1, priority in v2

**DESIGN CRITERIA**

- Main view is a grid or list — not chronological, but by relevance/tag
- Each piece shows: title, type, maturity stage, last edited date, tags
- Snippets must render code with syntax highlighting
- Notes can be very short — no minimum length requirement
- The garden should have its own clean URL (e.g. `/garden` or `/notes`)

> **Key differentiator:** Show the *last edited* date, not just the publication date. This communicates that the garden is a living organism, not an archive.

---

### Section C · Professional Experience

**PURPOSE**
A credibility layer for visitors who arrived through the content and want to know who is behind it. Not a classic CV — it is a narrated story backed by evidence.

**CONTENT COMPONENTS**

- Experience timeline — narrative format, not a list of dates
- Each role: company, period, 1–2 lines on what was done or learned (active voice)
- External references — LinkedIn testimonials or recommendations (quoted, with link)
- Skills or areas of expertise — optional, only if it adds visual value
- Downloadable CV link — only if the client requests it

**DESIGN CRITERIA**

- The timeline should not look like an HR spreadsheet
- LinkedIn references must cite the name, title, and company of the person who gave them
- Maximum 3–4 references — quality over quantity
- This section can live at `/about` or `/experience` — clean URL

> **Avoid:** Skill lists with percentage bars ("JavaScript: 90%"). They are decorative and communicate nothing real. Prefer short text or simple tags instead.

---

## 04. Visual Direction

The site must communicate rigor without coldness. The aesthetic should feel intentionally built, not generated from a template.

### Reference moodboard

- **maggieappleton.com** — garden structure, tagging system, growth stages
- **gwern.net** — content density, editorial confidence, no ornament
- **leerob.io** — technical minimalism, readability, modern stack

### Design principles

- Typography as protagonist — choose fonts with their own character, not generic system fonts
- Reduced palette — maximum 3 functional colors + 1 accent
- Generous white space — density lives in the content, not in the UI
- Dark mode from day one — the client needs it, his audience expects it
- No stock images — custom illustrations, diagrams, or nothing at all

### What we do NOT want

- Purple gradients on white backgrounds — the cardinal sin of AI-era design
- Particle animations or unnecessary animated backgrounds
- Generic rounded-corner shadow cards in every section
- Corporate profile photo with a blue filter
- Footer with oversized social media icons

---


*Document prepared by the creative team.*
*This brief is a living starting point — it will be updated with input from the client.*
