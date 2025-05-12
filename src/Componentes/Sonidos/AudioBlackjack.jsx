import { BlackjackMusica } from "../../Sonidos";

function AudioBlackjack(volumen) {
	const aud = new Audio(BlackjackMusica);
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

export default AudioBlackjack;
