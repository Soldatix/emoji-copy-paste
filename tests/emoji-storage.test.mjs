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
  parseEmojiBackupJson,
  recoverInterruptedRestore,
  restoreEmojiBackup,
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
    removeItem(key) {
      values.delete(key);
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
    removeItem() {},
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
    removeItem() {},
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

test("stored lists reject valid JSON with a non-array value", () => {
  assert.deepEqual(
    loadStoredList(
      memoryStorage({ "emoji-favorites": JSON.stringify({ value: "😀" }) }),
      STORAGE_KEYS.favorites,
    ),
    [],
  );
});

test("backup parsing rejects missing and wrong-type fields", () => {
  assert.equal(
    parseEmojiBackup({
      version: 1,
      language: "en",
      favorites: [],
    }),
    null,
  );
  assert.equal(
    parseEmojiBackup({
      version: 1,
      language: "en",
      favorites: "😀",
      recent: [],
    }),
    null,
  );
  assert.equal(
    parseEmojiBackup({
      version: 1,
      language: "en",
      favorites: [],
      recent: "😀",
    }),
    null,
  );
});

test("backup parsing caps recent entries at 18", () => {
  const recent = Array.from({ length: 25 }, (_, index) => `recent-${index}`);
  const backup = parseEmojiBackup({
    version: 1,
    language: "hr",
    favorites: [],
    recent,
  });

  assert.ok(backup);
  assert.equal(backup.recent.length, 18);
  assert.deepEqual(backup.recent, recent.slice(0, 18));
});

test("JSON backup parser accepts valid JSON and rejects malformed JSON", () => {
  assert.deepEqual(
    parseEmojiBackupJson(
      JSON.stringify({
        version: 1,
        language: "de",
        favorites: ["😀", "😀"],
        recent: ["a", "b"],
      }),
    ),
    {
      version: 1,
      language: "de",
      favorites: ["😀"],
      recent: ["a", "b"],
    },
  );
  assert.equal(parseEmojiBackupJson("{bad json"), null);
});

function storageThatFailsOnce(initial, failedKey) {
  const storage = memoryStorage(initial);
  let failed = false;

  return {
    getItem: storage.getItem,
    removeItem: storage.removeItem,
    read: storage.read,
    setItem(key, value) {
      if (!failed && key === failedKey) {
        failed = true;
        throw new Error(`blocked write for ${key}`);
      }
      storage.setItem(key, value);
    },
  };
}

const oldStoredState = {
  "emoji-language": "hr",
  "emoji-favorites": JSON.stringify(["old-favorite"]),
  "emoji-recent": JSON.stringify(["old-recent"]),
};

const replacementBackup = {
  version: 1,
  language: "de",
  favorites: ["new-favorite"],
  recent: ["new-recent"],
};

function assertOldStoredState(storage) {
  assert.equal(storage.read(STORAGE_KEYS.language), "hr");
  assert.equal(
    storage.read(STORAGE_KEYS.favorites),
    JSON.stringify(["old-favorite"]),
  );
  assert.equal(
    storage.read(STORAGE_KEYS.recent),
    JSON.stringify(["old-recent"]),
  );
  assert.equal(storage.read("emoji-restore-journal"), undefined);
}

test("backup restore reports unavailable without persistent storage", () => {
  assert.equal(restoreEmojiBackup(null, replacementBackup), "unavailable");
});

test("backup restore rolls back when language persistence fails", () => {
  const storage = storageThatFailsOnce(oldStoredState, STORAGE_KEYS.language);
  assert.equal(restoreEmojiBackup(storage, replacementBackup), "failed");
  assertOldStoredState(storage);
});

test("backup restore rolls back when favorites persistence fails", () => {
  const storage = storageThatFailsOnce(oldStoredState, STORAGE_KEYS.favorites);
  assert.equal(restoreEmojiBackup(storage, replacementBackup), "failed");
  assertOldStoredState(storage);
});

test("backup restore rolls back when recent persistence fails", () => {
  const storage = storageThatFailsOnce(oldStoredState, STORAGE_KEYS.recent);
  assert.equal(restoreEmojiBackup(storage, replacementBackup), "failed");
  assertOldStoredState(storage);
});

test("startup recovery restores a pending interrupted backup transaction", () => {
  const previous = {
    language: "hr",
    favorites: JSON.stringify(["old-favorite"]),
    recent: JSON.stringify(["old-recent"]),
  };
  const storage = memoryStorage({
    "emoji-language": "de",
    "emoji-favorites": JSON.stringify(["new-favorite"]),
    "emoji-recent": JSON.stringify(["new-recent"]),
    "emoji-restore-journal": JSON.stringify({
      version: 1,
      status: "pending",
      previous,
    }),
  });

  assert.equal(recoverInterruptedRestore(storage), true);
  assertOldStoredState(storage);
});

test("backup restore persists all fields and clears its transaction journal", () => {
  const storage = memoryStorage(oldStoredState);

  assert.equal(restoreEmojiBackup(storage, replacementBackup), "persisted");
  assert.equal(storage.read(STORAGE_KEYS.language), "de");
  assert.equal(
    storage.read(STORAGE_KEYS.favorites),
    JSON.stringify(["new-favorite"]),
  );
  assert.equal(
    storage.read(STORAGE_KEYS.recent),
    JSON.stringify(["new-recent"]),
  );
  assert.equal(storage.read("emoji-restore-journal"), undefined);
});

test("startup recovery keeps successful data from a committed transaction", () => {
  const storage = memoryStorage({
    "emoji-language": "de",
    "emoji-favorites": JSON.stringify(["new-favorite"]),
    "emoji-recent": JSON.stringify(["new-recent"]),
    "emoji-restore-journal": JSON.stringify({
      version: 1,
      status: "committed",
      previous: {
        language: "hr",
        favorites: JSON.stringify(["old-favorite"]),
        recent: JSON.stringify(["old-recent"]),
      },
    }),
  });

  assert.equal(recoverInterruptedRestore(storage), true);
  assert.equal(storage.read(STORAGE_KEYS.language), "de");
  assert.equal(
    storage.read(STORAGE_KEYS.favorites),
    JSON.stringify(["new-favorite"]),
  );
  assert.equal(
    storage.read(STORAGE_KEYS.recent),
    JSON.stringify(["new-recent"]),
  );
  assert.equal(storage.read("emoji-restore-journal"), undefined);
});
