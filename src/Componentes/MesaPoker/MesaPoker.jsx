import "./MesaPoker.css";
import Pot from "../Pot/Pot";
import CartasComunitarias from "../CartasComunitarias/CartasComunitarias";
import Jugador from "../Jugador/Jugador";

function MesaPoker({ jugador, rival, comunitarias, pot }) {
  return (
    <div className="mesa">
      <Pot cantidad={pot} />

      <Jugador posicion="top"    {...rival}   />
      <CartasComunitarias cartas={comunitarias} />
      <Jugador posicion="bottom" {...jugador} />
    </div>
  );
}
export default MesaPoker;
