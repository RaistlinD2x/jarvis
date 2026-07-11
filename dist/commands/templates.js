import { readdirSync } from "node:fs";
import { join } from "node:path";
import { packRoot, readText, writeFileEnsured } from "../paths.js";
const TEMPLATE_MAP = {
    "metaplan.md": ".cursor/plans/metaplan.template.md",
    "problem-one-pager.md": "docs/product/problems/_template.md",
    "decision-one-pager.md": "docs/product/decisions/_template.md",
    "prfaq.md": "docs/product/prfaq/_template.md",
    "adr.md": "docs/design/adr/_template.md",
    "component-slice.md": "docs/design/components/_template.md",
};
export function runTemplates(cwd) {
    const srcDir = join(packRoot(), "templates");
    const written = [];
    for (const name of readdirSync(srcDir)) {
        const destRel = TEMPLATE_MAP[name];
        if (!destRel)
            continue;
        const content = readText(join(srcDir, name));
        const abs = join(cwd, destRel);
        writeFileEnsured(abs, content);
        written.push(destRel);
    }
    return written;
}
