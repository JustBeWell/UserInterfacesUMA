import "./MesaPoker.css";
import Pot from "../Pot/Pot";
import CartasComunitarias from "../CartasComunitarias/CartasComunitarias";
import Jugador from "../Jugador/Jugador";

function MesaPoker({ jugador, rival, comunitarias, pot, fase }) {
  return (
    <div className="mesa">
      <Pot cantidad={pot} />

      <Jugador posicion="top" {...rival} fase={fase} />
      <Jugador posicion="bottom" {...jugador} fase={fase}  />
      <CartasComunitarias cartas={comunitarias} fase={fase} />

    </div>
  );
}
export default MesaPoker;
