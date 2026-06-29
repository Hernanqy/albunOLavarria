import { Lock, Plus, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getRarity, getSection } from "../../data/sections";
import { padNumber } from "../../lib/utils";
import type { Sticker } from "../../types/album";
import { SectionIcon } from "./SectionIcon";

type Props = {
  sticker: Sticker;
  unlocked: boolean;
  pending?: boolean;
};

export function StickerSlot({ sticker, unlocked, pending = false }: Props) {
  const section = getSection(sticker.section);
  const rarity = getRarity(sticker.rarity);

  return (
    <Link
      to={`/figurita/${sticker.id}`}
      className={`sticker-slot ${unlocked ? "is-pasted" : ""} ${pending ? "is-pending" : ""}`}
      style={{ "--section": section?.color ?? "#7c3f2c" } as React.CSSProperties}
    >
      <div className="slot-number">N.º {padNumber(sticker.number)}</div>

      <div className="slot-visual">
        {unlocked ? (
          <>
            <SectionIcon section={sticker.section} className="h-9 w-9" />
            <span>{sticker.imageHint}</span>
          </>
        ) : pending ? (
          <>
            <Plus className="h-9 w-9" />
            <span>Lista para pegar</span>
          </>
        ) : (
          <>
            <Lock className="h-8 w-8" />
            <span>Espacio vacío</span>
          </>
        )}
      </div>

      <div className="slot-info">
        <strong>{unlocked || pending ? sticker.title : "Figurita oculta"}</strong>
        <small>{unlocked || pending ? rarity?.name : "Por descubrir"}</small>
      </div>

      {pending && (
        <div className="pending-badge">
          <Sparkles className="h-3 w-3" />
          nueva
        </div>
      )}
    </Link>
  );
}
