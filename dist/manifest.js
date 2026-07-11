import { join } from "node:path";
import { packRoot, readText } from "./paths.js";
export const DEFAULT_MODELS = {
    cursor: {
        simple: "composer-2.5-fast",
        complex: "grok-4.5-xhigh",
    },
    "claude-code": {
        simple: "claude-haiku-4-5",
        complex: "claude-opus-4-6",
    },
};
export function loadManifest() {
    return JSON.parse(readText(join(packRoot(), "manifest.json")));
}
export function loadCursorAdapter() {
    return JSON.parse(readText(join(packRoot(), "adapters", "cursor.json")));
}
export function loadClaudeAdapter() {
    return JSON.parse(readText(join(packRoot(), "adapters", "claude-code.json")));
}
export function canonicalBody(ruleId) {
    return readText(join(packRoot(), "canonical", `${ruleId}.md`)).replace(/\r\n/g, "\n");
}
export function doctrineBody() {
    return readText(join(packRoot(), "meta", "doctrine.md")).replace(/\r\n/g, "\n");
}
export function defaultConfig(hosts, packVersion) {
    return {
        hosts,
        models: {
            cursor: { ...DEFAULT_MODELS.cursor },
            "claude-code": { ...DEFAULT_MODELS["claude-code"] },
        },
        packVersion,
    };
}
