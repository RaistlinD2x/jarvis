import { installProject, resolveHosts } from "./install.js";
import { loadManifest } from "../manifest.js";
import { join } from "node:path";
import { projectJarvisDir, tryReadText } from "../paths.js";
/** Re-install from current pack using hosts from lock or --host. */
export function runUpdate(cwd, hostFlag) {
    const lockPath = join(projectJarvisDir(cwd), "lock.json");
    const existing = tryReadText(lockPath);
    let hosts;
    if (hostFlag) {
        hosts = resolveHosts(hostFlag);
    }
    else if (existing) {
        const lock = JSON.parse(existing);
        hosts = lock.hosts;
    }
    else {
        hosts = resolveHosts("all");
    }
    const lock = installProject(cwd, hosts);
    const manifest = loadManifest();
    if (lock.packVersion !== manifest.version) {
        // installProject already stamps current pack version
    }
    return lock;
}
