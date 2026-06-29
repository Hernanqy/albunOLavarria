import { ArrowLeft, Eye, PackageOpen, Sparkles } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";

type Props = {
  onBack: () => void;
  onOpenPack: () => AlbumCard | null;
  lastCard: AlbumCard | null;
  onViewCard: (card: AlbumCard) => void;
};

export function PackScreen({ onBack, onOpenPack, lastCard, onViewCard }: Props) {
  return (
    <main className="pack-screen">
      <button className="floating-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Índice
      </button>

      <section className="pack-card pack-card-upgraded">
        <div className="pack-object">
          <PackageOpen size={70} />
          <strong>Sobre digital</strong>
          <span>Olavarría en Figuritas</span>
        </div>

        {!lastCard && (
          <>
            <h1>Abrí un sobre</h1>
            <p>
              Tocá el botón para conseguir una nueva figurita del álbum.
            </p>

            <button className="fixed-cover-button" onClick={onOpenPack}>
              <Sparkles size={20} />
              Abrir sobre
            </button>
          </>
        )}

        {lastCard && (
          <div className="pack-result">
            <span className="pack-result-kicker">Te salió</span>

            <article
              className="pack-result-sticker"
              style={{ "--card-color": lastCard.color } as React.CSSProperties}
            >
              <div className="pack-result-number">N.º {lastCard.number}</div>

              <div className="pack-result-image">
                <IconForCard card={lastCard} size={46} />
                <span>{lastCard.imageLabel}</span>
              </div>

              <strong>{lastCard.title}</strong>
              <small>{lastCard.section}</small>
            </article>

            <div className="pack-result-actions">
              <button className="fixed-main-button" onClick={() => onViewCard(lastCard)}>
                <Eye size={20} />
                Ver figurita
              </button>

              <button className="fixed-cover-button" onClick={onOpenPack}>
                <Sparkles size={20} />
                Abrir otro
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
