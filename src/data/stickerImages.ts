import type { AlbumCard } from "../types/album";

/*
  CAMBIÁ ESTOS NUMEROS POR LOS REALES DE TUS 3 FIGURITAS DE PRUEBA.
  Ejemplo:
  "43": "/images/stickers/test/sticker-001.png",
  "12": "/images/stickers/test/sticker-002.png",
  "27": "/images/stickers/test/sticker-003.png"
*/

const STICKER_IMAGES_BY_NUMBER: Record<string, string> = {
  "1": "/images/stickers/test/sticker-001.png",
  "2": "/images/stickers/test/sticker-002.png",
  "3": "/images/stickers/test/sticker-003.png"
};

export function getStickerImage(card: AlbumCard) {
  return STICKER_IMAGES_BY_NUMBER[String(card.number)] ?? null;
}

export function hasStickerImage(card: AlbumCard) {
  return Boolean(getStickerImage(card));
}
