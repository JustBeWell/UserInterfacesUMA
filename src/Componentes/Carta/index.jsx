import { useEffect, useState } from "react";
import "./carta.css";

// Imports correctos
import A from "../../imagenes/Diamante/A.png";
import Dos from "../../imagenes/Diamante/2.png";
import Tres from "../../imagenes/Diamante/3.png";
import Cuatro from "../../imagenes/Diamante/4.png";
import Cinco from "../../imagenes/Diamante/5.png";
import Seis from "../../imagenes/Diamante/6.png";
import Siete from "../../imagenes/Diamante/7.png";
import Ocho from "../../imagenes/Diamante/8.png";
import Nueve from "../../imagenes/Diamante/9.png";
import Diez from "../../imagenes/Diamante/10.png";
import J from "../../imagenes/Diamante/J.png";
import Q from "../../imagenes/Diamante/Q.png";
import K from "../../imagenes/Diamante/K.png";
import CartaPorDetras from "../../imagenes/CartaPorDetras.png";

// Mapa de imágenes
const imagenesCartas = {
  "A": A,
  "2": Dos,
  "3": Tres,
  "4": Cuatro,
  "5": Cinco,
  "6": Seis,
  "7": Siete,
  "8": Ocho,
  "9": Nueve,
  "10": Diez,
  "J": J,
  "Q": Q,
  "K": K
};

function Carta({ rotada, naipe, valor, inclinacion, nueva, girarSolo }) {
  const [mostrarCarta, setMostrarCarta] = useState(rotada || nueva || girarSolo);

  useEffect(() => {
    if (nueva) {
      const timer = setTimeout(() => {
        setMostrarCarta(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (girarSolo) {
      const timer = setTimeout(() => {
        setMostrarCarta(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [nueva, girarSolo]);

  const valorCorregido = valor === "As" ? "A" : valor;

  const imagen = mostrarCarta
    ? CartaPorDetras
    : imagenesCartas[valorCorregido] || CartaPorDetras;

  return (
    <div
      className={`carta ${nueva ? "carta-nueva" : ""} ${girarSolo ? "carta-giro" : ""}`}
      style={{
        transform: `rotate(${inclinacion}deg)`,
        backgroundImage: `url(${imagen})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100px",
        height: "140px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
      }}
    ></div>
  );
}

export default Carta;
