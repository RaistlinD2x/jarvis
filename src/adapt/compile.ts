export function compileCursorRule(opts: {
  description: string;
  alwaysApply: boolean;
  globs?: string;
  body: string;
}): string {
  const lines = ["---", `description: ${yamlEscape(opts.description)}`];
  if (opts.globs) lines.push(`globs: ${opts.globs}`);
  lines.push(`alwaysApply: ${opts.alwaysApply}`, "---", "", opts.body.trimEnd(), "");
  return lines.join("\n");
}

export function compileClaudeRule(opts: {
  description?: string;
  paths?: string[];
  body: string;
}): string {
  const hasFront =
    (opts.paths && opts.paths.length > 0) || Boolean(opts.description);
  if (!hasFront) return `${opts.body.trimEnd()}\n`;

  const lines = ["---"];
  if (opts.description) lines.push(`description: ${yamlEscape(opts.description)}`);
  if (opts.paths && opts.paths.length > 0) {
    lines.push("paths:");
    for (const p of opts.paths) lines.push(`  - ${JSON.stringify(p)}`);
  }
  lines.push("---", "", opts.body.trimEnd(), "");
  return lines.join("\n");
}

function yamlEscape(s: string): string {
  if (/[:#\[\]{},&*?|>!%@`]/.test(s) || s.includes("\n")) {
    return JSON.stringify(s);
  }
  return s;
}
