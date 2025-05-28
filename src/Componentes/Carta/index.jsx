import { useEffect, useState } from "react";
import { obtenerImagenCarta } from "../../imagenes";
import "./carta.css";
function Carta({
	rotada,
	naipe,
	valor,
	inclinacion,
	nueva,
	girarSolo,
	cartasAlternativas,
}) {
	const [mostrarCarta, setMostrarCarta] = useState(
		rotada || nueva || girarSolo
	);

	useEffect(() => {
		if (nueva) {
			const timer = setTimeout(() => {
				setMostrarCarta(false);
			}, 1000);
			return () => clearTimeout(timer);
		}
		if (girarSolo) {
			const timer = setTimeout(() => {
				setMostrarCarta(false);
			}, 500);
			return () => clearTimeout(timer);
		}
	}, [nueva, girarSolo]);

	const valorCorregido = valor === "As" ? "A" : valor;

	const imagen = mostrarCarta
		? obtenerImagenCarta(null, null, cartasAlternativas)
		: obtenerImagenCarta(naipe, valorCorregido, cartasAlternativas);

	return (
		<div
			className={`carta ${nueva ? "carta-nueva" : ""} ${
				girarSolo ? "carta-giro" : ""
			}`}
			style={{
				transform: `rotate(${inclinacion}deg)`,
				backgroundImage: `url(${imagen})`,
			}}
		></div>
	);
}

export default Carta;
