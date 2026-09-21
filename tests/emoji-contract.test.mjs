import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");
const pageSource = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
const dataSource = readFileSync(join(projectRoot, "lib/emoji-data.ts"), "utf8");

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

test("persistent localStorage keys are present", () => {
  assert.match(pageSource, /["']emoji-language["']/);
  assert.match(pageSource, /["']emoji-favorites["']/);
  assert.match(pageSource, /["']emoji-recent["']/);
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

test("lib/emoji-data.ts maintains animated categories and item counts", () => {
  assert.match(
    dataSource,
    /const animatedSmileys:[\s\S]*?\.slice\(0,\s*10\)\s*\.map/,
  );
  assert.match(
    dataSource,
    /const animatedHearts:[\s\S]*?\.slice\(0,\s*10\)\s*\.map/,
  );
});

test("emoji data includes required categories", () => {
  assert.match(dataSource, /["']traffic["']/);
  assert.match(dataSource, /["']hearts["']/);
  assert.match(dataSource, /["']animated["']/);
});
