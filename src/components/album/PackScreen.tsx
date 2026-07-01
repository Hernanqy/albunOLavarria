import { useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, Eye, PackageOpen, Sparkles } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";
import { getStickerImage } from "../../data/stickerImages";

type RevealedSticker = {
  card: AlbumCard;
  imageSrc: string | null;
};

type Props = {
  onBack: () => void;
  onOpenPack: (count: number) => AlbumCard[];
  onViewCard: (card: AlbumCard) => void;
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

export function PackScreen({ onBack, onOpenPack, onViewCard }: Props) {
  const [phase, setPhase] = useState<"idle" | "opening" | "revealed">("idle");
  const [revealedStickers, setRevealedStickers] = useState<RevealedSticker[]>([]);
  const [confettiKey, setConfettiKey] = useState(0);

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
        imageSrc: getStickerImage(card)
      }));

      setRevealedStickers(nextStickers);
      setPhase("revealed");
    }, 1900);
  }

  function resetPack() {
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

        <header className="new-pack-header">
          <span>Abrir sobre</span>
          <h1>Nuevo paquete</h1>
          <p>Conseguí tres figuritas para seguir completando el álbum.</p>
        </header>

        <div className="new-pack-table">
          <div className={`new-pack-envelope ${phase}`}>
            <div className="new-pack-lid">
              <img src={PACK_IMAGE} alt="Parte superior del sobre" />
            </div>

            <img className="new-pack-full" src={PACK_IMAGE} alt="Sobre Olavarría en Figuritas" />

            <div className="new-pack-cut-line" />
          </div>

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

          {phase === "revealed" && (
            <div className="new-stickers-reveal">
              {revealedStickers.map((item, index) => (
                <article
                  key={`${item.card.id}-${index}`}
                  className={`new-revealed-sticker sticker-${index + 1}`}
                  style={{ "--card-color": item.card.color } as CSSProperties}
                >
                  <div className="new-revealed-image">
                    {item.imageSrc ? (
                      <img src={item.imageSrc} alt={item.card.title} />
                    ) : null}

                    {!item.imageSrc ? (
                      <div className="new-revealed-fallback">
                        <IconForCard card={item.card} size={40} />
                      </div>
                    ) : null}
                  </div>

                  <button onClick={() => onViewCard(item.card)}>
                    <Eye size={18} />
                    Ver
                  </button>
                </article>
              ))}
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
              <button className="new-pack-main-button" onClick={resetPack}>
                <PackageOpen size={22} />
                Preparar otro
              </button>

              <button className="new-pack-secondary-button" onClick={onBack}>
                Volver al menú
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
