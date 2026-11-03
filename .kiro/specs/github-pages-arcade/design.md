# Design Document: Bruce-Box GitHub Pages & Arcade Setup

## 1. System Architecture

Bruce-Box is structured as a zero-dependency static site deployable directly to GitHub Pages. It strictly separates **raw source artifacts** (as delivered by creator Bruce Baskir) from the **published web bundle** to ensure deterministic deployments and durable URLs.

```
Bruce-Box/
├── .agents/
│   └── skills/
│       └── game-intake/
│           ├── SKILL.md
│           └── intake-game.mjs
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
│   └── index.html             <-- Landing page ("Bruce-Box")
├── scratch/
│   └── mood_board.md
├── scripts/
│   └── serve.mjs               <-- Node.js built-in static preview server
├── AGENTS.md
├── CONTRIBUTING.md
├── LICENSE (MIT)
└── README.md
```

Maintenance scripts use vanilla JavaScript in `.mjs` files and run with Node.js. They must use Node.js built-in modules only; do not introduce Python, PowerShell, external packages, or a build step. The published site remains static HTML, CSS, and browser JavaScript and does not require Node.js at runtime.

---

## 2. Directory & URL Routing Design

### 2.1 Web Root (`public/`)
GitHub Pages action will upload and deploy the `public/` directory.

### 2.2 Bruce-Box-Hosted Endpoints

| Game Name | Raw Source File | Published Stable Path | Relative URL Endpoint |
| :--- | :--- | :--- | :--- |
| **EcoHex 4** | `games/ecohex4.html` | `public/games/ecohex4/index.html` | `/games/ecohex4/` |
| **Hopper 2** | `games/Hopper2 (3).html` | `public/games/hopper2/index.html` | `/games/hopper2/` |
| **My Garden Grow** | `games/MyGardenGrow.html` | `public/games/my-garden-grow/index.html` | `/games/my-garden-grow/` |
| **Smother 3** | `games/smother3.html` | `public/games/smother3/index.html` | `/games/smother3/` |

**Advantage of `/index.html` within folder:**
- URL paths are directory-based (e.g. `https://<user>.github.io/Bruce-Box/games/ecohex4/`).
- If Bruce releases a revision to version 4 or drops a future `ecohex5.html`, version-specific links remain intact and durable.

### 2.3 External Game Links

Games hosted elsewhere are cataloged with their stable playable URL, without copying their assets into `public/`. Their cards identify the external hosting and open the game in a new tab, leaving the Bruce-Box catalog available.

---

## 3. One-Time Intake & Maintenance Boundary

### 3.1 Preservation Policy
- Raw drop files in `games/` remain 100% byte-for-byte intact.
- `public/games/<slug>/index.html` is the maintained, deployed game and may include fixes or adaptations beyond the raw drop.
- The intake helper is for the initial copy of a genuinely new title only. It refuses to write to an existing endpoint.
- Updates to an existing title are reviewed and manually integrated into the maintained implementation by a maintainer or agent. Never recopy the raw drop over that implementation.
- Initial intake may add missing standard metadata such as character encoding (`<meta charset="utf-8">`), a descriptive title, and a responsive viewport.

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
4. **Action**: High-visibility "Play Game" button directing to the stable local endpoint or external playable URL.
5. **Direct Link / Copy Link**: Quick way to copy or open the direct URL.
6. **Hosting Indicator**: External games are identified as externally hosted.

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
  - Rules of engagement (never edit `games/` raw files; maintain `public/` game implementations without overwriting them from raw drops).
  - Pointer to `.agents/skills/game-intake` for one-time onboarding of genuinely new games.

### 6.3 `.agents/skills/game-intake/SKILL.md`
- Standard Agent Skill format (agentic YAML frontmatter + concise operational instructions).
- Teaches agents how to:
  1. Add a genuinely new title to the intake manifest.
  2. Create its initial file at `public/games/<slug>/index.html`, refusing to overwrite an existing endpoint.
  3. Update `public/index.html` card metadata and documentation.
  4. Leave updates to existing games for manual or agent-assisted integration into their maintained versions.
