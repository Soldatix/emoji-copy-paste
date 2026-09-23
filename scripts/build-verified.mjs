import { spawn } from "node:child_process";
import { createSitesEnv, projectRoot, resolveProjectCommand } from "./sites-env.mjs";

const timeoutMs = Number.parseInt(
  process.env.SITES_BUILD_TIMEOUT_MS || "180000",
  10,
);
const killAfterMs = Number.parseInt(
  process.env.SITES_BUILD_KILL_AFTER_MS || "10000",
  10,
);

console.log("Running bounded vinext build...");

const resolvedCommand = resolveProjectCommand("vinext");
const child = spawn(
  resolvedCommand.executable,
  [...resolvedCommand.prefixArgs, "build"],
  {
    cwd: projectRoot,
    env: createSitesEnv(),
    stdio: "inherit",
    shell: false,
  },
);

let timedOut = false;
let forceTimer;

const timeoutTimer = setTimeout(() => {
  timedOut = true;
  console.error(`Build exceeded ${timeoutMs} ms; terminating.`);
  child.kill();

  forceTimer = setTimeout(() => {
    if (!child.killed) child.kill("SIGKILL");
  }, killAfterMs);
}, timeoutMs);

child.on("error", (error) => {
  clearTimeout(timeoutTimer);
  if (forceTimer) clearTimeout(forceTimer);
  console.error(error.message);
  process.exitCode = 1;
});

child.on("exit", (code, signal) => {
  clearTimeout(timeoutTimer);
  if (forceTimer) clearTimeout(forceTimer);

  if (timedOut) {
    process.exitCode = 124;
    return;
  }

  if (signal) {
    console.error(`Build terminated by signal ${signal}.`);
    process.exitCode = 1;
    return;
  }

  process.exitCode = code ?? 1;
});
