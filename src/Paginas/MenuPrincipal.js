import { Link } from "react-router-dom";
function MenuPrincipal() {
	return (
		<div class="container">
			<p id="message-el">Want to play a round?</p>
			<div id="controls">
				<Link to="/blackjack">
					<button class="btn" id="start-game-btn" onclick="startGame()">
						START GAME
					</button>
				</Link>
			</div>
			<p id="player-el"></p>
		</div>
	);
}
export default MenuPrincipal;
