import { join } from "node:path";
import { compileCursorRule } from "./compile.js";
import {
  canonicalBody,
  loadCursorAdapter,
  loadManifest,
} from "../manifest.js";
import { sha256, writeFileEnsured } from "../paths.js";

export function installCursorRules(cwd: string): Record<string, string> {
  const adapter = loadCursorAdapter();
  const manifest = loadManifest();
  const hashes: Record<string, string> = {};

  for (const ruleId of manifest.rules) {
    const cfg = adapter.rules[ruleId];
    if (!cfg) throw new Error(`Missing cursor adapter entry for ${ruleId}`);
    const content = compileCursorRule({
      description: cfg.description,
      alwaysApply: cfg.alwaysApply,
      globs: cfg.globs,
      body: canonicalBody(ruleId),
    });
    const abs = join(cwd, cfg.out);
    writeFileEnsured(abs, content);
    hashes[cfg.out] = sha256(content);
  }
  return hashes;
}
