import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ speak }) {
	const [isLogin, setIsLogin] = useState(true);
	const [fadeOut, setFadeOut] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const toggleForm = () => {
		setFadeOut(true);
		setTimeout(() => {
			setIsLogin(!isLogin);
			setFadeOut(false);
			setError("");
		}, 400);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const usuariosGuardados =
			JSON.parse(localStorage.getItem("usuarios")) || {};

		if (isLogin) {
			if (usuariosGuardados[username]?.password === password) {
				localStorage.setItem("usuario", username);
				navigate("/home");
			} else {
				setUsername("");
				setPassword("");
				setError("Invalid username or password.");
				speak("Invalid username or password.");
			}
		} else {
			if (usuariosGuardados[username]) {
				setError("This username is already taken.");
				speak("This username is already taken.");
				return;
			}
			usuariosGuardados[username] = {
				password,
				fichas: 1000,
				dinero: 100,
			};
			localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
			localStorage.setItem("usuario", username);
			setIsLogin(true);
			setUsername("");
			setPassword("");
			navigate("/");
			speak("Account created successfully. You can now log in.");
		}
	};

	return (
		<div className="login-container">
			<div className="login-wrapper">
				<h1 className="login-title">🎲 RoyalFlush UMA</h1>
				<div className={`login-card ${fadeOut ? "fade-out" : ""}`}>
					<h2>{isLogin ? "Login to Your Account" : "Create a New Account"}</h2>
					<form onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Username"
							aria-label="enter your Username"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							onMouseEnter={(e) =>
								speak(
									e.target.value.length > 0
										? `Your username is ${e.target.value}`
										: e.currentTarget.getAttribute("aria-label")
								)
							}
							onFocus={(e) =>
								speak(
									e.target.value.length > 0
										? `Your username is ${e.target.value}`
										: e.currentTarget.getAttribute("aria-label")
								)
							}
						/>
						<input
							type="password"
							placeholder="Password"
							aria-label="enter your Password"
							onMouseEnter={(e) =>
								speak(e.currentTarget.getAttribute("aria-label"))
							}
							onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && (
							<p style={{ color: "#f88", marginTop: "0.5rem" }}>{error}</p>
						)}
						<button
							type="submit"
							aria-label={
								isLogin ? "Login" : "Register"
							}
							onMouseEnter={(e) =>
								speak(e.currentTarget.getAttribute("aria-label"))
							}
							onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
						>
							{isLogin ? "Login" : "Register"}
						</button>
					</form>
					<div
						className="toggle"
						onClick={toggleForm}
						tabIndex="0"
						aria-label={
							isLogin
								? "Don't have an account? Register"
								: "Already have an account? Login"
						}
						onMouseEnter={(e) =>
							speak(e.currentTarget.getAttribute("aria-label"))
						}
						onFocus={(e) => speak(e.currentTarget.getAttribute("aria-label"))}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								toggleForm();
								if (isLogin) {
									speak("Create a new account")
								} else {
									speak("Login to your account")
								}
							}
						}}
					>
						{isLogin
							? "Don't have an account? Register"
							: "Already have an account? Login"}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
