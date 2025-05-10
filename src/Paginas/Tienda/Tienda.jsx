import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Tienda.css";
import { AudioShop } from "../../Componentes";
function Tienda({ dinero, fichas, setFichas, setDinero, volumen }) {
	const [intercambio, setIntercambio] = useState(0);
	const audioCompra = new AudioShop(volumen);

	function handleBuy(amount) {
		if (dinero >= amount) {
			setFichas(fichas + amount);
			setDinero(dinero - amount);
		} else {
			alert("Not enough money to buy tokens.");
		}
		audioCompra.reproducirCompra();
	}
	function handleExchange() {
		const fichasSeleccionadas = parseInt(intercambio);
		if (fichasSeleccionadas > fichas) {
			alert("You don't have enough tokens.");
			return;
		}
		setFichas((prev) => prev - fichasSeleccionadas);
		setDinero((prev) => prev + fichasSeleccionadas); // 1 ficha = 1 euro
		setIntercambio(0); // reseteamos el slider
		audioCompra.reproducirCompra();
	}

	return (
		<div className="tienda-container">
			<header className="tienda-header">
				<Link to="/">
					<button className="btn-top-left">Back to main menu</button>
				</Link>
				<div className="mensaje-header">
					<h1>Buy or Exchange Tokens</h1>
				</div>
			</header>

			<div className="tienda-content">
				<div className="store-section">
					<h2><strong>Buy Tokens</strong></h2>
					<p>
						You have <strong>{dinero}</strong> €
					</p>
					<div className="item-list">
						<div className="item">
							<p>Buy 100 tokens</p>
							<button className="btn-buy" onClick={() => handleBuy(100)}>
								Buy
							</button>
						</div>
						<div className="item">
							<p>Buy 250 tokens</p>
							<button className="btn-buy" onClick={() => handleBuy(250)}>
								Buy
							</button>
						</div>
						<div className="item">
							<p>Buy 1000 tokens</p>
							<button className="btn-buy" onClick={() => handleBuy(1000)}>
								Buy
							</button>
						</div>
					</div>
				</div>

				<div className="store-section">
					<h2><strong>Exchange Tokens for Money</strong></h2>
					<p>
						You have <strong>{fichas}</strong> tokens
					</p>
					<p>
						Exchanging <strong>{intercambio}</strong> tokens ={" "}
						<strong>{intercambio}€</strong>
					</p>

					<input
						className="range"
						type="range"
						min="0"
						max={fichas}
						value={intercambio}
						onChange={(e) => setIntercambio(e.target.value)}
					/>
					<button className="btn-buy" onClick={handleExchange}>
						Exchange
					</button>
				</div>
			</div>
		</div>
	);
}

export default Tienda;
