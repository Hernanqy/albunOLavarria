import { ArrowLeft, QrCode, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { seedStickers } from "../../data/seedStickers";
import { addPendingStickers } from "../../lib/storage";

export function ScannerPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const normalized = code.trim().toLowerCase();
    const sticker = seedStickers.find((item) => item.id === normalized);

    if (!sticker) {
      setMessage("Código no encontrado. Probá con fig-004, fig-005 o fig-011.");
      return;
    }

    addPendingStickers([sticker.id]);
    setMessage(`Conseguiste "${sticker.title}". Ahora podés pegarla en el álbum.`);
  }

  return (
    <div className="album-stage">
      <div className="page-navigation">
        <Link to="/album">
          <ArrowLeft className="h-4 w-4" />
          Índice
        </Link>
      </div>

      <section className="scanner-book-page">
        <div className="qr-frame">
          <QrCode className="h-24 w-24" />
          <span />
        </div>

        <div>
          <span className="page-kicker">Desbloqueo por QR</span>
          <h1>Escanear figurita</h1>
          <p>
            Más adelante activamos la cámara real. Por ahora usá un código manual de prueba.
          </p>

          <form onSubmit={submit} className="code-form">
            <div className="input-box">
              <Search className="h-5 w-5" />
              <input
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Ejemplo: fig-005"
              />
            </div>
            <button className="primary-action">Desbloquear</button>
          </form>

          {message && (
            <div className="scan-result">
              <strong>{message}</strong>
              <Link to="/pegar">Ir a pegar</Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
