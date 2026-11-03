# Contributing to Bruce-Box

Thank you for your interest in maintaining or contributing to the Bruce-Box!

Bruce-Box is a lightweight showcase website hosted on GitHub Pages that archives and presents browser games created by **Bruce Baskir**.

---

## Guiding Principles

1. **Zero External Runtime Dependencies**: The published site (`public/`) must remain 100% vanilla HTML5, modern CSS3, and browser JavaScript. Do not introduce npm frameworks, bundlers (Vite, Webpack), or CSS preprocessors.
2. **Immutability of Raw Drops**: The `games/` directory contains original game files exactly as delivered by Bruce. Never edit, reformat, or alter files inside `games/`.
3. **Stable Game Links**: Each catalog entry must link to a stable playable URL. Bruce-Box-hosted games use a predictable, versioned path under `public/games/<slug>/index.html` (e.g. `/games/ecohex4/`); games hosted elsewhere link directly to their external URL and are identified as external.
4. **Maintain Published Games**: `public/games/` contains maintained versions that may include fixes and adaptations beyond the original raw drops. Do not overwrite them from `games/`. Review each new Bruce contribution and manually integrate relevant changes into the maintained game with appropriate testing.

---

## Adding a New Game or Updating an Existing One

When Bruce delivers a new game file:

1. **Add Raw File to `games/`**:
   Place the raw file in `games/` without renaming or modifying it (e.g. `games/smother4.html`).

2. **Create the Initial Published Copy**:
   For a genuinely new title only, add its mapping to `GAME_MANIFEST` and run the one-time intake helper. It refuses to overwrite an existing endpoint:

   ```bash
   node .agents/skills/game-intake/intake-game.mjs --slug <slug>
   ```

3. **Update the Landing Page (`public/index.html`)**:
   Add a new `<article class="game-card">` entry with the game title, genre, description, and direct link. For an external game, use an external-host badge and link to its stable playable URL instead of creating a local copy.

4. **Update Documentation**:
   Add the new title to the catalog table in [`README.md`](README.md).

For an update to an existing game, keep the raw contribution unchanged in `games/` and review it against the maintained copy in `public/games/`. Manually integrate the intended changes (or have an agent do so), preserving existing fixes and adaptations; never use the one-time intake helper to update an existing endpoint.

---

## Local Preview & Verification

Test changes locally using the built-in Node.js static server:

```bash
node scripts/serve.mjs
```

Verify:

- The landing page at `http://localhost:8080/` loads cleanly.
- Bruce-Box-hosted game links navigate to `/games/<slug>/`; external game links open the intended hosted game.
- Each game runs without console errors.

---

## Submitting Pull Requests

1. Create a descriptive feature branch (e.g. `game/smother4` or `docs/update-guide`).
2. Verify all links and gameplay locally.
3. Open a Pull Request against the `main` branch. GitHub Actions will automatically deploy to GitHub Pages once merged.
