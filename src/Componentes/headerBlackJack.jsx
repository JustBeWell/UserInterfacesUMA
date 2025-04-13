
function HeaderBlackjack({ chips, betAmount, mensaje, onReturnToMenu }) {
  return (
    <header className="header-blackjack">
      <button className="btn-top-left" onClick={onReturnToMenu}>
        Return to Menu
      </button>
      <h1 className="bjh1">Blackjack</h1>
      <p className="bjp1">Balance: {chips} chips</p>
      <p className="bjp1">Current Bet: {betAmount} chips</p>
      <p className="bjp1">{mensaje}</p>
    </header>
  );
}

export default HeaderBlackjack;
