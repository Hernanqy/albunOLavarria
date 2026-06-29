import { BookOpen, Home, PackageOpen } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";

export function AlbumShell() {
  const location = useLocation();
  const isCover = location.pathname === "/";

  return (
    <div className={isCover ? "album-app cover-mode" : "album-app"}>
      {!isCover && (
        <header className="album-header">
          <Link to="/album" className="mini-brand">
            <span>OF</span>
            <strong>Olavarría en Figuritas</strong>
          </Link>

          <div className="quick-actions">
            <Link to="/" title="Tapa">
              <Home className="h-5 w-5" />
            </Link>
            <Link to="/album" title="Índice">
              <BookOpen className="h-5 w-5" />
            </Link>
            <Link to="/sobre" title="Sobre">
              <PackageOpen className="h-5 w-5" />
            </Link>
          </div>
        </header>
      )}

      <main className="album-main">
        <Outlet />
      </main>
    </div>
  );
}
