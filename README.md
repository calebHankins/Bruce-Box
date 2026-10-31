# Bruce-Box

A lightweight, zero-dependency browser games arcade hosted on GitHub Pages, featuring games designed and created by **Bruce Baskir**. Games may be hosted by Bruce-Box or linked from another host.

The arcade features a framework-free catalog landing page, responsive dark arcade styling, and stable links for every game title.

## Live Site

- **Showcase**: [Bruce-Box](https://calebHankins.github.io/Bruce-Box/)

## Game Catalog

| Game | Play URL | Genre | Description |
| :--- | :--- | :--- | :--- |
| **EcoHex 4** | [Play](https://calebhankins.github.io/Bruce-Box/games/ecohex4/) | Strategy | Build an ecosystem of fungi, plants, herbivores, and carnivores with adjacency scoring. |
| **Hopper 2** | [Play](https://calebhankins.github.io/Bruce-Box/games/hopper2/) | Puzzle | Jump over tiles to collect mushroom pigments and rescue animal friends. |
| **My Garden Grow** | [Play](https://calebhankins.github.io/Bruce-Box/games/my-garden-grow/) | Puzzle / Sim | Manage tool effort over 5 garden years to turn a weeded plot into a pristine garden. |
| **Smother 3** | [Play](https://calebhankins.github.io/Bruce-Box/games/smother3/) | Maze / Evasion | Navigate to the goal star while avoiding sentient moving walls that attempt to trap you. |
| **SoberLife-II** | [Play on GitHub Pages](https://calebhankins.github.io/SoberLife-II/) | Board game | Make it through the day by choosing activities and keeping stress under control. |

## Local Development & Preview

Bruce-Box requires no external npm dependencies, build tools, or runtime frameworks. A built-in Node.js HTTP server script is provided for local testing:

```bash
# Start local static server (using npm or directly with node)
npm start
# or
node scripts/serve.mjs
```

For a genuinely new title, the one-time intake helper can create its initial copy from a raw drop. It refuses to overwrite an existing published game:

```bash
node .agents/skills/game-intake/intake-game.mjs --slug <slug>
```

Existing games in `public/games/` are maintained versions and may include fixes and adaptations beyond the raw files in `games/`. Integrate Bruce's updates into those versions manually or with an agent; do not run the intake helper for an existing title. To feature a game hosted elsewhere, add a catalog card that links to its stable playable URL and mark it as externally hosted; do not copy it into `public/games/`.

Then open [http://localhost:8080](http://localhost:8080) in any modern browser.

Press `Ctrl+C` to stop the preview server.

## Repository Architecture

```text
Bruce-Box/
├── .agents/skills/game-intake/  # Agent skill and one-time new-game intake helper
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
