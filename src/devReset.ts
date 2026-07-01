const ALBUM_DEV_RESET_KEYS = [
  "olavarria-en-figuritas-pasted-ids-v3",
  "olavarria-en-figuritas-duplicates-v3",
  "olavarria-en-figuritas-inventory-v3",
  "olavarria-en-figuritas-open-pack-v3"
];

export function resetAlbumOnDevStart() {
  if (!import.meta.env.DEV) return;

  for (const key of ALBUM_DEV_RESET_KEYS) {
    localStorage.removeItem(key);
  }

  sessionStorage.removeItem("olavarria-dev-reset-done");

  console.info("🧹 Álbum reiniciado automáticamente en desarrollo");
}
