import "./Ajustes.css";
import { Link } from "react-router-dom";

function Ajustes({
	volumenEfectos,
	volumenMusica,
	reproducirEfecto,
	setVolumenEfectos,
	setVolumenMusica,
}) {
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
					onChange={(e) => {
						setVolumenEfectos(e.target.value);
						reproducirEfecto("cartaBlackJack");
					}}
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
			<Link to="/home">
				<button className="btn-top-left">Return to Menu</button>
			</Link>
		</div>
	);
}

export default Ajustes;
