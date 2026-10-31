# Design Document: Bruce-Box GitHub Pages & Arcade Setup

## 1. System Architecture

Bruce-Box is structured as a zero-dependency static site deployable directly to GitHub Pages. It strictly separates **raw source artifacts** (as delivered by creator Bruce Baskir) from the **published web bundle** to ensure deterministic deployments and durable URLs.

```
Bruce-Box/
├── .agents/
│   └── skills/
│       └── game-intake/
│           ├── SKILL.md
│           └── sync-games.ps1 (or python/node script)
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .kiro/
│   └── specs/
│       └── github-pages-arcade/
│           ├── requirements.md
│           ├── design.md
│           └── tasks.md
├── games/                     <-- Raw input directory (unmodified Bruce drops)
│   ├── ecohex4.html
│   ├── Hopper2 (3).html
│   ├── MyGardenGrow.html
│   └── smother3.html
├── public/                    <-- Web root deployed to GitHub Pages
│   ├── css/
│   │   └── style.css
│   ├── games/
│   │   ├── ecohex4/
│   │   │   └── index.html
│   │   ├── hopper2/
│   │   │   └── index.html
│   │   ├── my-garden-grow/
│   │   │   └── index.html
│   │   └── smother3/
│   │       └── index.html
│   ├── favicon.ico (optional SVG/ICO)
│   └── index.html             <-- Landing page ("Bruce-Box Arcade")
├── scratch/
│   └── mood_board.md
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE (MIT)
└── README.md
```

---

## 2. Directory & URL Routing Design

### 2.1 Web Root (`public/`)
GitHub Pages action will upload and deploy the `public/` directory.

### 2.2 Stable Endpoints Mapping

| Game Name | Raw Source File | Published Stable Path | Relative URL Endpoint |
| :--- | :--- | :--- | :--- |
| **EcoHex 4** | `games/ecohex4.html` | `public/games/ecohex4/index.html` | `/games/ecohex4/` |
| **Hopper 2** | `games/Hopper2 (3).html` | `public/games/hopper2/index.html` | `/games/hopper2/` |
| **My Garden Grow** | `games/MyGardenGrow.html` | `public/games/my-garden-grow/index.html` | `/games/my-garden-grow/` |
| **Smother 3** | `games/smother3.html` | `public/games/smother3/index.html` | `/games/smother3/` |

**Advantage of `/index.html` within folder:**
- URL paths are directory-based (e.g. `https://<user>.github.io/Bruce-Box/games/ecohex4/`).
- If Bruce releases a revision to version 4 or drops a future `ecohex5.html`, version-specific links remain intact and durable.

---

## 3. Game Intake & Mutation Boundary

### 3.1 Preservation Policy
- Raw drop files in `games/` remain 100% byte-for-byte intact.
- In `public/games/<slug>/index.html`, we maintain code integrity:
  - Game canvas, DOM elements, and Bruce's game algorithms remain untouched.
  - A small, unobtrusive, non-intrusive floating top-bar or "Return to Arcade" floating button can be optionally provided if it does not collide with the game layout, or the landing page opens games in a dedicated tab with a clear return navigation header.
  - Character encoding (`<meta charset="utf-8">`) and responsive meta viewport are verified.

---

## 4. Landing Page UI/UX Design

### 4.1 Aesthetic Concept
- **Theme**: "Retro-Modern Arcade Cabinet / Indie Showcase".
- **Visuals**: Dark/warm minimalist canvas with vibrant arcade accent colors (subtle gradients, crisp cards, clean monospace/sans-serif typography).
- **Zero Frameworks**: Plain HTML5 semantic tags (`<header>`, `<main>`, `<article>`, `<footer>`) with lightweight, modern CSS (Flexbox / CSS Grid, CSS Custom Properties).

### 4.2 Card Component Elements
Each game card will feature:
1. **Title**: Clean display name (e.g., "EcoHex", "Hopper", "My Garden Grow", "Smother").
2. **Badge / Version**: e.g., "v4 (Drop)", "Strategy / Puzzle".
3. **Short Description**: Brief overview of gameplay based on the in-game instructions.
4. **Action**: High-visibility "Play Game" button directing to the stable endpoint.
5. **Direct Link / Copy Link**: Quick way to copy or open direct URL.

---

## 5. GitHub Pages Deployment Workflow

Using the modern `actions/deploy-pages` and `actions/upload-pages-artifact` workflows:
- **Permissions**: `pages: write`, `id-token: write`.
- **Steps**:
  1. Checkout repository (`actions/checkout@v4`).
  2. Setup Pages (`actions/configure-pages@v5`).
  3. Upload static artifact from `path: './public'` (`actions/upload-pages-artifact@v3`).
  4. Deploy to GitHub Pages (`actions/deploy-pages@v4`).

---

## 6. Repository Governance & Agent Skills Design

### 6.1 `LICENSE`
- **Choice**: **MIT License**.
- **Rationale**: Standard, widely recognized permissive open-source license. Contains standard liability disclaimer: *"THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED..."* perfectly matching the requirements for a hobby project with no support obligations.

### 6.2 `AGENTS.md`
- Concise instruction set specifying:
  - Repository purpose and structure.
  - Rules of engagement (never edit `games/` raw files; always update `public/`).
  - Pointer to `.agents/skills/game-intake` for synchronizing or onboarding new games.

### 6.3 `.agents/skills/game-intake/SKILL.md`
- Standard Agent Skill format (agentic YAML frontmatter + concise operational instructions).
- Teaches agents how to:
  1. Inspect `games/` for new or updated game files.
  2. Slugify game names to determine target directories under `public/games/<slug>/`.
  3. Deploy the file to `index.html` while preserving original source code.
  4. Update `public/index.html` card metadata if a new game was introduced.
