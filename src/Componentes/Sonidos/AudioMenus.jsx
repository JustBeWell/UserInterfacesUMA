import { menuPrincipal } from "../../Sonidos";

function AudioMenus(volumen) {
	const audioMenuPrincipal = new Audio(menuPrincipal);
	audioMenuPrincipal.volume = volumen;
	audioMenuPrincipal.loop = true;

	function reproducirMusica() {
		audioMenuPrincipal.play();
	}
	function pararMusica() {
		audioMenuPrincipal.pause();
		audioMenuPrincipal.currentTime = 0;
	}

	return { reproducirMusica, pararMusica, audio: audioMenuPrincipal };
}

export default AudioMenus;
