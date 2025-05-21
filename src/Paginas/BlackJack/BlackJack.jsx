import { useEffect, useState } from "react";
import "./BlackJack.css";
import { HeaderBlackjack, GameTable } from "../../Componentes";
import { Link } from "react-router-dom";
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

function BlackJack({ reproducirEfecto, fichas, setFichas, speak }) {
	useEffect(() => {speak("Welcome to Blackjack. You can place your bets and play against the dealer. Good luck!. Right now you have " + fichas + " tokens.");},[])
	const [baraja, setBaraja] = useState([]);
	const [cards, setCards] = useState([]);
	const [cartasCrupier, setCartasCrupier] = useState([]);
	const [puntuacionJugador, setPuntuacionJugador] = useState(0);
	const [puntuacionCrupier, setPuntuacionCrupier] = useState(0);
	const [isAlive, setIsAlive] = useState(false);
	const [hasBlackJack, setHasBlackJack] = useState(false);
	const [mensaje, setMensaje] = useState("Welcome to Blackjack!");
	const [betInput, setBetInput] = useState("");
	const [betAmount, setBetAmount] = useState(0);
	const [apuestaActual, setApuestaActual] = useState(0);
	const [resultadoFinal, setResultadoFinal] = useState("");
	const [modalVisible, setModalVisible] = useState(false);
	const [showRules, setShowRules] = useState(false);
	useEffect(() => {if(showRules) speak("Reach 21 without going over.Step 1: Enter your bet using the input below.Step 2: Press Start Game to receive your cards.Step 3: Choose Hit to take another card, or Stand to finish.");},[showRules])

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
		return [...mazo].sort(() => Math.random() - 0.5);
	}

	function repartirCarta(mazoActual) {
		reproducirEfecto("cartaBlackJack");
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

	function iniciarJuego() {
		if (betAmount === 0 || betAmount > fichas) {
			setResultadoFinal("Invalid bet. Make sure it's within your tokens.");
			setModalVisible(true);
			return;
		}
		const nuevoMazo = barajarMazo(crearBaraja());
		const carta1 = repartirCarta(nuevoMazo);
		const carta2 = repartirCarta(nuevoMazo);
		const cartaCrupier1 = repartirCarta(nuevoMazo);

		const nuevasCartasJugador = [carta1, carta2];
		const nuevaPuntuacionJugador = calcularPuntuacion(nuevasCartasJugador);

		setCards(nuevasCartasJugador);
		setCartasCrupier([cartaCrupier1]);
		setPuntuacionJugador(nuevaPuntuacionJugador);
		setPuntuacionCrupier(cartaCrupier1.valorNumerico);
		setBaraja(nuevoMazo);
		setIsAlive(true);
		setHasBlackJack(false);
		setMensaje("Good luck!");
		setFichas((prev) => prev - betAmount);
		setApuestaActual(betAmount);
		setBetAmount(0);
		setBetInput("");

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
		const nuevaPuntuacionCrupier = calcularPuntuacion(nuevasCartasCrupier);
		setPuntuacionCrupier(nuevaPuntuacionCrupier);
		async function repartirCartasCrupier() {
			let puntuacionActual = nuevaPuntuacionCrupier;
			while (puntuacionActual < 17) {
				await new Promise((resolve) => setTimeout(resolve, 1000));
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
		let mensajePopup = "";
		if (resultado === "BLACKJACK" && cards.length === 2) {
			mensajePopup = "Blackjack! 3:2 payout!";
			ganancia = apuestaActual * 2.5;
		} else if (resultado === "BLACKJACK" && cards.length > 2) {
			mensajePopup = "21 with more than two cards! 2:1 payout!";
			ganancia = apuestaActual * 2;
		} else if (resultado === "GANAR") {
			mensajePopup = "You win! Double your bet.";
			ganancia = apuestaActual * 2;
		} else if (resultado === "EMPATAR") {
			mensajePopup = "Push! You get your bet back.";
			ganancia = apuestaActual;
		} else if (resultado === "PERDER") {
			mensajePopup = "You lost! You lose your bet.";
			ganancia = 0;
		}
		setTimeout(() => {
			setResultadoFinal(mensajePopup);
			setModalVisible(true);
		}, 1000);

		setTimeout(() => {
			speak(mensajePopup);
		}, 6000);

		setFichas((prev) => prev + ganancia);
		speak("Your current balance is " + (fichas + ganancia));
		setIsAlive(false);
	}

	function ajustarApuesta(cantidad) {
		if (!isAlive) {
			setBetAmount(Math.min(cantidad, fichas));
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
		setBetInput("");
		setApuestaActual(0);
		setBaraja([]);
		setResultadoFinal("");
	}

	function rules() {
		setShowRules(!showRules);
	}

	return (
		<div className="blackjack-container">
			{showRules && (
				<div className="rules-modal">
					<h2>Blackjack Rules</h2>
					<p> Dealer hit cards until 17.</p>
					<h2>Winning Conditions</h2>
					<ul>
						<li>Blackjack: 3:2 payout</li>
						<li>Win: 2:1 payout</li>
						<li>Push: 1:1 payout</li>
						<li>Lose: Lose your bet</li>
					</ul>
					<h6>Blackjack only counts if you have two cards in your hand</h6>
				</div>
			)}
			<button className="rules-button" onClick={() => rules(showRules)}
			aria-label="More Info"
          	onMouseEnter={e => speak(e.currentTarget.getAttribute('aria-label'))}
			onFocus={e => speak(e.currentTarget.getAttribute('aria-label'))}>
				More Info ℹ️
			</button>

			

			<header>
			<HeaderBlackjack chips={fichas} betAmount={betAmount} mensaje={mensaje} speak={speak} />
			</header>

			<Link to="/home">
				<button
					className="btn-top-left"
					aria-label="Return to Menu"
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				>
					Return to Menu
				</button>
			</Link>

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
				fichas={fichas}
				betInput={betInput}
				setBetInput={setBetInput}
				setBetAmount={setBetAmount}
				resetGame={resetGame}
				speak={speak}
			/>

			{resultadoFinal && (
				<div className={`modal-overlay ${!modalVisible ? "fade-out" : ""}`}>
					<div
						className={`modal-content ${
							resultadoFinal.includes("win") ||
							resultadoFinal.includes("Blackjack")
								? "modal-win"
								: resultadoFinal.includes("Push")
								? "modal-push"
								: "modal-lose"
						}`}
					>
						<p>{resultadoFinal}</p>
						<button
							className="btn"
							onClick={() => {
								setModalVisible(false);
								setTimeout(() => setResultadoFinal(""), 400);
								resetGame();
							}}
							aria-label="Close popup"
							onMouseEnter={(e) =>speak(e.currentTarget.getAttribute("aria-label"))}
							onFocus={(e) =>speak(e.currentTarget.getAttribute("aria-label"))}
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default BlackJack;
