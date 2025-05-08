import "./Ajustes.css";
import { Link } from "react-router-dom";

function Ajustes({volumen, setVolumen}){

    return <div className="ajustes-container">
        <div className="ajustes-header">
            <h1>
                AJUSTES
            </h1>
        </div>
        <div className="ajustes-mismaLinea">
            <p className="ajustes-texto">Volumen: {Math.floor(volumen*100)}</p>
            <input className="ajustes-linea"
                type="range"
                min="0"
                max="1"
                value={volumen}
                onChange={(e) => setVolumen(e.target.value)}
                step={0.01}
            />
        </div>
        <Link to="/"><button className="btn-top-left">Return to Menu</button></Link>
    </div>
}

export default Ajustes;