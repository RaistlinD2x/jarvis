import { createHash } from "node:crypto";
import { join } from "node:path";
import { installClaudeRules } from "../adapt/claude-code.js";
import { installCursorRules } from "../adapt/cursor.js";
import { agentsSpineContent, mergeMarkedBlock, } from "../adapt/markers.js";
import { defaultConfig, doctrineBody, loadManifest, } from "../manifest.js";
import { projectJarvisDir, tryReadText, writeFileEnsured, } from "../paths.js";
export function resolveHosts(host) {
    if (host === "all")
        return ["cursor", "claude-code"];
    if (host === "cursor" || host === "claude-code")
        return [host];
    throw new Error(`Unknown host: ${host}. Use cursor, claude-code, or all.`);
}
export function installProject(cwd, hosts) {
    const manifest = loadManifest();
    const files = {};
    if (hosts.includes("cursor")) {
        Object.assign(files, installCursorRules(cwd));
    }
    if (hosts.includes("claude-code")) {
        Object.assign(files, installClaudeRules(cwd));
    }
    else if (hosts.includes("cursor")) {
        const agentsPath = join(cwd, "AGENTS.md");
        const merged = mergeMarkedBlock(tryReadText(agentsPath), agentsSpineContent(doctrineBody()));
        writeFileEnsured(agentsPath, merged);
        files["AGENTS.md"] = createHash("sha256")
            .update(merged, "utf8")
            .digest("hex");
    }
    const config = defaultConfig(hosts, manifest.version);
    const lock = {
        packVersion: manifest.version,
        hosts,
        files,
        installedAt: new Date().toISOString(),
    };
    const jarvisDir = projectJarvisDir(cwd);
    writeFileEnsured(join(jarvisDir, "config.json"), `${JSON.stringify(config, null, 2)}\n`);
    writeFileEnsured(join(jarvisDir, "lock.json"), `${JSON.stringify(lock, null, 2)}\n`);
    return lock;
}
