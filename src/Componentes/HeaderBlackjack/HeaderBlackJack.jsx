import { Link } from "react-router-dom";
import "./HeaderBlackjack.css"; // Asegúrate de tener estilos separados

function HeaderBlackjack({ chips, betAmount, mensaje, speak }) {
	return (
		<header className="header-blackjack">
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
			<p className="instruction">
				<strong>Goal:</strong> Reach 21 without going over.
			</p>
			<p className="instruction">
				<strong>Step 1:</strong> Enter your bet using the input below.
			</p>
			<p className="instruction">
				<strong>Step 2:</strong> Press <em>Start Game</em> to receive your
				cards.
			</p>
			<p className="instruction">
				<strong>Step 3:</strong> Choose <em>Hit</em> to take another card, or{" "}
				<em>Stand</em> to finish.
			</p>
		</header>
	);
}

export default HeaderBlackjack;
