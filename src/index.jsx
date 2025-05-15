import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Home,
  BlackJack,
  Ajustes,
  Slots,
  Poker,
  Tienda,
  MayoriaDeEdad,
  Login,
} from "./Paginas";

function App() {
  const [volumenEfectos, setVolumenEfectos] = useState(0.5);
  const [volumenMusica, setVolumenMusica] = useState(0.5);

  // 🧠 Obtenemos el usuario actual y sus datos
  const usuarioActual = localStorage.getItem("usuario");
  const usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};
  const datosUsuario = usuarios[usuarioActual] || { fichas: 1000, dinero: 100 };

  const [fichas, setFichas] = useState(datosUsuario.fichas);
  const [dinero, setDinero] = useState(datosUsuario.dinero);

  // 🔄 Cada vez que cambian fichas o dinero, actualizamos en localStorage
  useEffect(() => {
    if (!usuarioActual) return;

    const nuevosUsuarios = { ...usuarios };
    nuevosUsuarios[usuarioActual] = {
      ...nuevosUsuarios[usuarioActual],
      fichas,
      dinero,
    };

    localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
  }, [fichas, dinero]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <Home
              volumenEfectos={volumenEfectos}
              volumenMusica={volumenMusica}
              fichas={fichas}
              setFichas={setFichas}
            />
          }
        />
        <Route
          path="/blackjack"
          element={
            <BlackJack
              volumenEfectos={volumenEfectos}
              volumenMusica={volumenMusica}
              fichas={fichas}
              setFichas={setFichas}
            />
          }
        />
        <Route
          path="/slots"
          element={
            <Slots
              volumenEfectos={volumenEfectos}
              volumenMusica={volumenMusica}
              fichas={fichas}
              setFichas={setFichas}
            />
          }
        />
        <Route
          path="/ajustes"
          element={
            <Ajustes
              volumenEfectos={volumenEfectos}
              volumenMusica={volumenMusica}
              setVolumenEfectos={setVolumenEfectos}
              setVolumenMusica={setVolumenMusica}
            />
          }
        />
        <Route
          path="/poker"
          element={
            <Poker
              volumenEfectos={volumenEfectos}
              volumenMusica={volumenMusica}
            />
          }
        />
        <Route
          path="/tienda"
          element={
            <Tienda
              volumenEfectos={volumenEfectos}
              volumenMusica={volumenMusica}
              fichas={fichas}
              dinero={dinero}
              setDinero={setDinero}
              setFichas={setFichas}
            />
          }
        />
        <Route path="/mayoriaDeEdad" element={<MayoriaDeEdad />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
