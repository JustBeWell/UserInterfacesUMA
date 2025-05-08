// Poker.jsx
import { useState } from "react";
import MesaPoker from "../../Componentes/MesaPoker/MesaPoker";
import ControlesJugador from "../../Componentes/ControlesJugador/ControlesJugador"; // <-- importa
import "./Poker.css";
function Poker() {
	/* --- estado local (ejemplo simple) --- */
	const [fichasJugador, setFichasJugador] = useState(1000);
	const [fichasRival, setFichasRival] = useState(1500);
	const [pot, setPot] = useState(300);

	/* --- función que SÍ existe --- */
	function handleAccion(tipo) {
		console.log("Acción recibida:", tipo);
		// aquí actualizarías fichas, pot, fase, etc.
	}

	/* --- datos que enviamos a MesaPoker --- */
	const estado = {
		jugador: {
			nombre: "Tú",
			fichas: fichasJugador,
			cartas: [
				{ valor: "K", palo: "hearts" },
				{ valor: "A", palo: "clubs" },
			],
			controles: <ControlesJugador onAccion={handleAccion} />,
		},
		rival: {
			nombre: "Rival",
			fichas: 1500,
			cartas: [
				{ valor: "A", palo: "spades" },
				{ valor: "K", palo: "hearts" },
			],
		},
		comunitarias: [
			{ valor: "J", palo: "hearts" },
			{ valor: "10", palo: "spades" },
			{ valor: "A", palo: "diamonds" } /* ojo: Ace → "A" para tu mapeo */,
		],
		pot,
	};

	return (
		<div className="poker-pagina">
			<MesaPoker {...estado} />
		</div>
	);
}

export default Poker;
