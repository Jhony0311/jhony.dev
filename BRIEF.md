
# DESIGN BRIEF
## Personal Website · Software Engineer

| PREPARED BY | Creative Team | VERSION | 1.0 · May 2025 |
| :--- | :--- | :--- | :--- |

| PROJECT TYPE | Personal site with digital garden | PRIMARY AUDIENCE | Technical community + recruiters |
| :--- | :--- | :--- | :--- |

### 01. Client Context
This website is for a software engineer with a fragmented digital presence (Medium, Twitter/X) who aims to centralize their thinking in a single, owned space. [cite: 266]
It is not a sales portfolio: it is a learning log that builds credibility as a byproduct. [cite: 267]

#### Personality
* **Analytical and precise** — Reasons with data, not vague intuitions. [cite: 269]
* **Natural documenter** — Writes to think, not just to publish. [cite: 270]
* **Direct voice, no fluff** — No corporate-speak or filler. [cite: 271]
* **Values the process** — Trusts the process more than the final finished product. [cite: 272]

> **Tone Key:** The site should feel like the workbook of a very organized person — not like a CV disguised as a blog. [cite: 273]

### 02. Project Objective
To create a personal website that acts as the client's digital center of gravity: a space where their thoughts live, grow, and connect over time. [cite: 275]

#### Specific Objectives
* Centralize scattered content (notes, snippets, articles) in one place. [cite: 277]
* Project technical credibility organically, without sounding like marketing. [cite: 278]
* Make it easy for others to find their work and contact them with context. [cite: 279]
* Build a sustainable publishing habit — low friction, high reward. [cite: 280]

#### What this site is NOT
* It is not an agency portfolio or a services landing page. [cite: 282]
* It is not a high-volume blog or aggressive SEO play. [cite: 283]
* It is not static — it must grow and change without depending on a developer. [cite: 284]

### 03. Content Architecture
The site is organized into three main sections with clear hierarchy. Navigation should be as invisible as possible. [cite: 285, 286]

#### Section A · Home / Intro
**PURPOSE**
First impression. Answers "Who are you and why should I stay?" in 10 seconds. [cite: 289]
Also functions as a hub for recent activity. [cite: 290]

**CONTENT COMPONENTS**
* Name + professional title (current role or self-definition). [cite: 292]
* Brief bio — 3 to 5 lines, first person, conversational tone. [cite: 293]
* Stack or area of specialization — can be visual (tags, not paragraphs). [cite: 294]
* Feed of latest digital garden posts — maximum 3 to 5 recent pieces. [cite: 295]
* Single, clear contact link or CTA. [cite: 296]

**DESIGN CRITERIA**
* No mandatory photo — only if the client decides. [cite: 298]
* Avoid clichés like "Welcome to my site." [cite: 299]
* The bio should end with an invitation to explore the garden. [cite: 300]

> **Bio Tone Reference:** "I write about what I'm learning. If I can't explain something clearly, it means I don't understand it yet." [cite: 301]

#### Section B · Digital Garden
**PURPOSE**
The heart of the site. A living space for knowledge in progress, not just an archive of finished posts. [cite: 303, 304]
Reference: maggieappleton.com/garden. [cite: 305]

**KEY CONCEPT — GROWTH STAGES**
Every piece of content has a visible maturity level (following Maggie Appleton's model): [cite: 306, 307]
* 🌱 **Seedling** — initial idea, raw note, undeveloped observation. [cite: 308]
* 🌿 **Budding** — in progress, structured but not yet concluded. [cite: 309]
* 🌳 **Evergreen** — mature, reviewed, solid though still subject to change. [cite: 310]

**CONTENT TYPES**
| Type | Description | Example |
| :--- | :--- | :--- |
| **Essay / Post** | Long-form article with an original argument | "Why I prefer X over Y in production" |
| **Note** | Short observation, quick reflection | "Things I didn't know about async/await" |
| **Snippet** | Functional code with minimal context | React hook for detecting scroll direction |
[cite: 312]

**FILTERING SYSTEM**
* By content type (Essay, Note, Snippet). [cite: 314]
* By maturity level (Seedling, Budding, Evergreen). [cite: 315]
* By topic tags — client-defined, not fixed taxonomy. [cite: 316]
* Text search — optional in v1, priority in v2. [cite: 317]

**DESIGN CRITERIA**
* Main view: grid or list — relevance/tag-based, not strictly chronological. [cite: 319]
* Display: title, type, maturity stage, last edited date, tags. [cite: 320]
* Snippets must render code with syntax highlighting. [cite: 321]
* Notes can be very short — no minimum length. [cite: 322]
* Clean URL (e.g., /garden or /notes). [cite: 323]

> **Key Differentiator:** Show the "last edited" date rather than just the publication date. This signals that the garden is a living organism. [cite: 324]

#### Section C · Professional Experience
**PURPOSE**
A layer of credibility for visitors who found the content and want to know the person behind it. [cite: 326, 327]
Not a classic CV — it's a narrative with evidence. [cite: 328]

**CONTENT COMPONENTS**
* Experience timeline — narrative format, not just a list of dates. [cite: 330]
* Each role: company, period, 1-2 lines on impact or learnings (active voice). [cite: 331]
* External references — LinkedIn testimonials or recommendations (linked). [cite: 332]
* Skills or areas of expertise — optional, only if they add visual value. [cite: 333]
* Link to downloadable CV — only if requested. [cite: 334]

**DESIGN CRITERIA**
* The timeline should not look like an HR table. [cite: 336]
* LinkedIn references must include the name, title, and company of the person who wrote them. [cite: 337]
* Max 3-4 references — quality over quantity. [cite: 338]
* Clean URL (/about or /experience). [cite: 339]

> **Avoid:** Skill lists with percentage bars ("JavaScript: 90%"). They are decorative and convey nothing real. Prefer brief text or simple tags. [cite: 340]

### 04. Visual Direction
The site must communicate rigor without coldness. The aesthetic should feel intentionally built, not generated from a template. [cite: 342]

**MOODBOARD REFERENCE**
* **maggieappleton.com** — garden structure, tag system, growth stages. [cite: 344]
* **gwern.net** — content density, editorial authority, unadorned. [cite: 345]
* **leerob.io** — technical minimalism, readability, modern stack. [cite: 346]

**DESIGN PRINCIPLES**
* **Typography as Lead** — Choose fonts with character, not generic system fonts. [cite: 348]
* **Reduced Palette** — Max 3 functional colors + 1 accent color. [cite: 349]
* **Ample White Space** — Density lies in the content, not the UI. [cite: 350]
* **Dark Mode by Default** — Required by the client and expected by the audience. [cite: 351]
* **No Stock Images** — Use custom illustrations, diagrams, or none at all. [cite: 352]

**WHAT WE DON'T WANT**
* Purple gradients on white backgrounds. [cite: 354]
* Unnecessary particle animations or animated backgrounds. [cite: 355]
* Generic rounded-corner cards with shadows. [cite: 356]
* Corporate headshots with blue filters. [cite: 357]
* Huge social media icons in the footer. [cite: 358]