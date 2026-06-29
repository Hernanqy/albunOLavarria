import { ArrowLeft, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { getSection } from "../../data/sections";
import { seedStickers } from "../../data/seedStickers";

export function MapPage() {
  const located = seedStickers.filter((item) => item.locationName);

  return (
    <div className="album-stage">
      <div className="page-navigation">
        <Link to="/album">
          <ArrowLeft className="h-4 w-4" />
          Índice
        </Link>
      </div>

      <section className="map-book-page">
        <div className="map-paper">
          {located.slice(0, 10).map((sticker, index) => {
            const section = getSection(sticker.section);
            return (
              <Link
                key={sticker.id}
                to={`/figurita/${sticker.id}`}
                className="map-dot"
                style={{
                  "--section": section?.color ?? "#7c3f2c",
                  left: `${12 + ((index * 19) % 72)}%`,
                  top: `${18 + ((index * 23) % 60)}%`
                } as React.CSSProperties}
              >
                <MapPin className="h-5 w-5" />
              </Link>
            );
          })}
        </div>

        <div className="map-list-panel">
          <span className="page-kicker">Territorio</span>
          <h1>Mapa del álbum</h1>
          <p>Cada punto puede convertirse en una posta, QR o recorrido educativo.</p>

          <div className="map-list">
            {located.map((sticker) => (
              <Link key={sticker.id} to={`/figurita/${sticker.id}`}>
                <strong>{sticker.title}</strong>
                <span>{sticker.locationName}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
