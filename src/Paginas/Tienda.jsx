import React, { use, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Tienda.css";

function Tienda({volumen,dinero,fichas,setFichas,setDinero}){ 
    return (
        <div className="tienda-container">
            <header className="tienda-header">
                <Link to="/"><button className="btn-top-left">Back to main menu</button></Link>
                <h1>BUY OR EXCHANGE TOKENS</h1>
            </header>

            <div className="store-items">
            <h1>Buy tokens</h1>
                <div className="item">
                    <p>Buy 100 tokens</p>
                    <button className="btn-buy">Buy</button>
                </div>
                <div className="item">
                    <p>Buy 250 tokens</p>
                    <button className="btn-buy">Buy</button>
                </div>
                <div className="item">
                    <p>Buy 1000 tokens</p>
                    <button className="btn-buy">Buy</button>
                </div>
                <div className="item">
                    <h1>Exchange tokens for money</h1>
                    <p>Tokens to exchange: {fichas}</p>
                    <input className="money"
                        type="range"
                        min="0"
                        value={fichas}
                        max="10000"
                        step={0.1}
                        onChange={(e) => setFichas(e.target.value)}
                    />
                    <button className="btn-buy">Exchange</button>
                    </div>
            </div>
        </div>
    );

}

export default Tienda;
