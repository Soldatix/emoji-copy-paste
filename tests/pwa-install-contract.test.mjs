import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const pageSource = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
const installSource = readFileSync(
  join(projectRoot, "components/pwa-install-panel.tsx"),
  "utf8",
);
const layoutSource = readFileSync(join(projectRoot, "app/layout.tsx"), "utf8");
const globalsSource = readFileSync(join(projectRoot, "app/globals.css"), "utf8");
const captureSource = readFileSync(
  join(projectRoot, "public/pwa-install-capture.js"),
  "utf8",
);

test("Emoji page mounts the user-facing PWA install panel", () => {
  assert.match(
    pageSource,
    /import\s+\{\s*PwaInstallPanel\s*\}\s+from\s+["']@\/components\/pwa-install-panel["']/,
  );
  assert.match(pageSource, /<PwaInstallPanel\s+language=\{language\}\s*\/>/);
});

test("install flow activates only for install=web and supports all five languages", () => {
  assert.match(
    installSource,
    /new URLSearchParams\(window\.location\.search\)\.get\(["']install["']\)\s*===\s*["']web["']/,
  );

  for (const language of ["en", "hr", "de", "it", "es"]) {
    assert.match(
      installSource,
      new RegExp("\\b" + language + ":\\s*\\{"),
      "missing " + language + " install copy",
    );
  }

  assert.match(installSource, /Install Web App/);
  assert.match(installSource, /Instaliraj Web App/);
  assert.match(installSource, /Web-App installieren/);
  assert.match(installSource, /Installa Web App/);
  assert.match(installSource, /Instalar Web App/);
});

test("install flow captures the native prompt and tracks installation lifecycle", () => {
  assert.match(
    installSource,
    /addEventListener\(\s*["']beforeinstallprompt["']/,
  );
  assert.match(installSource, /event\.preventDefault\(\)/);
  assert.match(installSource, /promptRef\.current\s*=\s*installEvent/);
  assert.match(installSource, /await prompt\.prompt\(\)/);
  assert.match(installSource, /await prompt\.userChoice/);
  assert.match(installSource, /choice\?\.outcome\s*===\s*["']dismissed["']/);
  assert.match(installSource, /addEventListener\(["']appinstalled["']/);
  assert.doesNotMatch(installSource, /display-mode:\s*standalone/);
  assert.doesNotMatch(installSource, /NavigatorWithStandalone/);
});

test("install UI has a safe fallback and Continue in browser removes the install flag", () => {
  assert.match(
    installSource,
    /current\s*===\s*["']waiting["']\s*\?\s*["']unavailable["']/,
  );
  assert.match(installSource, /window\.setTimeout[\s\S]*?3000/);
  assert.match(installSource, /url\.searchParams\.delete\(["']install["']\)/);
  assert.match(installSource, /if \(!activeRef\.current\) return;/);
  assert.match(installSource, /activeRef\.current = false;/);
  assert.match(installSource, /window\.history\.replaceState/);
  assert.match(
    installSource,
    /disabled=\{installState !== ["']ready["']\}/,
  );
  assert.match(installSource, /role=["']status["']/);
  assert.match(installSource, /aria-live=["']polite["']/);
});


test("install prompt is buffered before React hydration", () => {
  assert.match(
    layoutSource,
    /<script\s+src=["']\/pwa-install-capture\.js["']><\/script>/,
  );
  assert.match(captureSource, /beforeinstallprompt/);
  assert.match(
    captureSource,
    /window\.__emojiInstallPrompt\s*=\s*event/,
  );
  assert.match(captureSource, /emoji-install-prompt-ready/);
  assert.match(installSource, /installWindow\.__emojiInstallPrompt/);
  assert.match(installSource, /syncCapturedPrompt/);
  assert.match(installSource, /emoji-install-prompt-ready/);
});

test("Info and Support dialog has an Android-compatible centering fallback", () => {
  assert.match(
    globalsSource,
    /\.support-dialog\s*\{[^}]*translate:\s*none\s*!important;[^}]*transform:\s*translate\(-50%,\s*-50%\)\s*!important;/s,
  );
});
