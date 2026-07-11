import { type LockFile } from "../manifest.js";
export type Host = "cursor" | "claude-code";
export declare function resolveHosts(host: string): Host[];
export declare function installProject(cwd: string, hosts: Host[]): LockFile;
