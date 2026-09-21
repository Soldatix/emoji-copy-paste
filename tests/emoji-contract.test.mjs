import assert from "node:assert/strict";
import test, { after } from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const projectRoot = fileURLToPath(new URL("..", import.meta.url));
const pageSource = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");

const vite = await createServer({
  appType: "custom",
  configFile: false,
  root: projectRoot,
  resolve: { alias: { "@": projectRoot } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

async function loadEmojiCatalog() {
  const { emojis } = await vite.ssrLoadModule("/lib/emoji-data.ts");
  return emojis;
}

test("app/page.tsx contains all five language IDs", () => {
  const languagesBlock = pageSource.match(
    /const languages:[\s\S]*?=\s*\[([\s\S]*?)\];/,
  );
  assert.ok(languagesBlock, "languages declaration should exist");

  for (const lang of ["en", "hr", "de", "it", "es"]) {
    assert.match(
      languagesBlock[1],
      new RegExp(`\\bid:\\s*["']${lang}["']`),
      `Language ${lang} should be declared`,
    );
  }
});

test("default language state is en", () => {
  assert.match(pageSource, /useState<Language>\("en"\)/);
});

test("standard categories are present", () => {
  const categoriesBlock = pageSource.match(
    /const categories:\s*CategoryId\[\]\s*=\s*\[([\s\S]*?)\];/,
  );
  assert.ok(categoriesBlock, "categories declaration should exist");

  const categories = [
    "smileys",
    "people",
    "animals",
    "food",
    "activities",
    "travel",
    "objects",
    "symbols",
    "flags",
    "traffic",
    "hearts",
    "animated",
  ];

  for (const category of categories) {
    assert.match(
      categoriesBlock[1],
      new RegExp(`["']${category}["']`),
      `Category ${category} should be declared`,
    );
  }
});

test("favorites and recent virtual views are wired", () => {
  assert.match(pageSource, /setActiveCategory\("favorites"\)/);
  assert.match(pageSource, /setActiveCategory\("recent"\)/);
});

test("persistent localStorage keys are stable", async () => {
  const { STORAGE_KEYS } = await vite.ssrLoadModule("/lib/emoji-storage.ts");
  assert.deepEqual(STORAGE_KEYS, {
    language: "emoji-language",
    favorites: "emoji-favorites",
    recent: "emoji-recent",
  });
});

test("core copy/share/download capabilities are wired", () => {
  assert.match(pageSource, /navigator\.clipboard/);
  assert.match(pageSource, /navigator\.share/);
  assert.match(pageSource, /downloadAnimation/);
});

test("collection functionality is present", () => {
  assert.match(pageSource, /addToCollection/);
  assert.match(pageSource, /copyCollection/);
  assert.match(pageSource, /setCollection\(\[\]\)/);
});

test("exported emoji catalog contains exactly 10 animated smileys and 10 animated hearts", async () => {
  const emojis = await loadEmojiCatalog();
  const animatedSmileys = emojis.filter(
    (item) =>
      item.category === "animated" && item.animatedSource === "smileys",
  );
  const animatedHearts = emojis.filter(
    (item) =>
      item.category === "animated" && item.animatedSource === "hearts",
  );

  assert.equal(animatedSmileys.length, 10);
  assert.equal(animatedHearts.length, 10);
});

test("exported emoji catalog includes traffic, hearts and animated categories", async () => {
  const emojis = await loadEmojiCatalog();

  for (const category of ["traffic", "hearts", "animated"]) {
    assert.ok(
      emojis.some((item) => item.category === category),
      `Exported catalog should include category ${category}`,
    );
  }
});
