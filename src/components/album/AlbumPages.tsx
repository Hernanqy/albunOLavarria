import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, PackageOpen, Sparkles } from "lucide-react";
import type { AlbumCard, AlbumSection, SectionId } from "../../types/album";
import { IconForCard } from "./IconForCard";
import { getStickerImage } from "../../data/stickerImages";

type Props = {
  cards: AlbumCard[];
  sections: AlbumSection[];
  activeSectionId: SectionId;
  completed: number;
  total: number;
  isPasted: (card: AlbumCard) => boolean;
  pendingPasteCard: AlbumCard | null;
  lastPastedCard: AlbumCard | null;
  hasOpenPack: boolean;
  onBack: () => void;
  onChangeSection: (sectionId: SectionId) => void;
  onOpenCard: (card: AlbumCard) => void;
  onPastePendingCard: (card: AlbumCard) => void;
  onReturnToPack: () => void;
  onStayInAlbum: () => void;
};

const CARDS_PER_SPREAD = 10;

const SLOT_POSITIONS = [
  { left: "12.4%", top: "33.3%", width: "9.8%", height: "24.2%" },
  { left: "24.9%", top: "32.2%", width: "10.2%", height: "25.2%" },
  { left: "37.2%", top: "33.3%", width: "9.8%", height: "24.2%" },
  { left: "18.5%", top: "61.6%", width: "9.8%", height: "24.1%" },
  { left: "30.8%", top: "61.6%", width: "9.8%", height: "24.1%" },

  { left: "56.2%", top: "22.4%", width: "10.2%", height: "25.4%" },
  { left: "70.0%", top: "23.0%", width: "10.2%", height: "25.0%" },
  { left: "83.7%", top: "23.0%", width: "10.2%", height: "25.0%" },
  { left: "60.6%", top: "60.1%", width: "10.2%", height: "25.0%" },
  { left: "72.9%", top: "59.3%", width: "10.2%", height: "25.0%" }
];

export function AlbumPages({
  cards,
  sections,
  activeSectionId,
  completed,
  total,
  isPasted,
  pendingPasteCard,
  lastPastedCard,
  hasOpenPack,
  onBack,
  onChangeSection,
  onOpenCard,
  onPastePendingCard,
  onReturnToPack,
  onStayInAlbum
}: Props) {
  const [manualPageIndex, setManualPageIndex] = useState(0);
  const [justPastedId, setJustPastedId] = useState<string | null>(null);

  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];
  const sectionIndex = sections.findIndex((section) => section.id === activeSection.id);

  const sectionCards = useMemo(
    () => cards.filter((card) => card.sectionId === activeSection.id),
    [cards, activeSection.id]
  );

  const pendingBelongsToThisSection =
    Boolean(pendingPasteCard) && pendingPasteCard?.sectionId === activeSection.id;

  const pendingIndexInThisSection = pendingBelongsToThisSection && pendingPasteCard
    ? sectionCards.findIndex((card) => card.id === pendingPasteCard.id)
    : -1;

  const pendingPageIndex = pendingIndexInThisSection >= 0
    ? Math.floor(pendingIndexInThisSection / CARDS_PER_SPREAD)
    : -1;

  const totalPages = Math.max(1, Math.ceil(sectionCards.length / CARDS_PER_SPREAD));

  const currentPageIndex =
    pendingPageIndex >= 0
      ? pendingPageIndex
      : Math.min(manualPageIndex, totalPages - 1);

  const visibleCards = sectionCards.slice(
    currentPageIndex * CARDS_PER_SPREAD,
    currentPageIndex * CARDS_PER_SPREAD + CARDS_PER_SPREAD
  );

  const sectionCompleted = sectionCards.filter((card) => isPasted(card)).length;

  useEffect(() => {
    if (!pendingPasteCard) return;

    if (pendingPasteCard.sectionId !== activeSection.id) {
      onChangeSection(pendingPasteCard.sectionId);
      return;
    }

    if (pendingPageIndex >= 0) {
      setManualPageIndex(pendingPageIndex);
    }
  }, [pendingPasteCard, activeSection.id, pendingPageIndex, onChangeSection]);

  useEffect(() => {
    if (!pendingPasteCard) {
      setManualPageIndex(0);
    }
  }, [activeSectionId, pendingPasteCard]);

  function previousSpread() {
    if (currentPageIndex > 0) {
      setManualPageIndex(currentPageIndex - 1);
      return;
    }

    const previousSection = sections[(sectionIndex - 1 + sections.length) % sections.length];
    onChangeSection(previousSection.id);
  }

  function nextSpread() {
    if (currentPageIndex < totalPages - 1) {
      setManualPageIndex(currentPageIndex + 1);
      return;
    }

    const nextSection = sections[(sectionIndex + 1) % sections.length];
    onChangeSection(nextSection.id);
  }

  function pasteIntoSlot(card: AlbumCard) {
    setJustPastedId(card.id);
    onPastePendingCard(card);

    window.setTimeout(() => {
      setJustPastedId(null);
    }, 850);
  }

  function handleSlotClick(card: AlbumCard) {
    const isPendingTarget = pendingPasteCard?.id === card.id && !isPasted(card);

    if (isPendingTarget) {
      pasteIntoSlot(card);
      return;
    }

    onOpenCard(card);
  }

  function renderStickerFace(card: AlbumCard) {
    const imageSrc = getStickerImage(card);

    if (imageSrc) {
      return <img src={imageSrc} alt={card.title} />;
    }

    return (
      <span className="bgalbum-fallback">
        <IconForCard card={card} size={28} />
        <b>{card.imageLabel}</b>
      </span>
    );
  }

  return (
    <main className="bgalbum-screen" style={{ "--section-color": activeSection.color } as CSSProperties}>
      <button className="bgalbum-back" onClick={onBack} aria-label="Volver">
        <ArrowLeft size={26} />
      </button>

      {lastPastedCard && (
        <div className="bgalbum-toast">
          <div>
            <Sparkles size={18} />
            <strong>Figurita pegada</strong>
            <span>{lastPastedCard.title}</span>
          </div>

          <strong className="bgalbum-toast-progress">
            {completed}/{total}
          </strong>

          <div className="bgalbum-toast-actions">
            {hasOpenPack && (
              <button onClick={onReturnToPack}>
                <PackageOpen size={16} />
                Volver al sobre
              </button>
            )}

            <button className="secondary" onClick={onStayInAlbum}>
              Seguir
            </button>
          </div>
        </div>
      )}

      <section className="bgalbum-book">
        <img
          className="bgalbum-image"
          src="/images/album/album-bg-historia.png"
          alt=""
          draggable={false}
        />

        {visibleCards.map((card, index) => {
          const pasted = isPasted(card);
          const isPendingTarget = pendingPasteCard?.id === card.id && !pasted;
          const isJustPasted = justPastedId === card.id;
          const slotPosition = SLOT_POSITIONS[index];

          if (!slotPosition) return null;

          return (
            <button
              key={card.id}
              className={[
                "bgalbum-slot",
                pasted ? "pasted" : "empty",
                isPendingTarget ? "target" : "",
                isJustPasted ? "just-pasted" : ""
              ].join(" ")}
              style={slotPosition as CSSProperties}
              onClick={() => handleSlotClick(card)}
            >
              {(pasted || isJustPasted) ? (
                <span className="bgalbum-sticker">
                  {renderStickerFace(card)}
                </span>
              ) : (
                <span className="bgalbum-empty">
                  <span>{card.number}</span>

                  {isPendingTarget && (
                    <strong>
                      <Sparkles size={15} />
                      Pegar acá
                    </strong>
                  )}
                </span>
              )}
            </button>
          );
        })}
      </section>

      <nav className="bgalbum-nav">
        <button onClick={previousSpread} aria-label="Página anterior">
          <ChevronLeft size={32} />
        </button>

        <div className="bgalbum-pill">
          <strong>{activeSection.name}</strong>
          <span>
            Página {currentPageIndex + 1} de {totalPages} · {sectionCompleted} / {sectionCards.length}
          </span>
        </div>

        <button onClick={nextSpread} aria-label="Página siguiente">
          <ChevronRight size={32} />
        </button>
      </nav>
    </main>
  );
}

