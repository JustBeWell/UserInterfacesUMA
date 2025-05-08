import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, BlackJack, Ajustes, Slots, Poker, Tienda } from "./Paginas";

function App() {
	const [volumen, setVolumen] = useState(0.5);
	const [dinero, setDinero] = useState(100);
	const [fichas, setFichas] = useState(1000);
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home volumen={volumen} />} />
				<Route
					path="/blackjack"
					element={
						<BlackJack
							volumen={volumen}
							fichas={fichas}
							setFichas={setFichas}
						/>
					}
				/>
				<Route path="/slots" element={<Slots volumen={volumen} />} />
				<Route
					path="/ajustes"
					element={<Ajustes volumen={volumen} setVolumen={setVolumen} />}
				/>
				<Route path="/poker" element={<Poker volumen={volumen} />} />
				<Route
					path="/tienda"
					element={
						<Tienda
							volumen={volumen}
							fichas={fichas}
							dinero={dinero}
							setDinero={setDinero}
							setFichas={setFichas}
						/>
					}
				/>
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
