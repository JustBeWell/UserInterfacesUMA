
import CartaPoker from "../CartaPoker/CartaPoker";
import React from "react";
import "./Jugador.css"


function Jugador({ nombre, fichas, cartas, posicion, controles }) {
  return (
    <div className={`jugador jugador-${posicion}`}>
      <div className="jugador-cartas">
        {cartas.map((c, i) => (
          <CartaPoker
          key={i}
          carta={c}
          rotada={posicion === "top"}   // el rival está en la parte de arriba
          nueva={false}
        />
        ))}
      </div>
      <span className="jugador-nombre">{nombre}</span>
      <span className="jugador-fichas">{fichas}</span>
      {controles}
    </div>
  );
}
export default Jugador;
