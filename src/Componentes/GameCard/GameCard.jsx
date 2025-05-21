// src/Componentes/GameCard.js
import { Link } from "react-router-dom";
import "./GameCard.css"; // o usa Tailwind si prefieres

function GameCard({ image, alt, to, label, speak }) {
	return (
		<div className="game-card">
			<img src={image} alt={alt} />
			<Link to={to} tabIndex={-1}>
				<button
					className="btn"
					aria-label={label}
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				>
					{label}
				</button>
			</Link>
		</div>
	);
}

export default GameCard;
