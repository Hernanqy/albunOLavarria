const ALBUM_RESET_KEYS = [
  "olavarria-en-figuritas-pasted-ids-v3",
  "olavarria-en-figuritas-duplicates-v3",
  "olavarria-en-figuritas-inventory-v3",
  "olavarria-en-figuritas-open-pack-v3"
];

export function resetAlbumOnDevStart() {
  /**
   * MODO DESARROLLO TEMPORAL:
   * Resetea SIEMPRE, también en Vercel.
   * Cuando terminemos de probar, sacamos esta función del main.tsx.
   */
  for (const key of ALBUM_RESET_KEYS) {
    localStorage.removeItem(key);
  }

  sessionStorage.clear();

  console.info("🧹 Álbum reiniciado automáticamente para pruebas");
}
