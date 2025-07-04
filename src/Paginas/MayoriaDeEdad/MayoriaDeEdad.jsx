import "./MayoriaDeEdad.css";
import { use, useEffect } from "react";
import { Link } from "react-router-dom";
import Icono18Plus from "../../imagenes/iconos/plus18.png";
function MayoriaDeEdad({speak}) {
	useEffect(() => {
		speak(
			"This platform is exclusively intended for users who are 18 years of age or older. Access to gambling content by minors is strictly prohibited and monitored. RoyalFlush is committed to promoting responsible entertainment and ensuring that all activity on this platform aligns with legal and ethical standards. All players are expected to act in accordance with local laws and age regulations. We reserve the right to restrict or terminate access in cases of violation. Please confirm your age and continue only if you are legally permitted to use this service."
		)
	}, []);
	return (
		<body className="edad-container">
			<div className="edad-card">
				<div className="edad-header">
					<h1>Access Restricted to Adults</h1>
					<div className="edad-icon">
						<img src={Icono18Plus} alt="18+" className="icono-18" />
					</div>
				</div>

				<p className="edad-texto">
					This platform is exclusively intended for users who are 18 years of
					age or older. Access to gambling content by minors is strictly
					prohibited and monitored.
				</p>

				<p className="edad-texto">
					RoyalFlush is committed to promoting responsible entertainment and
					ensuring that all activity on this platform aligns with legal and
					ethical standards.
				</p>

				<p className="edad-texto">
					All players are expected to act in accordance with local laws and age
					regulations. We reserve the right to restrict or terminate access in
					cases of violation.
				</p>

				<p className="edad-texto">
					Please confirm your age and continue only if you are legally permitted
					to use this service.
				</p>

				<Link to="/home" tabIndex={-1}>
					<button className="btn-volver"
					aria-label="Return to Homepage"
					onMouseEnter={(e) =>
						speak(e.currentTarget.getAttribute("aria-label"))
					}
					onFocus={
						(e) => speak(e.currentTarget.getAttribute("aria-label"))
					}
					>Return to Homepage</button>
				</Link>
			</div>
		</body>
	);
}

export default MayoriaDeEdad;
