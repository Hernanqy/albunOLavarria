import { ArrowLeft, BookOpen, Image, Map, PackageOpen, QrCode } from "lucide-react";

type Props = {
  completed: number;
  total: number;
  percent: number;
  onBackToCover: () => void;
  onExplore: () => void;
  onOpenPack: () => void;
  onScanner: () => void;
  onMap: () => void;
};

type HubObjectProps = {
  label: string;
  imageSrc: string;
  fallback: React.ReactNode;
  className: string;
  onClick: () => void;
};

function HubObject({ label, imageSrc, fallback, className, onClick }: HubObjectProps) {
  return (
    <button className={`hub-object-card ${className}`} onClick={onClick}>
      <span className="hub-object-label">{label}</span>

      <div className="hub-object-visual">
        <img
          src={imageSrc}
          alt={label}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="hub-object-fallback">
          {fallback}
        </div>
      </div>
    </button>
  );
}

export function AlbumIndex({
  completed,
  total,
  percent,
  onBackToCover,
  onExplore,
  onOpenPack,
  onScanner,
  onMap
}: Props) {
  return (
    <main className="hub-screen artistic-hub-screen">
      <section className="artistic-hub-stage">
        <div className="artistic-sky" />
        <div className="artistic-city" />
        <div className="artistic-river" />
        <div className="artistic-paper-texture" />

        <header className="artistic-hub-header">
          <button className="hub-back" onClick={onBackToCover}>
            <ArrowLeft size={18} />
            Tapa
          </button>

          <div className="artistic-hub-title">
            <span>Menú principal</span>
            <h1>Olavarría en Figuritas</h1>
            <p>Jugá, coleccioná y descubrí la ciudad.</p>
          </div>

          <div className="hub-progress-pill">
            <strong>{percent}%</strong>
            <small>{completed} / {total}</small>
          </div>
        </header>

        <div className="hub-progress-bar artistic-progress">
          <div style={{ width: `${percent}%` }} />
        </div>

        <div className="artistic-hub-world">
          <HubObject
            label="Escanear QR"
            imageSrc="/images/hub/scanner-qr.png"
            fallback={<QrCode size={58} />}
            className="hub-qr-object"
            onClick={onScanner}
          />

          <HubObject
            label="Mi álbum"
            imageSrc="/images/hub/album.png"
            fallback={<BookOpen size={76} />}
            className="hub-album-object"
            onClick={onExplore}
          />

          <HubObject
            label="Abrir sobre"
            imageSrc="/images/hub/sobre.png"
            fallback={<PackageOpen size={66} />}
            className="hub-pack-object"
            onClick={onOpenPack}
          />

          <HubObject
            label="Mapa de la ciudad"
            imageSrc="/images/hub/mapa-ciudad.png"
            fallback={<Map size={66} />}
            className="hub-map-object"
            onClick={onMap}
          />

          <HubObject
            label="Mis figuritas"
            imageSrc="/images/hub/mis-figuritas.png"
            fallback={<Image size={64} />}
            className="hub-stickers-object"
            onClick={onExplore}
          />
        </div>

        <footer className="artistic-hub-footer">
          <span>Explorá</span>
          <span>Escaneá</span>
          <span>Abrí sobres</span>
          <span>Completá el álbum</span>
        </footer>
      </section>
    </main>
  );
}
