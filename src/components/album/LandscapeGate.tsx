import { RotateCcw, Smartphone } from "lucide-react";

type Props = {
  onContinue: () => void;
};

export function LandscapeGate({ onContinue }: Props) {
  async function startLandscapeMode() {
    try {
      const element = document.documentElement;

      if (element.requestFullscreen) {
        await element.requestFullscreen();
      }

      const orientation = screen.orientation as ScreenOrientation & {
        lock?: (orientation: OrientationLockType) => Promise<void>;
      };

      if (orientation?.lock) {
        await orientation.lock("landscape");
      }
    } catch {
      // Algunos navegadores no permiten bloquear orientación.
      // Igual dejamos continuar.
    }

    onContinue();
  }

  return (
    <main className="landscape-gate-screen">
      <section className="landscape-gate-card">
        <div className="landscape-phone-icon">
          <Smartphone size={78} />
          <RotateCcw size={34} className="rotate-mini-icon" />
        </div>

        <span>Mejor experiencia</span>
        <h1>Giralo horizontal</h1>

        <p>
          Esta app funciona mejor con el celular en pantalla horizontal,
          como si estuvieras abriendo un álbum de figuritas.
        </p>

        <button className="fixed-main-button" onClick={startLandscapeMode}>
          Empezar en horizontal
        </button>
      </section>
    </main>
  );
}
