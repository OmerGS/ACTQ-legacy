"use client";

export default function Spinner() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Chargement en cours"
      className="w-5 h-5 border-2 border-white border-t-black rounded-full animate-spin"
    >
      {/* Texte caché pour les lecteurs d'écran */}
      <span className="sr-only">Chargement en cours</span>
    </div>
  );
}