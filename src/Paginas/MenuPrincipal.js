import { Link } from "react-router-dom";
function MenuPrincipal() {
	return (
		<div className="container">
			<p id="message-el">Want to play a round?</p>
			<div id="controls">
				<Link to="/blackjack">
					<button className="btn" id="start-game-btn" onClick="startGame()">
						START GAME
					</button>
				</Link>
			</div>
			<p id="player-el"></p>
		</div>
	);
}
export default MenuPrincipal;
