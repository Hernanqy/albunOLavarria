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
    // El navegador puede bloquear esto si no está instalada como PWA.
  }
}

export default function App() {
  const [view, setView] = useState<View>("index");
  const [activeSectionId, setActiveSectionId] = useState<SectionId>("historia");
  const [selectedCard, setSelectedCard] = useState<AlbumCard | null>(null);
  const [lastPackCard, setLastPackCard] = useState<AlbumCard | null>(null);
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
    setView("sticker");
  }

  function pasteCard(card: AlbumCard) {
    setPastedIds((current) => {
      if (current.includes(card.id)) return current;
      return [...current, card.id];
    });
  }

  function openPack() {
    const missing = albumCards.filter((card) => !pastedIds.includes(card.id));
    const pool = missing.length > 0 ? missing : albumCards;
    const next = pool[Math.floor(Math.random() * pool.length)];

    pasteCard(next);
    setLastPackCard(next);

    return next;
  }

  function scanCode(code: string) {
    const cardId = qrCodes[code];

    if (!cardId) return null;

    const card = albumCards.find((item) => item.id === cardId);

    if (!card) return null;

    pasteCard(card);
    return card;
  }

  if (view === "index") {
    return (
      <AlbumIndex
        completed={completed}
        total={albumCards.length}
        percent={percent}
        onExplore={() => setView("section")}
        onOpenPack={() => {
          setLastPackCard(null);
          setView("pack");
        }}
        onScanner={() => setView("scanner")}
        onMap={() => setView("map")}
      />
    );
  }

  if (view === "section") {
    return (
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
  }

  if (view === "sticker" && selectedCard) {
    return (
      <StickerDetail
        card={selectedCard}
        pasted={isPasted(selectedCard)}
        onBack={() => setView("section")}
        onPaste={() => {
          pasteCard(selectedCard);
          setView("section");
        }}
      />
    );
  }

  if (view === "pack") {
    return (
      <PackScreen
        onBack={() => setView("index")}
        onOpenPack={openPack}
        lastCard={lastPackCard}
        onViewCard={openCard}
      />
    );
  }

  if (view === "scanner") {
    return (
      <ScannerScreen
        onBack={() => setView("index")}
        onScanCode={scanCode}
        onViewCard={openCard}
      />
    );
  }

  return (
    <MapScreen
      cards={albumCards}
      isPasted={isPasted}
      onBack={() => setView("index")}
      onUnlockCode={scanCode}
      onViewCard={openCard}
    />
  );
}
