import { SlotsMusica } from "../../Sonidos";

function AudioSlots(volumen) {
	const aud = new Audio(SlotsMusica);
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

export default AudioSlots;
