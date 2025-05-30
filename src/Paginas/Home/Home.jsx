import { GameCard } from "../../Componentes";
import "./Home.css";
import { ImagenBlackjack, ImagenPoker, ImagenSlots } from "../../imagenes/";
import { Link } from "react-router-dom";
import IconoAutorizado from "../../imagenes/iconos/juego-autorizado.png";
import IconoSeguro from "../../imagenes/iconos/juego-seguro.png";
import Icono18Plus from "../../imagenes/iconos/plus18.png";
import { useState } from "react";

function Home({ speak, fichas }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [resultadoFinal, setResultadoFinal] = useState("");

	function handleClick(e) {
		if (fichas === 0) {
			e.preventDefault();
			setResultadoFinal("You need chips to play. Go to the store to buy more.");
			setModalVisible(true);
			speak("You need chips to play. Go to the store to buy more.");
		}
	}

	return (
		<main className="home-container">
			<header className="home-header">
				<nav className="top-nav">
					<Link to="/tienda" tabIndex={-1}>
						<button
							className="icon-btn"
							aria-label="Open Store"
							title="Store"
							onMouseEnter={(e) =>
								speak(e.currentTarget.getAttribute("aria-label"))
							}
							onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
						></button>
					</Link>
					<Link to="/ajustes" tabIndex={-1}>
						<button
							className="icon-btn settings"
							aria-label="Settings"
							title="Settings"
							onMouseEnter={(e) =>
								speak(e.currentTarget.getAttribute("aria-label"))
							}
							onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
						></button>
					</Link>
				</nav>

				<div className="home-banner">
					<h1 className="home-title">
						Welcome to <strong>RoyalFlush</strong>
					</h1>
					<p className="home-subtitle">Where your dreams come true</p>
				</div>
			</header>
			<section className="games-section" aria-label="Available Games">
				<GameCard
					image={ImagenBlackjack}
					alt="Blackjack"
					to="/blackjack"
					label="Play Blackjack"
					speak={speak}
					handleClick={handleClick}
				/>
				<GameCard
					image={ImagenPoker}
					alt="Poker"
					to="/poker"
					label="Play Poker"
					speak={speak}
					handleClick={handleClick}
				/>
				<GameCard
					image={ImagenSlots}
					alt="Slots"
					to="/slots"
					label="Play Slots"
					speak={speak}
					handleClick={handleClick}
				/>
			</section>

			{resultadoFinal && (
				<div className={`modal-overlay ${!modalVisible ? "fade-out" : ""}`}>
					<div className="modal-content modal-lose">
						<p>{resultadoFinal}</p>
						<button
							className="btn"
							onClick={() => {
								setModalVisible(false);
								setTimeout(() => setResultadoFinal(""), 400);
							}}
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

			<footer className="home-footer">
				<div className="footer-icons">
					<a
						href="https://www.ordenacionjuego.es/participantes-juego/juego-autorizado"
						aria-label="Authorized Game"
						alt="Authorized Game"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						<img src={IconoAutorizado} />
					</a>
					<a
						href="https://www.ordenacionjuego.es/participantes-juego/juego-seguro"
						aria-label="Safe Game"
						alt="Safe Game"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						<img src={IconoSeguro} />
					</a>
					<Link
						to="/mayoriaDeEdad"
						aria-label="+18"
						alt="+18"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						<img src={Icono18Plus} />
					</Link>
				</div>
				<p>© 2025 RoyalFlush Casino</p>
			</footer>
		</main>
	);
}

export default Home;
