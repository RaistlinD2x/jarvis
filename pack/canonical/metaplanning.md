# Metaplanning

Metaplanning is **above all activities**. Research, product docs, architecture, code, reviews — every non-trivial ask becomes an L0→L4 tree (or an explicit trivial waiver). Personas specialize leaves; they are not a pipeline you finish before planning.

There is no executive router. The metaplan assigns **persona** and **model** on each node. Execution honors those tags.

## Levels

| Level | What it is |
|-------|------------|
| **L0** | Master metaplan — outcome, constraints, list of L1 plans |
| **L1** | Major plans / workstreams |
| **L2** | Subplans under each L1 |
| **L3** | Sequenced packages — **deps and order live here** |
| **L4** | Executable tasks — **persona + model required** |

Never produce a flat task list as the plan. Every L0 item decomposes until L4s are executable.

## Required fields on every node

```text
#<id>  <title>
  persona:  BarRaiser | Architect | Ponytail | Research | Meta | Verify
  model:    simple | complex
  deps:     none | #ids...
  parallel: yes | no
  inputs:   [paths or node ids]
  output:   [artifact path or diff scope]
  done when: <falsifiable exit>
```

Tracking / todo lists must mirror the metaplan: each entry references its id and repeats persona, model, and deps.

## Model tags

Tag **logical** difficulty. Host maps live in `.jarvis/config.json`:

| Tag | Meaning | Cursor default | Claude Code default |
|-----|---------|----------------|---------------------|
| `simple` | Mechanical, clear spec, follow existing pattern | Composer 2.5 | Haiku-class (configurable) |
| `complex` | Ambiguous, architectural, cross-cutting, correctness-critical | Grok 4.5 High | Opus-class (configurable) |

L0–L2 planning itself is usually `complex`. Unsure → `complex`, then split Composer/simple leaves.

## Persona tags

| Persona | Kind of work |
|---------|----------------|
| **BarRaiser** | Customer, job, scope, product one-pagers, PR/FAQ |
| **Architect** | System shape, C4/flows, contracts, ADR, component design |
| **Ponytail** | Repo code and tests |
| **Research** | Read-only spike; findings feed the metaplan |
| **Meta** | Structuring L0–L4 only |
| **Verify** | Acceptance against falsifier / done-when |

One primary persona per L4. If two seem required, split into two L4s with a dependency.

## L3 sequencing (anti-rework)

1. Scope docs before design that assumes scope.
2. Design/contracts before code that implements them.
3. Shared types/contracts before multiple consumers.
4. Two edits to the same file → **not** parallel.
5. Parallel only when inputs/outputs are disjoint and deps allow.
6. Coherence that needs one agent → one node with one model — never merge separately tagged items at runtime.

## Trivial waiver

Skip a full tree only when **all** are true: single file (or trivial pair), no API/product ambiguity, no new dependency, clear mechanical ask, roughly under 30 minutes.

Output one line: `waiver: trivial; persona=Ponytail; model=simple` — then do it. If discovery reveals ambiguity, promote to a metaplan.

## Execution protocol

1. Human: "Metaplan only" | "Execute `#id`" | "Execute ready leaves."
2. Dispatch each L4 with the host-mapped model for its `simple`/`complex` tag. Do not silently swap models.
3. Deviation from model, deps, or persona → **STOP and ask**.
4. On complete: mark done, note artifacts, unblock dependents.
5. Do not expand scope inside an L4; open a new node instead.

Planning is not execution. Do not implement from a metaplan until the human asks to run a node.
