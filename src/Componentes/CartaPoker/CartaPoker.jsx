import { useEffect, useState } from "react";
import CartaPorDetras from "../../imagenes/CartaPorDetras.png";
import "./CartaPoker.css";

function formatearRutaCarta(valor, palo) {


  const carpeta = palo;
  return `../../imagenes/${carpeta}/${valor}.png`;
}


function CartaPoker({ carta, inclinacion = 0, nueva = false, girarSolo = false,  villain = false, showdown = false}) {
  // 1. Estado inicial
const [mostrarCarta, setMostrarCarta] = useState(false); // siempre empieza boca abajo
const [visible, setVisible] = useState(false);

useEffect(() => {
  const timer = setTimeout(() => setVisible(true), 10); // pequeño retraso para montar
  return () => clearTimeout(timer);
}, []);


// 2. Forzamos que si es rival, nunca se muestre la delantera

  const [montado, setMontado] = useState(false);
  // y depende de si está rotada, de si es nueva y de si girar solo, si alguna está true se muestra boca a abajo
  const rutaImagen = new URL(formatearRutaCarta(carta.valor, carta.palo), import.meta.url).href;

  useEffect(() => {
    if (girarSolo && montado && !villain)  {
      const timer = setTimeout(() => setMostrarCarta(true), 1000); // o el tiempo que prefieras
      return () => clearTimeout(timer);
    }
  }, [girarSolo, montado, villain]);

  useEffect(() => {
    if (showdown)  {
      const timer = setTimeout(() => setMostrarCarta(true), 1000); // o el tiempo que prefieras
      return () => clearTimeout(timer);
    }else{
      const timer = setTimeout(() => setMostrarCarta(false), 0); // o el tiempo que prefieras
      return () => clearTimeout(timer);
    }
  }, [showdown]);
  useEffect(() => {
    setMontado(true);
  }, []);



 
 

  return (
    <div
      className={`carta-wrapper ${nueva ? "carta-nueva" : ""} ${visible ? "visible" : ""}`}
      style={{ transform: `rotate(${inclinacion}deg)` }}
    >
      <div className={`carta ${mostrarCarta ? "girada" : ""}`}>



        <div className="cara cara-trasera" style={{ backgroundImage: `url(${CartaPorDetras})` }} />
        <div className="cara cara-delantera" style={{ backgroundImage: `url(${rutaImagen})` }} />
      </div>
    </div>
  );
  
}

export default CartaPoker;
