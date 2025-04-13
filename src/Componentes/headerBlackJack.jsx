import { Link } from "react-router-dom";

function HeaderBlackjack({ chips, betAmount, mensaje}) {
  return (
    <header className="header-blackjack">
      <Link to="/"><button className="btn-top-left" >
        Return to Menu
      </button></Link>
      <h1 className="bjh1">Blackjack</h1>
      <p className="bjp1">Balance: {chips} chips</p>
      <p className="bjp1">Current Bet: {betAmount} chips</p>
      <p className="bjp1">{mensaje}</p>
    </header>
  );
}

export default HeaderBlackjack;
