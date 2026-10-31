# Bruce-Box Agent Instructions

This repository hosts **Bruce-Box Arcade**, a lightweight GitHub Pages site showcasing browser-based games created by **Bruce Baskir**.

Agents operating on this repository must adhere to the rules, boundaries, and workflows outlined below.

---

## 1. Architectural Boundaries

- **`games/` is STRICTLY READ-ONLY**:
  The `games/` folder is the intake area for raw, untouched files delivered directly from Bruce Baskir (e.g., `games/ecohex4.html`, `games/Hopper2 (3).html`). **NEVER** edit, reformat, or delete files inside `games/`.
- **`public/` is the Web Root**:
  All deployed web assets belong in `public/`. GitHub Pages serves the contents of this folder directly.
- **Zero-Dependency Mandate**:
  Do not introduce external front-end frameworks (React, Vue, Tailwind, etc.), build bundlers, or npm dependencies.
- **Pure Node.js Maintenance Scripts**:
  All repo maintenance tools must be vanilla JavaScript (`.mjs`) files executed with Node.js standard libraries only (`node:fs`, `node:path`, `node:http`, etc.). Do not introduce Python, PowerShell scripts, or external packages.

---

## 2. Game Hosting and Link Conventions

Games in the arcade may be hosted in Bruce-Box or linked from an external host. Bruce-Box-hosted games live at `public/games/<slug>/index.html`, retaining original version numbers to guarantee durable, direct links:

- EcoHex 4 &rarr; `/games/ecohex4/`
- Hopper 2 &rarr; `/games/hopper2/`
- My Garden Grow &rarr; `/games/my-garden-grow/`
- Smother 3 &rarr; `/games/smother3/`

Externally hosted games should link directly to their stable playable URL and be identified as externally hosted in the catalog. Do not copy external game files into Bruce-Box unless specifically requested.

Game code copied to `public/games/<slug>/index.html` must remain identical to Bruce's original code, with only non-destructive additions:

1. Standard `<meta charset="utf-8">` and viewport tags if missing.
2. Descriptive `<title>` tag.

---

## 3. Agent Skills

To save context and ensure repeatable operations, use the specialized agent skill:

- **Game Intake Skill**: [`.agents/skills/game-intake/SKILL.md`](.agents/skills/game-intake/SKILL.md)
  - Execute `node .agents/skills/game-intake/sync-games.mjs` to ingest and publish game drops.
  - Follow the skill instructions when Bruce provides a new game or an update.

---

## 4. Local Testing & Verification

Before concluding any work, verify the static site with the local preview server:

```bash
node scripts/serve.mjs
```

Ensure:

- Static assets in `public/` resolve with proper MIME types.
- Landing page loads at `http://localhost:8080/`.
- All game endpoints load with zero script errors.
