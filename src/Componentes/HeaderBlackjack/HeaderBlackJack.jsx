import { Link } from "react-router-dom";
import "./HeaderBlackjack.css"; // Asegúrate de tener estilos separados

function HeaderBlackjack({ chips, betAmount, mensaje }) {
  return (
    <header className="header-blackjack">
      <Link to="/">
        <button className="btn-top-left">Return to Menu</button>
      </Link>
      <p className="instruction">
        <strong>Goal:</strong> Reach 21 without going over.
      </p>
      <p className="instruction">
        <strong>Step 1:</strong> Enter your bet using the input below.
      </p>
      <p className="instruction">
        <strong>Step 2:</strong> Press <em>Start Game</em> to receive your cards.
      </p>
      <p className="instruction">
        <strong>Step 3:</strong> Choose <em>Hit</em> to take another card, or <em>Stand</em> to finish.
      </p>
      <p className="instruction">
        <strong>Win</strong> if you beat the dealer without going over 21!
      </p>
    </header>
  );
}

export default HeaderBlackjack;
