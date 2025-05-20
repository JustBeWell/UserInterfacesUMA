import { Mano } from "..";
import "./GameTable.css";
import { useEffect, useRef } from "react";
function GameTable({
  dealerCards,
  fichas,
  betInput,
  playerCards,
  dealerScore,
  playerScore,
  isAlive,
  newCard,
  plantarse,
  iniciarJuego,
  betAmount,
  adjustBet,
  calcularPuntuacionVisible,
  resetGame,
  setBetAmount,
  setBetInput,
  speak
}) {
  useEffect(() => {
    if (isAlive) {
      speak(`Your actual points are ${playerScore}. Dealers actual points are ${dealerScore}`, 1);
    }
  }, [isAlive, playerScore, dealerScore]);

  const prevDealerCardsLength = useRef(dealerCards.length);

  useEffect(() => {
    // Solo narrar si la partida está activa y el dealer ha cogido una carta nueva
    if (
      isAlive &&
      dealerCards.length > prevDealerCardsLength.current
      && dealerCards.length > 1
    ) {
      const lastCard = dealerCards[dealerCards.length - 1];
      if (lastCard) {
        // Puedes personalizar el formato de la carta según tu estructura de datos
        const carta = lastCard.nombre || lastCard.valor || "carta";
        speak(`The dealer has taken the card ${carta}. His actual score is ${dealerScore}`, 1);
      }
    }
    prevDealerCardsLength.current = dealerCards.length;
  }, [dealerCards, dealerScore, isAlive]);

  useEffect(() => {
  // Narrar las puntuaciones cuando la partida termina
  if (!isAlive && dealerCards.length > 0 && playerCards.length > 0) {
    speak(
      `Game over. Your final score is ${playerScore}. Dealer's final score is ${dealerScore}`,
      1
    );
  }
  }, [isAlive, playerScore, dealerScore, dealerCards.length, playerCards.length]);

  return (
    <div className="game-table">
      <div className="mesa-juego">
        <div className="score-bar">
          <span className="score-label">Dealer</span>
          <span className="score-value">
            {dealerCards.some(card => card.rotada) ? "--" : dealerScore}
          </span>
        </div>
        <Mano cartas={dealerCards} tipo="crupier" />

        <div className="score-bar">
          <span className="score-label">You</span>
          <span className="score-value">{playerScore}</span>
        </div>
        <Mano cartas={playerCards} tipo="jugador" />
      </div>

      <div id="controls">
        {!isAlive ? (
          <div className="bet-input-group">
            <span className="bet-label">Enter your bet:</span>
            <input
              type="text"
              id="betAmount"
              className="bet-input"
              aria-label="Enter your bet amount"
              onMouseEnter={e => speak(e.currentTarget.getAttribute('aria-label'))}
              onFocus={e => speak(e.currentTarget.getAttribute('aria-label'))}
              placeholder="Enter amount"
              value={betInput}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setBetInput(value);
                  setBetAmount(value === "" ? 0 : Number(value));
                  speak(value);
                }else{
                  speak("Invalid input, please enter a number");
                }
              }}
            />
            <span className="available-chips">
              Available: <strong>{fichas}</strong> tokens
            </span>
            <button className="btn" onClick={iniciarJuego}
             aria-label="Start Game"
             onMouseEnter={e => speak(e.currentTarget.getAttribute('aria-label'))}
             onFocus={e => speak(e.currentTarget.getAttribute('aria-label'))}>           
             START GAME</button>
          </div>
        ) : (
          <>
            <button className="btn" onClick={newCard}
            aria-label="Hit"
            onMouseEnter={e => speak(e.currentTarget.getAttribute('aria-label'))}
            onFocus={e => speak(e.currentTarget.getAttribute('aria-label'))}>
            HIT</button>
            <button className="btn" onClick={plantarse}
            aria-label="Stand"
            onMouseEnter={e => speak(e.currentTarget.getAttribute('aria-label'))}
            onFocus={e => speak(e.currentTarget.getAttribute('aria-label'))}>
            STAND</button>
          </>
        )}
      </div>
    </div>
  );
}

export default GameTable;
