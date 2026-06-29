import { ArrowLeft, BookOpen, ClipboardList, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { AlbumSpread } from "../../components/ui/AlbumSpread";

export function EducationPage() {
  return (
    <div className="album-stage">
      <div className="page-navigation">
        <Link to="/album">
          <ArrowLeft className="h-4 w-4" />
          Índice
        </Link>
      </div>

      <AlbumSpread
        left={
          <div className="education-page">
            <span className="page-kicker">Modo educativo</span>
            <h1>Usar el álbum en el aula</h1>

            <div className="education-card">
              <GraduationCap className="h-7 w-7" />
              <div>
                <strong>Desafío por grupos</strong>
                <span>Cada grupo completa una sección del álbum investigando lugares o relatos.</span>
              </div>
            </div>

            <div className="education-card">
              <ClipboardList className="h-7 w-7" />
              <div>
                <strong>Preguntas breves</strong>
                <span>Luego de ver el dorso, se responde una pregunta de comprensión o búsqueda.</span>
              </div>
            </div>
          </div>
        }
        right={
          <div className="education-page">
            <span className="page-kicker">Construcción comunitaria</span>
            <h1>Crear nuevas figuritas</h1>

            <div className="education-card">
              <BookOpen className="h-7 w-7" />
              <div>
                <strong>Figurita propia</strong>
                <span>Los estudiantes pueden crear una figurita de su barrio, familia, club o escuela.</span>
              </div>
            </div>

            <p className="education-note">
              Más adelante podemos sumar panel docente, validación de contenidos, fuentes, créditos de imagen y exportación.
            </p>
          </div>
        }
      />
    </div>
  );
}
