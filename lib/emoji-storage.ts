import type { Language } from "@/lib/emoji-data";

export const STORAGE_KEYS = {
  language: "emoji-language",
  favorites: "emoji-favorites",
  recent: "emoji-recent",
} as const;

const LANGUAGE_IDS: readonly Language[] = ["en", "hr", "de", "it", "es"];

type StorageLike = Pick<Storage, "getItem" | "setItem">;
export type StoredListKey =
  | typeof STORAGE_KEYS.favorites
  | typeof STORAGE_KEYS.recent;

export type EmojiBackupV1 = {
  version: 1;
  language: Language;
  favorites: string[];
  recent: string[];
};

export function getBrowserStorage(): StorageLike | null {
  try {
    return typeof window === "undefined" ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function isLanguage(value: unknown): value is Language {
  return (
    typeof value === "string" &&
    LANGUAGE_IDS.includes(value as Language)
  );
}

function normalizeList(value: unknown, maxItems = Number.POSITIVE_INFINITY) {
  if (!Array.isArray(value)) return [];

  const unique = new Set(
    value.filter(
      (item): item is string => typeof item === "string" && item.length > 0,
    ),
  );

  return [...unique].slice(0, maxItems);
}

export function loadLanguage(
  storage: StorageLike | null | undefined,
  fallback: Language = "en",
): Language {
  if (!storage) return fallback;

  try {
    const value = storage.getItem(STORAGE_KEYS.language);
    return isLanguage(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

export function loadStoredList(
  storage: StorageLike | null | undefined,
  key: StoredListKey,
  maxItems = Number.POSITIVE_INFINITY,
): string[] {
  if (!storage) return [];

  try {
    const raw = storage.getItem(key);
    return raw ? normalizeList(JSON.parse(raw), maxItems) : [];
  } catch {
    return [];
  }
}

function safeSet(
  storage: StorageLike | null | undefined,
  key: string,
  value: string,
): boolean {
  if (!storage) return false;

  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function saveLanguage(
  storage: StorageLike | null | undefined,
  language: Language,
): boolean {
  return safeSet(storage, STORAGE_KEYS.language, language);
}

export function saveStoredList(
  storage: StorageLike | null | undefined,
  key: StoredListKey,
  value: unknown,
  maxItems = Number.POSITIVE_INFINITY,
): boolean {
  return safeSet(
    storage,
    key,
    JSON.stringify(normalizeList(value, maxItems)),
  );
}

export function createEmojiBackup(input: {
  language: Language;
  favorites: unknown;
  recent: unknown;
}): EmojiBackupV1 {
  return {
    version: 1,
    language: input.language,
    favorites: normalizeList(input.favorites),
    recent: normalizeList(input.recent, 18),
  };
}

export function parseEmojiBackup(value: unknown): EmojiBackupV1 | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;

  const candidate = value as Record<string, unknown>;
  if (
    candidate.version !== 1 ||
    !isLanguage(candidate.language) ||
    !Array.isArray(candidate.favorites) ||
    !Array.isArray(candidate.recent)
  ) {
    return null;
  }

  return {
    version: 1,
    language: candidate.language,
    favorites: normalizeList(candidate.favorites),
    recent: normalizeList(candidate.recent, 18),
  };
}
