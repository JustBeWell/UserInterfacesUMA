// Poker.jsx

import { useState, useEffect, useRef } from "react";
import introPoker from "../../imagenes/Poker/introPoker.png";

import MesaPoker from "../../Componentes/MesaPoker/MesaPoker";
import ControlesJugador from "../../Componentes/ControlesJugador/ControlesJugador"; // <-- importa
import "./Poker.css";
import { evaluarMano,VAL, BASE , rankToNumber } from "../../utils/Poker/evaluador.js";
import {generarMazo, barajar} from "../../utils/Poker/mazo.js"



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
	const [apuestaActual, setApuesta] = useState(0);   // Apuesta 
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
	//Este useState sirve únicamente para girar las cartas del rival o no
	const [rondaShowdown, setRondaShowdown] = useState(false)

	//Gestion del avance de ronda
	const [accionJugador, setAccionJugador] = useState(null); // 'check', 'bet', 'call', 'raise'
	const [accionRival,   setAccionRival]   = useState(null);

	function checkGameOver(j, r){
	if (gameOver) return;
	if (j <= 0){
		setMensajeGO("😢 You los the game");
		setGameOver(true);
	} else if (r <= 0){
		setMensajeGO("🎉 You won the game!");
		setGameOver(true);
	}else{
		//El problema es que si esto se ejecuta en un fold, se lanza iniciarNuevaMano dos veces
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
	  
	
	 /* /////////////////////////////////////////////////////////////////
	 /* ////GESTIÓN CARTAS DE LA MESA AL ACTUALIZAR LA VARIABLE RONDA////
	 /*//////////////////////////////////////////////////////////////////
	 
	useEffect(() => {
		const mazo = mazoRef.current;
	  
		if (ronda === RONDA.FLOP)   setCartasMesa([ mazo.pop(), mazo.pop(), mazo.pop() ]);
		if (ronda === RONDA.TURN)   setCartasMesa(m => [...m, mazo.pop()]);
		if (ronda === RONDA.RIVER)  setCartasMesa(m => [...m, mazo.pop()]);
		// SHOWDOWN: ya no se sacan cartas
	  }, [ronda]);




	 /* ///////////////////////////////////////////////////
	 /* ////GESTIÓN DE LA IA DEL RIVAL Y SALTO DE RONDA////
	 /*////////////////////////////////////////////////////
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
			
			setMensajeRival("Rival folds");

			setMensajeFinal(
				<span>
				  🎉  ¡Yoy win the round
				</span>
			  );
			setRondaShowdown(true)

			  const nuevoJ = fichasJugador + pot;
			  setFichasJugador(nuevoJ);
			  //   // 👈 añadido
			  setTimeout(() => {
				checkGameOver(nuevoJ, fichasRival);
			  }, 2000);
			  
					return;
			}
	  
		  if (r < IA.PROB_RAISE) {
			const subida = IA.SUBIDA_MIN + Math.floor(Math.random() * (IA.SUBIDA_MAX - IA.SUBIDA_MIN));
			setApuesta(a => a + subida);
			apostarRival(necesitaIgualar + subida, "raise");
		  } else {
			const tipoAccion = necesitaIgualar > 0 ? "call" : "check";
			if (tipoAccion === "call") {
				apostarRival(necesitaIgualar, "call");  // ✅ hay algo que igualar
			} else {
				apostarRival(0, "check");               // ✅ sin apuesta = check
			}
		  }
		  //Es aquí donde estamos gestionando el cambio de ronda
		  if (ronda !== RONDA.SHOWDOWN) {
			/*setTimeout(() => {
			  avanzarRonda(); // nueva función que define la transición
			}, 1500);
			*/
			//Voy a intentar sustituir esto por un useEffect
		  }
		}, 2000);
	  
		return () => clearTimeout(delay);
	  }, [turno]);

	  /* //////////////////////////////
	/* ////GESTIÓN AVANCE DE RONDA////
	/*///////////////////////////////
	useEffect(() => {
		// 0) Si estamos en showdown o la mano terminó, no hagas nada
		if (ronda === RONDA.SHOWDOWN || gameOver) return;
	  
		// 1) Ambos han actuado
		const ambosActuaron = accionJugador && accionRival;
	  
		if (!ambosActuaron) return;
	  
		const ambosCheck   = accionJugador === "check" && accionRival === "check";
		const apuestaIgual = apuestaJugador === apuestaRival;
		const huboRaise    = accionJugador === "raise" || accionRival === "raise";
		
		// 2) Casos que hacen avanzar
		const pasarPorCheck = ambosCheck;                 // check / check
		const pasarPorCall  = apuestaIgual && (accionJugador === "call" || accionRival === "call"); // …call que iguala
	  
		if (pasarPorCheck || pasarPorCall) {
		  resetApuestas();            // limpia la mesa de apuestas
		  setAccionJugador(null);     // resetea acciones para la ronda siguiente
		  setAccionRival(null);
			
		  avanzarRonda()
		}
	  }, [accionJugador, accionRival,
		  apuestaJugador, apuestaRival,
		  ronda, gameOver]);
	  

	/* ////////////////////////////
	/* ////GESTIÓN DEL SHOWDOWN////
	/*////////////////////////////
	useEffect(() => {
	if (ronda !== RONDA.SHOWDOWN) return;
		
	const manoJ = evaluarMano([...cartasJugador, ...cartasMesa]);
	const manoR = evaluarMano([...cartasRival,   ...cartasMesa]);
		
	const nJ = manoJ.rank;
	const nR = manoR.rank;

	if (nJ > nR){
		const nuevoJ = fichasJugador + pot;
			
		setFichasJugador(nuevoJ);
		setMensajeFinal(`🏆 ¡You win the round with ${manoJ.tipo}!`);
		setRondaShowdown(true)
		
		
		
		
		checkGameOver(nuevoJ, fichasRival)
		
		
		
  }else if (nJ < nR){
	setMensajeFinal(`🤖 Villain wins the round with ${manoR.tipo}`);
	setRondaShowdown(true);
	const nuevoR = fichasRival + pot;
	setFichasRival(nuevoR);
	checkGameOver(fichasJugador, nuevoR) // 👈
  }else{
	setMensajeFinal(`🤝 ¡Empate! Ambos con ${manoJ.tipo}`);
	setRondaShowdown(true);
	const mitad = pot/2;
	const nuevoJ = fichasJugador + mitad;
	const nuevoR = fichasRival   + mitad;
	setFichasJugador(nuevoJ);
	setFichasRival(nuevoR);
	checkGameOver(nuevoJ, nuevoR) // 👈
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

            if (apuestaActual === apuestaJugador) {
                // If the player checks and has matched the current bet
				setAccionJugador("check");
				setTurno("rival");
            } else {
                setMensajeFinal("You cannot check, Either Call the bet 💰, Raise☝️ or Fold 🃏");
				setTimeout(() => {
					setMensajeFinal("");
				}, 2000);
            }
            break;
	  
		  case "call":
			 // solo tiene sentido si hay algo que igualar
			if (apuestaActual > apuestaJugador && apuestaActual != 0) {
		
				apostarJugador(apuestaActual - apuestaJugador);
				setAccionJugador("call");
			} else {
			setMensajeFinal("There is no bet to call. Use Check ✔️, Raise☝️ or Fold 🃏");
			setTimeout(() => setMensajeFinal(""), 2000);
			return;                   // evita pasar turno
			}	//Hacer call tiene sentido de esta manera cuando el rival haya apostado, por lo que hay que mejorar la gestión de paso de ronda
			break;
	  
		  case "raise":
			const subida = Math.max(cantidad, 1); // mínimo 1
			setApuesta(a => a + subida);
			apostarJugador(apuestaActual - apuestaJugador + subida);
			setAccionJugador("raise");
			//El raise funciona bien
			break;
	  
		  case "fold":
			// rival gana el bote
			setMensajeFinal("🏳️ El rival gana la ronda"); //Esto hace que se muestre en pantalla
			setRondaShowdown(true);//Muestro las cartas del rival
			const nuevoR = fichasRival + pot; //Actualizo las fichas del rival
			setFichasRival(nuevoR); //Solo hay que ajustar las fichas del rival, las apuestas y el pot se actualizan en iniciarNuevaMano() y 
			//la cantidad del jugador ya se ha quitado de su stack en apostarJugador()
			//Esto se elimina porque ya se llama en iniciar nueva mano resetApuestas();
			//Lo mismo ocurre con esto setRonda(RONDA.PREFLOP);
			//En principio esto podríamos quitarlo porque no afecta a nada
			
			//setTurno("ninguno");
			
			setTimeout(() => {
				checkGameOver(fichasJugador, nuevoR); 
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
			fichas: fichasJugador,
			cartas: cartasJugador,
			controles: <ControlesJugador onAccion={handleAccion} />,
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
		if (cantidad > fichasJugador) cantidad = fichasJugador;
		const resto = fichasJugador - cantidad;          // NUEVO
		setFichasJugador(resto);
		
		setApuJ(a => a + cantidad); //Cómo están tratando con useState, lo que hacen es coger el valor de la variable actual, 
		//en vez de acceder directamente a la variable de estado, en react usar la flecha garantiza que el estado de esa variable es el más actual
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
		tipo === "raise" ? `Villain raises ${cantidad} chips` :
		tipo === "call"  ? `Villain calls the bet` :
		tipo === "check" ? `Villain checks` :
		"";
		
	  if (mensaje) {
		setMensajeRival(mensaje);
		setTimeout(() => setMensajeRival(""), 2000);
	  }
	  setAccionRival(tipo); 
	  setTurno("jugador");
	 
	  }
	  const comunitariasVisibles = ronda === RONDA.FLOP ? cartasMesa.slice(0,3)
	  : ronda === RONDA.TURN ? cartasMesa.slice(0,4)
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
			
			resetApuestas()
			/*setApuesta(0);
			setApuJ(0);
			setApuR(0);
			*/
	
			setMensajeFinal("");
			
			setMensajeRival("");
			setTurno("jugador");
	
			setRonda(RONDA.PREFLOP);
			},1000);
		}, 3000)
		

		

	  }
	  
	return (
		<div className="poker-pagina">
		
		{fase === "inicio" || fase === "saliendo" ? (
		<div className={`intro-overlay ${fase === "saliendo" ? "fade-out" : ""}`}>
			<img src={introPoker} alt="Intro Poker" />
		</div>
		) : null}

		
		{mensajeFinal && (
		<div className="mensaje-final">{mensajeFinal}</div>
		)}
		{/*Aclarción sobre la sintaxis {condition && html}
			Los brackets nos permiten inyectar código de javaScript en html, cuando hacemos {condition && (html)} lo
			que estamos haciendo es, en caso de que lo primero sea true, devolvemos el componenteç
		 
		
		*/}


		{/* ✅ Mensaje que flota sobre la mesa */}
		{mensajeRival && (
			<div className="mensaje-rival">{mensajeRival}</div>
		)}
		
		{gameOver && (
			//Lo que hacemos aquí es cargar este componente si y solo si, gameOver está en true
		<div className="overlay-go">
			<h2>{mensajeGO}</h2>
			<button onClick={reiniciarPartida}>Jugar otra vez</button>
			<button onClick={()=>window.location.href="/"}>Menú principal</button>
		</div>
		)}

		<div className={fase === "inicio" ? "poker-blur" : ""}>
		
		<MesaPoker {...estado} comunitarias={comunitariasVisibles} fase={fase} turno={turno} jugadaActualJugador={jugadaActualJugador} showdown={rondaShowdown}/>
		<div className="boton-menu-container">
		<button onClick={() => window.location.href = "/"}>Return to Menu</button>
		</div>
		</div>
		<div className="boton-ronda-container">

	</div>
		</div>
		
	);
}


//En react solo puedo tener un componente que exporto con export default pero si que puedo tener varios componentes locales que devuelvan jsx dentro de un mismo archivo
export default Poker;
