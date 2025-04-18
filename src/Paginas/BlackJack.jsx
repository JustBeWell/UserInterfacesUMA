import { useState } from "react";
import HeaderBlackjack from "../Componentes/headerBlackJack";
import GameTable from "../Componentes/GameTable";
import "../Paginas/BlackJack.css";
import AudioPlayer from "../Componentes/AudioPlayer";

const palos = ["corazones", "diamantes", "tréboles", "picas"];
const valores = [
	{ valor: "A", valorNumerico: 11 },
	{ valor: "2", valorNumerico: 2 },
	{ valor: "3", valorNumerico: 3 },
	{ valor: "4", valorNumerico: 4 },
	{ valor: "5", valorNumerico: 5 },
	{ valor: "6", valorNumerico: 6 },
	{ valor: "7", valorNumerico: 7 },
	{ valor: "8", valorNumerico: 8 },
	{ valor: "9", valorNumerico: 9 },
	{ valor: "10", valorNumerico: 10 },
	{ valor: "J", valorNumerico: 10 },
	{ valor: "Q", valorNumerico: 10 },
	{ valor: "K", valorNumerico: 10 },
];

function BlackJack({ volumen }) {
	const [baraja, setBaraja] = useState([]);
	const [cards, setCards] = useState([]);
	const [cartasCrupier, setCartasCrupier] = useState([]);
	const [puntuacionJugador, setPuntuacionJugador] = useState(0);
	const [puntuacionCrupier, setPuntuacionCrupier] = useState(0);
	const [isAlive, setIsAlive] = useState(false);
	const [hasBlackJack, setHasBlackJack] = useState(false);
	const [mensaje, setMensaje] = useState("Welcome to Blackjack!");
	const [chips, setChips] = useState(1000);
	const [betAmount, setBetAmount] = useState(0);
	const [apuestaActual, setApuestaActual] = useState(0);
	const { reproducirCarta1 } = AudioPlayer(volumen);

	function crearBaraja() {
		const mazo = [];
		for (const palo of palos) {
			for (const valor of valores) {
				mazo.push({
					naipe: palo,
					valor: valor.valor,
					valorNumerico: valor.valorNumerico,
				});
			}
		}
		return mazo;
	}

	function barajarMazo(mazo) {
		const nuevoMazo = [...mazo];
		for (let i = nuevoMazo.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[nuevoMazo[i], nuevoMazo[j]] = [nuevoMazo[j], nuevoMazo[i]];
		}
		return nuevoMazo;
	}

	function repartirCarta(mazoActual) {
		reproducirCarta1();
		const carta = mazoActual.pop();
		setBaraja([...mazoActual]);
		return { ...carta, nueva: true };
	}

	function calcularPuntuacion(cartas) {
		let suma = cartas.reduce((acc, carta) => acc + carta.valorNumerico, 0);
		let ases = cartas.filter((carta) => carta.valor === "A").length;
		while (suma > 21 && ases > 0) {
			suma -= 10;
			ases--;
		}
		return suma;
	}

	function calcularPuntuacionVisible(cartas) {
		return cartas
			.filter((c) => !c.rotada)
			.reduce((acc, carta) => acc + carta.valorNumerico, 0);
	}

	function iniciarJuego() {
		if (betAmount === 0 || betAmount > chips) {
			setMensaje("You must place a valid bet.");
			return;
		}

		const nuevoMazo = barajarMazo(crearBaraja());
		const carta1 = repartirCarta(nuevoMazo);
		const carta2 = repartirCarta(nuevoMazo);
		const cartaCrupier1 = repartirCarta(nuevoMazo);
		const cartaCrupier2 = repartirCarta(nuevoMazo);
		const cartaCrupierTapada = { ...cartaCrupier2, rotada: true };

		const nuevasCartasJugador = [carta1, carta2];
		const nuevaPuntuacionJugador = calcularPuntuacion(nuevasCartasJugador);

		setCards(nuevasCartasJugador);
		setCartasCrupier([cartaCrupier1, cartaCrupierTapada]);
		setPuntuacionJugador(nuevaPuntuacionJugador);
		setPuntuacionCrupier(cartaCrupier1.valorNumerico);
		setBaraja(nuevoMazo);
		setIsAlive(true);
		setHasBlackJack(false);
		setMensaje("Good luck!");
		setChips((prev) => prev - betAmount);
		setApuestaActual(betAmount);
		setBetAmount(0);

		if (nuevaPuntuacionJugador === 21 && nuevasCartasJugador.length === 2) {
			setHasBlackJack(true);
			finalizarJuego("BLACKJACK");
		}
	}

	function newCard() {
		if (!isAlive || hasBlackJack) return;

		const carta = repartirCarta(baraja);
		const nuevasCartas = [...cards, carta];
		const nuevaPuntuacion = calcularPuntuacion(nuevasCartas);

		setCards(nuevasCartas);
		setPuntuacionJugador(nuevaPuntuacion);

		if (nuevaPuntuacion > 21) finalizarJuego("PERDER");
		else if (nuevaPuntuacion === 21) finalizarJuego("GANAR");
	}

	function plantarse() {
		if (!isAlive || hasBlackJack) return;

		let nuevasCartasCrupier = [...cartasCrupier];
		nuevasCartasCrupier[1] = {
			...nuevasCartasCrupier[1],
			rotada: false,
			girarSolo: true,
		};
		setCartasCrupier(nuevasCartasCrupier);
		const nuevaPuntuacionCrupier = calcularPuntuacion(nuevasCartasCrupier);
		setPuntuacionCrupier(nuevaPuntuacionCrupier);

		async function repartirCartasCrupier() {
			let puntuacionActual = nuevaPuntuacionCrupier;
			while (puntuacionActual < 17) {
				await new Promise((resolve) => setTimeout(resolve, 2000));
				const carta = repartirCarta(baraja);
				nuevasCartasCrupier.push(carta);
				setCartasCrupier([...nuevasCartasCrupier]);
				puntuacionActual = calcularPuntuacion(nuevasCartasCrupier);
				setPuntuacionCrupier(puntuacionActual);
			}

			if (puntuacionActual > 21 || puntuacionJugador > puntuacionActual)
				finalizarJuego("GANAR");
			else if (puntuacionActual === puntuacionJugador)
				finalizarJuego("EMPATAR");
			else finalizarJuego("PERDER");
		}

		repartirCartasCrupier();
	}

	function finalizarJuego(resultado) {
		let ganancia = 0;
		if (resultado === "BLACKJACK" && cards.length === 2) {
			setMensaje("Blackjack! 3:2 payout!");
			ganancia = apuestaActual * 2.5;
		} else if (resultado === "BLACKJACK" && cards.length > 2) {
			setMensaje("21 with more than two cards! 2:1 payout!");
			ganancia = apuestaActual * 2;
		} else if (resultado === "GANAR") {
			setMensaje("You win! Double your bet.");
			ganancia = apuestaActual * 2;
		} else if (resultado === "EMPATAR") {
			setMensaje("Push! You get your bet back.");
			ganancia = apuestaActual;
		} else if (resultado === "PERDER") {
			setMensaje("You lost!");
			ganancia = 0;
		}
		setChips((prev) => prev + ganancia);
		setIsAlive(false);
	}

	function ajustarApuesta(cantidad) {
		if (!isAlive) {
			setBetAmount((prev) => Math.max(0, prev + cantidad));
		}
	}

	function resetGame() {
		setCards([]);
		setCartasCrupier([]);
		setPuntuacionJugador(0);
		setPuntuacionCrupier(0);
		setIsAlive(false);
		setHasBlackJack(false);
		setMensaje("Welcome to Blackjack!");
		setBetAmount(0);
		setApuestaActual(0);
		setBaraja([]);
	}

	return (
		<div className="blackjack-container">
			<HeaderBlackjack chips={chips} betAmount={betAmount} mensaje={mensaje} />
			<GameTable
				dealerCards={cartasCrupier}
				playerCards={cards}
				dealerScore={puntuacionCrupier}
				playerScore={puntuacionJugador}
				isAlive={isAlive}
				newCard={newCard}
				plantarse={plantarse}
				iniciarJuego={iniciarJuego}
				betAmount={betAmount}
				adjustBet={ajustarApuesta}
				calcularPuntuacionVisible={calcularPuntuacionVisible}
				resetGame={resetGame}
			/>
		</div>
	);
}

export default BlackJack;
