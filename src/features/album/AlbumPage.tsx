import { RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { StickerCard } from "../../components/ui/StickerCard";
import { sections } from "../../data/sections";
import { seedStickers } from "../../data/seedStickers";
import { getUnlockedIds, resetAlbumProgress } from "../../lib/storage";
import type { SectionId } from "../../types/album";

export function AlbumPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSection = searchParams.get("section") as SectionId | null;
  const [selectedSection, setSelectedSection] = useState<SectionId | "todas">(initialSection ?? "todas");
  const [query, setQuery] = useState("");
  const [version, setVersion] = useState(0);

  const unlockedIds = getUnlockedIds();

  const filtered = useMemo(() => {
    return seedStickers.filter((sticker) => {
      const matchesSection = selectedSection === "todas" || sticker.section === selectedSection;
      const text = `${sticker.title} ${sticker.subtitle} ${sticker.shortText} ${sticker.locationName ?? ""}`.toLowerCase();
      const matchesQuery = text.includes(query.toLowerCase());
      return matchesSection && matchesQuery;
    });
  }, [query, selectedSection, version]);

  function handleSectionChange(value: SectionId | "todas") {
    setSelectedSection(value);
    if (value === "todas") {
      setSearchParams({});
    } else {
      setSearchParams({ section: value });
    }
  }

  function handleReset() {
    resetAlbumProgress();
    setVersion((current) => current + 1);
  }

  return (
    <div className="page">
      <section className="page-hero compact">
        <span>Mi colección</span>
        <h1>Álbum digital de Olavarría</h1>
        <p>
          Recorremos una primera base de figuritas. Más adelante se conectará con Supabase,
          QR reales, imágenes propias, modo docente y expansión a 60 figuritas iniciales.
        </p>
      </section>

      <section className="album-toolbar">
        <div className="search-box">
          <Search className="h-4 w-4" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar figurita, lugar, barrio o tema..."
          />
        </div>

        <button className="btn btn-ghost small" onClick={handleReset}>
          <RotateCcw className="h-4 w-4" />
          Reiniciar prueba
        </button>
      </section>

      <section className="tabs">
        <button
          className={selectedSection === "todas" ? "active" : ""}
          onClick={() => handleSectionChange("todas")}
        >
          Todas
        </button>
        {sections.map((section) => (
          <button
            key={section.id}
            className={selectedSection === section.id ? "active" : ""}
            onClick={() => handleSectionChange(section.id)}
          >
            {section.name}
          </button>
        ))}
      </section>

      <section className="collection-summary">
        <div>
          <strong>{unlockedIds.length}</strong>
          <span>desbloqueadas</span>
        </div>
        <div>
          <strong>{seedStickers.length - unlockedIds.length}</strong>
          <span>por descubrir</span>
        </div>
        <div>
          <strong>{filtered.length}</strong>
          <span>en esta vista</span>
        </div>
      </section>

      <section className="stickers-grid">
        {filtered.map((sticker) => (
          <StickerCard
            key={`${sticker.id}-${version}`}
            sticker={sticker}
            unlocked={unlockedIds.includes(sticker.id)}
          />
        ))}
      </section>
    </div>
  );
}
