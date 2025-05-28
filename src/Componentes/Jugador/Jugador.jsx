import CartaPoker from "../CartaPoker/CartaPoker";
import React from "react";
import "./Jugador.css";

function Jugador({
	nombre,
	fichas,
	cartas,
	posicion,
	controles,
	fase,
	turno,
	showdown,
	speak,
	cartasAlternativas,
}) {
	return (
		<div className={`jugador jugador-${posicion}`}>
			<div className="jugador-cartas">
				{cartas.map((c, i) => (
					<CartaPoker
						key={i}
						carta={c}
						rotada={posicion === "top"}
						girarSolo={posicion === "bottom" && fase === "juego"}
						nueva={false}
						showdown={showdown}
						cartasAlternativas={cartasAlternativas}
					/>
				))}
			</div>

			<span className={`jugador-nombre ${turno ? "jugador-turno" : ""}`}>
				{nombre}
			</span>
			<span className="jugador-fichas">{fichas}</span>
			{controles}
		</div>
	);
}
export default Jugador;
