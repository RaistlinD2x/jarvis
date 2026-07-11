import { type LockFile } from "../manifest.js";
/** Re-install from current pack using hosts from lock or --host. */
export declare function runUpdate(cwd: string, hostFlag?: string): LockFile;
