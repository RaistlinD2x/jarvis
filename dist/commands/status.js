import { join } from "node:path";
import { loadManifest } from "../manifest.js";
import { projectJarvisDir, sha256, tryReadText, } from "../paths.js";
export function runStatus(cwd) {
    const manifest = loadManifest();
    const lockPath = join(projectJarvisDir(cwd), "lock.json");
    const raw = tryReadText(lockPath);
    if (!raw) {
        return {
            installed: false,
            currentPackVersion: manifest.version,
            drift: [],
            missing: [],
        };
    }
    const lock = JSON.parse(raw);
    const drift = [];
    const missing = [];
    for (const [rel, expected] of Object.entries(lock.files)) {
        const content = tryReadText(join(cwd, rel));
        if (content === null) {
            missing.push(rel);
            continue;
        }
        if (sha256(content) !== expected)
            drift.push(rel);
    }
    return {
        installed: true,
        packVersion: lock.packVersion,
        currentPackVersion: manifest.version,
        hosts: lock.hosts,
        drift,
        missing,
    };
}
