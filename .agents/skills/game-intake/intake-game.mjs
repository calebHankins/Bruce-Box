#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, '../../..');

/**
 * Manifest defining the initial intake mapping for new game titles.
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

/** Creates the initial published copy for one new game, never an update. */
export function intakeGame({ slug, dryRun = false } = {}) {
  if (!slug) {
    throw new Error('A game slug is required. Pass --slug <slug>.');
  }

  const game = GAME_MANIFEST.find((entry) => entry.slug === slug);
  if (!game) {
    throw new Error(`Unknown game slug: ${slug}. Add the new title to GAME_MANIFEST first.`);
  }

  const rawPath = resolve(REPO_ROOT, game.rawFile);
  const targetDirPath = resolve(REPO_ROOT, game.targetDir);
  const targetFilePath = resolve(REPO_ROOT, game.targetFile);

  if (!existsSync(rawPath)) {
    throw new Error(`Raw game file not found: ${game.rawFile} (resolved to ${rawPath})`);
  }

  if (existsSync(targetDirPath) || existsSync(targetFilePath)) {
    throw new Error(`Refusing to overwrite existing game endpoint: ${game.targetFile}`);
  }

  let content = readFileSync(rawPath, 'utf8');

  if (!/<meta\s+charset=/i.test(content) && /<head[^>]*>/i.test(content)) {
    content = content.replace(/<head[^>]*>/i, '$&\n\t\t<meta charset="utf-8">');
  }

  const titleTag = `<title>${game.title} - Bruce-Box</title>`;
  if (/<title[\s\S]*?<\/title>/i.test(content)) {
    content = content.replace(/<title[\s\S]*?<\/title>/i, titleTag);
  } else if (/<head[^>]*>/i.test(content)) {
    content = content.replace(/<head[^>]*>/i, `$&\n\t\t${titleTag}`);
  }

  if (!/<meta\s+name=["']viewport["']/i.test(content) && /<head[^>]*>/i.test(content)) {
    content = content.replace(/<head[^>]*>/i, '$&\n\t\t<meta name="viewport" content="width=device-width, initial-scale=1.0">');
  }

  if (!dryRun) {
    mkdirSync(targetDirPath, { recursive: true });
    writeFileSync(targetFilePath, content, 'utf8');
  }

  return {
    title: game.title,
    rawFile: game.rawFile,
    targetFile: game.targetFile,
    bytes: content.length
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const slugIndex = process.argv.indexOf('--slug');
  const slug = slugIndex >= 0 ? process.argv[slugIndex + 1] : undefined;
  const dryRun = process.argv.includes('--dry-run');

  try {
    const result = intakeGame({ slug, dryRun });
    console.log(`[game-intake] ${dryRun ? 'Dry run' : 'Created initial copy'}: ${result.title} (${result.rawFile} -> ${result.targetFile}, ${result.bytes} bytes)`);
  } catch (error) {
    console.error(`[game-intake] ${error.message}`);
    process.exitCode = 1;
  }
}