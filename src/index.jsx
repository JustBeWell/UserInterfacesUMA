import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
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
import AudioManager from "./Componentes/Sonido/AudioManager";

function App() {
	const location = useLocation();
	const [volumenEfectos, setVolumenEfectos] = useState(
		localStorage.getItem("volumenEfectos") || 0.5
	);
	const [volumenMusica, setVolumenMusica] = useState(
		localStorage.getItem("volumenMusica") || 0.01
	);
	const [lectorPantalla, setLectorPantalla] = useState(
		localStorage.getItem("lectorPantalla") == null
			? false
			: localStorage.getItem("lectorPantalla")
	);

	// Estado para controlar si ya hubo un primer click
	const [primerClick, setPrimerClick] = useState(false);

	useEffect(() => {
		if (primerClick) return; // Solo agregar el listener si aún no hubo click
		const handleFirstClick = () => {
			setPrimerClick(true);
			window.removeEventListener("pointerdown", handleFirstClick);
			window.removeEventListener("keydown", handleFirstClick);
		};
		window.addEventListener("pointerdown", handleFirstClick);
		window.addEventListener("keydown", handleFirstClick);
		return () => {
			window.removeEventListener("pointerdown", handleFirstClick);
			window.removeEventListener("keydown", handleFirstClick);
		};
	}, [primerClick]);

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
	const { reproducirMusica, reproducirEfecto, pararTodo, speak } = AudioManager(
		{
			volumenMusica,
			volumenEfectos,
			lectorPantalla,
		}
	);

	useEffect(() => {
		if (!primerClick) return; // Esperar al primer click
		const rutaAMusica = {
			"/home": "menu",
			"/blackjack": "blackjack",
			"/slots": "slots",
			"/ajustes": "ajustes",
			"/tienda": "tienda",
		};
		const pista = rutaAMusica[location.pathname];
		if (pista) reproducirMusica(pista);
		return () => {
			pararTodo();
		};
	}, [location, primerClick]);

	return (
		<Routes>
			<Route path="/" element={<Login speak={speak} />} />
			<Route path="/home" element={<Home speak={speak} />} />
			<Route
				path="/blackjack"
				element={
					<BlackJack
						reproducirEfecto={reproducirEfecto}
						fichas={fichas}
						setFichas={setFichas}
						speak={speak}
					/>
				}
			/>
			<Route
				path="/slots"
				element={
					<Slots
						reproducirEfecto={reproducirEfecto}
						fichas={fichas}
						setFichas={setFichas}
						speak={speak}
					/>
				}
			/>
			<Route
				path="/ajustes"
				element={
					<Ajustes
						volumenEfectos={volumenEfectos}
						volumenMusica={volumenMusica}
						reproducirEfecto={reproducirEfecto}
						setVolumenEfectos={setVolumenEfectos}
						setVolumenMusica={setVolumenMusica}
						speak={speak}
						setLectorPantalla={setLectorPantalla}
						lectorPantalla={lectorPantalla}
					/>
				}
			/>
			<Route
				path="/poker"
				element={
					<Poker
						reproducirEfecto={reproducirEfecto}
						fichas={fichas}
						setFichas={setFichas}
						speak={speak}
					/>
				}
			/>
			<Route
				path="/tienda"
				element={
					<Tienda
						reproducirEfecto={reproducirEfecto}
						fichas={fichas}
						dinero={dinero}
						setDinero={setDinero}
						setFichas={setFichas}
						speak={speak}
					/>
				}
			/>
			<Route path="/mayoriaDeEdad" element={<MayoriaDeEdad />} />
		</Routes>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);
