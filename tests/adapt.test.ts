import { describe, expect, it } from "vitest";
import { compileClaudeRule, compileCursorRule } from "../src/adapt/compile.js";
import {
  mergeMarkedBlock,
  stripMarkedBlock,
  MARKER_START,
} from "../src/adapt/markers.js";

describe("compileCursorRule", () => {
  it("emits alwaysApply frontmatter", () => {
    const out = compileCursorRule({
      description: "Metaplanning",
      alwaysApply: true,
      body: "# Metaplanning\n\nHello.\n",
    });
    expect(out).toContain("alwaysApply: true");
    expect(out).toContain("# Metaplanning");
    expect(out.startsWith("---\n")).toBe(true);
  });

  it("includes globs when set", () => {
    const out = compileCursorRule({
      description: "Bar",
      alwaysApply: false,
      globs: "docs/product/**/*",
      body: "# Bar\n",
    });
    expect(out).toContain("globs: docs/product/**/*");
    expect(out).toContain("alwaysApply: false");
  });
});

describe("compileClaudeRule", () => {
  it("emits paths list", () => {
    const out = compileClaudeRule({
      description: "Architect",
      paths: ["docs/design/**", "**/adr/**"],
      body: "# Architect\n",
    });
    expect(out).toContain("paths:");
    expect(out).toContain('"docs/design/**"');
    expect(out).toContain("# Architect");
  });

  it("omits frontmatter when no paths or description", () => {
    const out = compileClaudeRule({ body: "# Only body\n" });
    expect(out.startsWith("# Only body")).toBe(true);
  });
});

describe("markers", () => {
  it("inserts block into empty file", () => {
    const out = mergeMarkedBlock(null, "hello");
    expect(out).toContain(MARKER_START);
    expect(out).toContain("hello");
  });

  it("replaces existing block", () => {
    const first = mergeMarkedBlock("# Title\n", "v1");
    const second = mergeMarkedBlock(first, "v2");
    expect(second).toContain("# Title");
    expect(second).toContain("v2");
    expect(second).not.toContain("v1");
    expect(second.match(/jarvis:start/g)?.length).toBe(1);
  });

  it("strips block", () => {
    const withBlock = mergeMarkedBlock("keep me\n", "managed");
    const stripped = stripMarkedBlock(withBlock);
    expect(stripped).toContain("keep me");
    expect(stripped).not.toContain("managed");
  });
});
