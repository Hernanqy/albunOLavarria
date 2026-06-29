import { BookOpen, Image, Map, PackageOpen, QrCode } from "lucide-react";

type Props = {
  completed: number;
  total: number;
  percent: number;
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
    <button className={`clean-hub-object ${className}`} onClick={onClick}>
      <span className="clean-hub-label">{label}</span>

      <div className="clean-hub-visual">
        <img
          src={imageSrc}
          alt={label}
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />

        <div className="clean-hub-fallback">
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
  onExplore,
  onOpenPack,
  onScanner,
  onMap
}: Props) {
  return (
    <main className="clean-hub-screen">
      <section className="clean-hub-stage">
        <div className="clean-hub-bg" />

        <header className="clean-hub-header">
          <span>Menú principal</span>
          <h1>Olavarría en Figuritas</h1>
          <p>Jugá, coleccioná y descubrí la ciudad.</p>

          <div className="clean-hub-progress">
            <div style={{ width: `${percent}%` }} />
          </div>
        </header>

        <div className="clean-hub-counter">
          <strong>{percent}%</strong>
          <small>{completed} / {total}</small>
        </div>

        <div className="clean-hub-world">
          <HubObject
            label="Escanear QR"
            imageSrc="/images/hub/scanner-qr.png"
            fallback={<QrCode size={44} />}
            className="clean-hub-qr"
            onClick={onScanner}
          />

          <HubObject
            label="Mi álbum"
            imageSrc="/images/hub/album.png"
            fallback={<BookOpen size={72} />}
            className="clean-hub-album"
            onClick={onExplore}
          />

          <HubObject
            label="Abrir sobre"
            imageSrc="/images/hub/sobre.png"
            fallback={<PackageOpen size={50} />}
            className="clean-hub-pack"
            onClick={onOpenPack}
          />

          <HubObject
            label="Mapa de la ciudad"
            imageSrc="/images/hub/mapa-ciudad.png"
            fallback={<Map size={50} />}
            className="clean-hub-map"
            onClick={onMap}
          />

          <HubObject
            label="Mis figuritas"
            imageSrc="/images/hub/mis-figuritas.png"
            fallback={<Image size={50} />}
            className="clean-hub-stickers"
            onClick={onExplore}
          />
        </div>

        <footer className="clean-hub-footer">
          <span>Explorá</span>
          <span>Escaneá</span>
          <span>Abrí sobres</span>
          <span>Completá el álbum</span>
        </footer>
      </section>
    </main>
  );
}
