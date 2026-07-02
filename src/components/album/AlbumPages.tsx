import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, PackageOpen, Sparkles, X } from "lucide-react";
import type { AlbumCard, AlbumSection, SectionId } from "../../types/album";
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

const SLOT_LAYOUT = [
  { left: "16.8%", top: "47.5%", width: "8.8%" },
  { left: "28.8%", top: "47.5%", width: "8.8%" },
  { left: "40.8%", top: "47.5%", width: "8.8%" },
  { left: "22.8%", top: "74.0%", width: "8.8%" },
  { left: "34.8%", top: "74.0%", width: "8.8%" },

  { left: "58.8%", top: "38.2%", width: "8.6%" },
  { left: "70.8%", top: "38.2%", width: "8.6%" },
  { left: "82.8%", top: "38.2%", width: "8.6%" },
  { left: "64.8%", top: "72.0%", width: "8.6%" },
  { left: "76.8%", top: "72.0%", width: "8.6%" }
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

  const pendingIndexInThisSection =
    pendingBelongsToThisSection && pendingPasteCard
      ? sectionCards.findIndex((card) => card.id === pendingPasteCard.id)
      : -1;

  const pendingPageIndex =
    pendingIndexInThisSection >= 0
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

  return (
    <main className="hist-album-screen">
      <button className="hist-album-back" onClick={onBack} aria-label="Volver">
        <ArrowLeft size={26} />
      </button>

      {pendingPasteCard && pendingPasteCard.sectionId === activeSection.id && (
        <div className="hist-paste-hint">
          <Sparkles size={16} />
          Tocá el espacio marcado para pegar "{pendingPasteCard.title}"
        </div>
      )}

      {lastPastedCard && (
        <div className="hist-mini-actions">
          <div className="hist-mini-actions__text">
            <Sparkles size={16} />
            <span>{lastPastedCard.title}</span>
          </div>

          {hasOpenPack && (
            <button onClick={onReturnToPack} className="hist-mini-actions__btn">
              <PackageOpen size={14} />
              Sobre
            </button>
          )}

          <button onClick={onStayInAlbum} className="hist-mini-actions__btn secondary">
            <X size={14} />
            Cerrar
          </button>
        </div>
      )}

      <section className="hist-album-book">
        <div className="hist-album-title">
          <span>{activeSection.subtitle}</span>
          <h1>{activeSection.name}</h1>
          <p>{activeSection.description}</p>
        </div>

        <div className="hist-album-progress">
          {sectionCompleted} / {sectionCards.length}
        </div>

        {visibleCards.map((card, index) => {
          const layout = SLOT_LAYOUT[index];
          if (!layout) return null;

          const pasted = isPasted(card);
          const isPendingTarget = pendingPasteCard?.id === card.id && !pasted;
          const isJustPasted = justPastedId === card.id;
          const imageSrc = getStickerImage(card);

          return (
            <button
              key={card.id}
              className={[
                "hist-album-slot",
                pasted ? "pasted" : "empty",
                isPendingTarget ? "target" : "",
                isJustPasted ? "just-pasted" : ""
              ].join(" ")}
              style={
                {
                  "--slot-left": layout.left,
                  "--slot-top": layout.top,
                  "--slot-width": layout.width
                } as CSSProperties
              }
              onClick={() => handleSlotClick(card)}
            >
              {(pasted || isJustPasted) ? (
                <>
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt={card.title}
                      className="hist-album-slot__sticker"
                    />
                  ) : (
                    <div className="hist-album-slot__fallback">{card.title}</div>
                  )}
                </>
              ) : (
                <div className="hist-album-slot__frame">
                  <span className="hist-album-slot__code">{card.number}</span>
                  <span className="hist-album-slot__burst" />

                  {isPendingTarget ? (
                    <span className="hist-album-slot__cta">Pegá acá</span>
                  ) : (
                    <span className="hist-album-slot__empty-text">Espacio vacío</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </section>

      <nav className="hist-album-nav">
        <button onClick={previousSpread} aria-label="Anterior">
          <ChevronLeft size={30} />
        </button>

        <div className="hist-album-nav__pill">
          <strong>{activeSection.name}</strong>
          <span>
            Página {currentPageIndex + 1} de {totalPages} · {completed} / {total}
          </span>
        </div>

        <button onClick={nextSpread} aria-label="Siguiente">
          <ChevronRight size={30} />
        </button>
      </nav>
    </main>
  );
}
