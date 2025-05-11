import { Link } from "react-router-dom";
import "./HeaderSlots.css"; 

function HeaderSlots() {
  return (
    <header className="header-slots">
      <Link to="/">
        <button className="btn-top-left">Return to Menu</button>
      </Link>
      <p className="instruction">
        <strong>Goal:</strong> Get one of the combinations.
      </p>
      <p className="instruction">
        <strong>Step 1:</strong> Press the "Spin" button.
      </p>
      <p className="instruction">
        <strong>Step 2:</strong> After the animation you will see.
      </p>
    </header>
  );
}

export default HeaderSlots;