// Poker.jsx

import { useState, useEffect, useRef } from "react";
import introPoker from "../../imagenes/Poker/introPoker.png";

import MesaPoker from "../../Componentes/MesaPoker/MesaPoker";
import ControlesJugador from "../../Componentes/ControlesJugador/ControlesJugador"; // <-- importa
import "./Poker.css";

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
	
	const [mensajeRival, setMensajeRival] = useState("");

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
		const timer = setTimeout(() => {
			setFase("juego");
		}, 2000); // o el tiempo que prefieras
	
		return () => clearTimeout(timer);
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
			setFichasJugador(f => f + pot);
			resetApuestas();
			setRonda(RONDA.PREFLOP);
			setTurno("jugador");
			return;
		  }
	  
		  if (r < IA.PROB_RAISE) {
			const subida = IA.SUBIDA_MIN + Math.floor(Math.random() * (IA.SUBIDA_MAX - IA.SUBIDA_MIN));
			setApuesta(a => a + subida);
			apostarRival(necesitaIgualar + subida);
		  } else {
			apostarRival(necesitaIgualar); // call / check
		  }
		  if (ronda !== RONDA.SHOWDOWN) {
			setTimeout(() => {
			  avanzarRonda(); // nueva función que define la transición
			}, 1500);
		  }
		}, 2000);
	  
		return () => clearTimeout(delay);
	  }, [turno]);
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
			setFichasRival(f => f + pot);
			resetApuestas();
			setRonda(RONDA.PREFLOP);
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
		setFichasJugador(f => f - cantidad);
		setApuJ(a => a + cantidad);
		setPot(p => p + cantidad);
		setTurno("rival");
	  }
	  function apostarRival(cantidad) {
		if (cantidad > fichasRival) cantidad = fichasRival;
		
		setFichasRival(f => f - cantidad);
		//Se resta la apuesta
		setApuR(a => a + cantidad);
		setPot(p => p + cantidad);
		setMensajeRival(`Rival apuesta ${cantidad} fichas`);
		setTimeout(() => setMensajeRival(""), 2000);

		
		//Se actua
		setTurno("jugador");
	  }
	  const comunitariasVisibles = ronda === RONDA.FLOP ? cartasMesa.slice(0,3)
	  : ronda === RONDA.TURN ? cartasMesa.slice(0,4)
	  : ronda === RONDA.RIVER || ronda === RONDA.SHOWDOWN
	  ? cartasMesa
	  : [];

	return (
		<div className="poker-pagina">
		
		{fase === "inicio" && (
		<div className="intro-overlay">
			<img src={introPoker} alt="Intro Poker" />

		</div>
		)}

		{/* ✅ Mensaje que flota sobre la mesa */}
		{mensajeRival && (
			<div className="mensaje-rival">{mensajeRival}</div>
		)}

		<div className={fase === "inicio" ? "poker-blur" : ""}>
		
		<MesaPoker {...estado} comunitarias={comunitariasVisibles} fase={fase} turno={turno}/>
		
		</div>
		<div className="boton-ronda-container">

	</div>
		</div>
		
	);
}

export default Poker;
