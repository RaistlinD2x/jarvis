# Model tags

Metaplans tag **logical** difficulty, not a vendor model string. The host maps each tag to a concrete model in `.jarvis/config.json` after install.

Canonical definitions also live in `pack/canonical/metaplanning.md`.

## Tags

| Tag | Meaning |
|-----|---------|
| `simple` | Mechanical, clear spec, follow an existing pattern |
| `complex` | Ambiguous, architectural, cross-cutting, or correctness-critical |

L0–L2 planning itself is usually `complex`. Unsure → `complex`, then split Composer / simple leaves.

## Default host maps

| Tag | Cursor default | Claude Code default |
|-----|----------------|---------------------|
| `simple` | Composer 2.5 | Haiku-class (configurable) |
| `complex` | Grok 4.5 High | Opus-class (configurable) |

Override per project in `.jarvis/config.json`. Do not silently swap models at execution time — if the tagged model is wrong, **stop and ask**.

## Related

- [Metaplanning](metaplanning.md) — where tags are required on every L4
- [Install & CLI](install.md) — where config is written
