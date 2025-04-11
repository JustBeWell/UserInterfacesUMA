import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuPrincipal, BlackJack } from "./Paginas";
import Home from "./Paginas/Home"; // importa Home

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />         {/* 👈 ruta inicial */}
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/blackjack" element={<BlackJack />} />
        {/* más rutas aquí */}
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
