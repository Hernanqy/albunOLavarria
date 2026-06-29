import { ArrowLeft, CheckCircle2, PackageOpen } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { StickerSlot } from "../../components/ui/StickerSlot";
import { seedStickers } from "../../data/seedStickers";
import { getPendingIds, pasteAllPending } from "../../lib/storage";

export function PastePage() {
  const [version, setVersion] = useState(0);
  const pendingIds = getPendingIds();
  const pending = seedStickers.filter((sticker) => pendingIds.includes(sticker.id));

  function handlePaste() {
    pasteAllPending();
    setVersion((value) => value + 1);
  }

  return (
    <div className="album-stage" key={version}>
      <div className="page-navigation">
        <Link to="/album">
          <ArrowLeft className="h-4 w-4" />
          Índice
        </Link>
      </div>

      <section className="paste-board">
        <div className="paste-head">
          <span className="page-kicker">Pegar figuritas</span>
          <h1>Colocá tus nuevas figuritas en el álbum</h1>
          <p>
            La mecánica central no es solo desbloquear: es conseguir, revisar y pegar.
          </p>

          {pending.length > 0 ? (
            <button className="primary-action" onClick={handlePaste}>
              <CheckCircle2 className="h-5 w-5" />
              Pegar todas
            </button>
          ) : (
            <Link to="/sobre" className="primary-action">
              <PackageOpen className="h-5 w-5" />
              Abrir un sobre
            </Link>
          )}
        </div>

        {pending.length > 0 ? (
          <div className="paste-grid">
            {pending.map((sticker) => (
              <StickerSlot key={sticker.id} sticker={sticker} unlocked={false} pending />
            ))}
          </div>
        ) : (
          <div className="empty-pending">
            <strong>No tenés figuritas nuevas para pegar.</strong>
            <span>Abrí un sobre o escaneá un QR para conseguir nuevas.</span>
          </div>
        )}
      </section>
    </div>
  );
}
