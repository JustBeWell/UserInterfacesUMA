import { GameCard } from "../../Componentes";
import "./Home.css";
import { ImagenBlackjack, ImagenPoker, ImagenSlots} from "../../imagenes/";
import { Link } from "react-router-dom";

function Home() {
	return (
		<main className="home-container">
			<header className="home-header">
				<nav className="top-nav">
					<Link to="/tienda">
						<button className="icon-btn" aria-label="Open Store" title="Store"></button>
					</Link>
					<Link to="/ajustes">
						<button className="icon-btn settings" aria-label="Settings" title="Settings"></button>
					</Link>
				</nav>

				<h1 className="home-title">
					Welcome to <strong>RoyalFlush</strong>
				</h1>
				<p className="home-subtitle">Where your dreams come true</p>
			</header>

			<section className="games-section" aria-label="Available Games">
				<GameCard image={ImagenBlackjack} alt="Blackjack" to="/blackjack" label="Play Blackjack" />
				<GameCard image={ImagenPoker} alt="Poker" to="/poker" label="Play Poker" />
				<GameCard image={ImagenSlots} alt="Slots" to="/slots" label="Play Slots" />
			</section>

			<footer className="home-footer">
				<div className="footer-icons">
					<img src="../../imagenes/iconos/juego-autorizado.png"/>
					<img src="../../imagenes/iconos/juego-seguro.png"/>
					<img src="../../imagenes/iconos/plus18.png"/>
				</div>
				<p>© 2025 RoyalFlush Casino</p>
</footer>
		</main>
	);
}

export default Home;
