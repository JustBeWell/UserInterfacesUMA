import React, { useState } from "react";
import "./ControlesJugador.css";

function ControlesJugador({ onAccion }) {
  const [cantidad, setCantidad] = useState(100);

  const handleChange = (e) => {
    const valor = parseInt(e.target.value);
    if (!isNaN(valor)) setCantidad(valor);
  };

  return (
    <div className="controles-jugador">
      <input
        type="number"
        value={cantidad}
        min={1}
        step={10}
        onChange={handleChange}
        className="input-apuesta"
      />
      <button onClick={() => onAccion("check")}>CHECK</button>
      <button onClick={() => onAccion("call")}>CALL</button>
      <button onClick={() => onAccion("raise", cantidad)}>RAISE</button>
      <button onClick={() => onAccion("fold")}>FOLD</button>
    </div>
  );
}

export default ControlesJugador;
