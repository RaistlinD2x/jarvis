# Metaplanning

Metaplanning sits **above all activities**. Research, product docs, architecture, code, reviews — every non-trivial ask becomes an L0→L4 tree, or an explicit [trivial waiver](#trivial-waiver).

Personas specialize leaves. They are not a pipeline you finish before planning. There is no executive router: the metaplan assigns **persona** and **model** on each node; execution honors those tags.

Canonical rule text: `pack/canonical/metaplanning.md` (injected by the CLI).

## Levels

| Level | What it is |
|-------|------------|
| **L0** | Master metaplan — outcome, constraints, list of L1 plans |
| **L1** | Major plans / workstreams |
| **L2** | Subplans under each L1 |
| **L3** | Sequenced packages — **deps and order live here** |
| **L4** | Executable tasks — **persona + model required** |

Never produce a flat task list as the plan. Every L0 item decomposes until L4s are executable.

```text
L0  outcome + constraints
 L1  workstreams
  L2  subplans
   L3  sequenced packages   ← deps and order
    L4  executable tasks    ← persona + model
```

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

See [Personas](personas.md) and [Model tags](models.md).

## L3 sequencing (anti-rework)

1. Scope docs before design that assumes scope.
2. Design/contracts before code that implements them.
3. Shared types/contracts before multiple consumers.
4. Two edits to the same file → **not** parallel.
5. Parallel only when inputs/outputs are disjoint and deps allow.
6. Coherence that needs one agent → one node with one model — never merge separately tagged items at runtime.

## Trivial waiver

Skip a full tree only when **all** are true: single file (or trivial pair), no API/product ambiguity, no new dependency, clear mechanical ask, roughly under 30 minutes.

```text
waiver: trivial; persona=Ponytail; model=simple
```

If discovery reveals ambiguity, promote to a metaplan.

## Execution protocol

1. Human: `Metaplan only` · `Execute #id` · `Execute ready leaves`
2. Dispatch each L4 with the host-mapped model for its `simple` / `complex` tag. Do not silently swap models.
3. Deviation from model, deps, or persona → **stop and ask**
4. On complete: mark done, note artifacts, unblock dependents
5. Do not expand scope inside an L4; open a new node instead

**Planning is not execution.** Do not implement from a metaplan until the human asks to run a node.
