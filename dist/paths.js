import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync, } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
/** Pack root: dist/../pack when built, or repo pack/ when running via tsx from src/ */
export function packRoot() {
    const fromDist = resolve(__dirname, "..", "pack");
    if (existsSync(join(fromDist, "manifest.json")))
        return fromDist;
    const fromSrc = resolve(__dirname, "..", "..", "pack");
    if (existsSync(join(fromSrc, "manifest.json")))
        return fromSrc;
    throw new Error("Cannot find pack/manifest.json");
}
export function projectJarvisDir(cwd) {
    return join(cwd, ".jarvis");
}
export function ensureDir(path) {
    mkdirSync(path, { recursive: true });
}
export function writeFileEnsured(path, content) {
    ensureDir(dirname(path));
    writeFileSync(path, content, "utf8");
}
export function readText(path) {
    return readFileSync(path, "utf8");
}
export function tryReadText(path) {
    if (!existsSync(path))
        return null;
    return readFileSync(path, "utf8");
}
export function sha256(content) {
    return createHash("sha256").update(content, "utf8").digest("hex");
}
export function listFilesRecursive(dir) {
    if (!existsSync(dir))
        return [];
    const out = [];
    for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory())
            out.push(...listFilesRecursive(full));
        else
            out.push(full);
    }
    return out;
}
export function removeFileIfExists(path) {
    if (!existsSync(path))
        return false;
    rmSync(path);
    return true;
}
