import { existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

export function createSitesEnv(baseEnv = process.env) {
  const runtimeRoot =
    baseEnv.SITES_RUNTIME_ROOT || join(projectRoot, ".sites-runtime");

  const paths = {
    home: join(runtimeRoot, "home"),
    npmCache: join(runtimeRoot, "npm-cache"),
    xdgConfig: join(runtimeRoot, "xdg-config"),
    tmp: join(runtimeRoot, "tmp"),
    wranglerLogs: join(runtimeRoot, "wrangler", "logs"),
  };

  for (const path of Object.values(paths)) {
    mkdirSync(path, { recursive: true });
  }

  const env = {
    ...baseEnv,
    SITES_ENV_READY: "1",
    SITES_PROJECT_ROOT: projectRoot,
    HOME: paths.home,
    XDG_CONFIG_HOME: paths.xdgConfig,
    TMPDIR: paths.tmp,
    WRANGLER_WRITE_LOGS: "false",
    WRANGLER_LOG_PATH: paths.wranglerLogs,
    MINIFLARE_REGISTRY_PATH: join(runtimeRoot, "wrangler", "registry"),
    npm_config_cache: paths.npmCache,
    npm_config_audit: "false",
    npm_config_fund: "false",
    npm_config_update_notifier: "false",
  };

  for (const key of [
    "NPM_CONFIG_CACHE",
    "npm_config_proxy",
    "npm_config_http_proxy",
    "npm_config_https_proxy",
    "NPM_CONFIG_PROXY",
    "NPM_CONFIG_HTTP_PROXY",
    "NPM_CONFIG_HTTPS_PROXY",
  ]) {
    delete env[key];
  }

  return env;
}

const localBins = {
  eslint: join(projectRoot, "node_modules", "eslint", "bin", "eslint.js"),
  vinext: join(projectRoot, "node_modules", "vinext", "dist", "cli.js"),
  "drizzle-kit": join(projectRoot, "node_modules", "drizzle-kit", "bin.cjs"),
};

export function resolveProjectCommand(command) {
  const local = localBins[command];
  if (local && existsSync(local)) {
    return { executable: process.execPath, prefixArgs: [local] };
  }

  return { executable: command, prefixArgs: [] };
}

const isMain =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (isMain) {
  const argv = process.argv.slice(2);
  if (argv[0] === "--") argv.shift();

  if (argv.length === 0) {
    console.error("usage: node scripts/sites-env.mjs -- command [args...]");
    process.exit(64);
  }

  const [command, ...args] = argv;
  const resolvedCommand = resolveProjectCommand(command);
  const result = spawnSync(
    resolvedCommand.executable,
    [...resolvedCommand.prefixArgs, ...args],
    {
      cwd: projectRoot,
      env: createSitesEnv(),
      stdio: "inherit",
      shell: false,
    },
  );

  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }

  process.exit(result.status ?? 1);
}
