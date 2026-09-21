import assert from "node:assert/strict";
import test, { after } from "node:test";
import { fileURLToPath } from "node:url";

import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const vite = await createServer({
  appType: "custom",
  configFile: false,
  root,
  resolve: { alias: { "@": root } },
  server: { middlewareMode: true },
});

after(async () => {
  await vite.close();
});

const storageModule = await vite.ssrLoadModule("/lib/emoji-storage.ts");
const {
  STORAGE_KEYS,
  createEmojiBackup,
  loadLanguage,
  loadStoredList,
  parseEmojiBackup,
  saveLanguage,
  saveStoredList,
} = storageModule;

function memoryStorage(initial = {}) {
  const values = new Map(Object.entries(initial));

  return {
    getItem(key) {
      return values.has(key) ? values.get(key) : null;
    },
    setItem(key, value) {
      values.set(key, String(value));
    },
    read(key) {
      return values.get(key);
    },
  };
}

test("storage keys remain stable", () => {
  assert.deepEqual(STORAGE_KEYS, {
    language: "emoji-language",
    favorites: "emoji-favorites",
    recent: "emoji-recent",
  });
});

test("language loading accepts only supported languages", () => {
  assert.equal(
    loadLanguage(memoryStorage({ "emoji-language": "hr" })),
    "hr",
  );
  assert.equal(
    loadLanguage(memoryStorage({ "emoji-language": "xx" })),
    "en",
  );
  assert.equal(loadLanguage(null), "en");
});

test("storage read failures fall back safely", () => {
  const throwingStorage = {
    getItem() {
      throw new Error("blocked");
    },
    setItem() {},
  };

  assert.equal(loadLanguage(throwingStorage), "en");
  assert.deepEqual(
    loadStoredList(throwingStorage, STORAGE_KEYS.favorites),
    [],
  );
});

test("stored lists reject malformed values and normalize valid arrays", () => {
  assert.deepEqual(
    loadStoredList(
      memoryStorage({ "emoji-favorites": "{bad json" }),
      STORAGE_KEYS.favorites,
    ),
    [],
  );

  assert.deepEqual(
    loadStoredList(
      memoryStorage({
        "emoji-favorites": JSON.stringify(["😀", 42, "", "😀", "❤️"]),
      }),
      STORAGE_KEYS.favorites,
    ),
    ["😀", "❤️"],
  );

  assert.deepEqual(
    loadStoredList(
      memoryStorage({
        "emoji-recent": JSON.stringify(["a", "b", "c"]),
      }),
      STORAGE_KEYS.recent,
      2,
    ),
    ["a", "b"],
  );
});

test("storage writes are normalized and failures do not throw", () => {
  const storage = memoryStorage();

  assert.equal(saveLanguage(storage, "de"), true);
  assert.equal(storage.read(STORAGE_KEYS.language), "de");

  assert.equal(
    saveStoredList(
      storage,
      STORAGE_KEYS.recent,
      ["a", "a", 7, "b", "c"],
      2,
    ),
    true,
  );
  assert.equal(storage.read(STORAGE_KEYS.recent), JSON.stringify(["a", "b"]));

  const throwingStorage = {
    getItem() {
      return null;
    },
    setItem() {
      throw new Error("quota");
    },
  };

  assert.equal(saveLanguage(throwingStorage, "en"), false);
  assert.equal(
    saveStoredList(throwingStorage, STORAGE_KEYS.favorites, ["😀"]),
    false,
  );
});

test("backup creation is versioned and normalized", () => {
  assert.deepEqual(
    createEmojiBackup({
      language: "it",
      favorites: ["😀", "😀", null, "❤️"],
      recent: Array.from({ length: 20 }, (_, index) => `item-${index}`),
    }),
    {
      version: 1,
      language: "it",
      favorites: ["😀", "❤️"],
      recent: Array.from({ length: 18 }, (_, index) => `item-${index}`),
    },
  );
});

test("backup parsing validates schema and normalizes lists", () => {
  assert.equal(parseEmojiBackup(null), null);
  assert.equal(
    parseEmojiBackup({
      version: 2,
      language: "en",
      favorites: [],
      recent: [],
    }),
    null,
  );
  assert.equal(
    parseEmojiBackup({
      version: 1,
      language: "xx",
      favorites: [],
      recent: [],
    }),
    null,
  );

  assert.deepEqual(
    parseEmojiBackup({
      version: 1,
      language: "es",
      favorites: ["😀", "😀", 3],
      recent: ["a", "", "b"],
    }),
    {
      version: 1,
      language: "es",
      favorites: ["😀"],
      recent: ["a", "b"],
    },
  );
});
