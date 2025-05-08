import GameCard from "../Componentes/GameCard/GameCard";
import "./Home.css";
import imagenBlackjack from "../imagenes/MenuPrincipal/ImagenBlackjack.png";
import imagenPoker from "../imagenes/MenuPrincipal/ImagenPoker.png";
import { Link } from "react-router-dom";

function Home() {
	return (
		<div className="home-container">
			<header className="home-header">
				<Link to="/ajustes">
					<button className="btn-top-right"></button>
				</Link>
				<Link to="/tienda">
					<button className="btn-top-right-store"></button>
				</Link>
				<h1>
					Welcome to <strong>RoyalFlush</strong>
				</h1>
				<p>Where your dreams come true</p>
			</header>

			<div className="games-section">
				<GameCard
					image={imagenBlackjack}
					alt="Blackjack"
					to="/blackjack"
					label="Play Blackjack"
				/>
				<GameCard
					image={imagenPoker}
					alt="Poker"
					to="/poker"
					label="Play Poker"
				/>
				<GameCard
					image={imagenPoker}
					alt="Slots"
					to="/slots"
					label="Play Slots"
				/>
			</div>
		</div>
	);
}

export default Home;
