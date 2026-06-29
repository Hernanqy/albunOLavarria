const UNLOCKED_KEY = "olavarria_album_unlocked_v2";
const PENDING_KEY = "olavarria_album_pending_v2";

const DEFAULT_UNLOCKED = ["fig-001"];

function readArray(key: string, fallback: string[]) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function writeArray(key: string, ids: string[]) {
  localStorage.setItem(key, JSON.stringify(Array.from(new Set(ids))));
}

export function getUnlockedIds() {
  return readArray(UNLOCKED_KEY, DEFAULT_UNLOCKED);
}

export function getPendingIds() {
  return readArray(PENDING_KEY, []);
}

export function setUnlockedIds(ids: string[]) {
  writeArray(UNLOCKED_KEY, ids);
}

export function setPendingIds(ids: string[]) {
  writeArray(PENDING_KEY, ids);
}

export function addPendingStickers(ids: string[]) {
  const unlocked = getUnlockedIds();
  const pending = getPendingIds();
  const filtered = ids.filter((id) => !unlocked.includes(id));
  setPendingIds([...pending, ...filtered]);
}

export function pasteAllPending() {
  const unlocked = getUnlockedIds();
  const pending = getPendingIds();
  setUnlockedIds([...unlocked, ...pending]);
  setPendingIds([]);
}

export function pasteOne(id: string) {
  const unlocked = getUnlockedIds();
  const pending = getPendingIds();
  setUnlockedIds([...unlocked, id]);
  setPendingIds(pending.filter((item) => item !== id));
}

export function resetAlbum() {
  localStorage.removeItem(UNLOCKED_KEY);
  localStorage.removeItem(PENDING_KEY);
}
