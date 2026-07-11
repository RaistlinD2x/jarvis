import { join } from "node:path";
import { loadManifest, type LockFile } from "../manifest.js";
import {
  projectJarvisDir,
  sha256,
  tryReadText,
} from "../paths.js";

export type StatusReport = {
  installed: boolean;
  packVersion?: string;
  currentPackVersion: string;
  hosts?: string[];
  drift: string[];
  missing: string[];
};

export function runStatus(cwd: string): StatusReport {
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
  const lock = JSON.parse(raw) as LockFile;
  const drift: string[] = [];
  const missing: string[] = [];
  for (const [rel, expected] of Object.entries(lock.files)) {
    const content = tryReadText(join(cwd, rel));
    if (content === null) {
      missing.push(rel);
      continue;
    }
    if (sha256(content) !== expected) drift.push(rel);
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
