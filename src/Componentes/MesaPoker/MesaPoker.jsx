import "./MesaPoker.css";
import Pot from "../Pot/Pot";
import CartasComunitarias from "../CartasComunitarias/CartasComunitarias";
import Jugador from "../Jugador/Jugador";

function MesaPoker({ jugador, rival, comunitarias, pot, fase, turno}) {
  return (
    <div className="mesa">
      <Pot cantidad={pot} />

      <Jugador posicion="top" {...rival} fase={fase} turno={turno === "rival"} />
      <Jugador posicion="bottom" {...jugador} fase={fase}  turno={turno === "jugador"}/>
      <CartasComunitarias cartas={comunitarias} fase={fase} />

    </div>
  );
}
export default MesaPoker;
