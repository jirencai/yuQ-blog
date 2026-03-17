# AGENTS.md

## Project Overview
This project is a personal blog website.

The goal of the first version is to build a clean, modern, maintainable blog that can be deployed quickly and iterated on safely.

This is an MVP-focused project.  
Prioritize simplicity, readability, maintainability, and a smooth writing/publishing workflow over feature breadth.

---

## Product Goals
The first version should support:

- Home page
- Blog index page
- Blog post detail page
- About page
- Responsive layout
- Dark mode
- Basic SEO
- Local content authoring with MDX or Markdown
- Deployment to Vercel

---

## Non-Goals for V1
Do NOT introduce these unless explicitly requested:

- Traditional backend services
- Database
- Authentication
- Admin dashboard
- CMS
- Comments system
- Full-text search
- Multi-language support
- Complex analytics pipeline
- Over-engineered abstractions

If a feature would significantly increase complexity, ask whether it should be deferred to a later milestone.

---

## Core Architecture Principles

### 1. Keep frontend and content concerns separated
Do not hardcode post content inside page components.

Content should live in a dedicated content directory, such as:

- `content/posts`
- or `posts`

Page components should render content, not own content.

### 2. Keep presentation and data logic separated
UI components should focus on presentation.  
Content loading, parsing, sorting, and transformation logic should live in a dedicated utility layer such as `lib/`.

### 3. Build for future extensibility without premature complexity
Version 1 does not need a backend.  
However, structure the code so that future migration from local MDX content to CMS/API/database is possible with minimal rewriting.

This means:

- keep data access logic centralized
- avoid coupling page files directly to raw filesystem details
- define stable content shapes/interfaces

### 4. Prefer simple and explicit code
Prefer straightforward implementations over clever abstractions.

Avoid:
- unnecessary generic patterns
- premature plugin systems
- deep indirection
- excessive custom hooks
- large utility layers without clear benefit

---

## Technical Defaults
Unless explicitly instructed otherwise, use:

- Next.js
- TypeScript
- App Router
- Tailwind CSS
- MDX (preferred) or Markdown
- Vercel-friendly setup

Use widely adopted and lightweight libraries only when necessary.

Before adding a dependency, ask:
1. Is it truly needed?
2. Can this be done with the framework or a small utility instead?
3. Will this make the codebase harder to maintain?

---

## Preferred Directory Structure
Use a clean and predictable structure.  
A typical structure should look like this:

```text
app/
components/
content/
  posts/
lib/
public/
styles/