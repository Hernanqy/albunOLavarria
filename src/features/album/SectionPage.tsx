import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { AlbumSpread } from "../../components/ui/AlbumSpread";
import { SectionIcon } from "../../components/ui/SectionIcon";
import { StickerSlot } from "../../components/ui/StickerSlot";
import { sections, getSection } from "../../data/sections";
import { seedStickers } from "../../data/seedStickers";
import { getPendingIds, getUnlockedIds } from "../../lib/storage";
import { splitInHalf } from "../../lib/utils";
import type { SectionId } from "../../types/album";

export function SectionPage() {
  const params = useParams();
  const sectionId = params.sectionId as SectionId;
  const section = getSection(sectionId) ?? sections[0];

  const stickers = seedStickers.filter((sticker) => sticker.section === section.id);
  const [left, right] = splitInHalf(stickers);
  const unlocked = getUnlockedIds();
  const pending = getPendingIds();

  const index = sections.findIndex((item) => item.id === section.id);
  const previous = sections[(index - 1 + sections.length) % sections.length];
  const next = sections[(index + 1) % sections.length];

  return (
    <div className="album-stage">
      <div className="page-navigation">
        <Link to="/album">
          <ArrowLeft className="h-4 w-4" />
          Índice
        </Link>

        <div className="page-navigation__arrows">
          <Link to={`/album/seccion/${previous.id}`}>← {previous.name}</Link>
          <Link to={`/album/seccion/${next.id}`}>{next.name} →</Link>
        </div>
      </div>

      <AlbumSpread
        className="section-spread"
        left={
          <div className="section-page-head" style={{ "--section": section.color } as React.CSSProperties}>
            <div className="section-title">
              <SectionIcon section={section.id} className="h-8 w-8" />
              <div>
                <span>Sección</span>
                <h1>{section.name}</h1>
              </div>
            </div>
            <p>{section.description}</p>

            <div className="slots-grid">
              {left.map((sticker) => (
                <StickerSlot
                  key={sticker.id}
                  sticker={sticker}
                  unlocked={unlocked.includes(sticker.id)}
                  pending={pending.includes(sticker.id)}
                />
              ))}
            </div>
          </div>
        }
        right={
          <div className="section-page-head" style={{ "--section": section.color } as React.CSSProperties}>
            <div className="section-note">
              <strong>Espacios del álbum</strong>
              <span>Tocá una figurita para verla de frente y dorso.</span>
            </div>

            <div className="slots-grid">
              {right.map((sticker) => (
                <StickerSlot
                  key={sticker.id}
                  sticker={sticker}
                  unlocked={unlocked.includes(sticker.id)}
                  pending={pending.includes(sticker.id)}
                />
              ))}
            </div>

            {right.length === 0 && (
              <div className="empty-page-note">
                <strong>Página libre</strong>
                <span>Este espacio queda listo para sumar más figuritas de la sección.</span>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
