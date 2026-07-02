import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerServiceWorker } from "./registerServiceWorker";
import { resetAlbumOnDevStart } from "./devReset";
import "./styles/globals.css";
import "./styles/cover-fixed.css";
import "./styles/final-mobile-fixes.css";
import "./styles/album-background-layout.css";

resetAlbumOnDevStart();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerServiceWorker();
