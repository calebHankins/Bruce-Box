# Bruce-Box Arcade

A lightweight, zero-dependency browser games arcade hosted on GitHub Pages, featuring original HTML/JS games designed and created by **Bruce Baskir**.

The arcade features a framework-free catalog landing page, responsive dark arcade styling, and permanent stable URLs for every game title.

## Live Site

- **Arcade Showcase**: [Bruce-Box/](https://calebHankins.github.io/Bruce-Box/) *(or your configured GitHub Pages domain)*

## Game Catalog

| Game | Stable URL Endpoint | Raw Source | Genre | Description |
| :--- | :--- | :--- | :--- | :--- |
| **EcoHex 4** | [`/games/ecohex4/`](public/games/ecohex4/) | `games/ecohex4.html` | Strategy | Build an ecosystem of fungi, plants, herbivores, and carnivores with adjacency scoring. |
| **Hopper 2** | [`/games/hopper2/`](public/games/hopper2/) | `games/Hopper2 (3).html` | Puzzle | Jump over tiles to collect mushroom pigments and rescue animal friends. |
| **My Garden Grow** | [`/games/my-garden-grow/`](public/games/my-garden-grow/) | `games/MyGardenGrow.html` | Puzzle / Sim | Manage tool effort over 5 garden years to turn a weeded plot into a pristine garden. |
| **Smother 3** | [`/games/smother3/`](public/games/smother3/) | `games/smother3.html` | Maze / Evasion | Navigate to the goal star while avoiding sentient moving walls that attempt to trap you. |

## Local Development & Preview

Bruce-Box requires no external npm dependencies, build tools, or runtime frameworks. A built-in Node.js HTTP server script is provided for local testing:

```bash
# Start local static server (using npm or directly with node)
npm start
# or
node scripts/serve.mjs
```

To re-sync game drops from `games/` to `public/games/`:

```bash
npm run sync-games
```

Then open [http://localhost:8080](http://localhost:8080) in any modern browser.

Press `Ctrl+C` to stop the preview server.

## Repository Architecture

```text
Bruce-Box/
├── .agents/skills/game-intake/  # Agent skill and script for syncing raw game drops
├── .github/workflows/deploy.yml # Automated GitHub Pages deployment
├── games/                       # Raw, unmodified drops received from Bruce
├── public/                      # Web root deployed to GitHub Pages
│   ├── css/style.css            # Framework-free arcade styling
│   ├── games/<slug>/index.html  # Stable, durable game endpoints
│   └── index.html               # Main Bruce-Box arcade landing page
├── scripts/serve.mjs            # Zero-dependency local preview server
├── AGENTS.md                    # Instructions and boundaries for AI coding agents
├── CONTRIBUTING.md              # Human maintainer guidelines
├── LICENSE                      # MIT License
└── README.md
```

## Creator Credits

All original games were conceived, coded, and illustrated in vanilla JavaScript by **Bruce Baskir**. Maintained and published with permission.

## License

This project is licensed under the [MIT License](LICENSE) - provided "as is" with no warranty or support liability.
