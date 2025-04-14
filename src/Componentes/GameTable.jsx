import { Mano } from ".";
import BlackJack from "../Paginas/BlackJack";
function GameTable({ dealerCards, playerCards, dealerScore, playerScore, isAlive, newCard, plantarse, iniciarJuego, betAmount, adjustBet, calcularPuntuacionVisible, resetGame}) {

  const partidaTerminada = !isAlive && playerCards.length > 0;

  return (
    <div className="game-table">
      <div className="mesa-juego">
        <h2 className="bjh2">
          Dealer {dealerCards.some(card => card.rotada) ? '' : `- Score: ${dealerScore}`}
        </h2>
        <Mano cartas={dealerCards} tipo="crupier" />

        <h2 className="bjh2">Your Hand - Score: {playerScore}</h2>
        <Mano cartas={playerCards} tipo="jugador" />
      </div>

      <div id="controls">
        {partidaTerminada ? (
          <>
            {/* SOLO botón PLAY AGAIN si terminó la partida */}
            <button
              className="btn"
              onClick={resetGame}
            >
              PLAY AGAIN
            </button>
          </>
        ) : (
          <>
            {/* Si la partida sigue o si aún no hemos empezado */}
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
          </>
        )}
      </div>
    </div>
  );
}

export default GameTable;
