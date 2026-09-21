import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const projectRoot = join(__dirname, "..");

test("app/page.tsx contains all five language IDs", () => {
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  const languages = ["en", "hr", "de", "it", "es"];
  for (const lang of languages) {
    assert.match(content, new RegExp(lang, "i"), `Language ${lang} should be present`);
  }
});

test("default language state is en", () => {
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  assert.match(content, /useState<Language>\("en"\)/);
});

test("standard categories are present", () => {
  const categories = [
    "smileys", "people", "animals", "food", "activities", 
    "travel", "objects", "symbols", "flags", "traffic", 
    "hearts", "animated"
  ];
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  for (const cat of categories) {
    assert.match(content, new RegExp(cat, "i"), `Category ${cat} should be present`);
  }
});

test("favorites and recent virtual views are present", () => {
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  assert.match(content, /favorites/);
  assert.match(content, /recent/);
});

test("persistent localStorage keys are present", () => {
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  assert.match(content, /emoji-language/);
  assert.match(content, /emoji-favorites/);
  assert.match(content, /emoji-recent/);
});

test("core copy/share/download capabilities are wired", () => {
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  assert.match(content, /navigator\.clipboard/);
  assert.match(content, /navigator\.share/);
  assert.match(content, /downloadAnimation/);
});

test("collection functionality is present", () => {
  const content = readFileSync(join(projectRoot, "app/page.tsx"), "utf8");
  // Fixed: Replaced incorrect /addtoCollection/ with actual identifier /addToCollection/
  // and ensured robust checks for collection logic as per task requirements.
  assert.match(content, /addToCollection/);
  assert.match(content, /copyCollection/);
  assert.match(content, /setCollection\(\[\]\)/); 
});

test("lib/emoji-data.ts maintains animated categories and item counts", () => {
  const content = readFileSync(join(projectRoot, "lib/emoji-data.ts"), "utf8");
  assert.match(content, /animatedSmileys/);
  assert.match(content, /animatedHearts/);
  assert.match(content, /\.slice\(0,\s*10\)/);
});

test("emoji data includes required categories", () => {
  const content = readFileSync(join(projectRoot, "lib/emoji-data.ts"), "utf8");
  assert.match(content, /traffic/);
  assert.match(content, /hearts/);
  assert.match(content, /animated/);
});
