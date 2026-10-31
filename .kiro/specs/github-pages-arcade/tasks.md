# Implementation Tasks: Bruce-Box GitHub Pages & Arcade Setup

## Task List

- [x] **Task 1: Establish Project Structure & Web Directory**
  - [x] 1.1 Create `public/` web root directory and `public/games/` subdirectories for each title retaining game numbers: `ecohex4`, `hopper2`, `my-garden-grow`, `smother3`.
  - [x] 1.2 Copy raw game files from `games/` to their target stable paths (`public/games/<slug>/index.html`) with zero destructive code changes.
  - [x] 1.3 Verify standalone execution and relative resource integrity for each migrated game.

- [x] **Task 2: Build the Framework-Free Landing Page**
  - [x] 2.1 Create `public/css/style.css` with a responsive, modern arcade/indie theme using pure CSS (CSS grid/flexbox, custom properties, dark-mode aesthetic).
  - [x] 2.2 Create `public/index.html` featuring:
    - Bruce-Box header and introduction honoring Bruce Baskir's creations.
    - Card grid linking to all 4 stable endpoints (`/games/ecohex4/`, `/games/hopper2/`, `/games/my-garden-grow/`, `/games/smother3/`).
    - Gameplay summaries extracted from game files.
    - Shareable direct link snippets for each game.
    - Footer with project and license info.
  - [x] 2.3 Add a lightweight, non-invasive return navigation / home button snippet or wrapper across game endpoints where appropriate.

- [x] **Task 3: Configure GitHub Pages CI/CD Workflow**
  - [x] 3.1 Create `.github/workflows/deploy.yml` using GitHub Actions (`actions/configure-pages@v5`, `actions/upload-pages-artifact@v3`, `actions/deploy-pages@v4`).
  - [x] 3.2 Configure trigger on `main` branch push and `workflow_dispatch`.
  - [x] 3.3 Set publication artifact path to `./public`.

- [x] **Task 4: Author Project Governance & Documentation**
  - [x] 4.1 Create `LICENSE` file using the MIT License (no warranty, no support liability).
  - [x] 4.2 Create `README.md` with project description, live URL pointer, game catalog, and local preview instructions.
  - [x] 4.3 Create `CONTRIBUTING.md` with guidelines for human maintainers on adding/updating game drops and submitting PRs.

- [x] **Task 5: Author Agent Governance & Skills (`AGENTS.md` + `.agents/skills`)**
  - [x] 5.1 Create `AGENTS.md` following [agents.md](https://agents.md/) standards:
    - High-level project architecture.
    - Strict boundary rules (treat `games/` as immutable raw drops; maintain stable endpoints in `public/games/`).
    - Guidance to leverage `.agents/skills/game-intake`.
  - [x] 5.2 Create `.agents/skills/game-intake/SKILL.md` following [Agent Skills specification](https://agentskills.io/home):
    - Frontmatter (`name`, `description`).
    - Step-by-step instructions for one-time intake of a genuinely new title, distinct from updates to maintained games.
    - Checklist for updating landing page cards when new games are added.
  - [x] 5.3 Create `.agents/skills/game-intake/intake-game.mjs` as a vanilla JavaScript helper runnable with Node.js to create the initial copy for one selected new game. Require an explicit slug and refuse to overwrite an existing endpoint; use Node.js built-in modules only.

- [x] **Task 6: Verification & Validation**
  - [x] 6.1 Create `scripts/serve.mjs`, a vanilla JavaScript static HTTP server using Node.js built-in modules only, and document `node scripts/serve.mjs` as the local preview command.
  - [x] 6.2 Test local static serving of `public/` with `node scripts/serve.mjs`; no Python, PowerShell, external packages, or build step may be required.
  - [x] 6.3 Validate link integrity: Landing page -> each game, and verify all 4 games load without JavaScript or path errors.
  - [x] 6.4 Verify all files requested in `mood_board.md` are accounted for and properly linked.
