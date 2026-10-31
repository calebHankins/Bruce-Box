---
name: game-intake
description: Creates the initial published copy for a genuinely new Bruce Baskir browser game; never overwrites maintained game endpoints.
---

# Game Intake Skill

Use this skill only when adding a genuinely new title. Existing games in `public/games/` are maintained versions that may include fixes and adaptations; updates from Bruce must be reviewed and manually integrated (by a maintainer or agent), never recopied over the published version.

## Operational Rules

1. **Never edit files in `games/`**: Treat `games/` as an immutable drop folder.
2. **Deterministic slug paths**: Target games into `public/games/<slug>/index.html`. Always retain game version numbers in the slug (e.g. `ecohex4`, `hopper2`).
3. **Never overwrite a published game**: The helper refuses to write when the target endpoint already exists. Do not remove that guard to update a title.
4. **Initial conversion only**: The helper can add missing standard metadata, but it does not convert an existing maintained game or integrate updates.

## Ingestion Workflow

### Step 1: Update the Manifest
Add the new title to `GAME_MANIFEST` in `.agents/skills/game-intake/intake-game.mjs`:

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

### Step 2: Create the Initial Copy
Select only the new game's slug. The helper requires an explicit slug and refuses to overwrite an existing target:

```bash
# Dry run check
node .agents/skills/game-intake/intake-game.mjs --slug <slug> --dry-run

# Create the initial published copy
node .agents/skills/game-intake/intake-game.mjs --slug <slug>
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
