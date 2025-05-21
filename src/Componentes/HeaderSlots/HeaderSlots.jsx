import { Link } from "react-router-dom";
import "./HeaderSlots.css";

function HeaderSlots({ speak }) {
	return (
		<header className="header-slots">
			<Link to="/home" tabIndex={-1}>
				<button
					className="btn-top-left"
					aria-label="Return to menu"
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				>
					Return to Menu
				</button>
			</Link>

			<section className="instructions">
				<p className="instruction">
					<strong> Objective:</strong> Match symbols to win tokens!
				</p>
				<p className="instruction">
					<strong> Step 1:</strong> Set your bet and press <em>Spin</em>.
				</p>
				<p className="instruction">
					<strong> Step 2:</strong> Win multipliers based on the result!
				</p>
			</section>
		</header>
	);
}

export default HeaderSlots;
