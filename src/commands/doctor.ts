import { accessSync, constants } from "node:fs";
import { join } from "node:path";
import { compileClaudeRule, compileCursorRule } from "../adapt/compile.js";
import {
  loadClaudeAdapter,
  loadCursorAdapter,
  loadManifest,
} from "../manifest.js";
import { packRoot } from "../paths.js";

export type DoctorReport = {
  ok: boolean;
  messages: string[];
};

export function runDoctor(cwd: string): DoctorReport {
  const messages: string[] = [];
  let ok = true;

  try {
    const root = packRoot();
    messages.push(`pack root: ${root}`);
    const manifest = loadManifest();
    messages.push(`pack version: ${manifest.version}`);
    loadCursorAdapter();
    loadClaudeAdapter();
    messages.push("adapters: ok");
    compileCursorRule({
      description: "test",
      alwaysApply: true,
      body: "# hi\n",
    });
    compileClaudeRule({
      paths: ["docs/**"],
      body: "# hi\n",
    });
    messages.push("compile: ok");
  } catch (e) {
    ok = false;
    messages.push(`pack error: ${e instanceof Error ? e.message : String(e)}`);
  }

  try {
    accessSync(cwd, constants.W_OK);
    messages.push(`cwd writable: ${cwd}`);
  } catch {
    ok = false;
    messages.push(`cwd not writable: ${cwd}`);
  }

  for (const dir of [".cursor/rules", ".claude/rules", ".jarvis"]) {
    messages.push(`target ${join(cwd, dir)} (created on install)`);
  }

  return { ok, messages };
}
