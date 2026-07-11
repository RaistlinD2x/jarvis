import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Pack root: dist/../pack when built, or repo pack/ when running via tsx from src/ */
export function packRoot(): string {
  const fromDist = resolve(__dirname, "..", "pack");
  if (existsSync(join(fromDist, "manifest.json"))) return fromDist;
  const fromSrc = resolve(__dirname, "..", "..", "pack");
  if (existsSync(join(fromSrc, "manifest.json"))) return fromSrc;
  throw new Error("Cannot find pack/manifest.json");
}

export function projectJarvisDir(cwd: string): string {
  return join(cwd, ".jarvis");
}

export function ensureDir(path: string): void {
  mkdirSync(path, { recursive: true });
}

export function writeFileEnsured(path: string, content: string): void {
  ensureDir(dirname(path));
  writeFileSync(path, content, "utf8");
}

export function readText(path: string): string {
  return readFileSync(path, "utf8");
}

export function tryReadText(path: string): string | null {
  if (!existsSync(path)) return null;
  return readFileSync(path, "utf8");
}

export function sha256(content: string): string {
  return createHash("sha256").update(content, "utf8").digest("hex");
}

export function listFilesRecursive(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...listFilesRecursive(full));
    else out.push(full);
  }
  return out;
}

export function removeFileIfExists(path: string): boolean {
  if (!existsSync(path)) return false;
  rmSync(path);
  return true;
}
