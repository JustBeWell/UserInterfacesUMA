// src/Componentes/Pot/Pot.jsx
import fichaAzul from "../../imagenes/fichaAzul.png";   // ✅

// si prefieres seguir tu patrón ↓
// const fichaAzul = new URL("../../imagenes/fichaAzul.png", import.meta.url).href;

import "./Pot.css";   // añadiremos estilos ahora

function Pot({ cantidad }) {
  return (
    <div className="pot">
      <img src={fichaAzul} alt="ficha azul" className="pot-ficha" />
      <span>{cantidad}</span>
    </div>
  );
}
export default Pot;
