import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuPrincipal, BlackJack } from "./Paginas";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<MenuPrincipal />}></Route>
				<Route path="/blackjack" element={<BlackJack />}></Route>
			</Routes>
		</BrowserRouter>
	</React.StrictMode>
);
