import "./carta.css";

import { obtenerImagenCarta } from "../../imagenes";

function Carta({ rotada, naipe, valor, inclinacion }) {
	return (
		<div
			className={`carta`}
			style={{
				transform: `rotate(${inclinacion}deg)`,
				backgroundImage: rotada
					? `url(${obtenerImagenCarta("", "")})`
					: `url(${obtenerImagenCarta(naipe, valor)})`,
			}}
		></div>
	);
}
export default Carta;
