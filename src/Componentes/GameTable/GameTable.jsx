import { Mano } from "..";
import "./GameTable.css";
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
  setBetInput
}) {
  const partidaTerminada = !isAlive && playerCards.length > 0;

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
        {partidaTerminada ? (
          <button className="btn" onClick={resetGame}>
            PLAY AGAIN
          </button>
        ) : (
          !isAlive ? (
            <div className="bet-input-group">
              <span className="bet-label">Enter your bet:</span>
              <input
                type="text"
                id="betAmount"
                className="bet-input"
                placeholder="Enter amount"
                value={betInput}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    setBetInput(value);
                    setBetAmount(value === "" ? 0 : Number(value));
                  }
                }}
              />
              <span className="available-chips">
                Available: <strong>{fichas}</strong> chips
              </span>
              <button className="btn" onClick={iniciarJuego}>START GAME</button>
            </div>
          ) : (
            <>
              <button className="btn" onClick={newCard}>HIT</button>
              <button className="btn" onClick={plantarse}>STAND</button>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default GameTable;
