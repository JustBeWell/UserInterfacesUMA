// Componentes/TurnoBanner/TurnoBanner.jsx
import React from "react";

export default function TurnoBanner({ turno }) {
  return (
    <div
      className={`fixed inset-x-0 top-4 flex justify-center pointer-events-none`}
    >
      <span
        className={`px-4 py-2 rounded-lg text-xl font-semibold shadow-lg
        ${turno === "jugador" ? "bg-green-600 text-white" : "bg-red-600 text-white"}
      `}
      >
        Turno de {turno === "jugador" ? "Tú" : "Rival"}
      </span>
    </div>
  );
}
