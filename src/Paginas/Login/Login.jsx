import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
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
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (isLogin) {
      if (usuariosGuardados[username]?.password === password) {
        localStorage.setItem("usuario", username);
        navigate("/home");
      } else {
        setUsername("");
        setPassword("");
        setError("Invalid username or password.");
      }
    } else {
      if (usuariosGuardados[username]) {
        setError("This username is already taken.");
        return;
      }
      usuariosGuardados[username] = {
        password,
        fichas: 1000,
        dinero: 100
      };
      localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
      localStorage.setItem("usuario", username);
      setIsLogin(true);
      setUsername("");
      setPassword("");
      navigate("/");
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
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "#f88", marginTop: "0.5rem" }}>{error}</p>}
          <button type="submit">{isLogin ? "Login" : "Register"}</button>
        </form>
        <div className="toggle" onClick={toggleForm}>
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
