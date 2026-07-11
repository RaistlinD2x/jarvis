export declare const MARKER_START = "<!-- jarvis:start -->";
export declare const MARKER_END = "<!-- jarvis:end -->";
/** Merge or replace the managed jarvis block inside an existing file. */
export declare function mergeMarkedBlock(existing: string | null, inner: string): string;
/** Remove the managed jarvis block; return null if file would be empty. */
export declare function stripMarkedBlock(existing: string): string | null;
export declare function agentsSpineContent(doctrine: string): string;
export declare function claudeSpineContent(): string;
