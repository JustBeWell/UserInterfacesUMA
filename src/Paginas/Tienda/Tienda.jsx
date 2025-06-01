import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Tienda.css";

import adVideo from "../../Anuncio/anuncio.mp4"; // Path to your ad video

const TOKEN_VALUE = 0.01; // 100 tokens = 1 €

function Tienda({
	reproducirEfecto,
	dinero,
	fichas,
	setFichas,
	setDinero,
	speak,
}) {
	const [intercambio, setIntercambio] = useState(0);
	useEffect(() => {
		speak(
			"Welcome to the store. You can buy or exchange tokens. Right now you have " +
				dinero +
				" euros and " +
				fichas +
				" tokens."
		);
	}, []);
	const [showAd, setShowAd] = useState(false);
	const [canSkip, setCanSkip] = useState(false);
	const [secondsLeft, setLeft] = useState(30);
	const videoref = React.useRef(null);
	useEffect(() => {
		if (showAd && canSkip) {
			speak("You can skip the ad now.");
		}
	}, [canSkip, showAd]);
	function openAd() {
		setShowAd(true);
		setCanSkip(false);
		setLeft(30);
		const i = setInterval(() => {
			setLeft((prev) => {
				if (prev <= 1) {
					clearInterval(i);
					setCanSkip(true);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);
	}

	function closeAdAndReward() {
		setShowAd(false);
		setFichas((prev) => prev + 1000);
		reproducirEfecto("win");
	}

	function handleBuy(tokens) {
		const coste = tokens * TOKEN_VALUE;
		if (dinero >= coste) {
			setFichas(fichas + tokens);
			setDinero(dinero - coste);
			reproducirEfecto("pay");
		} else {
			alert("Not enough money to buy tokens.");
		}
	}

	function handleExchange() {
		const tokensSel = parseInt(intercambio, 10);
		if (tokensSel > fichas) {
			alert("You don't have enough tokens.");
			return;
		}
		setFichas((prev) => prev - tokensSel);
		setDinero((prev) => prev + tokensSel * TOKEN_VALUE);
		setIntercambio(0);
		reproducirEfecto("pay");
	}

	return (
		<div className="tienda-container">
			<header className="tienda-header">
				<Link to="/home" tabIndex={-1}>
					<button
						className="btn-top-left"
						aria-label="Return to Menu"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						Return to Menu
					</button>
				</Link>

				<button
					className="btn-top-right"
					onClick={openAd}
					aria-label="Watch ad for 1000 tokens"
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
				>
					▶️ Watch Ad
					<br />
					+1000 tokens
				</button>

				<div className="mensaje-header">
					<h1>Buy or Exchange Tokens</h1>
					<h2>Current tokens: <strong> {fichas}</strong> 🪙</h2>
					<h2>Current money: <strong>{dinero.toFixed(2)}</strong>€ 💸</h2>
				</div>
			</header>

			<div className="tienda-content">
				<div className="store-section">
					<h2>
						<strong>Buy Tokens</strong>
					</h2>
					

					<div className="item-list">
						<div className="item">
							<p>Buy 100 tokens (1 €)</p>
							<button
								className="btn-buy"
								onClick={() => handleBuy(100)}
								aria-label="Buy 100 tokens for 1 euro"
								onMouseEnter={(e) =>
									speak(e.currentTarget.getAttribute("aria-label"))
								}
								onFocus={(e) =>
									speak(e.currentTarget.getAttribute("aria-label"))
								}
							>
								Buy
							</button>
						</div>
						<div className="item">
							<p>Buy 250 tokens (2.50 €)</p>
							<button
								className="btn-buy"
								onClick={() => handleBuy(250)}
								aria-label="Buy 250 tokens for 2.5 euro"
								onMouseEnter={(e) =>
									speak(e.currentTarget.getAttribute("aria-label"))
								}
								onFocus={(e) =>
									speak(e.currentTarget.getAttribute("aria-label"))
								}
							>
								Buy
							</button>
						</div>
						<div className="item">
							<p>Buy 1000 tokens (10 €)</p>
							<button
								className="btn-buy"
								onClick={() => handleBuy(1000)}
								aria-label="Buy 1000 tokens for 10 euro"
								onMouseEnter={(e) =>
									speak(e.currentTarget.getAttribute("aria-label"))
								}
								onFocus={(e) =>
									speak(e.currentTarget.getAttribute("aria-label"))
								}
							>
								Buy
							</button>
						</div>
					</div>
				</div>

				<div className="store-section">
					<h2>
						<strong>Exchange Tokens for Money</strong>
					</h2>
				
					<p>
						Exchanging <strong>{intercambio}</strong> tokens ➜{" "}
						<strong>{(intercambio * TOKEN_VALUE).toFixed(2)} €</strong>
					</p>

					<input
						className="range"
						type="range"
						min="0"
						max={fichas}
						value={intercambio}
						onChange={(e) => {
							setIntercambio(e.target.value);
							speak(
								`${e.target.value} tokens selected, that means ${
									e.target.value * 0.01
								} euros`
							);
						}}
						aria-label="Select number of tokens to exchange"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					/>

					<button
						className="btn-buy"
						onClick={handleExchange}
						aria-label="Exchange tokens for money"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						Exchange
					</button>
				</div>
			</div>

			{showAd && (
				<div className="ad-overlay">
					<video
						src={adVideo}
						autoPlay
						controls={false}
						className="ad-video"
						onEnded={closeAdAndReward}
						onCanPlay={() => (videoref.current.volume = 0.1)}
					/>
					<button
						className="skip-btn"
						onClick={closeAdAndReward}
						disabled={!canSkip}
						aria-label="Skip ad"
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
					>
						{canSkip ? "Skip Ad" : `Skip in ${secondsLeft}s`}
					</button>
				</div>
			)}
		</div>
	);
}

export default Tienda;
