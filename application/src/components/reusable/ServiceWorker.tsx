"use client";
import { useEffect } from "react";

export default function ServiceWorker() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then((reg) => console.log("Service Worker enregistré:", reg))
        .catch((err) => console.error("Service Worker erreur:", err));
    }
  }, []);

  return null;
}