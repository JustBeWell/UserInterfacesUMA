import React, { useState, useRef, useEffect } from "react";
import "./Slots.css";
import HeaderSlots from "../../Componentes/HeaderSlots/HeaderSlots";

function Slots({ reproducirEfecto, fichas, setFichas }) {
	const reelsRef = [useRef(), useRef(), useRef()];
	const iconHeight = 79;
	const iconWidth = 79;
	const numIcons = 9;
	const timePerIcon = 100;
	const indexes = useRef([0, 0, 0]);
	const [betAmount, setBetAmount] = useState("100");
	const [winClass, setWinClass] = useState(""); // para animación

	const [isSpinning, setIsSpinning] = useState(false);

	const [showRules, setShowRules] = useState(false);
	const [resultadoFinal, setResultadoFinal] = useState("");
	const [modalVisible, setModalVisible] = useState(false);

	const [floatingResult, setFloatingResult] = useState(null);

	const roll = (reel, offset) => {
		const alfa = (offset + 2) * numIcons + Math.round(Math.random() * numIcons);
		return new Promise((resolve) => {
			const style = getComputedStyle(reel); // Para obtener luego el valor de backgroundPositionY (actual)
			const currentY = parseFloat(style.backgroundPositionY) || 0; // Obtiene la posición actual del fondo (actual)
			const targetY = currentY + alfa * iconHeight; // Calcula la posicion del fondo (donde se quiere llegar)
			const normalizedY = targetY % (numIcons * iconHeight);

			setTimeout(() => {
				reel.style.transition = `background-position-y ${
					(8 + alfa) * timePerIcon
				}ms 
				cubic-bezier(.41,-0.01,.63,1.09)`;
				reel.style.backgroundPositionY = `${targetY}px`;
			}, offset * 150); // El offset sera 0 para la primera columna, 150 para la segunda y 300 para la tercera
			// Se le da un tiempo de espera para que la animacion no empiece a girar a la vez.

			setTimeout(() => {
				reel.style.transition = "none";
				reel.style.backgroundPositionY = `${normalizedY}px`;
				resolve(alfa % numIcons);
			}, (8 + alfa) * timePerIcon + offset * 150);
		});
	};

	const rollAll = async () => {
		const apuesta = parseInt(betAmount);
		if (apuesta > fichas || apuesta <= 0) {
			setResultadoFinal("Invalid bet. Make sure it's within your tokens.");
			setModalVisible(true);
			return;
		}
		reproducirEfecto("girandoSlots");

		setIsSpinning(true);
		setFichas(fichas - betAmount);
		const alfas = await Promise.all(
			reelsRef.map((ref, i) => roll(ref.current, i))
		);

		alfas.forEach((d, i) => {
			indexes.current[i] = (indexes.current[i] + d) % numIcons;
		});
		console.log("Valores de indexes después de girar:", indexes.current);
		const resultado = calcularPuntuacion(indexes.current);

		if (resultado > 1) {
			setWinClass("win1");
			reproducirEfecto("jackpot");
			setFloatingResult(`🎉 You won! x${resultado}`);
		} else {
			setWinClass("lose1");
			reproducirEfecto("sadTrumpet");
			setFloatingResult(`💀 You lost!`);
		}

		setTimeout(() => setWinClass(""), 2000);

		setTimeout(() => {
			setWinClass("");
			setFloatingResult(null);
		}, 1000);
		setFichas(
			fichas - betAmount + betAmount * calcularPuntuacion(indexes.current)
		);
		setIsSpinning(false);
	};

	const calcularPuntuacion = (indexes) => {
		/*
		Tenemos 9 iconos, y los valores de los iconos son:
		0:Plátano
		1: 7
		2: Cereza
		3: Uva
		4: Naranja
		5: Campana
		6: BAR	
		7: Limón
		8: Sandía

		Si los tres son frutas --> x2
		Si las 3 son frutas iguales --> x10
		Si las 3 son Campanas --> x50
		Si las 3 son BAR --> x75
		Si las 3 son 7 --> x100
		Si hay BAR y otras 2 diferetes --> x2
		Si hay dos BAR y una diferente --> x5
		Si hay BAR campana y 7 sin importar la posicion --> x150
		*/
		const TODOS = [0, 1, 2, 3, 4, 5, 6, 7, 8];
		const FRUTAS = [0, 2, 3, 4, 7, 8];
		const BAR = [6];
		const CAMPANA = [5];
		const SIETE = [1];
		const col1 = Number(indexes[0]);
		const col2 = Number(indexes[1]);
		const col3 = Number(indexes[2]);

		if (
			(BAR.includes(col1) && SIETE.includes(col2) && CAMPANA.includes(col3)) ||
			(BAR.includes(col2) && SIETE.includes(col3) && CAMPANA.includes(col1)) ||
			(BAR.includes(col3) && SIETE.includes(col1) && CAMPANA.includes(col2)) ||
			(BAR.includes(col1) && SIETE.includes(col3) && CAMPANA.includes(col2)) ||
			(BAR.includes(col2) && SIETE.includes(col1) && CAMPANA.includes(col3)) ||
			(BAR.includes(col3) && SIETE.includes(col2) && CAMPANA.includes(col1))
		) {
			return 150;
		} else if (
			SIETE.includes(col1) &&
			SIETE.includes(col2) &&
			SIETE.includes(col3)
		) {
			return 100;
		} else if (
			CAMPANA.includes(col1) &&
			CAMPANA.includes(col2) &&
			CAMPANA.includes(col3)
		) {
			return 50;
		} else if (BAR.includes(col1) && BAR.includes(col2) && BAR.includes(col3)) {
			return 75;
		} else if (
			(BAR.includes(col1) && BAR.includes(col2) && TODOS.includes(col3)) ||
			(BAR.includes(col1) && TODOS.includes(col2) && BAR.includes(col3)) ||
			(TODOS.includes(col1) && BAR.includes(col2) && BAR.includes(col3))
		) {
			return 5;
		} else if (
			(BAR.includes(col1) && TODOS.includes(col2) && TODOS.includes(col3)) ||
			(TODOS.includes(col1) && BAR.includes(col2) && TODOS.includes(col3)) ||
			(TODOS.includes(col1) && TODOS.includes(col2) && BAR.includes(col3))
		) {
			return 2;
		} else if (
			FRUTAS.includes(col1) &&
			FRUTAS.includes(col2) &&
			FRUTAS.includes(col3)
		) {
			return 1.5;
		} else if (col1 === col2 && col2 === col3) {
			return 10;
		} else {
			return Number(0);
		}
	};

	function rules(showRules) {
		if (showRules === true) {
			setShowRules(false);
		} else {
			setShowRules(true);
		}
	}

	return (
		<div className="slots-container">
			{showRules && (
				<div className="rules-modal">
					<h2>Winning Combinations</h2>
					<ul>
						<li>🎰 3x 7 → x100</li>
						<li>🔔 3x Bell → x50</li>
						<li>🟩 3x BAR → x75</li>
						<li>🍒 + 🍌 + 🍇 (all fruits) → x1.5</li>
						<li>3x same fruit → x10</li>
						<li>Any BAR + 2 random → x2</li>
						<li>2 BAR + 1 random → x5</li>
						<li>BAR + 7 + Bell (any order) → x150</li>
					</ul>
				</div>
			)}
			<button className="rules-button" onClick={() => rules(showRules)}>
				More Info ℹ️
			</button>
			<HeaderSlots />
			{floatingResult && (
				<div className="floating-result">{floatingResult}</div>
			)}
			<div className={`slots ${winClass}`}>
				<div className="reel" ref={reelsRef[0]}></div>
				<div className="reel" ref={reelsRef[1]}></div>
				<div className="reel" ref={reelsRef[2]}></div>
			</div>
			<button className="spin-button" onClick={rollAll} disabled={isSpinning}>
				Spin
			</button>
			<div className="bet-input-group">
				<span className="bet-label">Enter your bet:</span>
				<input
					type="text"
					id="betAmount"
					placeholder="Enter amount"
					className="bet-input"
					value={betAmount}
					onChange={(e) => {
						const value = e.target.value;
						if (/^\d*$/.test(value)) {
							setBetAmount(value);
						}
					}}
				/>
				<span className="available-chips">
					Available: <strong>{fichas}</strong> tokens
				</span>
			</div>
			{modalVisible && (
				<div className="modal-overlay">
					<div className="modal-content-error">
						<p>{resultadoFinal}</p>
						<button
							className="btn"
							onClick={() => {
								setModalVisible(false);
								setTimeout(() => setResultadoFinal(""), 300);
							}}
						>
							OK
						</button>
					</div>
				</div>
			)}
		</div>
	);
}

export default Slots;
