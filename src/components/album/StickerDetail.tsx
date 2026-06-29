import type { CSSProperties } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";

type Props = {
  card: AlbumCard;
  pasted: boolean;
  onBack: () => void;
  onPaste: () => void;
};

export function StickerDetail({ card, pasted, onBack, onPaste }: Props) {
  return (
    <main className="sticker-detail-screen">
      <button className="floating-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Volver
      </button>

      <section
        className="sticker-detail-card"
        style={{ "--card-color": card.color } as CSSProperties}
      >
        <div className="detail-number">N.º {card.number}</div>

        <div className="detail-image">
          <IconForCard card={card} />
          <span>{pasted ? card.imageLabel : "Figurita sin pegar"}</span>
        </div>

        <h1>{card.title}</h1>
        <p>{pasted ? card.description : "Conseguí esta figurita abriendo sobres o escaneando un QR."}</p>

        {!pasted && (
          <button className="fixed-main-button" onClick={onPaste}>
            <CheckCircle2 size={20} />
            Pegar figurita
          </button>
        )}
      </section>
    </main>
  );
}
