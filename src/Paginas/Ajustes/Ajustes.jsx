import "./Ajustes.css";
import { Link } from "react-router-dom";
import { AudioAjustes } from "../../Componentes";
import { useEffect, useRef } from "react";

function Ajustes({
	volumenEfectos,
	volumenMusica,
	setVolumenEfectos,
	setVolumenMusica,
}) {
	const audioRef = useRef(null);
	useEffect(() => {
		const { reproducirMusica, pararMusica, audio } =
			AudioAjustes(volumenMusica);
		audioRef.current = { pararMusica, audio };

		const handleFirstInput = () => {
			reproducirMusica();
			window.removeEventListener("pointerdown", handleFirstInput);
			window.removeEventListener("keydown", handleFirstInput);
		};

		window.addEventListener("pointerdown", handleFirstInput);
		window.addEventListener("keydown", handleFirstInput);

		return () => {
			pararMusica();
			window.removeEventListener("pointerdown", handleFirstInput);
			window.removeEventListener("keydown", handleFirstInput);
		};
	}, [volumenMusica]);
	return (
		<div className="ajustes-container">
			<div className="ajustes-header">
				<h1>SETTINGS</h1>
			</div>
			<div className="ajustes-mismaLinea">
				<p className="ajustes-texto">
					Effects Volume: {Math.floor(volumenEfectos * 100)}
				</p>
				<input
					className="ajustes-linea"
					type="range"
					min="0"
					max="1"
					value={volumenEfectos}
					onChange={(e) => setVolumenEfectos(e.target.value)}
					step={0.01}
				/>
			</div>
			<div className="ajustes-mismaLinea">
				<p className="ajustes-texto">
					Music Volume: {Math.floor(volumenMusica * 100)}
				</p>
				<input
					className="ajustes-linea"
					type="range"
					min="0"
					max="1"
					value={volumenMusica}
					onChange={(e) => setVolumenMusica(e.target.value)}
					step={0.01}
				/>
			</div>
			<Link to="/">
				<button className="btn-top-left">Return to Menu</button>
			</Link>
		</div>
	);
}

export default Ajustes;
