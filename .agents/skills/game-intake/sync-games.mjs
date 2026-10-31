#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '../../..');

/**
 * Manifest defining the canonical mapping from raw drops to public endpoints.
 */
export const GAME_MANIFEST = [
  {
    title: 'EcoHex 4',
    rawFile: 'games/ecohex4.html',
    slug: 'ecohex4',
    targetDir: 'public/games/ecohex4',
    targetFile: 'public/games/ecohex4/index.html',
    endpoint: '/games/ecohex4/',
    badge: 'v4',
    genre: 'Ecosystem Strategy',
    summary: 'Greetings eco-engineer! Build a thriving hex ecosystem by placing mushrooms, plants, herbivores, and carnivores to maximize biological adjacency scoring.'
  },
  {
    title: 'Hopper 2',
    rawFile: 'games/Hopper2 (3).html',
    slug: 'hopper2',
    targetDir: 'public/games/hopper2',
    targetFile: 'public/games/hopper2/index.html',
    endpoint: '/games/hopper2/',
    badge: 'v2',
    genre: 'Hop & Match Puzzle',
    summary: "Help Hopper jump over squares to collect mushroom pigments and rescue friends! Manage your pigment inventory carefully to reach highest scores."
  },
  {
    title: 'My Garden Grow',
    rawFile: 'games/MyGardenGrow.html',
    slug: 'my-garden-grow',
    targetDir: 'public/games/my-garden-grow',
    targetFile: 'public/games/my-garden-grow/index.html',
    endpoint: '/games/my-garden-grow/',
    badge: 'v1',
    genre: 'Garden Simulation',
    summary: 'You have five years to turn your garden into a place of pride. Clear stubborn obstacles with randomized tools from your messy shed in this thoughtful puzzle.'
  },
  {
    title: 'Smother 3',
    rawFile: 'games/smother3.html',
    slug: 'smother3',
    targetDir: 'public/games/smother3',
    targetFile: 'public/games/smother3/index.html',
    endpoint: '/games/smother3/',
    badge: 'v3',
    genre: 'Retro Evasion Maze',
    summary: 'Use the arrow keys to reach the star in the bottom right corner. But beware -- when the walls awake, they will move dynamically and try to trap you!'
  }
];

/**
 * Syncs raw game files to their public endpoints while preserving game logic.
 */
export function syncGames({ dryRun = false } = {}) {
  const results = [];

  for (const game of GAME_MANIFEST) {
    const rawPath = resolve(REPO_ROOT, game.rawFile);
    const targetDirPath = resolve(REPO_ROOT, game.targetDir);
    const targetFilePath = resolve(REPO_ROOT, game.targetFile);

    if (!existsSync(rawPath)) {
      throw new Error(`Raw game file not found: ${game.rawFile} (resolved to ${rawPath})`);
    }

    let content = readFileSync(rawPath, 'utf8');

    // 1. Ensure <meta charset="utf-8"> exists
    if (!/<meta\s+charset=/i.test(content)) {
      if (/<head[^>]*>/i.test(content)) {
        content = content.replace(/<head[^>]*>/i, '$&\n\t\t<meta charset="utf-8">');
      }
    }

    // 2. Ensure standard <title> tag exists
    const titleTag = `<title>${game.title} - Bruce-Box Arcade</title>`;
    if (/<title[\s\S]*?<\/title>/i.test(content)) {
      content = content.replace(/<title[\s\S]*?<\/title>/i, titleTag);
    } else if (/<head[^>]*>/i.test(content)) {
      content = content.replace(/<head[^>]*>/i, `$&\n\t\t${titleTag}`);
    }

    // 3. Ensure responsive viewport meta tag exists if missing
    if (!/<meta\s+name=["']viewport["']/i.test(content)) {
      if (/<head[^>]*>/i.test(content)) {
        content = content.replace(/<head[^>]*>/i, '$&\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">');
      }
    }

    if (!dryRun) {
      if (!existsSync(targetDirPath)) {
        mkdirSync(targetDirPath, { recursive: true });
      }
      writeFileSync(targetFilePath, content, 'utf8');
    }

    results.push({
      title: game.title,
      rawFile: game.rawFile,
      targetFile: game.targetFile,
      bytes: content.length
    });
  }

  return results;
}

// Allow direct CLI execution
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const isDryRun = process.argv.includes('--dry-run');
  console.log(`[game-intake] Syncing games from games/ into public/games/ (dryRun=${isDryRun})...`);
  const synced = syncGames({ dryRun: isDryRun });
  for (const s of synced) {
    console.log(`  ✓ ${s.title}: ${s.rawFile} -> ${s.targetFile} (${s.bytes} bytes)`);
  }
  console.log(`[game-intake] Done. ${synced.length} games synchronized successfully.`);
}
