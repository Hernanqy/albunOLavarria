import { useEffect, useState, type CSSProperties } from "react";
import { BookOpen, RotateCcw, Sparkles, X } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";
import { getStickerImage } from "../../data/stickerImages";

type Props = {
  card: AlbumCard;
  pasted: boolean;
  duplicate?: boolean;
  onClose: () => void;
};

export function StickerDetail({ card, pasted, duplicate = false, onClose }: Props) {
  const [flipped, setFlipped] = useState(false);
  const imageSrc = getStickerImage(card);

  useEffect(() => {
    setFlipped(false);
  }, [card.id]);

  return (
    <div className="sticker-modal-backdrop" onClick={onClose}>
      <div
        className="sticker-modal-panel"
        onClick={(event) => event.stopPropagation()}
        style={{ "--card-color": card.color } as CSSProperties}
      >
        <button className="sticker-modal-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="sticker-modal-hint">
          <RotateCcw size={16} />
          Tocá para girar
        </div>

        <div className="sticker-modal-scene" onClick={() => setFlipped((value) => !value)}>
          <div className={`sticker-modal-card ${flipped ? "is-flipped" : ""}`}>
            <article className="sticker-modal-face sticker-modal-front clean-front">
              <span className="sticker-modal-number">N.º {card.number}</span>

              {duplicate && (
                <span className="sticker-modal-status duplicate">
                  Repetida
                </span>
              )}

              {!duplicate && (
                <span className={`sticker-modal-status ${pasted ? "pasted" : "missing"}`}>
                  {pasted ? "Pegada" : "Sin pegar"}
                </span>
              )}

              {imageSrc ? (
                <img src={imageSrc} alt={card.title} className="sticker-modal-real-image" />
              ) : (
                <div className="sticker-modal-fallback">
                  <IconForCard card={card} size={56} />
                  <strong>{card.title}</strong>
                  <small>PNG no asignado todavía</small>
                </div>
              )}
            </article>

            <article className="sticker-modal-face sticker-modal-back creative-back">
              <div className="creative-back-pattern" />

              <header className="creative-back-header">
                <span>N.º {card.number}</span>
                <strong>{card.section}</strong>
              </header>

              <main className="creative-back-body">
                <div className="creative-back-icon">
                  <IconForCard card={card} size={42} />
                </div>

                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </main>

              <footer className="creative-back-footer">
                <div>
                  <Sparkles size={18} />
                  <span>{duplicate ? "Toquito virtual para intercambio" : pasted ? "Pegada en tu álbum" : "Lista para pegar"}</span>
                </div>

                <div>
                  <BookOpen size={18} />
                  <span>Tocá para volver al frente</span>
                </div>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
