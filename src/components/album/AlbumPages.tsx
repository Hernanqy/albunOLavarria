import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
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

const CARDS_PER_SPREAD = 6;

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
  const previousSection = sections[(sectionIndex - 1 + sections.length) % sections.length];
  const nextSection = sections[(sectionIndex + 1) % sections.length];

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

  const leftCards = visibleCards.slice(0, 3);
  const rightCards = visibleCards.slice(3, 6);
  const sectionCompleted = sectionCards.filter((card) => isPasted(card)).length;

  useEffect(() => {
    setPageIndex(0);
  }, [activeSectionId]);

  function previousPage() {
    setPageIndex((current) => {
      if (current <= 0) return totalPages - 1;
      return current - 1;
    });
  }

  function nextPage() {
    setPageIndex((current) => {
      if (current >= totalPages - 1) return 0;
      return current + 1;
    });
  }

  function changeSection(sectionId: SectionId) {
    setPageIndex(0);
    onChangeSection(sectionId);
  }

  return (
    <main className="album-pages-screen">
      <div className="album-pages-top">
        <button onClick={onBack}>
          <ArrowLeft size={18} />
          Índice
        </button>

        <div>
          <strong>{activeSection.name}</strong>
          <span>
            Página {safePageIndex + 1} de {totalPages} · {sectionCompleted} / {sectionCards.length} de esta sección · {completed} / {total} total
          </span>
        </div>
      </div>

      <div className="sections-ribbon">
        {sections.map((section) => (
          <button
            key={section.id}
            className={section.id === activeSection.id ? "active" : ""}
            onClick={() => changeSection(section.id)}
            style={{ "--section-color": section.color } as CSSProperties}
          >
            {section.name}
          </button>
        ))}
      </div>

      <section
        className="figuritas-spread section-themed-spread"
        style={{ "--active-section": activeSection.color } as CSSProperties}
      >
        <article className="figuritas-page left">
          <div className="page-stamp">{activeSection.subtitle}</div>
          <h2>{activeSection.name}</h2>
          <p>{activeSection.description}</p>

          <div className="section-arrows">
            <button onClick={() => changeSection(previousSection.id)}>
              <ChevronLeft size={18} />
              {previousSection.name}
            </button>
            <button onClick={() => changeSection(nextSection.id)}>
              {nextSection.name}
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="spread-page-control">
            <button onClick={previousPage}>
              <ChevronLeft size={18} />
              Página anterior
            </button>
            <span>{safePageIndex + 1} / {totalPages}</span>
            <button onClick={nextPage}>
              Siguiente
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="figuritas-grid">
            {leftCards.map((card) => (
              <button
                key={card.id}
                className={`figurita-slot ${isPasted(card) ? "pasted" : "empty"}`}
                onClick={() => onOpenCard(card)}
                style={{ "--card-color": card.color } as CSSProperties}
              >
                {isPasted(card) ? (
                  <>
                    <div className="figurita-image">
                      <IconForCard card={card} />
                      <span>{card.imageLabel}</span>
                    </div>
                    <strong>{card.title}</strong>
                    <small>{card.section}</small>
                  </>
                ) : (
                  <>
                    <span className="empty-number">{card.number}</span>
                    <small>Espacio vacío</small>
                  </>
                )}
              </button>
            ))}
          </div>
        </article>

        <article className="figuritas-page right">
          <div className="page-side-photo">
            <MapPin size={18} />
            Página {safePageIndex + 1} de {activeSection.name}
          </div>

          <div className="figuritas-grid">
            {rightCards.map((card) => (
              <button
                key={card.id}
                className={`figurita-slot ${isPasted(card) ? "pasted" : "empty"}`}
                onClick={() => onOpenCard(card)}
                style={{ "--card-color": card.color } as CSSProperties}
              >
                {isPasted(card) ? (
                  <>
                    <div className="figurita-image">
                      <IconForCard card={card} />
                      <span>{card.imageLabel}</span>
                    </div>
                    <strong>{card.title}</strong>
                    <small>{card.section}</small>
                  </>
                ) : (
                  <>
                    <span className="empty-number">{card.number}</span>
                    <small>Espacio vacío</small>
                  </>
                )}
              </button>
            ))}
          </div>

          {rightCards.length === 0 && (
            <div className="empty-spread-note">
              <strong>Página libre</strong>
              <span>Este espacio queda preparado para nuevas figuritas de la sección.</span>
            </div>
          )}
        </article>
      </section>
    </main>
  );
}
