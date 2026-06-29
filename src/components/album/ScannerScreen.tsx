import { useState, type CSSProperties } from "react";
import { ArrowLeft, Camera, CheckCircle2, QrCode, XCircle } from "lucide-react";
import type { AlbumCard } from "../../types/album";
import { IconForCard } from "./IconForCard";

type Props = {
  onBack: () => void;
  onScanCode: (code: string) => AlbumCard | null;
  onViewCard: (card: AlbumCard) => void;
};

export function ScannerScreen({ onBack, onScanCode, onViewCard }: Props) {
  const [code, setCode] = useState("");
  const [resultCard, setResultCard] = useState<AlbumCard | null>(null);
  const [error, setError] = useState("");

  function scan() {
    const normalizedCode = code.trim().toUpperCase();

    if (!normalizedCode) {
      setError("Ingresá un código para escanear.");
      setResultCard(null);
      return;
    }

    const card = onScanCode(normalizedCode);

    if (!card) {
      setError("Ese código no existe o todavía no está cargado.");
      setResultCard(null);
      return;
    }

    setError("");
    setResultCard(card);
  }

  function useDemoCode(nextCode: string) {
    setCode(nextCode);
    const card = onScanCode(nextCode);

    if (!card) {
      setError("Ese código no existe o todavía no está cargado.");
      setResultCard(null);
      return;
    }

    setError("");
    setResultCard(card);
  }

  return (
    <main className="scanner-screen">
      <button className="floating-back" onClick={onBack}>
        <ArrowLeft size={18} />
        Índice
      </button>

      <section className="scanner-card scanner-card-upgraded">
        <QrCode size={90} />
        <h1>Escanear QR</h1>
        <p>
          En esta etapa el escaneo funciona ingresando códigos de prueba.
          Después conectamos la cámara real.
        </p>

        <div className="qr-input-box">
          <label>Código QR</label>
          <input
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Ej: NATURALEZA-20"
          />
          <button className="fixed-main-button" onClick={scan}>
            <Camera size={20} />
            Escanear código
          </button>
        </div>

        <div className="qr-demo-codes">
          <button onClick={() => useDemoCode("HISTORIA-01")}>HISTORIA-01</button>
          <button onClick={() => useDemoCode("PATRIMONIO-07")}>PATRIMONIO-07</button>
          <button onClick={() => useDemoCode("NATURALEZA-20")}>NATURALEZA-20</button>
          <button onClick={() => useDemoCode("CULTURA-29")}>CULTURA-29</button>
        </div>

        {error && (
          <div className="qr-error">
            <XCircle size={18} />
            {error}
          </div>
        )}

        {resultCard && (
          <div className="qr-result">
            <span className="qr-result-kicker">
              <CheckCircle2 size={16} />
              Figurita desbloqueada
            </span>

            <article
              className="qr-result-card"
              style={{ "--card-color": resultCard.color } as CSSProperties}
            >
              <div className="qr-result-number">N.º {resultCard.number}</div>

              <div className="qr-result-image">
                <IconForCard card={resultCard} size={42} />
                <span>{resultCard.imageLabel}</span>
              </div>

              <strong>{resultCard.title}</strong>
              <small>{resultCard.section}</small>
            </article>

            <button className="fixed-cover-button" onClick={() => onViewCard(resultCard)}>
              Ver figurita
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
