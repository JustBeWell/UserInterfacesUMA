import { useState } from "react";
import { Carta } from "../Componentes";

function getRandomCard() {
	let randomNumber = Math.floor(Math.random() * 13) + 1;
	if (randomNumber > 10) {
		return 10;
	} else if (randomNumber === 1) {
		return 11;
	} else {
		return randomNumber;
	}
}
function BlackJack() {
	let [isAlive, setIsAlive] = useState(true);
	let [hasBlackJack, setHasBlackJack] = useState(false);
	let [cards, setCards] = useState([{ emoji: "🂠", value: 0 }]);
	function newCard() {
		if (isAlive && !hasBlackJack) {
			let card = getRandomCard();
			let copy = [...cards];
			copy.push({ emoji: "🂠", value: card });
			setCards(copy);
			if (copy.map((e) => e.value).reduce((a, b) => a + b) > 21) {
				setIsAlive(false);
			}
			if (copy.map((e) => e.value).reduce((a, b) => a + b) === 21) {
				setHasBlackJack(true);
			}
		}
	}
	return (
		<div className="container">
			<Carta rotada={true} naipe="♠" valor="A" inclinacion={0} />
		</div>
	);
}
export default BlackJack;
