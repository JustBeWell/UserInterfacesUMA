import "./MesaPoker.css";
import Pot from "../Pot/Pot";
import CartasComunitarias from "../CartasComunitarias/CartasComunitarias";
import Jugador from "../Jugador/Jugador";

function MesaPoker({ jugador, rival, comunitarias, pot, fase, turno, jugadaActualJugador, showdown}) {
  return (
    <div className="mesa">
            {jugadaActualJugador && (
      <div className="jugada-encima">
        🃏 {jugadaActualJugador}
      </div>
    )}
      <Pot cantidad={pot} />

      <Jugador posicion="top" {...rival} fase={fase} turno={turno === "rival"} showdown={showdown}   />
      <Jugador posicion="bottom" {...jugador} fase={fase}  turno={turno === "jugador"} />
     

      <CartasComunitarias cartas={comunitarias} fase={fase} />
     



    </div>
  );
}
export default MesaPoker;
