import { useEffect, useState } from "react";
import CartaPorDetras from "../../imagenes/CartaPorDetras.png";
import "./CartaPoker.css";

function formatearNombreArchivo(valor, palo) {
  const valorMapeado = {
    "A": "ace",
    "J": "jack",
    "Q": "queen",
    "K": "king"
  };

  const v = valorMapeado[valor] || valor;
  return `${v}_of_${palo.toLowerCase()}.png`;
}

function CartaPoker({ carta, rotada = false, inclinacion = 0, nueva = false, girarSolo = false }) {
  const [mostrarCarta, setMostrarCarta] = useState(rotada || nueva || girarSolo);

  useEffect(() => {
    if (nueva || girarSolo) {
      const tiempo = nueva ? 1000 : 500;
      const timer = setTimeout(() => setMostrarCarta(false), tiempo);
      return () => clearTimeout(timer);
    }
  }, [nueva, girarSolo]);

  const nombreArchivo = formatearNombreArchivo(carta.valor, carta.palo);

  const rutaImagen = new URL(
    `../../imagenes/cartasMazoNormal/Playing Cards/PNG-cards-1.3/${nombreArchivo}`,
    import.meta.url
  ).href;

  const imagen = mostrarCarta ? CartaPorDetras : rutaImagen;

  return (
    <div
      className={`carta ${nueva ? "carta-nueva" : ""} ${girarSolo ? "carta-giro" : ""}`}
      style={{
        transform: `rotate(${inclinacion}deg)`,
        backgroundImage: `url(${imagen})`
      }}
    ></div>
  );
}

export default CartaPoker;
