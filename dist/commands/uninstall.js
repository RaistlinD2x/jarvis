import { join } from "node:path";
import { stripMarkedBlock } from "../adapt/markers.js";
import { loadManifest } from "../manifest.js";
import { projectJarvisDir, removeFileIfExists, tryReadText, writeFileEnsured, } from "../paths.js";
export function runUninstall(cwd) {
    const removed = [];
    const lockPath = join(projectJarvisDir(cwd), "lock.json");
    const raw = tryReadText(lockPath);
    const manifest = loadManifest();
    const candidates = new Set([
        ...manifest.managedFiles.cursor,
        ...manifest.managedFiles["claude-code"],
        ...manifest.managedFiles.spine,
    ]);
    if (raw) {
        const lock = JSON.parse(raw);
        for (const rel of Object.keys(lock.files))
            candidates.add(rel);
    }
    for (const rel of candidates) {
        const abs = join(cwd, rel);
        if (rel === "AGENTS.md" || rel === "CLAUDE.md") {
            const content = tryReadText(abs);
            if (!content)
                continue;
            const next = stripMarkedBlock(content);
            if (next === null) {
                removeFileIfExists(abs);
                removed.push(rel);
            }
            else {
                writeFileEnsured(abs, next);
                removed.push(`${rel} (markers stripped)`);
            }
            continue;
        }
        if (removeFileIfExists(abs))
            removed.push(rel);
    }
    removeFileIfExists(join(projectJarvisDir(cwd), "lock.json"));
    removeFileIfExists(join(projectJarvisDir(cwd), "config.json"));
    removed.push(".jarvis/lock.json", ".jarvis/config.json");
    return removed;
}
