import { Link } from "react-router-dom";
import "./HeaderSlots.css"; 

function HeaderSlots() {
  return (
    <header className="header-slots">
      <Link to="/home">
        <button className="btn-top-left">Return to Menu</button>
      </Link>
      
      <section className="instructions">
        <p className="instruction"><strong> Objective:</strong> Match symbols to win tokens!</p>
        <p className="instruction"><strong> Step 1:</strong> Set your bet and press <em>Spin</em>.</p>
        <p className="instruction"><strong> Step 2:</strong> Win multipliers based on the result!</p>
      </section>
    </header>
  );
}

export default HeaderSlots;
