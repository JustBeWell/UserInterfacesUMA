import React from "react";
import "./ControlesJugador.css";

/**
 *  Botonera básica de acciones del jugador local
 *  ▸  onAccion("check") | onAccion("call-any") | onAccion("call-current")
 */
function ControlesJugador({ onAccion }) {
  return (
    <div className="controles-jugador">
    <button onClick={() => onAccion("check")}>CHECK</button>
    <button onClick={() => onAccion("call")}>CALL</button>
    <button onClick={() => onAccion("raise")}>RAISE</button>
    <button onClick={() => onAccion("fold")}>FOLD</button>

    </div>
  );
}

export default ControlesJugador;
