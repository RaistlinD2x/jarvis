import {
  existsSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { installProject } from "../src/commands/install.js";
import { runDoctor } from "../src/commands/doctor.js";
import { runStatus } from "../src/commands/status.js";
import { runTemplates } from "../src/commands/templates.js";
import { runUninstall } from "../src/commands/uninstall.js";
import { runUpdate } from "../src/commands/update.js";

function tempProject(): string {
  return mkdtempSync(join(tmpdir(), "jarvis-"));
}

describe("installProject", () => {
  it("installs cursor and claude-code files", () => {
    const cwd = tempProject();
    const lock = installProject(cwd, ["cursor", "claude-code"]);
    expect(lock.packVersion).toBe("0.1.0");
    expect(existsSync(join(cwd, ".cursor/rules/metaplanning.mdc"))).toBe(true);
    expect(existsSync(join(cwd, ".cursor/rules/ponytail.mdc"))).toBe(true);
    expect(existsSync(join(cwd, ".claude/rules/architect.md"))).toBe(true);
    expect(existsSync(join(cwd, "AGENTS.md"))).toBe(true);
    expect(existsSync(join(cwd, "CLAUDE.md"))).toBe(true);
    expect(readFileSync(join(cwd, "CLAUDE.md"), "utf8")).toContain("@AGENTS.md");
    expect(
      readFileSync(join(cwd, ".cursor/rules/metaplanning.mdc"), "utf8"),
    ).toContain("alwaysApply: true");
    expect(
      readFileSync(join(cwd, ".claude/rules/bar-raiser.md"), "utf8"),
    ).toContain("paths:");
    expect(existsSync(join(cwd, ".jarvis/lock.json"))).toBe(true);
    expect(existsSync(join(cwd, ".jarvis/config.json"))).toBe(true);
  });

  it("is idempotent on re-install", () => {
    const cwd = tempProject();
    installProject(cwd, ["claude-code"]);
    installProject(cwd, ["claude-code"]);
    const agents = readFileSync(join(cwd, "AGENTS.md"), "utf8");
    expect(agents.match(/jarvis:start/g)?.length).toBe(1);
  });

  it("preserves user CLAUDE.md content outside markers", () => {
    const cwd = tempProject();
    writeFileSync(join(cwd, "CLAUDE.md"), "# Mine\n\nDo not delete.\n");
    installProject(cwd, ["claude-code"]);
    const content = readFileSync(join(cwd, "CLAUDE.md"), "utf8");
    expect(content).toContain("# Mine");
    expect(content).toContain("Do not delete.");
    expect(content).toContain("@AGENTS.md");
  });
});

describe("status / update / uninstall", () => {
  it("reports clean status then drift", () => {
    const cwd = tempProject();
    installProject(cwd, ["cursor"]);
    const clean = runStatus(cwd);
    expect(clean.installed).toBe(true);
    expect(clean.drift).toEqual([]);
    writeFileSync(join(cwd, ".cursor/rules/metaplanning.mdc"), "tampered\n");
    const dirty = runStatus(cwd);
    expect(dirty.drift.length).toBeGreaterThan(0);
  });

  it("update and uninstall work", () => {
    const cwd = tempProject();
    installProject(cwd, ["cursor", "claude-code"]);
    runUpdate(cwd);
    const removed = runUninstall(cwd);
    expect(removed.some((r) => r.includes("metaplanning"))).toBe(true);
    expect(existsSync(join(cwd, ".cursor/rules/metaplanning.mdc"))).toBe(false);
    expect(runStatus(cwd).installed).toBe(false);
  });
});

describe("templates and doctor", () => {
  it("writes templates", () => {
    const cwd = tempProject();
    const written = runTemplates(cwd);
    expect(written.length).toBeGreaterThan(0);
    expect(existsSync(join(cwd, "docs/product/problems/_template.md"))).toBe(
      true,
    );
  });

  it("doctor ok", () => {
    const cwd = tempProject();
    const report = runDoctor(cwd);
    expect(report.ok).toBe(true);
  });
});
