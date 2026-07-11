# Install & CLI

Jarvis is a project-scoped rule pack injector for **Cursor** and **Claude Code** (macOS, Linux, Windows). Requires **Node.js 20+**. Files are copied (no symlinks).

Two different steps:

1. **Install the CLI** onto your machine (once).
2. **Inject rules** into a project directory (`jarvis install`).

Do **not** run `jarvis install` from your home directory — it treats cwd as the project and writes rule folders there.

## 1. Install the CLI

```bash
npm uninstall -g jarvis 2>/dev/null
npm install -g github:RaistlinD2x/jarvis
jarvis --help
```

If you previously linked a local checkout (`npm install -g /path/to/jarvis`), uninstall first — a leftover symlink makes npm fail with `ENOTDIR` on rename.

From this repo instead of GitHub:

```bash
npm pack
npm install -g ./jarvis-0.1.0.tgz
```

One-shot without a global install:

```bash
npx --yes github:RaistlinD2x/jarvis --help
```

> The bare npm name `jarvis` is an unrelated 2011 package with no CLI. Until this project is published under a scoped name (e.g. `@raistlind2x/jarvis`), install from GitHub as above.

## 2. Inject rules into a project

```bash
cd your-project
jarvis install --host all
jarvis templates   # optional product / design / metaplan scaffolds
```

Hosts: `cursor` | `claude-code` | `all` (default). Only `--scope project` is supported in v1.

## What gets written

| Host | Paths |
|------|--------|
| **Cursor** | `.cursor/rules/{metaplanning,bar-raiser,architect,ponytail}.mdc` |
| **Claude Code** | `.claude/rules/*.md`, `CLAUDE.md` (marked block with `@AGENTS.md`), `AGENTS.md` (doctrine spine) |
| **State** | `.jarvis/config.json` (model maps), `.jarvis/lock.json` (checksums) |

Pack source of truth: `pack/` (`manifest.json`, `canonical/`, `adapters/`, `templates/`).

## Commands

| Command | Purpose |
|---------|---------|
| `jarvis install` | Inject rules |
| `jarvis update` | Recompile and refresh managed files from the current pack |
| `jarvis status` | Show pack version and checksum drift |
| `jarvis uninstall` | Remove managed rule files and marked spine blocks |
| `jarvis doctor` | Pack / adapter / path sanity |
| `jarvis templates` | Copy product, design, and metaplan templates into the project |

### Templates map

| Pack template | Destination |
|---------------|-------------|
| `metaplan.md` | `.cursor/plans/metaplan.template.md` |
| `problem-one-pager.md` | `docs/product/problems/_template.md` |
| `decision-one-pager.md` | `docs/product/decisions/_template.md` |
| `prfaq.md` | `docs/product/prfaq/_template.md` |
| `adr.md` | `docs/design/adr/_template.md` |
| `component-slice.md` | `docs/design/components/_template.md` |

## Uninstall

```bash
jarvis uninstall
```

Removes managed rule files and marked blocks in `AGENTS.md` / `CLAUDE.md`. Edits outside those markers stay.

## Related

- [Metaplanning](metaplanning.md)
- [Personas](personas.md)
- [Model tags](models.md)
- [FAQ](faq.md)
