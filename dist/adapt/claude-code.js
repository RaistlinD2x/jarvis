import { join } from "node:path";
import { compileClaudeRule } from "./compile.js";
import { agentsSpineContent, claudeSpineContent, mergeMarkedBlock, } from "./markers.js";
import { canonicalBody, doctrineBody, loadClaudeAdapter, loadManifest, } from "../manifest.js";
import { sha256, tryReadText, writeFileEnsured } from "../paths.js";
export function installClaudeRules(cwd) {
    const adapter = loadClaudeAdapter();
    const manifest = loadManifest();
    const hashes = {};
    for (const ruleId of manifest.rules) {
        const cfg = adapter.rules[ruleId];
        if (!cfg)
            throw new Error(`Missing claude-code adapter entry for ${ruleId}`);
        const content = compileClaudeRule({
            description: cfg.description,
            paths: cfg.paths,
            body: canonicalBody(ruleId),
        });
        const abs = join(cwd, cfg.out);
        writeFileEnsured(abs, content);
        hashes[cfg.out] = sha256(content);
    }
    const agentsPath = join(cwd, adapter.spine.agents);
    const agentsInner = agentsSpineContent(doctrineBody());
    const agentsMerged = mergeMarkedBlock(tryReadText(agentsPath), agentsInner);
    writeFileEnsured(agentsPath, agentsMerged);
    hashes[adapter.spine.agents] = sha256(agentsMerged);
    const claudePath = join(cwd, adapter.spine.claude);
    const claudeMerged = mergeMarkedBlock(tryReadText(claudePath), claudeSpineContent());
    writeFileEnsured(claudePath, claudeMerged);
    hashes[adapter.spine.claude] = sha256(claudeMerged);
    return hashes;
}
