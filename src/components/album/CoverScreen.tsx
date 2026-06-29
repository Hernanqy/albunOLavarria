import { ArrowRight, BookOpen, Sparkles } from "lucide-react";

type Props = {
  onStart: () => void;
};

export function CoverScreen({ onStart }: Props) {
  return (
    <main className="fixed-cover-screen">
      <section className="fixed-cover-book">
        <div className="fixed-cover-bg" />
        <div className="fixed-cover-overlay" />
        <div className="fixed-cover-shine" />
        <div className="fixed-cover-dots" />

        <div className="fixed-cover-content">
          <div className="fixed-cover-badge">
            <Sparkles size={16} />
            Álbum digital
          </div>

          <h1>
            Olavarría
            <span>en Figuritas</span>
          </h1>

          <p>El álbum digital de la ciudad</p>
          <strong>Cada rincón guarda una figurita.</strong>

          <button className="fixed-cover-button" onClick={onStart}>
            <BookOpen size={20} />
            Comenzar
            <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </main>
  );
}
