/* eslint-disable react/react-in-jsx-scope */
// Poker.jsx

import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import introPoker from "../../imagenes/Poker/introPoker.png";

import MesaPoker from "../../Componentes/MesaPoker/MesaPoker";
import ControlesJugador from "../../Componentes/ControlesJugador/ControlesJugador"; // <-- importa
import "./Poker.css";
import {
	evaluarMano,
	VAL,
	BASE,
	rankToNumber,
} from "../../utils/Poker/evaluador.js";
import { generarMazo, barajar } from "../../utils/Poker/mazo.js";



// ─── FASES DE RONDA (lógica de póker) ───────────────────────────────
export const RONDA = {
	PREFLOP: "preflop",
	FLOP: "flop",
	TURN: "turn",
	RIVER: "river",
	SHOWDOWN: "showdown",
};
// ─── IA simple ───────────────────────────────────────────────────────
export const IA = {
	PROB_RAISE: 0.3,
	SUBIDA_MIN: 50,
	SUBIDA_MAX: 150,
};

function Poker({
	reproducirEfecto,
	fichas,
	setFichas,
	speak,
	cartasAlternativas,
}) {
	/* --- estado local (ejemplo simple) --- */
	// fichas
	const INICIAL_JUG = fichas;
	const INICIAL_RIV = 1500;
	const [fichasRival, setFichasRival] = useState(1500);

	const [pot, setPot] = useState(0);
	const [apuestaActual, setApuesta] = useState(0); // Apuesta
	const [apuestaJugador, setApuJ] = useState(0);
	const [apuestaRival, setApuR] = useState(0);

	const mazoRef = useRef(barajar(generarMazo()));
	const [cartasJugador, setCartasJugador] = useState([]);
	const [cartasRival, setCartasRival] = useState([]);
	const [cartasMesa, setCartasMesa] = useState([]);

	const [fase, setFase] = useState("inicio"); // SE MANTIENE para blur y giros
	const [ronda, setRonda] = useState(RONDA.PREFLOP); // NUEVO para la lógica de juego
	const [turno, setTurno] = useState("jugador");
	const [mensajeFinal, setMensajeFinal] = useState("");

	const [mensajeRival, setMensajeRival] = useState("");

	const [jugadaActualJugador, setJugadaActualJugador] = useState("");
	// dentro del componente Poker ------------------------------
	const [gameOver, setGameOver] = useState(false);
	const [mensajeGO, setMensajeGO] = useState(""); // overlay final
	//Este useState sirve únicamente para girar las cartas del rival o no
	const [rondaShowdown, setRondaShowdown] = useState(false);

	//Gestion del avance de ronda
	const [accionJugador, setAccionJugador] = useState(null); // 'check', 'bet', 'call', 'raise'
	const [accionRival, setAccionRival] = useState(null);

	const [showRules, setShowRules] = useState(false);

	function rules() {
	setShowRules((prev) => !prev);
	}

	const [showTutorial, setShowTutorial] = useState(false);
	const [tutorialStep, setTutorialStep] = useState(0);

	const tutorialDialogs = [
		{ text: "Welcome to Poker! Let's learn how to play step by step." },
		{ text: "We are going to see how the buttons work in a real game." },
		{ text: "In the start of the game, raise the bet in 100" },
		{ text: "Then use Check because the wanted bet is 0" },
		{ text: "The opponent have placed bet, so call it" },
		{ text: "You can also fold if you believe that you have a bad hand" },
		{ text: "That's it! Good luck and have fun playing Poker!" }
	];

	useEffect(() => {
		const overlay = document.querySelector(".rotate-overlay");

		function updateOrientationState() {
			const isPortrait = window.matchMedia("(orientation: portrait)").matches;

			document.body.classList.toggle("lock-portrait", isPortrait);

			if (overlay) {
				overlay.classList.toggle("rotate-overlay--visible", isPortrait);
			}
		}

		updateOrientationState();
		window.addEventListener("resize", updateOrientationState);

		return () => {
			window.removeEventListener("resize", updateOrientationState);
		};
	}, []);

	function checkGameOver(j, r) {
		if (gameOver) return;
		setTimeout(() => {
			if (j <= 0) {
				setMensajeGO("😢 You lost the game");
				setGameOver(true);
			} else if (r <= 0) {
				setMensajeGO("🎉 You won the game!");
				setGameOver(true);
			} else {
				//El problema es que si esto se ejecuta en un fold, se lanza iniciarNuevaMano dos veces
				iniciarNuevaMano();
			}
		}, 2000);
	}

	/*
	useEffect(() => {
		const mazo = barajar(generarMazo());
	
		const manoJugador = [mazo.pop(), mazo.pop()];
		const manoRival   = [mazo.pop(), mazo.pop()];
		const comunitarias = [mazo.pop(), mazo.pop(), mazo.pop(), mazo.pop(), mazo.pop()];
	
		setCartasJugador(manoJugador);
		setCartasRival(manoRival);
		setCartasMesa(comunitarias);
	}, []);
	*/
	/*
	useEffect(() => {
		if (gameOver) return;
		
		const alguienSinFichas = fichasJugador === 0 || fichasRival === 0;
		if (!alguienSinFichas) return;
		const jugadorSinFichas = fichasJugador === 0;
		const rivalSinFichas = fichasRival === 0;
		
		if (ronda !== RONDA.SHOWDOWN) {
			//No basta con que uno de los dos esté sin fichas, si está sin fichas el jugador entonces el rival tiene que haber hecho call o raise
			if((jugadorSinFichas && accionRival !=null) || (rivalSinFichas && accionJugador != null)){
			const id = setTimeout(avanzarRonda, 1000);      // avanza cada 0,8 s
			return () => clearTimeout(id);}
		}
	  }, [fichasJugador, fichasRival, ronda, gameOver]);
	  */

	useEffect(() => {
		const mazo = mazoRef.current;
		setCartasJugador([mazo.pop(), mazo.pop()]);
		setCartasRival([mazo.pop(), mazo.pop()]);
		// las comunitarias se irán sacando cuando cambie `ronda`
	}, []);
	useEffect(() => {
		const delay = setTimeout(() => {
			setFase("saliendo"); // primero marca salida
			setTimeout(() => {
				setFase("juego"); // luego realmente quita blur y muestra todo
			}, 600); // da tiempo a la animación
		}, 2000);

		return () => clearTimeout(delay);
	}, []);

	/* /////////////////////////////////////////////////////////////////
	 /* ////GESTIÓN CARTAS DE LA MESA AL ACTUALIZAR LA VARIABLE RONDA////
	 /*/ /////////////////////////////////////////////////////////////////

	useEffect(() => {
		const mazo = mazoRef.current;

		if (ronda === RONDA.FLOP)
			setCartasMesa([mazo.pop(), mazo.pop(), mazo.pop()]);
		if (ronda === RONDA.TURN) setCartasMesa((m) => [...m, mazo.pop()]);
		if (ronda === RONDA.RIVER) setCartasMesa((m) => [...m, mazo.pop()]);
		// SHOWDOWN: ya no se sacan cartas
	}, [ronda]);

	/* ///////////////////////////////////////////////////
	 /* ////GESTIÓN DE LA IA DEL RIVAL Y SALTO DE RONDA////
	 /*/ ///////////////////////////////////////////////////
	useEffect(() => {
		//Este useEffect se triggerea cuando cambia el turno
		//if(mensajeFinal !== "") return;
		if (ronda === RONDA.SHOWDOWN) return;
		if (turno !== "rival") return;
		//Al principio es mi turno luego esto, que es para la ia no afecta
		const delay = setTimeout(() => {
			const necesitaIgualar = apuestaActual - apuestaRival;

			// decidir acción
			const r = Math.random();
			if (necesitaIgualar > 0 && r < 0.1) {
				// 10 % fold

				setMensajeRival("Rival folds");
				speak("Rival folds");

				setMensajeFinal(<span>🎉 ¡You win the round</span>);
				const manoActual = [...cartasJugador, ...cartasMesa];
				const evaluacion = evaluarMano(manoActual);
				setTimeout(() => {
					speak("You win the round with the combination " + evaluacion.tipo);
				}, 2000);
				setRondaShowdown(true);

				const nuevoJ = fichas + pot;
				setFichas(nuevoJ);
				//   // 👈 añadido
				setTimeout(() => {
					checkGameOver(nuevoJ, fichasRival);
				}, 2000);

				return;
			}

			if (
				r < IA.PROB_RAISE &&
				fichas !== 0 &&
				fichasRival - apuestaJugador !== 0
			) {
				const subida =
					IA.SUBIDA_MIN +
					Math.floor(Math.random() * (IA.SUBIDA_MAX - IA.SUBIDA_MIN));
				setApuesta((a) => a + subida);
				apostarRival(apuestaJugador + subida, "raise");
				speak("Rival raises " + subida + " chips");
			} else {
				const tipoAccion = necesitaIgualar > 0 ? "call" : "check";
				if (tipoAccion === "call") {
					apostarRival(apuestaJugador, "call"); // ✅ hay algo que igualar
					speak("Rival calls the bet");
				} else {
					apostarRival(0, "check"); // ✅ sin apuesta = check
					speak("Rival checks");
				}
			}
			//Es aquí donde estamos gestionando el cambio de ronda
		}, 2000);

		return () => clearTimeout(delay);
	}, [turno]);

	/* //////////////////////////////
	/* ////GESTIÓN AVANCE DE RONDA////
	/*/ //////////////////////////////
	useEffect(() => {
		// 0) Si estamos en showdown o la mano terminó, no hagas nada
		if (ronda === RONDA.SHOWDOWN || gameOver) return;

		// 1) Ambos han actuado
		const ambosActuaron = accionJugador && accionRival;

		if (!ambosActuaron) return;

		const ambosCheck = accionJugador === "check" && accionRival === "check";
		const apuestaIgual = apuestaJugador === apuestaRival;
		const huboRaise = accionJugador === "raise" || accionRival === "raise";

		// 2) Casos que hacen avanzar
		const pasarPorCheck = ambosCheck; // check / check
		const pasarPorCall =
			apuestaIgual && (accionJugador === "call" || accionRival === "call"); // …call que iguala
		const hayAllInJugador = accionJugador === "allin";
		const hayAllInRival = accionRival === "allin"; //el allin se activa cuando uno de los dos hace una apuesta en la que se queda sin fichas
		if (
			((hayAllInJugador &&
				(accionRival === "call" || accionRival === "raise")) ||
				(hayAllInRival &&
					(accionJugador === "call" || accionJugador === "raise")) ||
				(hayAllInJugador && hayAllInRival)) &&
			ronda !== RONDA.SHOWDOWN
		) {
			//ESTO FUNCIONA SI GARANTIZAMOS QUE UNA ACCION DE ALGUNO QUE LE DEJA SIN FICHAS TERMINA EN ALLIN
			const id = setTimeout(avanzarRonda, 1000); // avanza cada 0,8 s
			return () => clearTimeout(id);
		} else if ((pasarPorCheck || pasarPorCall) && ronda !== RONDA.SHOWDOWN) {
			resetApuestas(); // limpia la mesa de apuestas
			setAccionJugador(null); // resetea acciones para la ronda siguiente
			setAccionRival(null);
			avanzarRonda();
		}
	}, [
		accionJugador,
		accionRival,
		apuestaJugador,
		apuestaRival,
		ronda,
		gameOver,
	]);

	/* ////////////////////////////
	/* ////GESTIÓN DEL SHOWDOWN////
	/*/ ///////////////////////////
	useEffect(() => {
		if (ronda !== RONDA.SHOWDOWN) return;

		const manoJ = evaluarMano([...cartasJugador, ...cartasMesa]);
		const manoR = evaluarMano([...cartasRival, ...cartasMesa]);

		const nJ = manoJ.rank;
		const nR = manoR.rank;

		if (nJ > nR) {
			const nuevoJ = fichas + pot;

			setFichas(nuevoJ);
			setMensajeFinal(`🏆 ¡You win the round with ${manoJ.tipo}!`);
			speak("You win the round with " + manoJ.tipo);
			setRondaShowdown(true);

			checkGameOver(nuevoJ, fichasRival);
		} else if (nJ < nR) {
			setMensajeFinal(`🤖 Villain wins the round with ${manoR.tipo}`);
			setRondaShowdown(true);
			const nuevoR = fichasRival + pot;
			setFichasRival(nuevoR);
			checkGameOver(fichas, nuevoR); // 👈
		} else {
			setMensajeFinal(`🤝 ¡Empate! Ambos con ${manoJ.tipo}`);
			setRondaShowdown(true);
			const mitad = pot / 2;
			const nuevoJ = fichas + mitad;
			const nuevoR = fichasRival + mitad;
			setFichas(nuevoJ);
			setFichasRival(nuevoR);
			checkGameOver(nuevoJ, nuevoR); // 👈
		}

		resetApuestas();
	}, [ronda]);

	useEffect(() => {
		if (cartasJugador.length) {
			const manoActual = [...cartasJugador, ...cartasMesa];
			const evaluacion = evaluarMano(manoActual);
			setJugadaActualJugador(evaluacion.tipo);
		}
	}, [cartasJugador, cartasMesa]);

	//Este useEffect salta cuando, se actualizan las fichas del rival o del jugador, se cambia de ronda y gameOver
	/*
	  useEffect(() => {
		if (gameOver) return;
	
		const alguienSinFichas = fichasJugador === 0 || fichasRival === 0;
		if (!alguienSinFichas) return;
	
		const secuencia = {
			[RONDA.PREFLOP]: RONDA.FLOP,
			[RONDA.FLOP]: RONDA.TURN,
			[RONDA.TURN]: RONDA.RIVER,
			[RONDA.RIVER]: RONDA.SHOWDOWN,
		};
	
		const siguiente = secuencia[ronda];
		if (!siguiente) return;
	
		const delay = setTimeout(() => {
			setRonda(siguiente);
		}, 1000);
	
		return () => clearTimeout(delay);
	}, [fichasJugador, fichasRival, ronda, gameOver]);
	*/
	//Este useEffect se lanza cuando se inicia la partida y cuando se reinicia
	useEffect(() => {
		if (
			cartasJugador.length === 2 &&
			cartasMesa.length === 0 &&
			fase === "juego"
		) {
			const mano = cartasJugador
				.map((c) => `${c.valor} de ${c.palo}`)
				.join(" y ");
			const manoActual = [...cartasJugador, ...cartasMesa];
			const evaluacion = evaluarMano(manoActual);
			speak(
				`A new round has started and your starting hand is ${mano}. Your current combination is ${evaluacion.tipo}`
			);
		}
	}, [cartasJugador, cartasMesa, fase]);

	//Este useEffect se lanza cuando se enseñan las 3 primeras cartas de la mesa
	useEffect(() => {
		// Cuando se muestran las 3 primeras cartas comunitarias (FLOP)
		if (cartasMesa.length === 3 && (ronda === RONDA.FLOP || ronda === "flop")) {
			const flop = cartasMesa.map((c) => `${c.valor} de ${c.palo}`).join(", ");
			const manoActual = [...cartasJugador, ...cartasMesa];
			const evaluacion = evaluarMano(manoActual);
			speak(
				`The three cards on the table are: ${flop}. Your current combination is ${evaluacion.tipo}`
			);
		}
	}, [cartasMesa, ronda]);

	//Este useEffect se lanza cuando se enseña una carta comunitaria nueva a la mesa
	const prevCartasMesaRef = useRef(cartasMesa.length);
	useEffect(() => {
		if (
			cartasMesa.length > 3 &&
			cartasMesa.length > prevCartasMesaRef.current &&
			(ronda === RONDA.TURN || ronda === RONDA.RIVER)
		) {
			const newCard = cartasMesa[cartasMesa.length - 1];
			const cardText = `${newCard.valor} of ${newCard.palo}`;
			const currentHand = [...cartasJugador, ...cartasMesa];
			const evaluation = evaluarMano(currentHand);
			setTimeout(() => {
				speak(
					`New card on the table: ${cardText}. Your current combination is ${evaluation.tipo}`
				);
				prevCartasMesaRef.current = cartasMesa.length;
			}, 3000);
		}
	}, [cartasMesa, ronda, cartasJugador]);

	function reiniciarPartida() {
		setFichas(INICIAL_JUG);
		setFichasRival(INICIAL_RIV);

		iniciarNuevaMano();
		setGameOver(false);
		setMensajeGO("");
		setAccionJugador(null);
		setAccionRival(null);
	}
	function avanzarRonda() {
		setRonda(
			(r) =>
				({
					preflop: "flop",
					flop: "turn",
					turn: "river",
					river: "showdown",
					showdown: "showdown",
				}[r])
		);
	}

	//Ahora mismo el único estable que se puede mutar es ficharJugador y pot
	/* --- función que SÍ existe --- */
	function handleAccion(tipo, cantidad = 0) {
		console.log("Acción:", tipo, "Cantidad:", cantidad);
		if (turno !== "jugador") return; // no es tu turno
		//Esta es la función que gestiona las acciones que realiza el jugador
		//Para empezar necesitamos que se vea de quien es el turno
		switch (tipo) {
			case "check":
				if (apuestaActual === apuestaJugador) {
					// If the player checks and has matched the current bet
					setAccionJugador("check");
					setTurno("rival");
					speak("You checked the bet with " + apuestaJugador + " tokens");
				} else {
					setMensajeFinal(
						"You cannot check, Either Call the bet 💰, Raise☝️ or Fold 🃏"
					);
					speak("You cannot check, Either Call the bet , Raise or Fold ");
					setTimeout(() => {
						setMensajeFinal("");
					}, 2000);
				}
				break;

			case "call":
				// solo tiene sentido si hay algo que igualar
				if (apuestaActual > apuestaJugador && apuestaActual != 0) {
					setAccionJugador("call");
					apostarJugador(apuestaActual - apuestaJugador);
					speak(
						"You called the bet with " +
							(apuestaActual - apuestaJugador) +
							" tokens"
					);
				} else {
					setMensajeFinal(
						"There is no bet to call. Use Check ✔️, Raise☝️ or Fold 🃏"
					);
					speak("There is no bet to call. Use Check, Raise or Fold ");
					setTimeout(() => setMensajeFinal(""), 2000);
					return; // evita pasar turno
				} //Hacer call tiene sentido de esta manera cuando el rival haya apostado, por lo que hay que mejorar la gestión de paso de ronda
				break;

			case "raise":
				const subida = Math.max(cantidad, 1); // mínimo 1
				setApuesta((a) => a + subida);
				setAccionJugador("raise");
				apostarJugador(apuestaActual - apuestaJugador + subida);

				speak(
					"You raised the bet with " +
						(apuestaActual - apuestaJugador + subida) +
						" tokens"
				);

				//El raise funciona bien
				break;

			case "fold":
				// rival gana el bote
				setMensajeFinal("🏳️ The opponent wins the round"); //Esto hace que se muestre en pantalla
				speak("The opponent wins the round");
				setRondaShowdown(true); //Muestro las cartas del rival
				const nuevoR = fichasRival + pot; //Actualizo las fichas del rival
				setFichasRival(nuevoR); //Solo hay que ajustar las fichas del rival, las apuestas y el pot se actualizan en iniciarNuevaMano() y
				//la cantidad del jugador ya se ha quitado de su stack en apostarJugador()
				//Esto se elimina porque ya se llama en iniciar nueva mano resetApuestas();
				//Lo mismo ocurre con esto setRonda(RONDA.PREFLOP);
				//En principio esto podríamos quitarlo porque no afecta a nada

				//setTurno("ninguno");

				setTimeout(() => {
					checkGameOver(fichas, nuevoR);
					//if (!gameOver) iniciarNuevaMano();
				}, 2000);

				//Al foldear se acaba la mano, pero sin entrar en showDown, por lo que no debemos cambiar la ronda, para que no se active el
				//useEffect[ronda] de cuando ronda === RONDA.SHOWDOWN

				break;

			default:
				break;
		}
	}

	/* --- datos que enviamos a MesaPoker --- */
	const estado = {
		jugador: {
			nombre: "You",
			fichas: fichas,
			cartas: cartasJugador,
			controles: <ControlesJugador onAccion={handleAccion} speak={speak} />,
		},
		rival: {
			nombre: "Villain",
			fichas: fichasRival,
			cartas: cartasRival,
		},
		// por ahora solo muestra el flop
		pot,
	};

	function resetApuestas() {
		setApuesta(0);
		setApuJ(0);
		setApuR(0);
	}

	function apostarJugador(cantidad) {
		if (cantidad > fichas) cantidad = fichas;
		const resto = fichas - cantidad;
		if (resto === 0) setAccionJugador("allin"); // NUEVO
		setFichas(resto);

		setApuJ((a) => a + cantidad); //Cómo están tratando con useState, lo que hacen es coger el valor de la variable actual,
		//en vez de acceder directamente a la variable de estado, en react usar la flecha garantiza que el estado de esa variable es el más actual
		setPot((p) => p + cantidad);
		setTurno("rival");
	}
	function apostarRival(cantidad, tipo = "call") {
		if (cantidad > fichasRival) cantidad = fichasRival;

		const resto = fichasRival - cantidad;
		// NUEVO
		setFichasRival(resto);

		//Se resta la apuesta
		setApuR((a) => a + cantidad);
		setPot((p) => p + cantidad);

		const mensaje =
			tipo === "raise"
				? `Villain raises ${cantidad} chips`
				: tipo === "call"
				? `Villain calls the bet`
				: tipo === "check"
				? `Villain checks`
				: "";

		if (mensaje) {
			setMensajeRival(mensaje);
			setTimeout(() => setMensajeRival(""), 2000);
		}
		/*if ((fichasJugador === 0 || fichasRival === 0) && ronda !== RONDA.SHOWDOWN) {
		// el que queda con fichas iguala la apuesta o se queda corto
		setAccionRival(tipo);   // ya lo haces
		setTurno("jugador");    // ya lo haces
		avanzarRonda();         // ⇦ salta inmediatamente a la siguiente calle
		return;                 // evita que la lógica normal espere más
	  }*/
		setAccionRival(tipo);
		setTurno("jugador");
		if (fichasRival === 0 || resto === 0) setAccionRival("allin");
	}
	const comunitariasVisibles =
		ronda === RONDA.FLOP
			? cartasMesa.slice(0, 3)
			: ronda === RONDA.TURN
			? cartasMesa.slice(0, 4)
			: ronda === RONDA.RIVER || ronda === RONDA.SHOWDOWN
			? cartasMesa
			: [];
	function iniciarNuevaMano() {
		const nuevoMazo = barajar(generarMazo());
		mazoRef.current = nuevoMazo; //Aquí actualizo la referencia al mazo
		setTimeout(() => {
			setRondaShowdown(false);
			setTimeout(() => {
				setCartasJugador([nuevoMazo.pop(), nuevoMazo.pop()]);
				setCartasRival([nuevoMazo.pop(), nuevoMazo.pop()]);
				setCartasMesa([]);
				setPot(0);

				resetApuestas();
				/*setApuesta(0);
			setApuJ(0);
			setApuR(0);
			*/

				setMensajeFinal("");

				setMensajeRival("");
				setTurno("jugador");

				setRonda(RONDA.PREFLOP);
				setAccionJugador("null");
				setAccionRival("null");
			}, 1000);
		}, 3000);
	}

	return (
		<div className="poker-pagina">
			
			<div className="rotate-overlay">
				<div className="rotate-icon">
					<div className="flecha">↻</div>
					<p>Gira tu dispositivo para disfrutar de una mejor experiencia</p>
				</div>
			</div>
			
			
			
			{fase === "inicio" || fase === "saliendo" ? (
				<div
					className={`intro-overlay ${fase === "saliendo" ? "fade-out" : ""}`}
				>
					<img src={introPoker} alt="Intro Poker" />
				</div>
			) : null}

			{mensajeFinal && <div className="mensaje-final">{mensajeFinal}</div>}
			{/*Aclarción sobre la sintaxis {condition && html}
			Los brackets nos permiten inyectar código de javaScript en html, cuando hacemos {condition && (html)} lo
			que estamos haciendo es, en caso de que lo primero sea true, devolvemos el componente
				
		
		*/}

			{/* ✅ Mensaje que flota sobre la mesa */}
			{mensajeRival && <div className="mensaje-rival">{mensajeRival}</div>}
			
			{gameOver && (
				//Lo que hacemos aquí es cargar este componente si y solo si, gameOver está en true
				<div className="overlay-go">
					<h2>{mensajeGO}</h2>
					<button
						onClick={reiniciarPartida}
						disabled={fichas === 0}
						aria-label={
							fichas == 0 ? "Buy chips to continue playing poker" : "Play Again"
						}
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						{fichas == 0 ? "Buy chips to continue playing poker" : "Play Again"}
					</button>
					
					<Link to="/home">
						<button
							aria-label="Return to Menu"
							onMouseEnter={(e) =>
								speak(e.currentTarget.getAttribute("aria-label"))
							}
							onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
						>
							Main menu
						</button>
					</Link>
				</div>
			)}

			<div className={fase === "inicio" ? "poker-blur" : ""}>
				<MesaPoker
					{...estado}
					comunitarias={comunitariasVisibles}
					fase={fase}
					turno={turno}
					jugadaActualJugador={jugadaActualJugador}
					showdown={rondaShowdown}
					cartasAlternativas={cartasAlternativas}
					reproducirEfecto={reproducirEfecto}
				/>
<<<<<<< Updated upstream
				<Link to="/home" tabIndex={-1}>
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
=======
					<Link to="/home" tabIndex={-1}>
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
					<button className={"rules-button"} 
						onClick={() => {rules(showRules);}}

						aria-label="Show rules"
						onMouseEnter={e => speak(e.currentTarget.getAttribute('aria-label'))}
						onFocus={e => speak(e.currentTarget.getAttribute('aria-label'))}>
						More Info ℹ️
					</button>
					{showRules && (
						<div className="rules-modal">
							<div className="rules-content">
							<h2>Poker Rules</h2>
							<p>
								In Poker, your goal is to form the best possible five-card hand using your two private cards and the five community cards on the table.
							</p>
							<h3>How a Round Works</h3>
							<ul>
								<li>Both you and your opponent receive two private cards.</li>
								<li>Five community cards are revealed in three stages: Flop (3 cards), Turn (1 card), and River (1 card).</li>
								<li>After each stage, you can bet, check, raise, call, or fold.</li>
								<li>The player with the best hand at the end wins the pot. If someone folds, the other player wins automatically.</li>
							</ul>
							<h3>Button Guide</h3>
							<ul>
								<li><b>CHECK</b>: Pass the turn without betting if no one has bet yet.</li>
								<li><b>CALL</b>: Match the current bet made by your opponent.</li>
								<li><b>RAISE</b>: Increase the current bet. You must bet more than the previous bet.</li>
								<li><b>FOLD</b>: Give up the round. Your opponent wins the pot.</li>
							</ul>
							<h3>Winning Hands (from highest to lowest)</h3>
							<ul>
								<li>Royal Flush</li>
								<li>Straight Flush</li>
								<li>Four of a Kind</li>
								<li>Full House</li>
								<li>Flush</li>
								<li>Straight</li>
								<li>Three of a Kind</li>
								<li>Two Pair</li>
								<li>One Pair</li>
								<li>High Card</li>
							</ul>
							<h6>Tip: Try to read your opponent and manage your chips wisely!</h6>
							<button className="btn" onClick={rules}>Close</button>
							</div>
						</div>
					)}
					
>>>>>>> Stashed changes
			</div>
			<div className="boton-ronda-container"></div>
		</div>
	);
}

//En react solo puedo tener un componente que exporto con export default pero si que puedo tener varios componentes locales que devuelvan jsx dentro de un mismo archivo
export default Poker;
