import { useEffect, useState, type CSSProperties } from "react";
import { RotateCcw, X } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";
import { getStickerImage } from "../../data/stickerImages";

type Props = {
  card: AlbumCard;
  pasted: boolean;
  onClose: () => void;
};

export function StickerDetail({ card, pasted, onClose }: Props) {
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
          Tocá la figurita para girarla
        </div>

        <div className="sticker-modal-scene" onClick={() => setFlipped((value) => !value)}>
          <div className={`sticker-modal-card ${flipped ? "is-flipped" : ""}`}>
            <article className="sticker-modal-face sticker-modal-front">
              <span className="sticker-modal-number">N.º {card.number}</span>
              <span className={`sticker-modal-status ${pasted ? "pasted" : "missing"}`}>
                {pasted ? "Conseguida" : "No conseguida"}
              </span>

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

            <article className="sticker-modal-face sticker-modal-back">
              <span className="sticker-modal-back-number">N.º {card.number}</span>
              <h2>{card.title}</h2>
              <div className="sticker-modal-back-section">
                {(card as AlbumCard).sectionId}
              </div>
              <p>{card.description}</p>

              <div className="sticker-modal-back-meta">
                <strong>{pasted ? "Ya está en tu colección" : "Todavía no está pegada"}</strong>
                <span>Volvé a tocar para ver el frente</span>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}
