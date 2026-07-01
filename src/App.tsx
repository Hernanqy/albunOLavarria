import { useEffect, useState } from "react";
import { AlbumIndex } from "./components/album/AlbumIndex";
import { AlbumPages } from "./components/album/AlbumPages";
import { MapScreen } from "./components/album/MapScreen";
import { PackScreen } from "./components/album/PackScreen";
import { ScannerScreen } from "./components/album/ScannerScreen";
import { StickerDetail } from "./components/album/StickerDetail";
import { cards as baseCards, sections } from "./data/albumData";
import { extraCards } from "./data/extraAlbumCards";
import { qrCodes } from "./data/qrCodes";
import { hasStickerImage } from "./data/stickerImages";
import type { AlbumCard, SectionId, View } from "./types/album";

const albumCards: AlbumCard[] = [...baseCards, ...extraCards];

const STORAGE_KEY = "olavarria-en-figuritas-pasted-ids";

const starterPastedIds = albumCards
  .filter((card) => card.pasted)
  .map((card) => card.id);

function readInitialPastedIds() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return starterPastedIds;

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) return starterPastedIds;

    const validIds = parsed.filter((id) =>
      albumCards.some((card) => card.id === id)
    );

    return Array.from(new Set([...starterPastedIds, ...validIds]));
  } catch {
    return starterPastedIds;
  }
}

function shuffleCards(cards: AlbumCard[]) {
  return [...cards].sort(() => Math.random() - 0.5);
}

async function tryFullscreenLandscape() {
  try {
    const element = document.documentElement;

    if (!document.fullscreenElement && element.requestFullscreen) {
      await element.requestFullscreen();
    }

    const orientation = screen.orientation as ScreenOrientation & {
      lock?: (orientation: OrientationLockType) => Promise<void>;
    };

    if (orientation?.lock) {
      await orientation.lock("landscape");
    }
  } catch {
    // Puede fallar en navegador común.
  }
}

export default function App() {
  const [view, setView] = useState<View>("index");
  const [activeSectionId, setActiveSectionId] = useState<SectionId>("historia");
  const [selectedCard, setSelectedCard] = useState<AlbumCard | null>(null);
  const [pastedIds, setPastedIds] = useState<string[]>(readInitialPastedIds);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pastedIds));
  }, [pastedIds]);

  useEffect(() => {
    const start = () => {
      tryFullscreenLandscape();
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("click", start);
    };

    window.addEventListener("pointerdown", start, { once: true });
    window.addEventListener("touchstart", start, { once: true });
    window.addEventListener("click", start, { once: true });

    return () => {
      window.removeEventListener("pointerdown", start);
      window.removeEventListener("touchstart", start);
      window.removeEventListener("click", start);
    };
  }, []);

  const completed = pastedIds.length;
  const percent = Math.round((completed / albumCards.length) * 100);

  function isPasted(card: AlbumCard) {
    return pastedIds.includes(card.id);
  }

  function openCard(card: AlbumCard) {
    setSelectedCard(card);
    setActiveSectionId(card.sectionId);
  }

  function pasteCard(card: AlbumCard) {
    setPastedIds((current) => {
      if (current.includes(card.id)) return current;
      return [...current, card.id];
    });
  }

  function openPackCards(count: number) {
    const imageReadyCards = albumCards.filter(hasStickerImage);

    const missingImageReady = imageReadyCards.filter((card) => !pastedIds.includes(card.id));
    const missingGeneral = albumCards.filter((card) => !pastedIds.includes(card.id));

    let pool: AlbumCard[] = [];

    if (missingImageReady.length >= count) {
      pool = missingImageReady;
    } else if (imageReadyCards.length >= count) {
      pool = imageReadyCards;
    } else if (missingGeneral.length >= count) {
      pool = missingGeneral;
    } else {
      pool = albumCards;
    }

    const selected = shuffleCards(pool).slice(0, count);

    setPastedIds((current) => {
      const next = new Set(current);
      selected.forEach((card) => next.add(card.id));
      return Array.from(next);
    });

    return selected;
  }

  function scanCode(code: string) {
    const cardId = qrCodes[code];

    if (!cardId) return null;

    const card = albumCards.find((item) => item.id === cardId);

    if (!card) return null;

    pasteCard(card);
    return card;
  }

  let screen = null;

  if (view === "index") {
    screen = (
      <AlbumIndex
        completed={completed}
        total={albumCards.length}
        percent={percent}
        onExplore={() => setView("section")}
        onOpenPack={() => setView("pack")}
        onScanner={() => setView("scanner")}
        onMap={() => setView("map")}
      />
    );
  } else if (view === "section") {
    screen = (
      <AlbumPages
        cards={albumCards}
        sections={sections}
        activeSectionId={activeSectionId}
        completed={completed}
        total={albumCards.length}
        isPasted={isPasted}
        onBack={() => setView("index")}
        onChangeSection={setActiveSectionId}
        onOpenCard={openCard}
      />
    );
  } else if (view === "pack") {
    screen = (
      <PackScreen
        onBack={() => setView("index")}
        onOpenPack={openPackCards}
        onViewCard={openCard}
      />
    );
  } else if (view === "scanner") {
    screen = (
      <ScannerScreen
        onBack={() => setView("index")}
        onScanCode={scanCode}
        onViewCard={openCard}
      />
    );
  } else {
    screen = (
      <MapScreen
        cards={albumCards}
        isPasted={isPasted}
        onBack={() => setView("index")}
        onUnlockCode={scanCode}
        onViewCard={openCard}
      />
    );
  }

  return (
    <>
      {screen}

      {selectedCard && (
        <StickerDetail
          card={selectedCard}
          pasted={isPasted(selectedCard)}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}
