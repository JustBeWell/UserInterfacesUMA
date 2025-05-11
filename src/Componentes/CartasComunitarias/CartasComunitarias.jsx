import React from "react";
import CartaPoker from "../CartaPoker/CartaPoker";
import "./CartasComunitarias.css";

/**
 *  Muestra de 0‑5 cartas comunitarias centradas.
 *  ▸ props.cartas  →  array con objetos { valor, palo }  (o { valor:"back" } si va boca abajo)
 */
function CartasComunitarias({ cartas = [], fase}) {
  return (
    <div className="cartas-comunitarias">
      {cartas.map((carta, index) => (
        <CartaPoker
          key={index}
          carta={carta}
          inclinacion={0}
          nueva={false} 
          girarSolo={fase === "juego"}       /* ya han “llegado” a la mesa */
        />
      ))}
    </div>
  );
}

export default CartasComunitarias;
