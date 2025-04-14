import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuPrincipal, BlackJack, Ajustes } from "./Paginas";
import Home from "./Paginas/Home"; // importa Home
import Slots from "./Paginas/Slots"; // importa Slots


function App() {
  const [volumen, setVolumen] = useState(0.5);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home volumen={volumen} />} />
        <Route path="/menu" element={<MenuPrincipal volumen={volumen} />} />
        <Route path="/blackjack" element={<BlackJack volumen={volumen} />} />
        <Route path="/slots" element={<Slots volumen={volumen} />} />
        <Route path="/ajustes" element={<Ajustes volumen={volumen} setVolumen = {setVolumen}/>} />
        {/* más rutas aquí */}
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
