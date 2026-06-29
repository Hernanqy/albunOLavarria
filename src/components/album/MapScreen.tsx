import { useState, type CSSProperties } from "react";
import { ArrowLeft, CheckCircle2, MapPin, QrCode, Sparkles } from "lucide-react";
import { mapZones } from "../../data/mapZones";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";

type Props = {
  cards: AlbumCard[];
  isPasted: (card: AlbumCard) => boolean;
  onBack: () => void;
  onUnlockCode: (code: string) => AlbumCard | null;
  onViewCard: (card: AlbumCard) => void;
};

export function MapScreen({
  cards,
  isPasted,
  onBack,
  onUnlockCode,
  onViewCard
}: Props) {
  const [selectedZoneId, setSelectedZoneId] = useState(mapZones[0]?.id ?? "");
  const [lastUnlocked, setLastUnlocked] = useState<AlbumCard | null>(null);

  const selectedZone = mapZones.find((zone) => zone.id === selectedZoneId) ?? mapZones[0];
  const zoneCard = cards.find((card) => card.id === selectedZone.cardId) ?? null;
  const completedZones = mapZones.filter((zone) => {
    const card = cards.find((item) => item.id === zone.cardId);
    return card ? isPasted(card) : false;
  }).length;

  function unlockSelectedZone() {
    const card = onUnlockCode(selectedZone.qrCode);
    setLastUnlocked(card);
  }

  return (
    <main className="map-screen">
      <button className="floating-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Índice
      </button>

      <section className="map-layout">
        <article className="map-panel">
          <span className="fixed-page-kicker">
            <MapPin size={15} />
            Mapa de recorrido
          </span>

          <h1>Explorá Olavarría</h1>
          <p>
            Cada punto del mapa representa una zona del álbum. Al escanear su QR,
            se desbloquea una figurita vinculada al lugar.
          </p>

          <div className="map-progress-mini">
            <div style={{ width: `${Math.round((completedZones / mapZones.length) * 100)}%` }} />
          </div>

          <small>
            {completedZones} de {mapZones.length} zonas desbloqueadas
          </small>

          <div className="map-zone-list">
            {mapZones.map((zone) => {
              const card = cards.find((item) => item.id === zone.cardId);
              const unlocked = card ? isPasted(card) : false;

              return (
                <button
                  key={zone.id}
                  className={zone.id === selectedZone.id ? "active" : ""}
                  onClick={() => {
                    setSelectedZoneId(zone.id);
                    setLastUnlocked(null);
                  }}
                >
                  <span>{unlocked ? <CheckCircle2 size={16} /> : <QrCode size={16} />}</span>
                  <div>
                    <strong>{zone.name}</strong>
                    <small>{zone.subtitle}</small>
                  </div>
                </button>
              );
            })}
          </div>
        </article>

        <article className="map-visual-card">
          <div className="map-visual">
            <div className="map-path path-one" />
            <div className="map-path path-two" />

            {mapZones.map((zone) => {
              const card = cards.find((item) => item.id === zone.cardId);
              const unlocked = card ? isPasted(card) : false;

              return (
                <button
                  key={zone.id}
                  className={`map-pin ${zone.id === selectedZone.id ? "active" : ""} ${unlocked ? "unlocked" : ""}`}
                  style={{
                    left: `${zone.position.x}%`,
                    top: `${zone.position.y}%`
                  }}
                  onClick={() => {
                    setSelectedZoneId(zone.id);
                    setLastUnlocked(null);
                  }}
                  title={zone.name}
                >
                  <span />
                </button>
              );
            })}
          </div>

          <div className="map-zone-detail">
            <span className="map-zone-code">{selectedZone.qrCode}</span>
            <h2>{selectedZone.name}</h2>
            <p>{selectedZone.description}</p>

            {zoneCard && (
              <div
                className="map-zone-sticker"
                style={{ "--card-color": zoneCard.color } as CSSProperties}
              >
                <div className="map-zone-sticker-image">
                  <IconForCard card={zoneCard} size={34} />
                </div>

                <div>
                  <strong>{zoneCard.title}</strong>
                  <small>
                    {isPasted(zoneCard) ? "Figurita desbloqueada" : "Figurita pendiente"}
                  </small>
                </div>
              </div>
            )}

            <div className="map-zone-actions">
              <button className="fixed-main-button" onClick={unlockSelectedZone}>
                <Sparkles size={20} />
                Desbloquear zona
              </button>

              {zoneCard && (
                <button className="fixed-cover-button" onClick={() => onViewCard(zoneCard)}>
                  Ver figurita
                </button>
              )}
            </div>

            {lastUnlocked && (
              <div className="map-unlocked-message">
                <CheckCircle2 size={18} />
                Se desbloqueó: <strong>{lastUnlocked.title}</strong>
              </div>
            )}
          </div>
        </article>
      </section>
    </main>
  );
}
