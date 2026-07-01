export function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  /*
    En desarrollo local desactivamos el service worker.
    Si queda activo, puede cachear archivos viejos y romper manifest/css.
  */
  if (import.meta.env.DEV) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => registration.unregister());
    });

    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
    }

    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .catch((error) => {
        console.warn("No se pudo registrar el service worker:", error);
      });
  });
}
