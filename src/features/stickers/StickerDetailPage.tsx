import { ArrowLeft, Lightbulb, MapPin, RotateCcw, Trophy } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { SectionIcon } from "../../components/ui/SectionIcon";
import { getRarity, getSection } from "../../data/sections";
import { seedStickers } from "../../data/seedStickers";
import { getPendingIds, getUnlockedIds } from "../../lib/storage";
import { padNumber } from "../../lib/utils";

export function StickerDetailPage() {
  const params = useParams();
  const sticker = seedStickers.find((item) => item.id === params.id);
  const [back, setBack] = useState(false);

  if (!sticker) {
    return (
      <div className="album-stage">
        <div className="simple-card">
          <h1>No encontramos esa figurita</h1>
          <Link to="/album">Volver al índice</Link>
        </div>
      </div>
    );
  }

  const section = getSection(sticker.section);
  const rarity = getRarity(sticker.rarity);
  const unlocked = getUnlockedIds().includes(sticker.id);
  const pending = getPendingIds().includes(sticker.id);
  const visible = unlocked || pending;

  return (
    <div className="album-stage">
      <div className="page-navigation">
        <Link to={`/album/seccion/${sticker.section}`}>
          <ArrowLeft className="h-4 w-4" />
          Volver a {section?.name}
        </Link>
      </div>

      <section className="sticker-detail-layout">
        <article
          className={`big-sticker ${back ? "show-back" : ""} ${visible ? "" : "locked"}`}
          style={{ "--section": section?.color ?? "#7c3f2c" } as React.CSSProperties}
        >
          {!back ? (
            <div className="big-sticker-front">
              <div className="big-sticker-top">
                <span>N.º {padNumber(sticker.number)}</span>
                <span>{rarity?.name}</span>
              </div>

              <div className="big-sticker-image">
                <SectionIcon section={sticker.section} className="h-20 w-20" />
                <p>{visible ? sticker.imageHint : "Espacio vacío del álbum"}</p>
              </div>

              <div className="big-sticker-title">
                <small>{section?.name}</small>
                <h1>{visible ? sticker.title : "Figurita oculta"}</h1>
                <p>{visible ? sticker.subtitle : "Conseguí esta figurita abriendo sobres o escaneando un QR."}</p>
              </div>
            </div>
          ) : (
            <div className="big-sticker-back">
              <div className="dorso-title">
                <small>Dorso de figurita</small>
                <h1>{visible ? sticker.title : "Contenido bloqueado"}</h1>
              </div>

              <p>{visible ? sticker.backText : "El micro-relato aparece cuando pegás la figurita en el álbum."}</p>

              <div className="dorso-box">
                <Lightbulb className="h-5 w-5" />
                <span>{visible ? sticker.curiousFact : "Dato curioso bloqueado."}</span>
              </div>

              <div className="dorso-box">
                <Trophy className="h-5 w-5" />
                <span>{visible ? sticker.challenge : "Desafío bloqueado."}</span>
              </div>

              {sticker.locationName && (
                <div className="dorso-box">
                  <MapPin className="h-5 w-5" />
                  <span>{sticker.locationName}</span>
                </div>
              )}
            </div>
          )}
        </article>

        <aside className="sticker-side-panel">
          <button className="flip-button" onClick={() => setBack((value) => !value)}>
            <RotateCcw className="h-5 w-5" />
            {back ? "Ver frente" : "Ver dorso"}
          </button>

          {pending && !unlocked && (
            <Link to="/pegar" className="paste-callout">
              Esta figurita está nueva. Pegala en el álbum.
            </Link>
          )}

          {!visible && (
            <div className="locked-help">
              <strong>¿Cómo conseguirla?</strong>
              <span>Abrí sobres, escaneá códigos QR o participá en recorridos.</span>
            </div>
          )}
        </aside>
      </section>
    </div>
  );
}
