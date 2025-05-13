import React, { useState } from "react";
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
} from "./Paginas";

function App() {
	const [volumenEfectos, setVolumenEfectos] = useState(0.5);
	const [volumenMusica, setVolumenMusica] = useState(0.5);
	const [dinero, setDinero] = useState(100);
	const [fichas, setFichas] = useState(1000);
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							volumenEfectos={volumenEfectos}
							volumenMusica={volumenMusica}
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
