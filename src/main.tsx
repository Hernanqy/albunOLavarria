import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { registerServiceWorker } from "./registerServiceWorker";
import "./styles/globals.css";
import "./styles/cover-fixed.css";
import "./styles/final-mobile-fixes.css";
import "./styles/album-mobile-final.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerServiceWorker();
