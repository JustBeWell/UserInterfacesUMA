import { useState } from "react";
import { Mano } from "../Componentes";

function getRandomCard() {
	let randomNumber = Math.floor(Math.random() * 13) + 1;
	if (randomNumber > 10) {
		return 10;
	} else if (randomNumber === 1) {
		return 11;
	} else {
		return randomNumber;
	}
}

function getRandomNaipe() {
	// Por ahora solo tenemos diamantes, pero esto se puede expandir después
	return "diamante";
}

function getValorCarta(numero) {
	// Convertir el número a la notación de carta correspondiente
	if (numero === 11) return "A";
	if (numero === 10) {
		// Elegir aleatoriamente entre 10, J, Q o K
		const opciones = ["10", "J", "Q", "K"];
		return opciones[Math.floor(Math.random() * opciones.length)];
	}
	return numero.toString();
}

function BlackJack() {
	let [isAlive, setIsAlive] = useState(true);
	let [hasBlackJack, setHasBlackJack] = useState(false);
	let [cards, setCards] = useState([]);
	let [mensaje, setMensaje] = useState("¿Quieres jugar una partida?");
	let [cartasCrupier, setCartasCrupier] = useState([]);
	let [puntuacionJugador, setPuntuacionJugador] = useState(0);
	let [puntuacionCrupier, setPuntuacionCrupier] = useState(0);

	function iniciarJuego() {
		setIsAlive(true);
		setHasBlackJack(false);
		setMensaje("¡Nueva partida! Pide una carta");

		// Dar dos cartas al jugador
		const carta1 = getRandomCard();
		const carta2 = getRandomCard();
		const nuevasCartas = [
			{
				naipe: getRandomNaipe(),
				valor: getValorCarta(carta1),
				valorNumerico: carta1,
			},
			{
				naipe: getRandomNaipe(),
				valor: getValorCarta(carta2),
				valorNumerico: carta2,
			},
		];

		setCards(nuevasCartas);
		const nuevaPuntuacion = carta1 + carta2;
		setPuntuacionJugador(nuevaPuntuacion);

		// Dar una carta visible y una oculta al crupier
		const cartaCrupier = getRandomCard();
		setCartasCrupier([
			{
				naipe: getRandomNaipe(),
				valor: getValorCarta(cartaCrupier),
				valorNumerico: cartaCrupier,
			},
			{
				rotada: true, // Carta boca abajo
				valorNumerico: 0,
			},
		]);
		setPuntuacionCrupier(cartaCrupier);

		if (nuevaPuntuacion === 21) {
			setHasBlackJack(true);
			setMensaje("¡Blackjack! ¡Has ganado!");
			finalizarJuego();
		}
	}

	function newCard() {
		if (isAlive && !hasBlackJack) {
			const valorNumerico = getRandomCard();
			const nuevaCarta = {
				naipe: getRandomNaipe(),
				valor: getValorCarta(valorNumerico),
				valorNumerico: valorNumerico,
			};

			const nuevasCartas = [...cards, nuevaCarta];
			setCards(nuevasCartas);

			const nuevaPuntuacion = nuevasCartas.reduce(
				(sum, card) => sum + card.valorNumerico,
				0
			);
			setPuntuacionJugador(nuevaPuntuacion);

			if (nuevaPuntuacion > 21) {
				setIsAlive(false);
				setMensaje("¡Te has pasado! Has perdido.");
				finalizarJuego();
			} else if (nuevaPuntuacion === 21) {
				setHasBlackJack(true);
				setMensaje("¡21! ¡Muy bien!");
				finalizarJuego();
			}
		}
	}

	function plantarse() {
		if (isAlive && !hasBlackJack) {
			// Revelar la carta oculta del crupier
			const valorCartaOculta = getRandomCard();
			const cartaOculta = {
				naipe: getRandomNaipe(),
				valor: getValorCarta(valorCartaOculta),
				valorNumerico: valorCartaOculta,
			};

			let nuevasCartasCrupier = [cartasCrupier[0], cartaOculta];
			let nuevaPuntuacionCrupier =
				cartasCrupier[0].valorNumerico + valorCartaOculta;

			// El crupier debe pedir cartas hasta tener 17 o más
			while (nuevaPuntuacionCrupier < 17) {
				const valorNuevaCarta = getRandomCard();
				const nuevaCarta = {
					naipe: getRandomNaipe(),
					valor: getValorCarta(valorNuevaCarta),
					valorNumerico: valorNuevaCarta,
				};

				nuevasCartasCrupier = [...nuevasCartasCrupier, nuevaCarta];
				nuevaPuntuacionCrupier += valorNuevaCarta;
			}

			setCartasCrupier(nuevasCartasCrupier);
			setPuntuacionCrupier(nuevaPuntuacionCrupier);

			// Determinar el ganador
			if (nuevaPuntuacionCrupier > 21) {
				setMensaje("¡El crupier se ha pasado! ¡Has ganado!");
			} else if (nuevaPuntuacionCrupier > puntuacionJugador) {
				setMensaje("¡El crupier gana!");
			} else if (nuevaPuntuacionCrupier < puntuacionJugador) {
				setMensaje("¡Has ganado!");
			} else {
				setMensaje("¡Empate!");
			}

			setIsAlive(false);
		}
	}

	function finalizarJuego() {
		// Esta función puede ampliarse con más lógica si es necesario
	}

	return (
		<div className="container">
			<h1>Blackjack</h1>
			<p id="message-el">{mensaje}</p>

			<div className="mesa-juego">
				<h2>
					Crupier {!isAlive && <span>- Puntuación: {puntuacionCrupier}</span>}
				</h2>
				<Mano cartas={cartasCrupier} tipo="crupier" />

				<h2>Tu mano - Puntuación: {puntuacionJugador}</h2>
				<Mano cartas={cards} tipo="jugador" />
			</div>

			<div id="controls">
				{!isAlive || hasBlackJack ? (
					<button className="btn" onClick={iniciarJuego}>
						NUEVA PARTIDA
					</button>
				) : cards.length > 0 ? (
					<>
						<button className="btn" onClick={newCard}>
							PEDIR CARTA
						</button>
						<button className="btn" onClick={plantarse}>
							PLANTARSE
						</button>
					</>
				) : (
					<button className="btn" onClick={iniciarJuego}>
						COMENZAR
					</button>
				)}
			</div>
		</div>
	);
}

export default BlackJack;
