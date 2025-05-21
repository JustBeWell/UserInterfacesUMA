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
        aria-label="Cantidad a apostar"
      />

      {/* Aclaración sobre la sintaxis onClick={function}
      Esto es código específico de React que se transpila a algo como  
      React.createElement("button", { onClick: handleClick }, "Haz clic");
      React internamente mapea onClick a un addEventListener('click', ...), pero con su propio sistema de eventos llamado:

       Synthetic Event System
       El equivalente en js puro sería 
       crear const btn = document.querySelector("button");
       Esto coge el elemento del Dom btn, le añade un event listener con una función implmentada
      btn.addEventListener("click", () => alert("Hola"));
      
      Es un callBack, ya que la función internamente se va a quedar esperando al evento y cuando ocurra ejecutará la función que le hayamos pasado como parámetro
      
      */}
      <button onClick={() => onAccion("check")}>CHECK</button>
      <button onClick={() => onAccion("call")}>CALL</button>
      <button onClick={() => onAccion("raise", cantidad)}>RAISE</button>
      <button onClick={() => onAccion("fold")}>FOLD</button>
    </div>
  );
}

export default ControlesJugador;
