# FAQ

## Why does `npx jarvis` fail?

The npm name [`jarvis`](https://www.npmjs.com/package/jarvis) is an unrelated 2011 package with **no executable**. This project is not that package. Use GitHub until a scoped publish lands:

```bash
npx --yes github:RaistlinD2x/jarvis install --host all
```

See [Install & CLI](install.md).

## Do I need a config file?

No. `jarvis install` writes `.jarvis/config.json` with default model maps. Edit it if your host’s model names differ. See [Model tags](models.md).

## Is Jarvis a router that picks the persona for me?

No. The metaplan assigns persona and model. Jarvis installs the rules that make agents honor those tags. You own irreversible calls and any deviation from the tagged sequence. See [Metaplanning](metaplanning.md).

## Can I use only Ponytail?

You can install and ignore personas — but the pack is designed as a system. Metaplanning without specialists is a tree with no workers; specialists without metaplanning is eager code. See [Personas](personas.md).

## What does “trivial waiver” mean?

A one-line escape hatch for clearly mechanical work (single file, no product/API ambiguity, no new dependency, ~under 30 minutes). If discovery reveals ambiguity, promote to a full metaplan. Details in [Metaplanning](metaplanning.md).

## Why “Jarvis”?

Metaplanning sits above the work — the layer that keeps the team coherent. The NES art is fan homage, not affiliation with any film or comic property.

## Where is the source of truth for agent behavior?

The injected pack under `pack/canonical/` (and host adapters), not these docs. Docs explain intent and mechanics; agents load the compiled rules after [install](install.md).

## License / credits

[MIT](../LICENSE) — Copyright (c) 2026 [RaistlinD2x](https://github.com/RaistlinD2x).

Ponytail lineage: [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT).
