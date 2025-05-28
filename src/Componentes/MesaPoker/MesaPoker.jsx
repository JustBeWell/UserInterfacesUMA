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
			/>
			<Jugador
				posicion="bottom"
				{...jugador}
				fase={fase}
				turno={turno === "jugador"}
				cartasAlternativas={cartasAlternativas}
			/>

			<CartasComunitarias
				cartas={comunitarias}
				fase={fase}
				cartasAlternativas={cartasAlternativas}
			/>
		</div>
	);
}
export default MesaPoker;
