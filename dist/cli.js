#!/usr/bin/env node
import { Command } from "commander";
import { installProject, resolveHosts } from "./commands/install.js";
import { runDoctor } from "./commands/doctor.js";
import { runStatus } from "./commands/status.js";
import { runTemplates } from "./commands/templates.js";
import { runUninstall } from "./commands/uninstall.js";
import { runUpdate } from "./commands/update.js";
import { loadManifest } from "./manifest.js";
const program = new Command();
program
    .name("jarvis")
    .description("Inject metaplanning + Bar Raiser + Architect + Ponytail rules into Cursor and Claude Code")
    .version(loadManifest().version);
program
    .command("install")
    .description("Install Jarvis rules into the current project")
    .option("--host <host>", "cursor | claude-code | all", "all")
    .option("--scope <scope>", "project (user deferred)", "project")
    .action((opts) => {
    if (opts.scope !== "project") {
        console.error("Only --scope project is supported in v1.");
        process.exitCode = 1;
        return;
    }
    const cwd = process.cwd();
    const hosts = resolveHosts(opts.host);
    const lock = installProject(cwd, hosts);
    console.log(`Installed pack ${lock.packVersion} for: ${lock.hosts.join(", ")}`);
    for (const f of Object.keys(lock.files))
        console.log(`  ${f}`);
});
program
    .command("update")
    .description("Recompile and refresh managed files from the current pack")
    .option("--host <host>", "override hosts (default: from lock)")
    .action((opts) => {
    const lock = runUpdate(process.cwd(), opts.host);
    console.log(`Updated pack ${lock.packVersion} for: ${lock.hosts.join(", ")}`);
});
program
    .command("status")
    .description("Show install status and checksum drift")
    .action(() => {
    const s = runStatus(process.cwd());
    if (!s.installed) {
        console.log("Not installed. Run: jarvis install");
        return;
    }
    console.log(`Pack installed: ${s.packVersion}`);
    console.log(`Pack current:   ${s.currentPackVersion}`);
    console.log(`Hosts: ${(s.hosts ?? []).join(", ")}`);
    if (s.missing.length) {
        console.log("Missing:");
        for (const m of s.missing)
            console.log(`  ${m}`);
    }
    if (s.drift.length) {
        console.log("Drift:");
        for (const d of s.drift)
            console.log(`  ${d}`);
    }
    if (!s.missing.length && !s.drift.length)
        console.log("No drift.");
});
program
    .command("uninstall")
    .description("Remove managed rule files and marked spine blocks")
    .action(() => {
    const removed = runUninstall(process.cwd());
    console.log("Removed:");
    for (const r of removed)
        console.log(`  ${r}`);
});
program
    .command("doctor")
    .description("Check pack, adapters, and writable cwd")
    .action(() => {
    const report = runDoctor(process.cwd());
    for (const m of report.messages)
        console.log(m);
    if (!report.ok)
        process.exitCode = 1;
});
program
    .command("templates")
    .description("Copy doc and metaplan templates into the project")
    .action(() => {
    const written = runTemplates(process.cwd());
    console.log("Wrote templates:");
    for (const w of written)
        console.log(`  ${w}`);
});
program.parse();
