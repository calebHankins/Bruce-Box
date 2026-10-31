---
name: game-intake
description: Ingests raw browser game drops from Bruce Baskir into stable public GitHub Pages endpoints with zero-mutation preservation.
---

# Game Intake Skill

Use this skill whenever a new game drop is added to `games/` or an existing game receives a new version file from creator Bruce Baskir.

## Operational Rules

1. **Never edit files in `games/`**: Treat `games/` as an immutable drop folder.
2. **Deterministic slug paths**: Target games into `public/games/<slug>/index.html`. Always retain game version numbers in the slug (e.g. `ecohex4`, `hopper2`).
3. **Preserve game mechanics**: Do not refactor canvas logic, algorithms, or inline styles.

## Ingestion Workflow

### Step 1: Update the Manifest
Open `.agents/skills/game-intake/sync-games.mjs` and ensure the game is listed in `GAME_MANIFEST`:

```javascript
{
  title: 'Game Title',
  rawFile: 'games/raw-filename.html',
  slug: 'game-slug-with-version',
  targetDir: 'public/games/game-slug-with-version',
  targetFile: 'public/games/game-slug-with-version/index.html',
  endpoint: '/games/game-slug-with-version/',
  badge: 'v1',
  genre: 'Genre Name',
  summary: '1-2 sentence description extracted from in-game instructions.'
}
```

### Step 2: Run the Sync Script
Run the sync script to copy and adapt the file safely:

```bash
# Dry run check
node .agents/skills/game-intake/sync-games.mjs --dry-run

# Execute sync
node .agents/skills/game-intake/sync-games.mjs
```

### Step 3: Update `public/index.html`
Add or update the `<article class="game-card">` for the game inside `public/index.html`. Ensure:
- `game-title` displays the friendly title.
- `badge` reflects the version.
- `btn-play` links to `games/<slug>/`.
- `direct-link-input` and `btn-copy` reference `games/<slug>/`.

### Step 4: Update Documentation
Update `README.md` catalog table with the new title, genre, and endpoint link.

### Step 5: Test Locally
Run `node scripts/serve.mjs` and navigate to `http://localhost:8080/games/<slug>/` to confirm the game loads and functions without errors.
