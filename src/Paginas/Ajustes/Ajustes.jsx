import "./Ajustes.css";
import { Link } from "react-router-dom";

function Ajustes({
	volumenEfectos,
	volumenMusica,
	reproducirEfecto,
	setVolumenEfectos,
	setVolumenMusica,
	setLectorPantalla,
	lectorPantalla,
	speak,
	cartasAlternativas,
	setCartasAlternativas,
}) {
	speak(
		"Welcome to the settings page. You can adjust the volume of effects and music, and enable or disable the screen reader."
	);
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
					aria-label="Volume Effects Slider"
					type="range"
					min="0"
					max="1"
					value={volumenEfectos}
					onChange={(e) => {
						setVolumenEfectos(e.target.value);
						reproducirEfecto("cartaBlackJack");
						localStorage.setItem("volumenEfectos", e.target.value);
					}}
					step={0.01}
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				/>
			</div>
			<div className="ajustes-mismaLinea">
				<p className="ajustes-texto">
					Music Volume: {Math.floor(volumenMusica * 100)}
				</p>
				<input
					className="ajustes-linea"
					aria-label="Music Volume Slider"
					type="range"
					min="0"
					max="1"
					value={volumenMusica}
					onChange={(e) => {
						setVolumenMusica(e.target.value);
						localStorage.setItem("volumenMusica", e.target.value);
					}}
					step={0.01}
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				/>
			</div>
			<div className="ajustes-mismaLinea">
				<p className="ajustes-texto">Screen Reader:</p>
				<input
					className="ajustes-checkbox"
					type="checkbox"
					aria-label="Screen Reader"
					checked={lectorPantalla}
					onChange={(e) => {
						setLectorPantalla(e.target.checked);
						localStorage.setItem("lectorPantalla", e.target.checked);
						if (e.target.checked) {
							speak("Screen reader enabled");
						} else {
							speak("Screen reader disabled");
						}
					}}
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				/>
			</div>
			<div className="ajustes-mismaLinea">
				<p className="ajustes-texto">Cartas accesibles:</p>
				<input
					className="ajustes-checkbox"
					type="checkbox"
					aria-label="Accessible Cards"
					checked={cartasAlternativas}
					onChange={(e) => {
						setCartasAlternativas(e.target.checked);
						localStorage.setItem("cartasAlternativas", e.target.checked);
						if (e.target.checked) {
							speak("Accessible cards enabled");
						} else {
							speak("Accessible cards disabled");
						}
					}}
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				/>
			</div>
			<Link to="/home" tabIndex={-1}>
				<button
					className="btn-top-left"
					aria-label="Return to Menu"
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				>
					Return to Menu
				</button>
			</Link>
		</div>
	);
}

export default Ajustes;
