// Componente Mano para mostrar cartas en el juego de BlackJack
import React, { useState } from "react";
import { Carta } from "..";
import "./mano.css";

/**
 * Componente que muestra una mano de cartas
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.cartas - Array de objetos carta con naipe, valor y opcionalmente rotada
 * @param {String} props.tipo - Tipo de mano ('jugador' o 'crupier')
 * @param {Number} props.puntuacion - Puntuación total de la mano
 * @param {String} props.mensaje - Mensaje opcional para mostrar con la mano
 */
function Mano({ cartas = [], tipo = "jugador", puntuacion = 0, mensaje = "" }) {
	// Estado para controlar qué carta está en hover
	const [hoveredCardIndex, setHoveredCardIndex] = useState(null);

	// Función para calcular la inclinación de cada carta según su posición
	const calcularInclinacion = (index, total) => {
		// Si solo hay una carta, no se inclina
		if (total <= 1) return 0;

		// Cálculo de inclinación para distribución en abanico
		const anguloBase = 35; // Ángulo máximo para el abanico
		const medio = Math.floor(total / 2);

		return (index - medio) * (anguloBase / (total - 1));
	};

	// Función para calcular el desplazamiento horizontal de cada carta
	const calcularDesplazamiento = (index, total) => {
		if (total <= 1) return 0;

		// Ajustamos el desplazamiento base según la cantidad de cartas
		// A menos cartas, mayor separación; a más cartas, menor separación
		let desplazamientoBase;

		if (total <= 3) {
			// Con pocas cartas, mayor separación
			desplazamientoBase = 70;
		} else if (total <= 5) {
			// Con cantidad media de cartas, separación media
			desplazamientoBase = 60;
		} else if (total <= 8) {
			// Con más cartas, reducimos la separación
			desplazamientoBase = 50;
		} else {
			// Con muchas cartas, separación mínima para que quepa todo
			desplazamientoBase = 40;
		}

		const medio = Math.floor(total / 2);
		return (index - medio) * desplazamientoBase;
	};

	// Función para calcular el desplazamiento vertical basado en el ángulo
	const calcularDesplazamientoVertical = (angulo) => {
		// Convertimos el ángulo a radianes
		const radianes = Math.abs(angulo) * (Math.PI / 180);
		// Calculamos cuánto se debe desplazar en Y (trigonometría)
		// Usamos una constante de ajuste para regular la altura del arco del abanico
		const factorAjuste = 1.5;
		return Math.sin(radianes) * 40 * factorAjuste;
	};

	// Nueva función para calcular el desplazamiento horizontal adicional en hover basado en el ángulo
	const calcularDesplazamientoHorizontalHover = (angulo) => {
		// Determina cuánto se desplaza la carta horizontalmente al hacer hover
		// El signo del ángulo determina la dirección del desplazamiento
		const factorDireccion = angulo < 0 ? -1 : 1;
		// Aplicamos un desplazamiento proporcional al ángulo, con un máximo
		return factorDireccion * Math.min(Math.abs(angulo), 20) * 0.6;
	};

	return (
		<div className={`mano mano-${tipo}`}>
			<div className="mano-contenedor">
				{cartas.map((carta, index) => {
					const angulo = calcularInclinacion(index, cartas.length);
					const desplazamientoX = calcularDesplazamiento(index, cartas.length);

					// Calcular la transformación con o sin el efecto hover
					const isHovered = hoveredCardIndex === index;

					// Solo aplicamos el desplazamiento vertical cuando hay hover
					// En estado normal, no hay desplazamiento vertical (Y = 0)
					const desplazamientoY = isHovered
						? calcularDesplazamientoVertical(angulo)
						: 0;

					// Aplicar un desplazamiento vertical adicional para el efecto de elevación en hover
					const hoverY = isHovered ? -20 : 0;

					// Aplicar un desplazamiento horizontal adicional en hover según el ángulo
					const hoverX = isHovered
						? calcularDesplazamientoHorizontalHover(angulo)
						: 0;

					return (
						<div
							key={`carta-${index}`}
							className="carta-posicion"
							style={{
								transform: `translateX(${
									desplazamientoX + hoverX
								}px) translateY(${desplazamientoY + hoverY}px)`,
								zIndex: isHovered ? 100 : index, // Mayor z-index cuando hay hover
								transition: "transform 0.3s ease, z-index 0s",
							}}
							onMouseEnter={() => setHoveredCardIndex(index)}
							onMouseLeave={() => setHoveredCardIndex(null)}
						>
							<Carta
								naipe={carta.naipe || "diamante"}
								valor={carta.valor || "A"}
								rotada={carta.rotada || false}
								inclinacion={angulo}
							/>
						</div>
					);
				})}
			</div>
			<div className="mano-info">
				{puntuacion > 0 && <div>Puntuación: {puntuacion}</div>}
				{mensaje && <div className="mano-mensaje">{mensaje}</div>}
			</div>
		</div>
	);
}

export default Mano;
