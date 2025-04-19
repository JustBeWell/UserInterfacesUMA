import React from "react";
import "./ControlesJugador.css";

/**
 *  Botonera básica de acciones del jugador local
 *  ▸  onAccion("check") | onAccion("call-any") | onAccion("call-current")
 */
function ControlesJugador({ onAccion }) {
  return (
    <div className="controles-jugador">
      <button onClick={() => onAccion("check")}>CHECK / FOLD</button>
      <button onClick={() => onAccion("call-any")}>CALL ANY</button>
      <button onClick={() => onAccion("call-current")}>CALL CURRENT</button>
    </div>
  );
}

export default ControlesJugador;
