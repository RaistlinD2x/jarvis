export const MARKER_START = "<!-- jarvis:start -->";
export const MARKER_END = "<!-- jarvis:end -->";
const BLOCK_RE = /<!-- jarvis:start -->[\s\S]*?<!-- jarvis:end -->/m;
/** Merge or replace the managed jarvis block inside an existing file. */
export function mergeMarkedBlock(existing, inner) {
    const block = `${MARKER_START}\n${inner.trim()}\n${MARKER_END}\n`;
    if (!existing || !existing.trim())
        return block;
    if (BLOCK_RE.test(existing)) {
        return existing.replace(BLOCK_RE, block.trimEnd()) + (existing.endsWith("\n") ? "" : "\n");
    }
    const sep = existing.endsWith("\n") ? "\n" : "\n\n";
    return `${existing.trimEnd()}${sep}${block}`;
}
/** Remove the managed jarvis block; return null if file would be empty. */
export function stripMarkedBlock(existing) {
    const next = existing.replace(BLOCK_RE, "").replace(/\n{3,}/g, "\n\n").trim();
    return next.length ? `${next}\n` : null;
}
export function agentsSpineContent(doctrine) {
    return `${doctrine.trim()}\n`;
}
export function claudeSpineContent() {
    return `@AGENTS.md\n`;
}
