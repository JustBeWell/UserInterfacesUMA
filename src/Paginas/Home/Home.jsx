import { GameCard } from "../../Componentes";
import "./Home.css";
import { ImagenBlackjack, ImagenPoker, ImagenSlots} from "../../imagenes/";
import { Link } from "react-router-dom";
import IconoAutorizado from "../../imagenes/iconos/juego-autorizado.png";
import IconoSeguro from "../../imagenes/iconos/juego-seguro.png";
import Icono18Plus from "../../imagenes/iconos/plus18.png";

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

				<div className="home-banner">
					<h1 className="home-title">
					Welcome to <strong>RoyalFlush</strong>
					</h1>
					<p className="home-subtitle">Where your dreams come true</p>
				</div>
				</header>
			<section className="games-section" aria-label="Available Games">
				<GameCard image={ImagenBlackjack} alt="Blackjack" to="/blackjack" label="Play Blackjack" />
				<GameCard image={ImagenPoker} alt="Poker" to="/poker" label="Play Poker" />
				<GameCard image={ImagenSlots} alt="Slots" to="/slots" label="Play Slots" />
			</section>

			<footer className="home-footer">
				<div className="footer-icons">
					<a href="https://www.ordenacionjuego.es/participantes-juego/juego-autorizado"><img src={IconoAutorizado}/></a>
					<a href="https://www.ordenacionjuego.es/participantes-juego/juego-seguro"><img src={IconoSeguro}/></a>
					<a href="https://www.pokerstars.es/about/responsible-gaming/?_gl=1*28jpiz*_up*MQ..*_gs*MQ..&gclid=Cj0KCQjw8vvABhCcARIsAOCfwwqFXVjNvsNJMUWJ0imgaw3TU1ok47OJY4PLd0imU-mLApzILhPNJxUaAlelEALw_wcB&gbraid=0AAAAADjJa3MHZtSpO3dpv-QYEvZfbSw13#verification"><img src={Icono18Plus}/></a>
				</div>
				<p>© 2025 RoyalFlush Casino</p>
</footer>
		</main>
	);
}

export default Home;
