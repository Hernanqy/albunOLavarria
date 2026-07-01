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

const STORAGE_KEY = "olavarria-en-figuritas-pasted-ids-v3";
const DUPLICATES_KEY = "olavarria-en-figuritas-duplicates-v3";
const INVENTORY_KEY = "olavarria-en-figuritas-inventory-v3";
const OPEN_PACK_KEY = "olavarria-en-figuritas-open-pack-v3";

const starterPastedIds: string[] = [];

function readStringArray(key: string, fallback: string[]) {
  try {
    const saved = localStorage.getItem(key);
    if (!saved) return fallback;

    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed)) return fallback;

    return parsed.filter((id) => typeof id === "string");
  } catch {
    return fallback;
  }
}

function readInitialPastedIds() {
  const savedIds = readStringArray(STORAGE_KEY, starterPastedIds);

  const validIds = savedIds.filter((id) =>
    albumCards.some((card) => card.id === id)
  );

  return Array.from(new Set(validIds));
}

function cardsFromIds(ids: string[]) {
  return ids
    .map((id) => albumCards.find((card) => card.id === id))
    .filter((card): card is AlbumCard => Boolean(card));
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
    // En navegador común puede fallar. Como PWA instalada funciona mejor.
  }
}

export default function App() {
  const [view, setView] = useState<View>("index");
  const [activeSectionId, setActiveSectionId] = useState<SectionId>("historia");
  const [selectedCard, setSelectedCard] = useState<AlbumCard | null>(null);
  const [pendingPasteCard, setPendingPasteCard] = useState<AlbumCard | null>(null);
  const [lastPastedCard, setLastPastedCard] = useState<AlbumCard | null>(null);

  const [pastedIds, setPastedIds] = useState<string[]>(readInitialPastedIds);
  const [duplicateIds, setDuplicateIds] = useState<string[]>(
    () => readStringArray(DUPLICATES_KEY, [])
  );
  const [inventoryIds, setInventoryIds] = useState<string[]>(
    () => readStringArray(INVENTORY_KEY, [])
  );
  const [openPackIds, setOpenPackIds] = useState<string[]>(
    () => readStringArray(OPEN_PACK_KEY, [])
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pastedIds));
  }, [pastedIds]);

  useEffect(() => {
    localStorage.setItem(DUPLICATES_KEY, JSON.stringify(duplicateIds));
  }, [duplicateIds]);

  useEffect(() => {
    localStorage.setItem(INVENTORY_KEY, JSON.stringify(inventoryIds));
  }, [inventoryIds]);

  useEffect(() => {
    localStorage.setItem(OPEN_PACK_KEY, JSON.stringify(openPackIds));
  }, [openPackIds]);

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
  const openPackCards = cardsFromIds(openPackIds);

  function isPasted(card: AlbumCard) {
    return pastedIds.includes(card.id);
  }

  function isDuplicate(card: AlbumCard) {
    return duplicateIds.includes(card.id);
  }

  function addToInventory(cards: AlbumCard[]) {
    setInventoryIds((current) => {
      const next = new Set(current);
      cards.forEach((card) => next.add(card.id));
      return Array.from(next);
    });
  }

  function removeFromOpenPack(card: AlbumCard) {
    setOpenPackIds((current) => current.filter((id) => id !== card.id));
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

    setInventoryIds((current) => current.filter((id) => id !== card.id));
    removeFromOpenPack(card);
    setPendingPasteCard(null);
    setLastPastedCard(card);
  }

  function createPackCards(count: number) {
    const imageReadyCards = albumCards.filter(hasStickerImage);
    const missingImageReadyCards = imageReadyCards.filter((card) => !pastedIds.includes(card.id));
    const missingAnyCards = albumCards.filter((card) => !pastedIds.includes(card.id));

    let selected: AlbumCard[] = [];

    if (missingImageReadyCards.length >= count) {
      selected = shuffleCards(missingImageReadyCards).slice(0, count);
    } else if (missingImageReadyCards.length > 0) {
      const needed = count - missingImageReadyCards.length;
      const extraPool = missingAnyCards.filter(
        (card) => !missingImageReadyCards.some((item) => item.id === card.id)
      );

      selected = [
        ...shuffleCards(missingImageReadyCards),
        ...shuffleCards(extraPool).slice(0, needed)
      ];
    } else if (missingAnyCards.length >= count) {
      selected = shuffleCards(missingAnyCards).slice(0, count);
    } else {
      selected = shuffleCards(imageReadyCards.length > 0 ? imageReadyCards : albumCards).slice(0, count);
    }

    const repeatedCards = selected.filter((card) => pastedIds.includes(card.id));

    if (repeatedCards.length > 0) {
      setDuplicateIds((current) => {
        const next = new Set(current);
        repeatedCards.forEach((card) => next.add(card.id));
        return Array.from(next);
      });
    }

    addToInventory(selected);
    setOpenPackIds(selected.map((card) => card.id));
    setLastPastedCard(null);

    return selected;
  }

  function chooseStickerFromPack(card: AlbumCard) {
    addToInventory([card]);
    setLastPastedCard(null);

    if (isPasted(card)) {
      setDuplicateIds((current) => {
        if (current.includes(card.id)) return current;
        return [...current, card.id];
      });

      setSelectedCard(card);
      return;
    }

    setPendingPasteCard(card);
    setActiveSectionId(card.sectionId);
    setView("section");
  }

  function scanCode(code: string) {
    const cardId = qrCodes[code];

    if (!cardId) return null;

    const card = albumCards.find((item) => item.id === cardId);

    if (!card) return null;

    addToInventory([card]);

    if (isPasted(card)) {
      setDuplicateIds((current) => {
        if (current.includes(card.id)) return current;
        return [...current, card.id];
      });
    } else {
      setPendingPasteCard(card);
      setActiveSectionId(card.sectionId);
      setLastPastedCard(null);
    }

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
        pendingPasteCard={pendingPasteCard}
        lastPastedCard={lastPastedCard}
        hasOpenPack={openPackIds.length > 0}
        onBack={() => setView("index")}
        onChangeSection={setActiveSectionId}
        onOpenCard={openCard}
        onPastePendingCard={pasteCard}
        onReturnToPack={() => {
          setLastPastedCard(null);
          setView("pack");
        }}
        onStayInAlbum={() => setLastPastedCard(null)}
      />
    );
  } else if (view === "pack") {
    screen = (
      <PackScreen
        onBack={() => setView("index")}
        onOpenPack={createPackCards}
        currentPackCards={openPackCards}
        onViewCard={chooseStickerFromPack}
        isPasted={isPasted}
        isDuplicate={isDuplicate}
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
          duplicate={isDuplicate(selectedCard)}
          onClose={() => setSelectedCard(null)}
        />
      )}
    </>
  );
}
