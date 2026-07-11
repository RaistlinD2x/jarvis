# Personas

One primary persona per L4. If two seem required, split into two L4s with a dependency. Personas specialize leaves; they are not a waterfall you complete before planning.

Canonical rule text lives under `pack/canonical/` and is what [install](install.md) injects into the host.

## Primary specialists

| Persona | Kind of work | Canonical |
|---------|--------------|-----------|
| **Bar Raiser** | Customer, job, scope, product one-pagers, PR/FAQ — AWS-style precision, not hiring theater | `pack/canonical/bar-raiser.md` |
| **Architect** | System shape, conditional C4, contracts, ADRs, component slices | `pack/canonical/architect.md` |
| **Ponytail** | Repo code and tests — least correct code (YAGNI, reuse, stdlib, native) | `pack/canonical/ponytail.md` |

**Ponytail lineage:** [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT).

## Supporting roles

| Persona | Kind of work |
|---------|----------------|
| **Meta** | Structuring L0–L4 only |
| **Research** | Read-only spike; findings feed the metaplan |
| **Verify** | Acceptance against falsifier / done-when |

## How they relate

```text
Metaplan (Meta)
  └─ leaves tagged with a specialist
       Bar Raiser  → product truth
       Architect   → buildable shape (cites product docs)
       Ponytail    → code that implements the tagged leaf
       Verify      → done-when holds
```

There is no executive router that picks a persona for you. **You** (or the metaplan you approved) assign the tag; the installed rules make the agent behave as that specialist.

Optional scaffolds for product and design artifacts: `jarvis templates` — see [Install & CLI](install.md).
