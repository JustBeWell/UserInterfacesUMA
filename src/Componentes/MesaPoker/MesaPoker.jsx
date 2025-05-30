import "./MesaPoker.css";
import Pot from "../Pot/Pot";
import CartasComunitarias from "../CartasComunitarias/CartasComunitarias";
import Jugador from "../Jugador/Jugador";

function MesaPoker({
	jugador,
	rival,
	comunitarias,
	pot,
	fase,
	turno,
	jugadaActualJugador,
	showdown,
	cartasAlternativas,
	reproducirEfecto,
}) {
	return (
		<div className="mesa">
			{jugadaActualJugador && (
				<div className="jugada-encima">🃏 {jugadaActualJugador}</div>
			)}
			<Pot cantidad={pot} />

			<Jugador
				posicion="top"
				{...rival}
				fase={fase}
				turno={turno === "rival"}
				showdown={showdown}
				cartasAlternativas={cartasAlternativas}
				reproducirEfecto={reproducirEfecto}
			/>
			<Jugador
				posicion="bottom"
				{...jugador}
				fase={fase}
				turno={turno === "jugador"}
				cartasAlternativas={cartasAlternativas}
				reproducirEfecto={reproducirEfecto}
			/>

			<CartasComunitarias
				cartas={comunitarias}
				fase={fase}
				cartasAlternativas={cartasAlternativas}
				reproducirEfecto={reproducirEfecto}
			/>
		</div>
	);
}
export default MesaPoker;
