import { Lock, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { getRarity, getSection } from "../../data/sections";
import type { Sticker } from "../../types/album";
import { padNumber } from "../../lib/utils";
import { SectionIcon } from "./SectionIcon";

type Props = {
  sticker: Sticker;
  unlocked: boolean;
};

export function StickerCard({ sticker, unlocked }: Props) {
  const section = getSection(sticker.section);
  const rarity = getRarity(sticker.rarity);

  return (
    <Link
      to={`/figurita/${sticker.id}`}
      className={`sticker-card group ${unlocked ? "is-unlocked" : "is-locked"}`}
      style={{ "--section-color": section?.color ?? "#7c3f2c" } as React.CSSProperties}
    >
      <div className="sticker-card__top">
        <span>N.º {padNumber(sticker.number)}</span>
        <span>{rarity?.name}</span>
      </div>

      <div className="sticker-card__image">
        <div className="sticker-card__fake-image">
          <SectionIcon section={sticker.section} className="h-12 w-12" />
          <span>{unlocked ? sticker.imageHint : "Figurita bloqueada"}</span>
        </div>
        {!unlocked && (
          <div className="sticker-card__lock">
            <Lock className="h-8 w-8" />
          </div>
        )}
      </div>

      <div className="sticker-card__body">
        <div>
          <p className="sticker-card__section">
            <SectionIcon section={sticker.section} className="h-4 w-4" />
            {section?.name}
          </p>
          <h3>{unlocked ? sticker.title : "Figurita oculta"}</h3>
          <p>{unlocked ? sticker.subtitle : "Desbloqueala con QR, sobre digital o desafío educativo."}</p>
        </div>

        <div className="sticker-card__meta">
          <span>
            <Sparkles className="h-4 w-4" />
            {rarity?.name}
          </span>
          {sticker.locationName && (
            <span>
              <MapPin className="h-4 w-4" />
              {sticker.locationName}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
