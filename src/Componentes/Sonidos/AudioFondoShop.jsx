import { TiendaMusica } from "../../Sonidos";

function AudioFondoShop(volumen) {
	const aud = new Audio(TiendaMusica);
	aud.volume = volumen;
	aud.loop = true;

	function reproducirMusica() {
		aud.play();
	}
	function pararMusica() {
		aud.pause();
		aud.currentTime = 0;
	}

	return { reproducirMusica, pararMusica, audio: aud };
}

export default AudioFondoShop;
