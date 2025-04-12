import { Mano } from ".";

function GameTable({ dealerCards, playerCards, dealerScore, playerScore, isAlive, newCard, plantarse, iniciarJuego, betAmount, adjustBet, calcularPuntuacionVisible }) {

  function getDealerScoreColor() {
    const puntuacionVisible = calcularPuntuacionVisible(dealerCards);
    if (puntuacionVisible > 21) return "red";
    if (puntuacionVisible >= 17) return "green";
    return "orange";
  }

  return (
    <div className="game-table">
      <div className="mesa-juego">
        <h2 style={{ color: getDealerScoreColor() }}>
          Dealer {dealerCards.some(card => card.rotada) ? '' : `- Score: ${dealerScore}`}
        </h2>
        <Mano cartas={dealerCards} tipo="crupier" />

        <h2>Your Hand - Score: {playerScore}</h2>
        <Mano cartas={playerCards} tipo="jugador" />
      </div>

      <div id="controls">
        {!isAlive ? (
          <>
            <button className="btn" onClick={() => adjustBet(10)}>+10</button>
            <button className="btn" onClick={() => adjustBet(50)}>+50</button>
            <button className="btn" onClick={() => adjustBet(100)}>+100</button>
            <button className="btn" onClick={iniciarJuego}>START GAME</button>
          </>
        ) : (
          <>
            <button className="btn" onClick={newCard}>HIT</button>
            <button className="btn" onClick={plantarse}>STAND</button>
          </>
        )}
      </div>
    </div>
  );
}

export default GameTable;
