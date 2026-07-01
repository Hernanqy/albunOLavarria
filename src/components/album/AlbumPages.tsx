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

const CARDS_PER_SPREAD = 8;

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

  const leftCards = visibleCards.slice(0, 4);
  const rightCards = visibleCards.slice(4, 8);
  const sectionCompleted = sectionCards.filter((card) => isPasted(card)).length;

  const pendingWasNotFound =
    Boolean(pendingPasteCard) &&
    pendingPasteCard?.sectionId === activeSection.id &&
    pendingIndexInThisSection === -1;

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
    }, 950);
  }

  function handleSlotClick(card: AlbumCard) {
    const isPendingTarget = pendingPasteCard?.id === card.id && !isPasted(card);

    if (isPendingTarget) {
      pasteIntoSlot(card);
      return;
    }

    onOpenCard(card);
  }

  function renderStickerImage(card: AlbumCard) {
    const imageSrc = getStickerImage(card);

    if (imageSrc) {
      return <img src={imageSrc} alt={card.title} />;
    }

    return (
      <>
        <IconForCard card={card} size={28} />
        <span>{card.imageLabel}</span>
      </>
    );
  }

  function renderSlot(card: AlbumCard) {
    const pasted = isPasted(card);
    const imageSrc = getStickerImage(card);
    const isPendingTarget = pendingPasteCard?.id === card.id && !pasted;
    const isJustPasted = justPastedId === card.id;

    return (
      <button
        key={card.id}
        className={[
          "real-sticker-slot",
          pasted ? "pasted" : "empty",
          isPendingTarget ? "paste-target force-visible-target" : "",
          isJustPasted ? "just-pasted locked-pop" : ""
        ].join(" ")}
        onClick={() => handleSlotClick(card)}
        style={{ "--card-color": card.color } as CSSProperties}
      >
        {(pasted || isJustPasted) ? (
          <>
            <div className="real-sticker-image pasted-image">
              {renderStickerImage(card)}
            </div>

            <strong>{card.title}</strong>
            <small>{card.number}</small>

            {isJustPasted && (
              <span className="pasted-success-flash">
                <Sparkles size={18} />
              </span>
            )}
          </>
        ) : (
          <>
            <span className="real-empty-number">{card.number}</span>
            <em>{isPendingTarget ? "Tocá para pegar" : "Espacio vacío"}</em>

            {isPendingTarget && (
              <>
                <span className="paste-target-big-indicator">
                  <Sparkles size={22} />
                  <strong>Pegar acá</strong>
                </span>

                {imageSrc && (
                  <img
                    className="ghost-sticker-preview"
                    src={imageSrc}
                    alt={card.title}
                  />
                )}
              </>
            )}
          </>
        )}
      </button>
    );
  }

  return (
    <main
      className="real-album-screen"
      style={{ "--section-color": activeSection.color } as CSSProperties}
    >
      <button className="real-album-back" onClick={onBack}>
        <ArrowLeft size={26} />
      </button>

      {pendingPasteCard && pendingPasteCard.sectionId === activeSection.id && !pendingWasNotFound && (
        <div className="paste-instruction">
          <Sparkles size={18} />
          Tocá el espacio iluminado para pegar: {pendingPasteCard.title}
        </div>
      )}

      {pendingWasNotFound && (
        <div className="paste-instruction paste-error">
          No encontré el casillero de {pendingPasteCard?.title}. Revisá que exista en albumData.
        </div>
      )}

      {lastPastedCard && (
        <div className="after-paste-panel">
          <div>
            <Sparkles size={20} />
            <strong>Figurita pegada</strong>
            <span>{lastPastedCard.title}</span>
          </div>

          {hasOpenPack && (
            <button onClick={onReturnToPack}>
              <PackageOpen size={18} />
              Volver al sobre
            </button>
          )}

          <button className="secondary" onClick={onStayInAlbum}>
            Seguir viendo el álbum
          </button>
        </div>
      )}

      <section className="real-album-stage">
        <article className="real-album-spread">
          <div className="real-album-page real-album-page-left">
            <header className="real-page-header">
              <span>{activeSection.subtitle}</span>
              <h1>{activeSection.name}</h1>
              <p>{activeSection.description}</p>
            </header>

            <div className="real-sticker-grid">
              {leftCards.map(renderSlot)}
            </div>
          </div>

          <div className="real-album-fold" />

          <div className="real-album-page real-album-page-right">
            <div className="real-section-progress">
              <strong>{sectionCompleted}</strong>
              <span>/ {sectionCards.length}</span>
            </div>

            <div className="real-sticker-grid">
              {rightCards.map(renderSlot)}
            </div>
          </div>
        </article>
      </section>

      <nav className="real-album-nav">
        <button onClick={previousSpread}>
          <ChevronLeft size={32} />
        </button>

        <div className="real-album-section-pill">
          <strong>{activeSection.name}</strong>
          <span>
            Página {currentPageIndex + 1} de {totalPages} · {completed} / {total}
          </span>
        </div>

        <button onClick={nextSpread}>
          <ChevronRight size={32} />
        </button>
      </nav>
    </main>
  );
}
