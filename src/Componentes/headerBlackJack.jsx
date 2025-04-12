
function HeaderBlackjack({ chips, betAmount, mensaje, onReturnToMenu }) {
  return (
    <header className="header-blackjack">
      <button className="btn-top-left" onClick={onReturnToMenu}>
        Return to Menu
      </button>
      <h1>Blackjack</h1>
      <p>Balance: {chips} chips</p>
      <p>Current Bet: {betAmount} chips</p>
      <p>{mensaje}</p>
    </header>
  );
}

export default HeaderBlackjack;
