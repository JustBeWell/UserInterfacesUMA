import React, { use, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Slots.css";

function Slots() {
	const [slots1, setSlots1] = useState(["🍒", "🍋", "🍊"]);
	const [slots2, setSlots2] = useState(["🍒", "🍋", "🍊"]);
	const [slots3, setSlots3] = useState(["🍒", "🍋", "🍊"]);

	const [result, setResult] = useState("");
	const isSpinning = useRef(false);
	const isStopping = useRef(false);

	const generatedSlots1 = Array.from([
		"🍒",
		"🍋",
		"🍊",
		"7️⃣",
		"BAR",
		"🍉",
		"🍇",
		"🔔",
		"⭐",
		"💎",
	]);
	const generatedSlots2 = [...generatedSlots1];
	const generatedSlots3 = [...generatedSlots1];

	let currentIndex1 = useRef(0);
	let currentIndex2 = useRef(0);
	let currentIndex3 = useRef(0);

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	const spinIndefinido = async (generatedSlots, setColumn, currentIndex) => {
		const speed = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
		while (!isStopping.current) {
			const currentSlots = [
				generatedSlots[currentIndex.current % generatedSlots.length],
				generatedSlots[(currentIndex.current + 1) % generatedSlots.length],
				generatedSlots[(currentIndex.current + 2) % generatedSlots.length],
			];
			setColumn(currentSlots);
			currentIndex.current += 1 % generatedSlots.length;
			await delay(speed);
		}
	};

	const spinParada = async (generatedSlots, setColumn, currentIndex) => {
		const velocidadInicial = Math.floor(Math.random() * (50 - 20 + 1)) + 20;
		const velocidadMedia = Math.floor(Math.random() * (100 - 50 + 1)) + 50;
		const velocidadFinal = Math.floor(Math.random() * (300 - 150 + 1)) + 150;

		for (let i = 0; i < 30; i++) {
			const currentSlots = [
				generatedSlots[currentIndex.current % generatedSlots.length],
				generatedSlots[(currentIndex.current + 1) % generatedSlots.length],
				generatedSlots[(currentIndex.current + 2) % generatedSlots.length],
			];

			setColumn(currentSlots);
			currentIndex.current += 1 % generatedSlots.length;

			const randomFactor = Math.random() * 10;

			const speed =
				i < 10
					? velocidadInicial +
					  ((velocidadMedia - velocidadInicial) * i) / 10 +
					  randomFactor
					: i < 25
					? velocidadMedia +
					  ((velocidadFinal - velocidadMedia) * (i - 10)) / 15 +
					  randomFactor
					: velocidadFinal +
					  ((1000 - velocidadFinal) * (i - 25)) / 15 +
					  randomFactor;

			await delay(speed);
		}
	};

	const spinSlots = async () => {
		setResult("Girando.....");
		isSpinning.current = true;
		isStopping.current = false;

		await Promise.all([
			spinIndefinido(generatedSlots1, setSlots1, currentIndex1),
			spinIndefinido(generatedSlots2, setSlots2, currentIndex2),
			spinIndefinido(generatedSlots3, setSlots3, currentIndex3),
		]);
	};

	const stopSlots = async () => {
		isStopping.current = true; // Iniciar el proceso de parada

		await Promise.all([
			spinParada(generatedSlots1, setSlots1, currentIndex1),
			spinParada(generatedSlots2, setSlots2, currentIndex2),
			spinParada(generatedSlots3, setSlots3, currentIndex3),
		]);

		isSpinning.current = false;
		// Determina el resulatado despues de pararse
		const finalSlots = [
			generatedSlots1[(currentIndex1.current + 1) % generatedSlots1.length],
			generatedSlots2[(currentIndex2.current + 1) % generatedSlots2.length],
			generatedSlots3[(currentIndex3.current + 1) % generatedSlots3.length],
		];

		if (finalSlots[0] === finalSlots[1] && finalSlots[1] === finalSlots[2]) {
			setResult("¡Victoria!");
		} else {
			setResult("Has perdido");
		}
	};

	return (
		<div className="slots-page">
			<div className="background-image"></div>
			<header>
				<Link to="/">
					<button className="btn-top-left">Volver al menú principal</button>
				</Link>
			</header>
			<div className="slots-container">
				<div className="slots-column">
					{slots1.map((number, index) => (
						<div key={index} className="slot-number">
							{number}
						</div>
					))}
				</div>
				<div className="slots-column">
					{slots2.map((number, index) => (
						<div key={index} className="slot-number">
							{number}
						</div>
					))}
				</div>
				<div className="slots-column">
					{slots3.map((number, index) => (
						<div key={index} className="slot-number">
							{number}
						</div>
					))}
				</div>
			</div>
			<button
				className="boton-play"
				onClick={spinSlots}
				disabled={isSpinning.current}
			>
				Jugar
			</button>
			<button
				className="boton-stop"
				onClick={stopSlots}
				disabled={isStopping.current}
			>
				Parar
			</button>
			<h2 className="resultado">{result}</h2>
		</div>
	);
}

export default Slots;
