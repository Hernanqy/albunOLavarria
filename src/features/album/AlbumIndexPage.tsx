import {
  BookOpen,
  Camera,
  GraduationCap,
  MapPinned,
  PackageOpen,
  ScanLine,
  Sparkles
} from "lucide-react";
import { Link } from "react-router-dom";
import { AlbumSpread } from "../../components/ui/AlbumSpread";
import { SectionIcon } from "../../components/ui/SectionIcon";
import { sections } from "../../data/sections";
import { seedStickers } from "../../data/seedStickers";
import { getPendingIds, getUnlockedIds } from "../../lib/storage";
import { progress } from "../../lib/utils";

export function AlbumIndexPage() {
  const unlocked = getUnlockedIds();
  const pending = getPendingIds();
  const percent = progress(seedStickers.length, unlocked.length);

  return (
    <div className="album-stage">
      <AlbumSpread
        left={
          <div className="index-page">
            <span className="page-kicker">Índice principal</span>
            <h1>Mi Álbum</h1>
            <p>
              Entrá a las secciones, revisá tus espacios vacíos y pegá las nuevas figuritas que consigas.
            </p>

            <Link to="/album/seccion/historia" className="main-album-button">
              <BookOpen className="h-8 w-8" />
              <div>
                <strong>Explorar álbum</strong>
                <small>{unlocked.length} de {seedStickers.length} figuritas pegadas</small>
              </div>
            </Link>

            <div className="album-progress">
              <div style={{ width: `${percent}%` }} />
            </div>
            <small className="progress-label">{percent}% completado</small>

            {pending.length > 0 && (
              <Link to="/pegar" className="pending-alert">
                <Sparkles className="h-5 w-5" />
                Tenés {pending.length} figurita/s para pegar
              </Link>
            )}
          </div>
        }
        right={
          <div className="index-page">
            <span className="page-kicker">Acciones</span>
            <h2>¿Qué querés hacer?</h2>

            <div className="album-menu-grid">
              <Link to="/sobre" className="album-menu-card">
                <PackageOpen className="h-6 w-6" />
                <strong>Abrir sobre</strong>
                <small>Conseguir figuritas</small>
              </Link>

              <Link to="/pegar" className="album-menu-card">
                <Camera className="h-6 w-6" />
                <strong>Pegar</strong>
                <small>Colocar nuevas</small>
              </Link>

              <Link to="/scanner" className="album-menu-card">
                <ScanLine className="h-6 w-6" />
                <strong>Escanear QR</strong>
                <small>Desbloqueo situado</small>
              </Link>

              <Link to="/mapa" className="album-menu-card">
                <MapPinned className="h-6 w-6" />
                <strong>Mapa</strong>
                <small>Ver recorridos</small>
              </Link>

              <Link to="/educativo" className="album-menu-card wide">
                <GraduationCap className="h-6 w-6" />
                <strong>Modo educativo</strong>
                <small>Ideas para aula, museo y recorridos</small>
              </Link>
            </div>
          </div>
        }
      />

      <section className="section-tabs">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={`/album/seccion/${section.id}`}
            className="section-tab"
            style={{ "--section": section.color, "--section-soft": section.softColor } as React.CSSProperties}
          >
            <SectionIcon section={section.id} className="h-5 w-5" />
            <span>{section.name}</span>
          </Link>
        ))}
      </section>
    </div>
  );
}
