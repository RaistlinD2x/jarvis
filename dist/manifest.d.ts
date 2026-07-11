export type PackManifest = {
    version: string;
    rules: string[];
    managedFiles: {
        cursor: string[];
        "claude-code": string[];
        spine: string[];
    };
};
export type CursorAdapter = {
    rules: Record<string, {
        out: string;
        alwaysApply: boolean;
        globs?: string;
        description: string;
    }>;
};
export type ClaudeAdapter = {
    rules: Record<string, {
        out: string;
        paths?: string[];
        description: string;
    }>;
    spine: {
        agents: string;
        claude: string;
    };
};
export type JarvisConfig = {
    hosts: string[];
    models: {
        cursor: {
            simple: string;
            complex: string;
        };
        "claude-code": {
            simple: string;
            complex: string;
        };
    };
    packVersion: string;
};
export type LockFile = {
    packVersion: string;
    hosts: string[];
    files: Record<string, string>;
    installedAt: string;
};
export declare const DEFAULT_MODELS: {
    readonly cursor: {
        readonly simple: "composer-2.5-fast";
        readonly complex: "grok-4.5-xhigh";
    };
    readonly "claude-code": {
        readonly simple: "claude-haiku-4-5";
        readonly complex: "claude-opus-4-6";
    };
};
export declare function loadManifest(): PackManifest;
export declare function loadCursorAdapter(): CursorAdapter;
export declare function loadClaudeAdapter(): ClaudeAdapter;
export declare function canonicalBody(ruleId: string): string;
export declare function doctrineBody(): string;
export declare function defaultConfig(hosts: string[], packVersion: string): JarvisConfig;
