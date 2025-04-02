import "./carta.css";

import CartaPorDetras from "../../imagenes/CartaPorDetras.png";

function Carta({ rotada, naipe, valor, inclinacion }) {
	return (
		<div
			className={`carta`}
			style={{
				transform: `rotate(${inclinacion}deg)`,
				backgroundImage: rotada ? `url(${CartaPorDetras})` : "none",
			}}
		></div>
	);
}
export default Carta;
