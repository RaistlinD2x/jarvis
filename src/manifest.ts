import { join } from "node:path";
import { packRoot, readText } from "./paths.js";

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
  rules: Record<
    string,
    {
      out: string;
      alwaysApply: boolean;
      globs?: string;
      description: string;
    }
  >;
};

export type ClaudeAdapter = {
  rules: Record<
    string,
    {
      out: string;
      paths?: string[];
      description: string;
    }
  >;
  spine: { agents: string; claude: string };
};

export type JarvisConfig = {
  hosts: string[];
  models: {
    cursor: { simple: string; complex: string };
    "claude-code": { simple: string; complex: string };
  };
  packVersion: string;
};

export type LockFile = {
  packVersion: string;
  hosts: string[];
  files: Record<string, string>;
  installedAt: string;
};

export const DEFAULT_MODELS = {
  cursor: {
    simple: "composer-2.5-fast",
    complex: "grok-4.5-xhigh",
  },
  "claude-code": {
    simple: "claude-haiku-4-5",
    complex: "claude-opus-4-6",
  },
} as const;

export function loadManifest(): PackManifest {
  return JSON.parse(readText(join(packRoot(), "manifest.json"))) as PackManifest;
}

export function loadCursorAdapter(): CursorAdapter {
  return JSON.parse(
    readText(join(packRoot(), "adapters", "cursor.json")),
  ) as CursorAdapter;
}

export function loadClaudeAdapter(): ClaudeAdapter {
  return JSON.parse(
    readText(join(packRoot(), "adapters", "claude-code.json")),
  ) as ClaudeAdapter;
}

export function canonicalBody(ruleId: string): string {
  return readText(join(packRoot(), "canonical", `${ruleId}.md`)).replace(
    /\r\n/g,
    "\n",
  );
}

export function doctrineBody(): string {
  return readText(join(packRoot(), "meta", "doctrine.md")).replace(/\r\n/g, "\n");
}

export function defaultConfig(hosts: string[], packVersion: string): JarvisConfig {
  return {
    hosts,
    models: {
      cursor: { ...DEFAULT_MODELS.cursor },
      "claude-code": { ...DEFAULT_MODELS["claude-code"] },
    },
    packVersion,
  };
}
