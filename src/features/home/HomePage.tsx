import { ArrowRight, MapPin, PackageOpen, QrCode, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { seedStickers } from "../../data/seedStickers";
import { sections } from "../../data/sections";
import { getProgress } from "../../lib/utils";
import { getUnlockedIds } from "../../lib/storage";
import { ProgressRing } from "../../components/ui/ProgressRing";
import { StickerCard } from "../../components/ui/StickerCard";
import { SectionIcon } from "../../components/ui/SectionIcon";

export function HomePage() {
  const unlockedIds = getUnlockedIds();
  const progress = getProgress(seedStickers.length, unlockedIds.length);
  const featured = seedStickers.slice(0, 3);

  return (
    <div className="page home-page">
      <section className="hero">
        <motion.div
          className="hero__content"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <div className="eyebrow">
            <Sparkles className="h-4 w-4" />
            PWA coleccionable · identidad local · aprendizaje lúdico
          </div>

          <h1>
            Cada rincón de Olavarría
            <span> guarda una figurita.</span>
          </h1>

          <p>
            Explorá historias, barrios, personajes, patrimonio, naturaleza y cultura en un álbum digital vivo,
            pensado para escuelas, museos, recorridos y vecinos.
          </p>

          <div className="hero__actions">
            <Link to="/album" className="btn btn-primary">
              Ver mi álbum
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/sobre" className="btn btn-ghost">
              Abrir sobre
              <PackageOpen className="h-4 w-4" />
            </Link>
          </div>

          <div className="hero__stats">
            <div>
              <strong>{seedStickers.length}</strong>
              <span>figuritas base</span>
            </div>
            <div>
              <strong>{sections.length}</strong>
              <span>secciones</span>
            </div>
            <div>
              <strong>{unlockedIds.length}</strong>
              <span>desbloqueadas</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero__album"
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.65 }}
        >
          <div className="album-preview">
            <div className="album-preview__map">
              <span className="map-line line-a" />
              <span className="map-line line-b" />
              <span className="map-line line-c" />
              <MapPin className="pin pin-a" />
              <MapPin className="pin pin-b" />
              <MapPin className="pin pin-c" />
            </div>

            <div className="floating-card card-a">Historia</div>
            <div className="floating-card card-b">Barrios</div>
            <div className="floating-card card-c">Patrimonio</div>
            <div className="floating-card card-d">Cultura</div>

            <ProgressRing value={progress} label="progreso" />
          </div>
        </motion.div>
      </section>

      <section className="section-grid">
        {sections.map((section) => (
          <Link
            to={`/album?section=${section.id}`}
            className="section-tile"
            key={section.id}
            style={{ "--section-color": section.color, "--section-soft": section.softColor } as React.CSSProperties}
          >
            <div className="section-tile__icon">
              <SectionIcon section={section.id} className="h-7 w-7" />
            </div>
            <h2>{section.name}</h2>
            <p>{section.description}</p>
          </Link>
        ))}
      </section>

      <section className="content-block">
        <div className="section-heading">
          <div>
            <span>Primeras figuritas</span>
            <h2>Una base para probar la experiencia</h2>
          </div>
          <Link to="/album" className="text-link">
            Ver todas
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="stickers-grid">
          {featured.map((sticker) => (
            <StickerCard key={sticker.id} sticker={sticker} unlocked={unlockedIds.includes(sticker.id)} />
          ))}
        </div>
      </section>

      <section className="experience-loop">
        <div>
          <QrCode className="h-7 w-7" />
          <h3>1. Explorar</h3>
          <p>El usuario visita espacios, barrios o postas educativas y escanea códigos QR.</p>
        </div>
        <div>
          <PackageOpen className="h-7 w-7" />
          <h3>2. Desbloquear</h3>
          <p>Recibe figuritas nuevas, sobres digitales o códigos especiales.</p>
        </div>
        <div>
          <AlbumIcon />
          <h3>3. Aprender</h3>
          <p>Lee el dorso de la figurita con micro-relato, dato curioso y desafío.</p>
        </div>
      </section>
    </div>
  );
}

function AlbumIcon() {
  return (
    <div className="mini-album-icon">
      <span />
      <span />
      <span />
    </div>
  );
}
