import { Album, BookOpen, Home, Map, PackageOpen, QrCode } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/album", label: "Álbum", icon: Album },
  { to: "/sobre", label: "Sobre", icon: PackageOpen },
  { to: "/scanner", label: "QR", icon: QrCode },
  { to: "/mapa", label: "Mapa", icon: Map },
  { to: "/educativo", label: "Aula", icon: BookOpen }
];

export function AppShell() {
  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <NavLink to="/" className="brand">
          <div className="brand__seal">OF</div>
          <div>
            <strong>Olavarría en Figuritas</strong>
            <span>Álbum digital de la ciudad</span>
          </div>
        </NavLink>

        <nav className="desktop-nav">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.to} to={item.to}>
                <Icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
      </header>

      <main className="main-content">
        <Outlet />
      </main>

      <nav className="mobile-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to}>
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}
