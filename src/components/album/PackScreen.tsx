import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, PackageOpen, Sparkles } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";
import { getStickerImage } from "../../data/stickerImages";

type RevealedSticker = {
  card: AlbumCard;
  imageSrc: string | null;
  repeated: boolean;
};

type Props = {
  onBack: () => void;
  onOpenPack: (count: number) => AlbumCard[];
  currentPackCards: AlbumCard[];
  onViewCard: (card: AlbumCard) => void;
  isPasted: (card: AlbumCard) => boolean;
  isDuplicate: (card: AlbumCard) => boolean;
};

const PACK_IMAGE = "/images/packs/sobre-olavarria.png";

const CONFETTI_COLORS = [
  "#2c8fa3",
  "#8acb55",
  "#ffd166",
  "#d86b3d",
  "#7b4db4",
  "#ffffff",
  "#36d8c8",
  "#ff5fa2"
];

export function PackScreen({
  onBack,
  onOpenPack,
  currentPackCards,
  onViewCard,
  isPasted
}: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "revealed">(
    currentPackCards.length > 0 ? "revealed" : "idle"
  );
  const [revealedStickers, setRevealedStickers] = useState<RevealedSticker[]>([]);
  const [confettiKey, setConfettiKey] = useState(0);

  useEffect(() => {
    if (currentPackCards.length > 0) {
      setPhase("revealed");
      setRevealedStickers(
        currentPackCards.map((card) => ({
          card,
          imageSrc: getStickerImage(card),
          repeated: isPasted(card)
        }))
      );
    } else {
      setPhase("idle");
      setRevealedStickers([]);
    }
  }, [currentPackCards, isPasted]);

  const confettiPieces = useMemo(() => {
    return Array.from({ length: 120 }, (_, index) => {
      const side = index % 2 === 0 ? -1 : 1;
      const x = side * (40 + Math.random() * 430);
      const y = -80 - Math.random() * 260;
      const fall = 110 + Math.random() * 230;
      const size = 5 + Math.random() * 10;
      const delay = Math.random() * 0.18;
      const duration = 1.55 + Math.random() * 1.15;
      const rotate = -540 + Math.random() * 1080;

      return {
        id: index,
        x,
        y,
        fall,
        size,
        delay,
        duration,
        rotate,
        color: CONFETTI_COLORS[index % CONFETTI_COLORS.length],
        shape: index % 4
      };
    });
  }, [confettiKey]);

  function openPack() {
    if (phase === "opening") return;

    setPhase("opening");
    setRevealedStickers([]);
    setConfettiKey((current) => current + 1);

    window.setTimeout(() => {
      const cards = onOpenPack(3);

      const nextStickers = cards.map((card) => ({
        card,
        imageSrc: getStickerImage(card),
        repeated: isPasted(card)
      }));

      setRevealedStickers(nextStickers);
      setPhase("revealed");
    }, 1900);
  }

  function prepareAnotherPack() {
    setPhase("idle");
    setRevealedStickers([]);
  }

  return (
    <main className="new-pack-screen">
      <button className="new-pack-back" onClick={onBack}>
        <ArrowLeft size={24} />
      </button>

      <section className={`new-pack-stage ${phase}`}>
        <div className="new-pack-bg" />

        <header className="new-pack-header compact-pack-header">
          <span>Abrir sobre</span>
          {phase === "idle" && <p>Tocá el sobre para descubrir tus figuritas.</p>}
          {phase === "opening" && <p>Abriendo...</p>}
          {phase === "revealed" && revealedStickers.length > 0 && (
            <p>Tocá una figurita para pegarla en el álbum.</p>
          )}
          {phase === "revealed" && revealedStickers.length === 0 && (
            <p>Ya pegaste todas las figuritas de este sobre.</p>
          )}
        </header>

        <div className="new-pack-table">
          {phase !== "revealed" && (
            <div className={`new-pack-envelope ${phase}`} onClick={phase === "idle" ? openPack : undefined}>
              <div className="new-pack-lid">
                <img src={PACK_IMAGE} alt="Parte superior del sobre" />
              </div>

              <img className="new-pack-full" src={PACK_IMAGE} alt="Sobre Olavarría en Figuritas" />

              <div className="new-pack-cut-line" />
            </div>
          )}

          {phase === "opening" && (
            <div className="simple-confetti-layer" key={confettiKey}>
              {confettiPieces.map((piece) => (
                <i
                  key={piece.id}
                  className={`simple-confetti-piece shape-${piece.shape}`}
                  style={
                    {
                      "--x": `${piece.x}px`,
                      "--y": `${piece.y}px`,
                      "--fall": `${piece.fall}px`,
                      "--size": `${piece.size}px`,
                      "--delay": `${piece.delay}s`,
                      "--duration": `${piece.duration}s`,
                      "--rotate": `${piece.rotate}deg`,
                      "--confetti-color": piece.color
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          )}

          {phase === "revealed" && revealedStickers.length > 0 && (
            <div className={`new-stickers-reveal count-${revealedStickers.length}`}>
              {revealedStickers.map((item, index) => (
                <button
                  key={`${item.card.id}-${index}`}
                  className={`new-revealed-sticker sticker-${index + 1} ${item.repeated ? "repeated" : "fresh"}`}
                  onClick={() => onViewCard(item.card)}
                  style={{ "--card-color": item.card.color } as CSSProperties}
                >
                  <div className="new-revealed-image">
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt={item.card.title} />
                    ) : (
                      <div className="new-revealed-fallback">
                        <IconForCard card={item.card} size={40} />
                      </div>
                    )}
                  </div>

                  {item.repeated && <span className="repeated-badge">Repetida · +1 toquito</span>}
                </button>
              ))}
            </div>
          )}

          {phase === "revealed" && revealedStickers.length === 0 && (
            <div className="empty-open-pack-message">
              <Sparkles size={38} />
              <strong>Sobre completado</strong>
              <span>Ya no quedan figuritas pendientes en este sobre.</span>
            </div>
          )}
        </div>

        <div className="new-pack-actions">
          {phase === "idle" && (
            <button className="new-pack-main-button" onClick={openPack}>
              <PackageOpen size={22} />
              Abrir sobre
            </button>
          )}

          {phase === "opening" && (
            <button className="new-pack-main-button disabled" disabled>
              <Sparkles size={22} />
              Abriendo...
            </button>
          )}

          {phase === "revealed" && (
            <>
              <button className="new-pack-main-button" onClick={prepareAnotherPack}>
                <PackageOpen size={22} />
                Otro sobre
              </button>

              <button className="new-pack-secondary-button" onClick={onBack}>
                Menú
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
