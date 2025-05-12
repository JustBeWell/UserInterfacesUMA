import { AjustesMusica } from "../../Sonidos";

function AjustesMusic(volumen) {
	const aud = new Audio(AjustesMusica);
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

export default AjustesMusic;
