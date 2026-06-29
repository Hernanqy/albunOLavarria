import { createBrowserRouter } from "react-router-dom";
import { AlbumShell } from "../components/layout/AlbumShell";
import { AlbumIndexPage } from "../features/album/AlbumIndexPage";
import { SectionPage } from "../features/album/SectionPage";
import { CoverPage } from "../features/cover/CoverPage";
import { EducationPage } from "../features/educativo/EducationPage";
import { MapPage } from "../features/mapa/MapPage";
import { PackPage } from "../features/packs/PackPage";
import { PastePage } from "../features/paste/PastePage";
import { ScannerPage } from "../features/scanner/ScannerPage";
import { StickerDetailPage } from "../features/stickers/StickerDetailPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AlbumShell />,
    children: [
      {
        index: true,
        element: <CoverPage />
      },
      {
        path: "album",
        element: <AlbumIndexPage />
      },
      {
        path: "album/seccion/:sectionId",
        element: <SectionPage />
      },
      {
        path: "figurita/:id",
        element: <StickerDetailPage />
      },
      {
        path: "sobre",
        element: <PackPage />
      },
      {
        path: "pegar",
        element: <PastePage />
      },
      {
        path: "scanner",
        element: <ScannerPage />
      },
      {
        path: "mapa",
        element: <MapPage />
      },
      {
        path: "educativo",
        element: <EducationPage />
      }
    ]
  }
]);
