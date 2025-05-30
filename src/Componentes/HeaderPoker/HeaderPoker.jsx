import { Link } from "react-router-dom";
import "./HeaderPoker.css";

function HeaderSlots({ speak }) {
	return (
		<header className="header-poker">
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
		</header>
	);
}

export default HeaderPoker;