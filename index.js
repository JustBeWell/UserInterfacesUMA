let player = {
	name: "Yassine",
	chips: 120,
};
let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";
let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");
playerEl.textContent = player.name + ": $" + player.chips;
let dealerCards = [];

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

function startGame() {
	isAlive = true;
	let firstCard = getRandomCard();
	let secondCard = getRandomCard();
	cards = [firstCard, secondCard];
	sum = firstCard + secondCard;
	dealerCards = [getRandomCard(), getRandomCard()];
	document.getElementById("start-game-btn").style.display = "none";
	document.getElementById("new-card-btn").style.display = "inline-block";
	document.getElementById("stop-btn").style.display = "inline-block";
	document.getElementById("dealer-cards-el").style.display = "block";
	document.getElementById("dealer-first-card").textContent = dealerCards[0];
	document.getElementById("dealer-second-card").style.visibility = "hidden";
	renderGame();
}

function renderGame() {
	cardsEl.textContent = "Cards: " + cards.join(" ");
	sumEl.textContent = "Sum: " + sum;
	if (sum <= 20) {
		message = "Do you want to draw a new card?";
		messageEl.style.color = "#333";
	} else if (sum === 21) {
		message = "You've got Blackjack!";
		messageEl.style.color = "green";
		hasBlackJack = true;
		document.getElementById("stop-btn").style.display = "none";
		document.getElementById("new-card-btn").style.display = "none";
		document.getElementById("new-game-btn").style.display = "inline-block";
	} else {
		message = "You're out of the game!";
		messageEl.style.color = "red";
		isAlive = false;
		document.getElementById("stop-btn").style.display = "none";
		document.getElementById("new-card-btn").style.display = "none";
		document.getElementById("new-game-btn").style.display = "inline-block";
	}
	messageEl.textContent = message;
}

function newCard() {
	if (isAlive && !hasBlackJack) {
		let card = getRandomCard();
		sum += card;
		cards.push(card);
		renderGame();
	}
}

function stopGame() {
	let dealerEl = document.getElementById("dealer-cards-el");
	dealerEl.textContent = "Crupier: " + dealerCards.join(" ");
	let dealerSum = dealerCards.reduce((acc, card) => acc + card, 0);
	if (sum <= 21 && dealerSum < sum) {
		messageEl.textContent = "¡Felicidades! Has ganado esta ronda.";
		messageEl.style.color = "blue";
	} else {
		messageEl.textContent = "El crupier gana o hay empate.";
		messageEl.style.color = "purple";
	}
	document.getElementById("stop-btn").style.display = "none";
	document.getElementById("new-card-btn").style.display = "none";
	document.getElementById("new-game-btn").style.display = "inline-block";
	isAlive = false;
	// Aquí puedes añadir más lógica para comparar sumas, etc.
}

function startNewGame() {
	location.reload();
}
