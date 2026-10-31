# Requirements Document: Bruce-Box GitHub Pages & Arcade Setup

## 1. Overview & Goals

Bruce-Box is a lightweight showcase website hosted on GitHub Pages that catalogs browser-based games created by Bruce Baskir. Games may be hosted in Bruce-Box or linked from another host. The system provides a clean, framework-free landing page ("Bruce-Box Arcade"), presents each game at a stable playable URL, and keeps raw original files isolated so new game drops from Bruce can be imported cleanly without overwriting release history.

The repository also includes standard project maintenance files: `README.md`, `LICENSE` (MIT), `AGENTS.md` (with `.agents/skills` for agent tooling), `CONTRIBUTING.md`, and an automated GitHub Actions deployment workflow for GitHub Pages.

---

## 2. User & Agent Personas

- **Player / End User**: Accesses the site via GitHub Pages, browses available games on the landing page, and launches games at direct, clean, shareable URLs (e.g., `/games/ecohex4/`).
- **Bruce Baskir (Creator)**: Continues creating single-file HTML/JS games; provides new versions or new titles without worrying about hosting architecture.
- **Maintainer / Human Contributor**: Reviews contributions, syncs new game drops into published endpoints, and updates documentation.
- **AI Coding Agent**: Reads `AGENTS.md` and `.agents/skills` to perform routine tasks (e.g., intake new games, test local preview, update landing page catalog) safely and consistently without polluting context.

---

## 3. Functional Requirements

### 3.1 Raw Preservation, One-Time Intake & Game Maintenance
- **FR-1.1 (Raw Preservation)**: The existing `games/` folder shall remain the untouched drop-zone for raw game files directly received from Bruce (e.g., `games/ecohex4.html`, `games/Hopper2 (3).html`, `games/MyGardenGrow.html`, `games/smother3.html`).
- **FR-1.2 (Clean Hosting Directory)**: Games hosted by Bruce-Box shall be exposed under stable canonical paths in the web root (e.g., `public/games/<slug>/index.html` or `public/games/<slug>.html`). The catalog may also link directly to games hosted elsewhere without copying their assets.
- **FR-1.3 (One-Time New-Game Intake)**: A helper may create the initial published copy of a genuinely new game and add missing standard metadata. It must require an explicit game selection and refuse to overwrite an existing endpoint. Existing published games are maintained implementations and may include fixes or adaptations beyond the raw drop; updates must be reviewed and manually integrated by a maintainer or agent, never blindly recopied from `games/`.
- **FR-1.4 (Stable Endpoints with Version Numbers)**: Each game's URL endpoint must retain its raw version/game number to reflect Bruce's original naming and remain stable across releases:
  - EcoHex 4: `/games/ecohex4/`
  - Hopper 2: `/games/hopper2/`
  - My Garden Grow: `/games/my-garden-grow/`
  - Smother 3: `/games/smother3/`

### 3.2 Landing Page (Bruce-Box Arcade)
- **FR-2.1 (Framework-Free Architecture)**: The landing page (`index.html`) must use pure HTML5, CSS3, and vanilla JavaScript with zero external frameworks or heavy runtime dependencies.
- **FR-2.2 (Game Catalog Presentation)**: The landing page must present a clean, aesthetic card or list view of all featured games, including:
  - Game Title
  - Short summary or description
  - Direct "Play Now" link to the stable playable URL, whether local or external
  - Bruce Baskir creator attribution; externally hosted entries are identified as external
- **FR-2.3 (Responsive & Accessible)**: The landing page must adapt cleanly across desktop, tablet, and mobile browsers with clear typography and keyboard/touch navigation.
- **FR-2.4 (Return Navigation)**: Bruce-Box-hosted games provide an intuitive way to return to the landing page. External game links open in a new tab so the catalog remains available.

### 3.3 CI/CD & GitHub Pages Deployment
- **FR-3.1 (GitHub Actions Workflow)**: A GitHub Actions workflow (`.github/workflows/deploy.yml` or `pages.yml`) must build/bundle the site directory and deploy directly to GitHub Pages using the official `actions/deploy-pages` action.
- **FR-3.2 (Trigger Condition)**: The workflow must run on push to the `main` branch and support manual triggers (`workflow_dispatch`).

### 3.4 Repository Documentation & Governance
- **FR-4.1 (README.md)**: Concise project overview, live site link, game listing, local development/preview instructions, and credits to Bruce Baskir.
- **FR-4.2 (LICENSE)**: An permissive, zero-warranty open-source license (MIT License) clarifying the code is provided "as is" with no warranty or support liability.
- **FR-4.3 (AGENTS.md & Agent Skills)**:
  - Concise `AGENTS.md` defining project guidelines, boundaries, and pointers to agent skills.
  - An Agent Skill in `.agents/skills/game-intake/` containing instructions and a vanilla JavaScript `.mjs` helper, runnable with Node.js, for one-time initial intake of a genuinely new title. It must not be an update or synchronization pipeline for existing published games.
- **FR-4.4 (CONTRIBUTING.md)**: Human-oriented instructions for adding a new game, updating existing games, reporting issues, and testing locally.
- **FR-4.5 (Node.js Maintenance Scripts)**: Any project-authored maintenance or local-server scripts must be vanilla JavaScript in `.mjs` files runnable with Node.js. Scripts must use only Node.js built-in modules; Python, PowerShell, external packages, and build tooling must not be required.

---

## 4. Non-Functional Requirements

- **NFR-1 (Portability & Simplicity)**: The static site must be testable locally using the repository's Node.js built-in static server (`node scripts/serve.mjs`) with no installation or build step. Node.js is needed only for local maintenance and preview; the deployed site is static and requires no server runtime.
- **NFR-2 (Performance)**: Page load time for the landing page should be virtually instantaneous (< 500ms on broadband), relying on lightweight native CSS and minimal assets.
- **NFR-3 (Context Efficiency for Agents)**: Documentation and skills must be terse, high-signal, and modular to prevent LLM context exhaustion.

---

## 5. Acceptance Criteria

1. A complete specification exists under `.kiro/specs/github-pages-arcade/` (`requirements.md`, `design.md`, `tasks.md`).
2. Landing page and hosted games are decoupled from raw drop files in `games/`.
3. Every game in `games/` has a corresponding stable endpoint.
4. GitHub Actions configuration is fully drafted and ready to deploy the static folder.
5. `README.md`, `LICENSE`, `AGENTS.md`, `.agents/skills/`, and `CONTRIBUTING.md` fulfill all specified governance requirements.
