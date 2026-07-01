import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { AlbumCard, AlbumSection, SectionId } from "../../types/album";
import { IconForCard } from "./IconForCard";

type Props = {
  cards: AlbumCard[];
  sections: AlbumSection[];
  activeSectionId: SectionId;
  completed: number;
  total: number;
  isPasted: (card: AlbumCard) => boolean;
  onBack: () => void;
  onChangeSection: (sectionId: SectionId) => void;
  onOpenCard: (card: AlbumCard) => void;
};

const CARDS_PER_SPREAD = 8;

export function AlbumPages({
  cards,
  sections,
  activeSectionId,
  completed,
  total,
  isPasted,
  onBack,
  onChangeSection,
  onOpenCard
}: Props) {
  const [pageIndex, setPageIndex] = useState(0);

  const activeSection = sections.find((section) => section.id === activeSectionId) ?? sections[0];
  const sectionIndex = sections.findIndex((section) => section.id === activeSection.id);

  const sectionCards = useMemo(
    () => cards.filter((card) => card.sectionId === activeSection.id),
    [cards, activeSection.id]
  );

  const totalPages = Math.max(1, Math.ceil(sectionCards.length / CARDS_PER_SPREAD));
  const safePageIndex = Math.min(pageIndex, totalPages - 1);

  const visibleCards = sectionCards.slice(
    safePageIndex * CARDS_PER_SPREAD,
    safePageIndex * CARDS_PER_SPREAD + CARDS_PER_SPREAD
  );

  const leftCards = visibleCards.slice(0, 4);
  const rightCards = visibleCards.slice(4, 8);
  const sectionCompleted = sectionCards.filter((card) => isPasted(card)).length;

  useEffect(() => {
    setPageIndex(0);
  }, [activeSectionId]);

  function previousSpread() {
    if (safePageIndex > 0) {
      setPageIndex(safePageIndex - 1);
      return;
    }

    const previousSection = sections[(sectionIndex - 1 + sections.length) % sections.length];
    onChangeSection(previousSection.id);
  }

  function nextSpread() {
    if (safePageIndex < totalPages - 1) {
      setPageIndex(safePageIndex + 1);
      return;
    }

    const nextSection = sections[(sectionIndex + 1) % sections.length];
    onChangeSection(nextSection.id);
  }

  return (
    <main
      className="real-album-screen"
      style={{ "--section-color": activeSection.color } as CSSProperties}
    >
      <button className="real-album-back" onClick={onBack}>
        <ArrowLeft size={26} />
      </button>

      <section className="real-album-stage">
        <article className="real-album-spread">
          <div className="real-album-page real-album-page-left">
            <header className="real-page-header">
              <span>{activeSection.subtitle}</span>
              <h1>{activeSection.name}</h1>
              <p>{activeSection.description}</p>
            </header>

            <div className="real-sticker-grid">
              {leftCards.map((card) => (
                <button
                  key={card.id}
                  className={`real-sticker-slot ${isPasted(card) ? "pasted" : "empty"}`}
                  onClick={() => onOpenCard(card)}
                  style={{ "--card-color": card.color } as CSSProperties}
                >
                  {isPasted(card) ? (
                    <>
                      <div className="real-sticker-image">
                        <IconForCard card={card} size={28} />
                        <span>{card.imageLabel}</span>
                      </div>
                      <strong>{card.title}</strong>
                      <small>{card.number}</small>
                    </>
                  ) : (
                    <>
                      <span className="real-empty-number">{card.number}</span>
                      <em>Espacio vacío</em>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="real-album-fold" />

          <div className="real-album-page real-album-page-right">
            <div className="real-section-progress">
              <strong>{sectionCompleted}</strong>
              <span>/ {sectionCards.length}</span>
            </div>

            <div className="real-sticker-grid">
              {rightCards.map((card) => (
                <button
                  key={card.id}
                  className={`real-sticker-slot ${isPasted(card) ? "pasted" : "empty"}`}
                  onClick={() => onOpenCard(card)}
                  style={{ "--card-color": card.color } as CSSProperties}
                >
                  {isPasted(card) ? (
                    <>
                      <div className="real-sticker-image">
                        <IconForCard card={card} size={28} />
                        <span>{card.imageLabel}</span>
                      </div>
                      <strong>{card.title}</strong>
                      <small>{card.number}</small>
                    </>
                  ) : (
                    <>
                      <span className="real-empty-number">{card.number}</span>
                      <em>Espacio vacío</em>
                    </>
                  )}
                </button>
              ))}
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
            Página {safePageIndex + 1} de {totalPages} · {completed} / {total}
          </span>
        </div>

        <button onClick={nextSpread}>
          <ChevronRight size={32} />
        </button>
      </nav>
    </main>
  );
}
