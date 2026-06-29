import { ArrowLeft, PackageOpen, Sparkles } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StickerSlot } from "../../components/ui/StickerSlot";
import { seedStickers } from "../../data/seedStickers";
import { addPendingStickers, getPendingIds, getUnlockedIds } from "../../lib/storage";
import type { Sticker } from "../../types/album";

function pickPack(): Sticker[] {
  const unlocked = getUnlockedIds();
  const pending = getPendingIds();
  const available = seedStickers.filter((item) => !unlocked.includes(item.id) && !pending.includes(item.id));
  const source = available.length >= 3 ? available : seedStickers;
  return [...source].sort(() => Math.random() - 0.5).slice(0, 3);
}

export function PackPage() {
  const [opened, setOpened] = useState(false);
  const [pack, setPack] = useState<Sticker[]>([]);

  function openPack() {
    const result = pickPack();
    addPendingStickers(result.map((item) => item.id));
    setPack(result);
    setOpened(true);
  }

  return (
    <div className="album-stage">
      <div className="page-navigation">
        <Link to="/album">
          <ArrowLeft className="h-4 w-4" />
          Índice
        </Link>
      </div>

      <section className="pack-layout">
        <div className={`pack-object ${opened ? "opened" : ""}`}>
          <div className="pack-shine" />
          <PackageOpen className="h-20 w-20" />
          <strong>Sobre Digital</strong>
          <span>Olavarría en Figuritas</span>
        </div>

        <div className="pack-panel">
          <span className="page-kicker">Conseguir figuritas</span>
          <h1>Abrí un sobre</h1>
          <p>
            Cada sobre entrega figuritas nuevas que quedan listas para pegar en el álbum.
          </p>

          <button className="primary-action" onClick={openPack}>
            <Sparkles className="h-5 w-5" />
            Abrir sobre
          </button>

          {pack.length > 0 && (
            <Link to="/pegar" className="secondary-action">
              Pegar figuritas nuevas
            </Link>
          )}
        </div>
      </section>

      {pack.length > 0 && (
        <section className="new-stickers-strip">
          {pack.map((sticker) => (
            <StickerSlot key={sticker.id} sticker={sticker} unlocked={false} pending />
          ))}
        </section>
      )}
    </div>
  );
}
