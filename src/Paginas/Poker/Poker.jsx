// Poker.jsx

import { useState, useEffect, useRef } from "react";
import introPoker from "../../imagenes/Poker/introPoker.png";

import MesaPoker from "../../Componentes/MesaPoker/MesaPoker";
import ControlesJugador from "../../Componentes/ControlesJugador/ControlesJugador"; // <-- importa
import "./Poker.css";
import { evaluarMano,VAL, BASE , rankToNumber } from "./evaluador.js";


  
function generarMazo() {
	const palos = ["Corazon", "Diamante", "Trebol", "Pica"];
	const valores = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "As"];
	const mazo = [];

	for (const palo of palos) {
		for (const valor of valores) {
			mazo.push({ valor, palo });
		}
	}

	return mazo;
}

function barajar(mazo) {
	for (let i = mazo.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[mazo[i], mazo[j]] = [mazo[j], mazo[i]];
	}
	return mazo;
}

// ─── FASES DE RONDA (lógica de póker) ───────────────────────────────
export const RONDA = {
	PREFLOP:  "preflop",
	FLOP:     "flop",
	TURN:     "turn",
	RIVER:    "river",
	SHOWDOWN: "showdown",
  };
  // ─── IA simple ───────────────────────────────────────────────────────
  export const IA = {
	PROB_RAISE: 0.3,
	SUBIDA_MIN: 50,
	SUBIDA_MAX: 150,
  };

function Poker() {
	/* --- estado local (ejemplo simple) --- */
	// fichas
	const INICIAL_JUG = 1000;
	const INICIAL_RIV = 1500;
	const [fichasJugador, setFichasJugador] = useState(1000);
	const [fichasRival,   setFichasRival]   = useState(1500);

	const [pot, setPot]               = useState(0);
	const [apuestaActual, setApuesta] = useState(0);   // lo que hay que igualar
	const [apuestaJugador, setApuJ]   = useState(0);
	const [apuestaRival,   setApuR]   = useState(0);

	const mazoRef          = useRef(barajar(generarMazo()));
	const [cartasJugador,  setCartasJugador]  = useState([]);
	const [cartasRival,    setCartasRival]    = useState([]);
	const [cartasMesa,     setCartasMesa]     = useState([])

	const [fase,  setFase]  = useState("inicio");          // SE MANTIENE para blur y giros
	const [ronda, setRonda] = useState(RONDA.PREFLOP);     // NUEVO para la lógica de juego
	const [turno, setTurno] = useState("jugador"); 
	const [mensajeFinal, setMensajeFinal] = useState("");

	const [mensajeRival, setMensajeRival] = useState("");

	const [jugadaActualJugador, setJugadaActualJugador] = useState("");
// dentro del componente Poker ------------------------------
	const [gameOver, setGameOver]     = useState(false);
	const [mensajeGO, setMensajeGO]   = useState("");   // overlay final
	const [rondaShowdown, setRondaShowdown] = useState(false)
	function checkGameOver(j, r){
	if (gameOver) return;
	if (j <= 0){
		setMensajeGO("😢 Has perdido la partida");
		setGameOver(true);
	} else if (r <= 0){
		setMensajeGO("🎉 ¡Has ganado la partida!");
		setGameOver(true);
	}else{
		iniciarNuevaMano();
	}
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
	useEffect(() => {
		const mazo = mazoRef.current;
		setCartasJugador([ mazo.pop(), mazo.pop() ]);
		setCartasRival  ([ mazo.pop(), mazo.pop() ]);
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
	  
	
	useEffect(() => {
		const mazo = mazoRef.current;
	  
		if (ronda === RONDA.FLOP)   setCartasMesa([ mazo.pop(), mazo.pop(), mazo.pop() ]);
		if (ronda === RONDA.TURN)   setCartasMesa(m => [...m, mazo.pop()]);
		if (ronda === RONDA.RIVER)  setCartasMesa(m => [...m, mazo.pop()]);
		// SHOWDOWN: ya no se sacan cartas
	  }, [ronda]);
	  useEffect(() => {
		//Este useEffect se triggerea cuando cambia el turno
		
		if (turno !== "rival") return;
		//Al principio es mi turno luego esto, que es para la ia no afecta
		const delay = setTimeout(() => {
		  const necesitaIgualar = apuestaActual - apuestaRival;
			
		  // decidir acción
		  const r = Math.random();
		  if (necesitaIgualar > 0 && r < 0.1) {
			// 10 % fold
			
			setMensajeRival("Rival se retira");

			setMensajeFinal(
				<span>
				  🎉  ¡Tú ganas la ronda!
				</span>
			  );
			setRondaShowdown(true)

			  const nuevoJ = fichasJugador + pot;
			  setFichasJugador(nuevoJ);
			  checkGameOver(nuevoJ, fichasRival);   // 👈 añadido
			  setTimeout(() => {
				if (!gameOver) iniciarNuevaMano();
			  }, 2000);
			  
					return;
			}
	  
		  if (r < IA.PROB_RAISE) {
			const subida = IA.SUBIDA_MIN + Math.floor(Math.random() * (IA.SUBIDA_MAX - IA.SUBIDA_MIN));
			setApuesta(a => a + subida);
			apostarRival(necesitaIgualar + subida, "raise");
		  } else {
			const tipoAccion = necesitaIgualar > 0 ? "call" : "check";
  			apostarRival(necesitaIgualar, tipoAccion);
		  }
		  if (ronda !== RONDA.SHOWDOWN) {
			setTimeout(() => {
			  avanzarRonda(); // nueva función que define la transición
			}, 1500);
		  }
		}, 2000);
	  
		return () => clearTimeout(delay);
	  }, [turno]);

	useEffect(() => {
	if (ronda !== RONDA.SHOWDOWN) return;
		console.log("peta 1")
	const manoJ = evaluarMano([...cartasJugador, ...cartasMesa]);
	const manoR = evaluarMano([...cartasRival,   ...cartasMesa]);
		console.log("Peta 2")
	const nJ = manoJ.rank;
	const nR = manoR.rank;

	if (nJ > nR){
		const nuevoJ = fichasJugador + pot;
			
		setFichasJugador(nuevoJ);
		setTimeout(() => {
			setMensajeFinal(`🏆 ¡Tú ganas la ronda con ${manoJ.tipo}!`);
		}, 1500)
		
		setRondaShowdown(true)
		setTimeout(() => checkGameOver(nuevoJ, fichasRival), 2000); 
		
		
		
  }else if (nJ < nR){
	setMensajeFinal(`🤖 El rival gana la ronda con ${manoR.tipo}`);
	setRondaShowdown(true);
	const nuevoR = fichasRival + pot;
	setFichasRival(nuevoR);
	setTimeout(() => checkGameOver(fichasJugador, nuevoR), 2000); // 👈
  }else{
	setMensajeFinal(`🤝 ¡Empate! Ambos con ${manoJ.tipo}`);
	setRondaShowdown(true);
	const mitad = pot/2;
	const nuevoJ = fichasJugador + mitad;
	const nuevoR = fichasRival   + mitad;
	setFichasJugador(nuevoJ);
	setFichasRival(nuevoR);
	setTimeout(() => checkGameOver(nuevoJ, nuevoR), 2000); // 👈
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
	
	
	  function reiniciarPartida(){
		setFichasJugador(INICIAL_JUG);
		setFichasRival(INICIAL_RIV);
		setTimeout(() => {
		iniciarNuevaMano()}, 3000);
		setGameOver(false);
		setMensajeGO("");
	  }
	  function avanzarRonda() {
		setRonda(r => ({
		  preflop: "flop",
		  flop: "turn",
		  turn: "river",
		  river: "showdown",
		  showdown: "showdown"
		}[r]));
	  }
	  
	//Ahora mismo el único estable que se puede mutar es ficharJugador y pot
	/* --- función que SÍ existe --- */
	function handleAccion(tipo, cantidad = 0) {
		console.log("Acción:", tipo, "Cantidad:", cantidad);
		if (turno !== "jugador") return;              // no es tu turno
		//Esta es la función que gestiona las acciones que realiza el jugador
		//Para empezar necesitamos que se vea de quien es el turno
		switch (tipo) {
		  case "check":
			if (apuestaActual === apuestaJugador) setTurno("rival");
			break;
	  
		  case "call":
			apostarJugador(apuestaActual - apuestaJugador);
			break;
	  
		  case "raise":
			const subida = Math.max(cantidad, 1); // mínimo 1
			setApuesta(a => a + subida);
			apostarJugador(apuestaActual - apuestaJugador + subida);
			break;
	  
		  case "fold":
			// rival gana el bote
			setMensajeFinal("🏳️ El rival gana la ronda");
			setRondaShowdown(true);
			const nuevoR = fichasRival + pot;
			setFichasRival(nuevoR);
			resetApuestas();
			setRonda(RONDA.PREFLOP);
			setTurno("ninguno");
			setTimeout(() => {
				if (!gameOver) iniciarNuevaMano();
			  }, 4000);
			  
			checkGameOver(fichasJugador, nuevoR); 
			break;
	  
		  default:
			break;
		}
	}

	/* --- datos que enviamos a MesaPoker --- */
	const estado = {
		jugador: {
			nombre: "Tú",
			fichas: fichasJugador,
			cartas: cartasJugador,
			controles: <ControlesJugador onAccion={handleAccion} />,
		},
		rival: {
			nombre: "Rival",
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
		if (cantidad > fichasJugador) cantidad = fichasJugador;
		const resto = fichasJugador - cantidad;          // NUEVO
		setFichasJugador(resto);
		
		setApuJ(a => a + cantidad);
		setPot(p => p + cantidad);
		setTurno("rival");
		
	  }
	  function apostarRival(cantidad, tipo = "call") {
		if (cantidad > fichasRival) cantidad = fichasRival;
		
		const resto = fichasRival - cantidad;            // NUEVO
 		setFichasRival(resto);
		  
		//Se resta la apuesta
		setApuR(a => a + cantidad);
		setPot(p => p + cantidad);
		const mensaje =
		tipo === "raise" ? `Rival sube ${cantidad} fichas` :
		tipo === "call"  ? `Rival iguala la apuesta` :
		tipo === "check" ? `Rival pasa` :
		"";
	
	  if (mensaje) {
		setMensajeRival(mensaje);
		setTimeout(() => setMensajeRival(""), 2000);
	  }
	
	  setTurno("jugador");
	 
	  }
	  const comunitariasVisibles = ronda === RONDA.FLOP ? cartasMesa.slice(0,3)
	  : ronda === RONDA.TURN ? cartasMesa.slice(0,4)
	  : ronda === RONDA.RIVER || ronda === RONDA.SHOWDOWN
	  ? cartasMesa
	  : [];
	  function iniciarNuevaMano() {
		const nuevoMazo = barajar(generarMazo());
		mazoRef.current = nuevoMazo;
		setRondaShowdown(false);
		setCartasJugador([nuevoMazo.pop(), nuevoMazo.pop()]);
		setCartasRival([nuevoMazo.pop(), nuevoMazo.pop()]);
		setCartasMesa([]);
		setPot(0);
		setApuesta(0);
		setApuJ(0);
		setApuR(0);
		setMensajeFinal("");
		
		setMensajeRival("");
		setTurno("jugador");
		setTimeout(1000)
		setRonda(RONDA.PREFLOP);
		

	  }
	  
	return (
		<div className="poker-pagina">
		
		{fase === "inicio" || fase === "saliendo" ? (
		<div className={`intro-overlay ${fase === "saliendo" ? "fade-out" : ""}`}>
			<img src={introPoker} alt="Intro Poker" />
		</div>
		) : null}

		<div className="boton-menu-container">
		<button onClick={() => window.location.href = "/"}>Return to Menu</button>
		</div>
		{mensajeFinal && (
		<div className="mensaje-final">{mensajeFinal}</div>
		)}
		
		{/* ✅ Mensaje que flota sobre la mesa */}
		{mensajeRival && (
			<div className="mensaje-rival">{mensajeRival}</div>
		)}
		{gameOver && (
		<div className="overlay-go">
			<h2>{mensajeGO}</h2>
			<button onClick={reiniciarPartida}>Jugar otra vez</button>
			<button onClick={()=>window.location.href="/"}>Menú principal</button>
		</div>
		)}

		<div className={fase === "inicio" ? "poker-blur" : ""}>
		
		<MesaPoker {...estado} comunitarias={comunitariasVisibles} fase={fase} turno={turno} jugadaActualJugador={jugadaActualJugador} showdown={rondaShowdown}/>
		
		</div>
		<div className="boton-ronda-container">

	</div>
		</div>
		
	);
}

export default Poker;
