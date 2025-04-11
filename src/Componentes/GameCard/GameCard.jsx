// src/Componentes/GameCard.js
import { Link } from "react-router-dom";
import "./GameCard.css"; // o usa Tailwind si prefieres

function GameCard({ image, alt, to, label }) {
  return (
    <div className="game-card">
      <img src={image} alt={alt} />
      <Link to={to}>
        <button className="btn">{label}</button>
      </Link>
    </div>
  );
}

export default GameCard;
