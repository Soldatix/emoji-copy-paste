import type { Language } from "@/lib/emoji-data";

export const STORAGE_KEYS = {
  language: "emoji-language",
  favorites: "emoji-favorites",
  recent: "emoji-recent",
} as const;

const LANGUAGE_IDS: readonly Language[] = ["en", "hr", "de", "it", "es"];

type StorageLike = Pick<Storage, "getItem" | "setItem" | "removeItem">;

const RESTORE_JOURNAL_KEY = "emoji-restore-journal";

export type BackupRestoreStatus = "persisted" | "unavailable" | "failed";

type RestoreSnapshot = {
  language: string | null;
  favorites: string | null;
  recent: string | null;
};

type RestoreJournalV1 = {
  version: 1;
  status: "pending" | "committed";
  previous: RestoreSnapshot;
};
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

export function parseEmojiBackupJson(text: string): EmojiBackupV1 | null {
  try {
    return parseEmojiBackup(JSON.parse(text));
  } catch {
    return null;
  }
}

function isRawStorageValue(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function parseRestoreJournal(raw: string): RestoreJournalV1 | null {
  try {
    const value = JSON.parse(raw) as Record<string, unknown>;
    const previous = value.previous as Record<string, unknown> | undefined;

    if (
      value.version !== 1 ||
      (value.status !== "pending" && value.status !== "committed") ||
      !previous ||
      !isRawStorageValue(previous.language) ||
      !isRawStorageValue(previous.favorites) ||
      !isRawStorageValue(previous.recent)
    ) {
      return null;
    }

    return {
      version: 1,
      status: value.status,
      previous: {
        language: previous.language,
        favorites: previous.favorites,
        recent: previous.recent,
      },
    };
  } catch {
    return null;
  }
}

function restoreRawValue(
  storage: StorageLike,
  key: string,
  value: string | null,
) {
  if (value === null) storage.removeItem(key);
  else storage.setItem(key, value);
}

function restoreSnapshot(storage: StorageLike, snapshot: RestoreSnapshot) {
  restoreRawValue(storage, STORAGE_KEYS.language, snapshot.language);
  restoreRawValue(storage, STORAGE_KEYS.favorites, snapshot.favorites);
  restoreRawValue(storage, STORAGE_KEYS.recent, snapshot.recent);
}

export function recoverInterruptedRestore(
  storage: StorageLike | null | undefined,
): boolean {
  if (!storage) return true;

  try {
    const raw = storage.getItem(RESTORE_JOURNAL_KEY);
    if (!raw) return true;

    const journal = parseRestoreJournal(raw);
    if (!journal) {
      storage.removeItem(RESTORE_JOURNAL_KEY);
      return true;
    }

    if (journal.status === "pending") {
      restoreSnapshot(storage, journal.previous);
    }

    try {
      storage.removeItem(RESTORE_JOURNAL_KEY);
    } catch {
      // A committed journal is harmless if cleanup is temporarily blocked.
      if (journal.status === "pending") return false;
    }

    return true;
  } catch {
    return false;
  }
}

export function restoreEmojiBackup(
  storage: StorageLike | null | undefined,
  backup: EmojiBackupV1,
): BackupRestoreStatus {
  if (!storage) return "unavailable";
  if (!recoverInterruptedRestore(storage)) return "failed";

  let previous: RestoreSnapshot;
  try {
    previous = {
      language: storage.getItem(STORAGE_KEYS.language),
      favorites: storage.getItem(STORAGE_KEYS.favorites),
      recent: storage.getItem(STORAGE_KEYS.recent),
    };

    const pending: RestoreJournalV1 = {
      version: 1,
      status: "pending",
      previous,
    };
    storage.setItem(RESTORE_JOURNAL_KEY, JSON.stringify(pending));
  } catch {
    return "failed";
  }

  try {
    storage.setItem(STORAGE_KEYS.language, backup.language);
    storage.setItem(
      STORAGE_KEYS.favorites,
      JSON.stringify(normalizeList(backup.favorites)),
    );
    storage.setItem(
      STORAGE_KEYS.recent,
      JSON.stringify(normalizeList(backup.recent, 18)),
    );

    const committed: RestoreJournalV1 = {
      version: 1,
      status: "committed",
      previous,
    };
    storage.setItem(RESTORE_JOURNAL_KEY, JSON.stringify(committed));
  } catch {
    try {
      restoreSnapshot(storage, previous);
      storage.removeItem(RESTORE_JOURNAL_KEY);
    } catch {
      // Keep the pending journal so the next app start can retry recovery.
    }
    return "failed";
  }

  try {
    storage.removeItem(RESTORE_JOURNAL_KEY);
  } catch {
    // The committed marker prevents a later startup from rolling back success.
  }

  return "persisted";
}
