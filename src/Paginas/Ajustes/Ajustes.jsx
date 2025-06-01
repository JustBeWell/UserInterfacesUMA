import "./Ajustes.css";
import { Link } from "react-router-dom";
import {useState, useEffect} from "react"
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
	const [modalVisible, setModalVisible] = useState(false);
	const [mensajeModal, setMensajeModal] = useState("");

	speak(
		"Welcome to the settings page. You can adjust the volume of effects and music, and enable or disable the screen reader."
	);
	const cerrarModal = () => {
    setModalVisible(false);
    setTimeout(() => setMensajeModal(""), 400);
  	};
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
				<p className="ajustes-texto">Accesible Cards:</p>
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
			<div className="ajustes-mismaLinea">
				<p className="ajustes-texto">Tutorials:</p>
				<button
					className="reiniciar-tutorial-button"
					type="button"
					aria-label="Restart Tutorials"
					onClick={() => {
						const usuario = localStorage.getItem("usuario");
						if (usuario) {
							if (
								sessionStorage.getItem(`pokerTutorialShown_${usuario}`) ==
								"true"
							) {
								sessionStorage.removeItem(`pokerTutorialShown_${usuario}`);
							}
							if (
								sessionStorage.getItem(`blackjackTutorialShown_${usuario}`) ==
								"true"
							) {
								sessionStorage.removeItem(`blackjackTutorialShown_${usuario}`);
							}
							if (
								sessionStorage.getItem(`slotsTutorialShown_${usuario}`) ==
								"true"
							) {
								sessionStorage.removeItem(`slotsTutorialShown_${usuario}`);
							}
						}
						speak("Tutorials restarted");

						setMensajeModal("¡Tutorials have been restarted!");
            			setModalVisible(true);
					}}
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				>
					Restart Tutorials
				</button>
			</div>
				
			{mensajeModal && (
				<div className={`modal-overlay ${!modalVisible ? "fade-out" : ""}`}>
				<div className="modal-content modal-success">
					<p>{mensajeModal}</p>
					<button
					className="btn"
					onClick={cerrarModal}
					aria-label="Close popup"
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
					OK
					</button>
				</div>
				</div>
			)}	
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
